"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var TlvOfModel_exports = {};
__export(TlvOfModel_exports, {
  TlvOfModel: () => TlvOfModel
});
module.exports = __toCommonJS(TlvOfModel_exports);
var import_ModelBounds = require("#common/ModelBounds.js");
var import_AttributeId = require("#datatype/AttributeId.js");
var import_ClusterId = require("#datatype/ClusterId.js");
var import_CommandId = require("#datatype/CommandId.js");
var import_DeviceTypeId = require("#datatype/DeviceTypeId.js");
var import_EndpointNumber = require("#datatype/EndpointNumber.js");
var import_EventId = require("#datatype/EventId.js");
var import_FabricId = require("#datatype/FabricId.js");
var import_FabricIndex = require("#datatype/FabricIndex.js");
var import_GroupId = require("#datatype/GroupId.js");
var import_NodeId = require("#datatype/NodeId.js");
var import_SubjectId = require("#datatype/SubjectId.js");
var import_VendorId = require("#datatype/VendorId.js");
var import_general = require("#general");
var import_model = require("#model");
var import_BitmapSchema = require("#schema/BitmapSchema.js");
var import_TlvAny = require("./TlvAny.js");
var import_TlvArray = require("./TlvArray.js");
var import_TlvBoolean = require("./TlvBoolean.js");
var import_TlvNullable = require("./TlvNullable.js");
var import_TlvNumber = require("./TlvNumber.js");
var import_TlvObject = require("./TlvObject.js");
var import_TlvString = require("./TlvString.js");
/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
const cache = /* @__PURE__ */ new WeakMap();
function TlvOfModel(model) {
  let tlv = cache.get(model);
  if (tlv === void 0) {
    tlv = generateTlv(model);
    cache.set(model, tlv);
  }
  return tlv;
}
const NumberMapping = {
  // Signed int
  [import_model.int8.name]: import_TlvNumber.TlvInt8,
  [import_model.int16.name]: import_TlvNumber.TlvInt16,
  [import_model.int32.name]: import_TlvNumber.TlvInt32,
  [import_model.int64.name]: import_TlvNumber.TlvInt64,
  // Unsigned int
  [import_model.uint8.name]: import_TlvNumber.TlvUInt8,
  [import_model.uint16.name]: import_TlvNumber.TlvUInt16,
  [import_model.uint32.name]: import_TlvNumber.TlvUInt32,
  [import_model.uint64.name]: import_TlvNumber.TlvUInt64,
  // Bitmap
  [import_model.map8.name]: import_TlvNumber.TlvUInt8,
  [import_model.map16.name]: import_TlvNumber.TlvUInt16,
  [import_model.map32.name]: import_TlvNumber.TlvUInt32,
  // ID
  [import_model.attribId.name]: import_AttributeId.TlvAttributeId,
  [import_model.clusterId.name]: import_ClusterId.TlvClusterId,
  [import_model.commandId.name]: import_CommandId.TlvCommandId,
  [import_model.devtypeId.name]: import_DeviceTypeId.TlvDeviceTypeId,
  [import_model.endpointNo.name]: import_EndpointNumber.TlvEndpointNumber,
  [import_model.eventId.name]: import_EventId.TlvEventId,
  [import_model.fabricId.name]: import_FabricId.TlvFabricId,
  [import_model.fabricIdx.name]: import_FabricIndex.TlvFabricIndex,
  [import_model.groupId.name]: import_GroupId.TlvGroupId,
  [import_model.nodeId.name]: import_NodeId.TlvNodeId,
  [import_model.subjectId.name]: import_SubjectId.TlvSubjectId,
  [import_model.vendorId.name]: import_VendorId.TlvVendorId,
  // Percent
  [import_model.percent.name]: import_TlvNumber.TlvPercent,
  [import_model.percent100ths.name]: import_TlvNumber.TlvPercent100ths,
  // Time
  [import_model.epochUs.name]: import_TlvNumber.TlvEpochUs,
  [import_model.epochS.name]: import_TlvNumber.TlvEpochS,
  [import_model.posixMs.name]: import_TlvNumber.TlvPosixMs,
  [import_model.systimeUs.name]: import_TlvNumber.TlvSysTimeUs,
  [import_model.systimeMs.name]: import_TlvNumber.TlvSysTimeMS
  // The following are defined in the specification but we don't support them so they're apparently unused
  //[int24.name]: TlvInt24,
  //[int40.name]: TlvInt40,
  //[int48.name]: TlvInt48,
  //[uint24.name]: TlvInt24,
  //[uint40.name]: TlvInt40,
  //[uint48.name]: TlvInt48,
  //[map64.name]: TlvUInt64,
};
function generateTlv(model) {
  const metatype = model.effectiveMetatype;
  if (metatype === import_model.Metatype.object) {
    return generateStruct(model);
  }
  if (!(model instanceof import_model.ValueModel)) {
    throw new import_general.InternalError(`Inappropriate use of ${model.tag} model as datatype`);
  }
  let tlv;
  const metabase = model.metabase;
  if (metabase === void 0) {
    throw new import_general.InternalError(`No metabase for model ${model.name}`);
  }
  switch (metatype) {
    case import_model.Metatype.any:
      tlv = import_TlvAny.TlvAny;
      break;
    case import_model.Metatype.boolean:
      tlv = import_TlvBoolean.TlvBoolean;
      break;
    case import_model.Metatype.bitmap:
      tlv = generateBitmap(model);
      break;
    case import_model.Metatype.array:
      tlv = generateList(model);
      break;
    case import_model.Metatype.bytes:
      tlv = generateString(import_TlvString.TlvByteString, model);
      break;
    case import_model.Metatype.string:
      tlv = generateString(import_TlvString.TlvString, model);
      break;
    case import_model.Metatype.enum:
      tlv = (0, import_TlvNumber.TlvEnum)();
      break;
    case import_model.Metatype.float:
      if (metabase.name === "single") {
        tlv = import_TlvNumber.TlvFloat;
      } else {
        tlv = import_TlvNumber.TlvDouble;
      }
      break;
    case import_model.Metatype.integer:
      tlv = generateInteger(model);
      break;
    default:
      throw new import_general.InternalError(`No TLV mapping for model ${model.name}`);
  }
  if (model.quality.nullable) {
    tlv = (0, import_TlvNullable.TlvNullable)(tlv);
  }
  return tlv;
}
function generateStruct(model) {
  const entries = model.conformant.properties.map((p) => [(0, import_general.camelize)(p.name), TlvOfModel(model)]);
  const fields = Object.fromEntries(entries);
  return (0, import_TlvObject.TlvObject)(fields);
}
function generateBitmap(model) {
  const { fields } = model.conformant;
  if (!fields.length) {
    return primitiveFallbackOf(model);
  }
  const entries = fields.map((field) => {
    const name = (0, import_general.camelize)(field.name);
    const { constraint } = field;
    if (typeof constraint.value === "number") {
      return [name, (0, import_BitmapSchema.BitFlag)(constraint.value)];
    }
    if (typeof constraint.min === "number" && typeof constraint.max === "number") {
      return [name, (0, import_BitmapSchema.BitField)(constraint.min, constraint.max - constraint.min + 1)];
    }
    throw new import_general.ImplementationError(`Bit field ${field.path} is not properly constrained`);
  });
  const metabaseName = model.metabase?.name;
  const num = metabaseName ? NumberMapping[metabaseName] : void 0;
  if (!num) {
    throw new import_general.ImplementationError(`Could not determine numeric type for bitmap ${model.path} type "${model.type}"`);
  }
  return (0, import_TlvNumber.TlvBitmap)(num, Object.fromEntries(entries));
}
function generateList(model) {
  const entry = model.conformant.fields.for("entry");
  const bounds = import_ModelBounds.ModelBounds.createLengthBounds(model);
  if (entry === void 0) {
    return (0, import_TlvArray.TlvArray)(import_TlvAny.TlvAny, bounds);
  }
  return (0, import_TlvArray.TlvArray)(TlvOfModel(model), bounds);
}
function generateString(base, model) {
  const bounds = import_ModelBounds.ModelBounds.createLengthBounds(model);
  if (bounds) {
    return base.bound(bounds);
  }
  return base;
}
function generateInteger(model) {
  const base = model.metabase;
  if (base === void 0) {
    throw new import_general.InternalError(`No metabase for model ${model.path} type ${model.type}`);
  }
  const tlv = NumberMapping[base.name];
  if (tlv === void 0) {
    throw new import_general.InternalError(`No mapping for model ${model.path} metabase ${base.name}`);
  }
  if ("bound" in tlv) {
    const bounds = import_ModelBounds.ModelBounds.createNumberBounds(model);
    if (bounds) {
      return tlv.bound(bounds);
    }
  }
  return tlv;
}
function primitiveFallbackOf(model) {
  const primitive = model.metabase?.primitiveBase;
  if (primitive === void 0) {
    throw new import_general.ImplementationError(`Could not determine primitive base for ${model.path}`);
  }
  return TlvOfModel(primitive);
}
//# sourceMappingURL=TlvOfModel.js.map
