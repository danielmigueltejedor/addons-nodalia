import {
  type VacuumDeviceAttributes,
  VacuumDeviceFeature,
  VacuumState,
} from "@home-assistant-matter-hub/common";
import { RvcOperationalState } from "@matter/main/clusters";
import { testBit } from "../../../../../utils/test-bit.js";
import { HomeAssistantEntityBehavior } from "../../../../behaviors/home-assistant-entity-behavior.js";
import { RvcOperationalStateServer } from "../../../../behaviors/rvc-operational-state-server.js";
import { resolveVacuumStartAction } from "./vacuum-start-action.js";

const CLEANING_MOP_HINTS = [
  "cleaning_mop",
  "mop_cleaning",
  "washing_mop",
  "mop_washing",
  "wash_mop",
  "mop_wash",
  "washing",
  "self_clean",
  "auto_wash",
  "dock_wash",
  "mopwash",
  "lavando_mopa",
  "lavado_mopa",
  "lavando",
] as const;

const FILLING_WATER_HINTS = [
  "filling_water_tank",
  "fill_water",
  "water_refill",
  "filling",
  "rellenando",
  "llenando",
] as const;

const EMPTYING_DUST_HINTS = [
  "emptying_dust_bin",
  "emptying",
  "auto_empty",
  "dust_collection",
  "vaciando",
  "vaciado",
] as const;

const UPDATING_MAPS_HINTS = [
  "updating_maps",
  "map_update",
  "mapping",
  "building_map",
  "actualizando_mapa",
  "mapeando",
] as const;

// RVC has no dedicated "drying mop" state, so we map drying-like statuses
// to Charging because this typically happens while docked on base.
const CHARGING_HINTS = [
  "charging",
  "charge",
  "docking_charge",
  "dock_charging",
  "drying",
  "drying_mop",
  "mop_drying",
  "mop_dry",
  "dry",
  "hot_air_drying",
  "secando_mopa",
  "secando",
  "cargando",
] as const;

const SEEKING_CHARGER_HINTS = [
  "returning",
  "returning_home",
  "go_to_dock",
  "seeking_charger",
  "going_to_charge",
  "volviendo_a_base",
  "retornando",
] as const;

const RUNNING_HINTS = [
  "cleaning",
  "running",
  "working",
  "spot_cleaning",
  "zone_cleaning",
  "segment_cleaning",
  "sweeping",
  "limpiando",
  "en_limpieza",
] as const;

const PAUSED_HINTS = ["paused", "idle", "standby", "pausado", "en_espera"] as const;
const DOCKED_HINTS = ["docked", "on_dock", "base", "en_base"] as const;
const ERROR_HINTS = ["error", "fault", "stuck", "atascado"] as const;

export const VacuumRvcOperationalStateServer = RvcOperationalStateServer({
  getOperationalState(entity): RvcOperationalState.OperationalState {
    const statusHints = collectOperationalStateHints(entity.state, entity.attributes);

    if (hasHint(statusHints, CLEANING_MOP_HINTS)) {
      return RvcOperationalState.OperationalState.CleaningMop;
    }
    if (hasHint(statusHints, FILLING_WATER_HINTS)) {
      return RvcOperationalState.OperationalState.FillingWaterTank;
    }
    if (hasHint(statusHints, EMPTYING_DUST_HINTS)) {
      return RvcOperationalState.OperationalState.EmptyingDustBin;
    }
    if (hasHint(statusHints, UPDATING_MAPS_HINTS)) {
      return RvcOperationalState.OperationalState.UpdatingMaps;
    }
    if (hasHint(statusHints, CHARGING_HINTS)) {
      return RvcOperationalState.OperationalState.Charging;
    }
    if (hasHint(statusHints, SEEKING_CHARGER_HINTS)) {
      return RvcOperationalState.OperationalState.SeekingCharger;
    }
    if (hasHint(statusHints, RUNNING_HINTS)) {
      return RvcOperationalState.OperationalState.Running;
    }
    if (hasHint(statusHints, PAUSED_HINTS)) {
      return RvcOperationalState.OperationalState.Paused;
    }
    if (hasHint(statusHints, DOCKED_HINTS)) {
      return RvcOperationalState.OperationalState.Docked;
    }
    if (hasHint(statusHints, ERROR_HINTS)) {
      return RvcOperationalState.OperationalState.Error;
    }

    const state = entity.state as VacuumState | "unavailable";
    switch (state) {
      case VacuumState.docked:
        return RvcOperationalState.OperationalState.Docked;
      case VacuumState.returning:
        return RvcOperationalState.OperationalState.SeekingCharger;
      case VacuumState.cleaning:
        return RvcOperationalState.OperationalState.Running;
      case VacuumState.paused:
      case VacuumState.idle:
        return RvcOperationalState.OperationalState.Paused;
      default:
        return RvcOperationalState.OperationalState.Error;
    }
  },
  pause: (_, agent) => {
    const supportedFeatures =
      agent.get(HomeAssistantEntityBehavior).entity.state.attributes
        .supported_features ?? 0;
    if (testBit(supportedFeatures, VacuumDeviceFeature.PAUSE)) {
      return { action: "vacuum.pause" };
    }
    return { action: "vacuum.stop" };
  },
  resume: (_, agent) => resolveVacuumStartAction(agent),
});

function hasHint(values: string[], hints: readonly string[]): boolean {
  return values.some((value) =>
    hints.some((hint) => value === hint || value.includes(hint)),
  );
}

function collectOperationalStateHints(
  entityState: unknown,
  attributes: Record<string, unknown>,
): string[] {
  const hints = new Set<string>();

  const add = (value: unknown) => {
    const normalized = normalizeHint(value);
    if (normalized != null) {
      hints.add(normalized);
    }
  };

  add(entityState);

  const vacuumAttributes = attributes as VacuumDeviceAttributes & Record<string, unknown>;
  add(vacuumAttributes.status);

  add(attributes.state);
  add(attributes.activity);
  add(attributes.operation);
  add(attributes.task_status);
  add(attributes.cleaning_state);
  add(attributes.cleaning_mode);
  add(attributes.dock_state);
  add(attributes.charging_state);
  add(attributes.working_state);
  add(attributes.status_description);

  return [...hints];
}

function normalizeHint(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return normalized.length > 0 ? normalized : undefined;
}
