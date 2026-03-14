import type { VacuumDeviceAttributes } from "@home-assistant-matter-hub/common";

export interface VacuumServiceAreaMap {
  mapId: number;
  name: string;
}

export interface VacuumServiceAreaArea {
  matterAreaId: number;
  segmentId: number;
  mapId: number;
  name: string;
}

export interface VacuumServiceAreaData {
  maps: VacuumServiceAreaMap[];
  areas: VacuumServiceAreaArea[];
  selectedMatterAreaIds: number[];
  currentMatterAreaId?: number;
  action: string;
  command?: string;
  commandKey: string;
  paramsKey: string;
  paramsNested: boolean;
}

type Attributes = VacuumDeviceAttributes & Record<string, unknown>;

interface AreaCandidate {
  segmentId: number;
  mapId?: number;
  name?: string;
}

const AREA_ID_KEYS = [
  "id",
  "segment_id",
  "segmentId",
  "room_id",
  "roomId",
  "area_id",
  "areaId",
  "value",
] as const;
const AREA_NAME_KEYS = ["name", "title", "label", "room_name"] as const;
const MAP_ID_KEYS = ["map_id", "mapId", "selected_map", "map"] as const;

const SELECTED_AREA_KEYS = [
  "selected_segments",
  "cleaning_segments",
  "active_segments",
  "current_segments",
  "selected_rooms",
  "current_rooms",
  "selected_areas",
  "active_areas",
] as const;

export function parseVacuumServiceAreaData(
  attributes: Attributes,
): VacuumServiceAreaData | undefined {
  const defaultMapId = toNumber(attributes.selected_map ?? attributes.map_id) ?? 1;
  const candidates = collectAreaCandidates(attributes, defaultMapId);

  if (candidates.length === 0) {
    return undefined;
  }

  const bySegmentId = new Map<number, VacuumServiceAreaArea>();
  for (const candidate of candidates) {
    if (!bySegmentId.has(candidate.segmentId)) {
      bySegmentId.set(candidate.segmentId, {
        matterAreaId: candidate.segmentId,
        segmentId: candidate.segmentId,
        mapId: candidate.mapId ?? defaultMapId,
        name: candidate.name ?? `Area ${candidate.segmentId}`,
      });
    }
  }

  const areas = [...bySegmentId.values()].sort((a, b) => a.matterAreaId - b.matterAreaId);
  const mapIds = [...new Set(areas.map((a) => a.mapId))].sort((a, b) => a - b);
  const maps = mapIds.map((mapId) => ({
    mapId,
    name: mapIds.length === 1 ? "Map" : `Map ${mapId}`,
  }));

  const selectedSegmentIds = parseSelectedSegments(attributes);
  const selectedMatterAreaIds = selectedSegmentIds.filter((id) => bySegmentId.has(id));

  const currentSegmentId = toAreaId(
    attributes.current_segment ?? attributes.current_area,
  );
  const currentMatterAreaId =
    currentSegmentId != null && bySegmentId.has(currentSegmentId)
      ? currentSegmentId
      : undefined;

  const action =
    toStringValue(attributes.matter_service_area_action) ?? "vacuum.send_command";
  const commandKey =
    toStringValue(attributes.matter_service_area_command_key) ?? "command";
  const paramsKey =
    toStringValue(attributes.matter_service_area_params_key) ?? "params";
  const command =
    toStringValue(attributes.matter_service_area_command) ??
    toStringValue(attributes.room_clean_command) ??
    toStringValue(attributes.segment_clean_command) ??
    (action === "vacuum.send_command" ? "app_segment_clean" : undefined);

  const paramsNested = toBoolean(attributes.matter_service_area_params_nested);

  return {
    maps,
    areas,
    selectedMatterAreaIds,
    currentMatterAreaId,
    action,
    command,
    commandKey,
    paramsKey,
    paramsNested,
  };
}

function collectAreaCandidates(
  attributes: Attributes,
  defaultMapId: number,
): AreaCandidate[] {
  const candidates: AreaCandidate[] = [];

  const areasFromArrays = parseArrayLikeAreas(attributes.rooms, defaultMapId).concat(
    parseArrayLikeAreas(attributes.segments, defaultMapId),
    parseArrayLikeAreas(attributes.room_mapping, defaultMapId),
    parseArrayLikeAreas(attributes.room_map, defaultMapId),
    parseArrayLikeAreas(attributes.segment_map, defaultMapId),
  );
  candidates.push(...areasFromArrays);

  const areasFromObjects = parseObjectLikeAreas(attributes.rooms, defaultMapId).concat(
    parseObjectLikeAreas(attributes.segments, defaultMapId),
    parseObjectLikeAreas(attributes.room_map, defaultMapId),
    parseObjectLikeAreas(attributes.segment_map, defaultMapId),
  );
  candidates.push(...areasFromObjects);

  const ids = parseNumberList(attributes.segment_ids).concat(
    parseNumberList(attributes.room_ids),
  );
  if (ids.length > 0) {
    const names = parseNamesById(attributes.segment_names, attributes.room_names);
    for (const segmentId of ids) {
      candidates.push({
        segmentId,
        mapId: defaultMapId,
        name: names.get(segmentId),
      });
    }
  }

  return candidates.filter((candidate) => Number.isFinite(candidate.segmentId));
}

function parseArrayLikeAreas(value: unknown, defaultMapId: number): AreaCandidate[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const result: AreaCandidate[] = [];
  for (const item of value) {
    if (item == null) {
      continue;
    }

    if (Array.isArray(item)) {
      const segmentId = toNumber(item[0]);
      if (segmentId == null) {
        continue;
      }
      result.push({
        segmentId,
        mapId: toNumber(item[2]) ?? defaultMapId,
        name: toStringValue(item[1]),
      });
      continue;
    }

    if (typeof item === "number") {
      result.push({ segmentId: item, mapId: defaultMapId });
      continue;
    }

    if (typeof item === "string") {
      const id = toNumber(item);
      if (id != null) {
        result.push({ segmentId: id, mapId: defaultMapId });
      }
      continue;
    }

    if (typeof item === "object") {
      const record = item as Record<string, unknown>;
      const segmentId = firstNumber(record, AREA_ID_KEYS);
      if (segmentId == null) {
        continue;
      }
      result.push({
        segmentId,
        mapId: firstNumber(record, MAP_ID_KEYS) ?? defaultMapId,
        name: firstString(record, AREA_NAME_KEYS),
      });
    }
  }

  return result;
}

function parseObjectLikeAreas(value: unknown, defaultMapId: number): AreaCandidate[] {
  if (value == null || Array.isArray(value) || typeof value !== "object") {
    return [];
  }

  const result: AreaCandidate[] = [];
  for (const [key, entry] of Object.entries(value)) {
    const segmentId = toNumber(key);
    if (segmentId == null) {
      continue;
    }

    if (typeof entry === "string") {
      result.push({ segmentId, mapId: defaultMapId, name: entry });
      continue;
    }

    if (entry != null && typeof entry === "object") {
      const record = entry as Record<string, unknown>;
      result.push({
        segmentId: toNumber(record.id) ?? segmentId,
        mapId: firstNumber(record, MAP_ID_KEYS) ?? defaultMapId,
        name: firstString(record, AREA_NAME_KEYS),
      });
    }
  }

  return result;
}

function parseSelectedSegments(attributes: Attributes): number[] {
  const selected = SELECTED_AREA_KEYS.flatMap((key) => parseNumberList(attributes[key]));

  const currentSegmentId = toAreaId(
    attributes.current_segment ?? attributes.current_area,
  );
  if (currentSegmentId != null) {
    selected.push(currentSegmentId);
  }

  return [...new Set(selected)];
}

function parseNamesById(...values: unknown[]): Map<number, string> {
  const names = new Map<number, string>();

  for (const value of values) {
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (Array.isArray(entry)) {
          const id = toNumber(entry[0]);
          const name = toStringValue(entry[1]);
          if (id != null && name != null) {
            names.set(id, name);
          }
          continue;
        }

        if (typeof entry === "object" && entry != null) {
          const record = entry as Record<string, unknown>;
          const id = firstNumber(record, AREA_ID_KEYS);
          const name = firstString(record, AREA_NAME_KEYS);
          if (id != null && name != null) {
            names.set(id, name);
          }
        }
      }
      continue;
    }

    if (value != null && typeof value === "object") {
      for (const [key, entry] of Object.entries(value)) {
        const id = toNumber(key);
        if (id != null && typeof entry === "string" && entry.trim() !== "") {
          names.set(id, entry);
          continue;
        }

        if (id != null && entry != null && typeof entry === "object") {
          const record = entry as Record<string, unknown>;
          const name = firstString(record, AREA_NAME_KEYS);
          if (name != null) {
            names.set(id, name);
          }
        }
      }
    }
  }

  return names;
}

function parseNumberList(value: unknown): number[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => parseNumberList(entry));
  }

  if (value != null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const directAreaId = firstNumber(record, AREA_ID_KEYS);
    if (directAreaId != null) {
      return [directAreaId];
    }

    const result: number[] = [];
    for (const [key, entry] of Object.entries(record)) {
      const keyNumber = toNumber(key);
      if (keyNumber != null && isSelectedValue(entry)) {
        result.push(keyNumber);
        continue;
      }

      if (entry != null && typeof entry === "object") {
        const nestedId = firstNumber(entry as Record<string, unknown>, AREA_ID_KEYS);
        if (nestedId != null) {
          result.push(nestedId);
        }
      }
    }
    return [...new Set(result)];
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") {
      return [];
    }
    if (/[,;|\s]/.test(trimmed) && toNumber(trimmed) == null) {
      return trimmed
        .split(/[\s,;|]+/)
        .map((entry) => toNumber(entry))
        .filter((entry): entry is number => entry != null);
    }
  }

  const numeric = toNumber(value);
  return numeric != null ? [numeric] : [];
}

function firstNumber(
  record: Record<string, unknown>,
  keys: readonly string[],
): number | undefined {
  for (const key of keys) {
    const value = toNumber(record[key]);
    if (value != null) {
      return value;
    }
  }
  return undefined;
}

function firstString(
  record: Record<string, unknown>,
  keys: readonly string[],
): string | undefined {
  for (const key of keys) {
    const value = toStringValue(record[key]);
    if (value != null) {
      return value;
    }
  }
  return undefined;
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "bigint") {
    const asNumber = Number(value);
    return Number.isFinite(asNumber) ? asNumber : undefined;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return undefined;
}

function toStringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function toAreaId(value: unknown): number | undefined {
  const direct = toNumber(value);
  if (direct != null) {
    return direct;
  }

  if (value != null && typeof value === "object") {
    return firstNumber(value as Record<string, unknown>, AREA_ID_KEYS);
  }

  return undefined;
}

function toBoolean(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "yes";
  }
  return false;
}

function isSelectedValue(value: unknown): boolean {
  if (value == null) {
    return false;
  }
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return (
      normalized !== "" &&
      normalized !== "0" &&
      normalized !== "false" &&
      normalized !== "off" &&
      normalized !== "none"
    );
  }
  return true;
}
