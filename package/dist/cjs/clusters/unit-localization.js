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
var unit_localization_exports = {};
__export(unit_localization_exports, {
  UnitLocalization: () => UnitLocalization,
  UnitLocalizationCluster: () => UnitLocalizationCluster
});
module.exports = __toCommonJS(unit_localization_exports);
var import_MutableCluster = require("../cluster/mutation/MutableCluster.js");
var import_Cluster = require("../cluster/Cluster.js");
var import_TlvNumber = require("../tlv/TlvNumber.js");
var import_model = require("#model");
var import_TlvArray = require("../tlv/TlvArray.js");
var import_BitmapSchema = require("../schema/BitmapSchema.js");
var import_ClusterRegistry = require("../cluster/ClusterRegistry.js");
/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
var UnitLocalization;
((UnitLocalization2) => {
  let Feature;
  ((Feature2) => {
    Feature2["TemperatureUnit"] = "TemperatureUnit";
  })(Feature = UnitLocalization2.Feature || (UnitLocalization2.Feature = {}));
  let TempUnit;
  ((TempUnit2) => {
    TempUnit2[TempUnit2["Fahrenheit"] = 0] = "Fahrenheit";
    TempUnit2[TempUnit2["Celsius"] = 1] = "Celsius";
    TempUnit2[TempUnit2["Kelvin"] = 2] = "Kelvin";
  })(TempUnit = UnitLocalization2.TempUnit || (UnitLocalization2.TempUnit = {}));
  UnitLocalization2.TemperatureUnitComponent = import_MutableCluster.MutableCluster.Component({
    attributes: {
      /**
       * Indicates the unit for the Node to use only when conveying temperature in communication to the user, for
       * example such as via a user interface on the device. If provided, this value shall take priority over any
       * unit implied through the ActiveLocale Attribute.
       *
       * An attempt to write to this attribute with a value not included in the SupportedTemperatureUnits
       * attribute list shall result in a CONSTRAINT_ERROR.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.5.6.1
       */
      temperatureUnit: (0, import_Cluster.WritableAttribute)(
        0,
        (0, import_TlvNumber.TlvEnum)(),
        { persistent: true, writeAcl: import_model.AccessLevel.Manage }
      ),
      /**
       * Indicates a list of units supported by the Node to be used when writing the TemperatureUnit attribute of
       * this cluster. Each entry in the list shall be unique.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.5.6.2
       */
      supportedTemperatureUnits: (0, import_Cluster.FixedAttribute)(
        1,
        (0, import_TlvArray.TlvArray)((0, import_TlvNumber.TlvEnum)(), { minLength: 2, maxLength: 3 })
      )
    }
  });
  UnitLocalization2.Base = import_MutableCluster.MutableCluster.Component({
    id: 45,
    name: "UnitLocalization",
    revision: 2,
    features: {
      /**
       * The Node can be configured to use different units of temperature when conveying values to a user.
       */
      temperatureUnit: (0, import_BitmapSchema.BitFlag)(0)
    },
    /**
     * This metadata controls which UnitLocalizationCluster elements matter.js activates for specific feature
     * combinations.
     */
    extensions: import_MutableCluster.MutableCluster.Extensions({ flags: { temperatureUnit: true }, component: UnitLocalization2.TemperatureUnitComponent })
  });
  UnitLocalization2.ClusterInstance = (0, import_MutableCluster.MutableCluster)(UnitLocalization2.Base);
  UnitLocalization2.Cluster = UnitLocalization2.ClusterInstance;
  const TEMP = { temperatureUnit: true };
  UnitLocalization2.CompleteInstance = (0, import_MutableCluster.MutableCluster)({
    id: UnitLocalization2.Cluster.id,
    name: UnitLocalization2.Cluster.name,
    revision: UnitLocalization2.Cluster.revision,
    features: UnitLocalization2.Cluster.features,
    attributes: {
      temperatureUnit: import_MutableCluster.MutableCluster.AsConditional(
        UnitLocalization2.TemperatureUnitComponent.attributes.temperatureUnit,
        { mandatoryIf: [TEMP] }
      ),
      supportedTemperatureUnits: import_MutableCluster.MutableCluster.AsConditional(
        UnitLocalization2.TemperatureUnitComponent.attributes.supportedTemperatureUnits,
        { mandatoryIf: [TEMP] }
      )
    }
  });
  UnitLocalization2.Complete = UnitLocalization2.CompleteInstance;
})(UnitLocalization || (UnitLocalization = {}));
const UnitLocalizationCluster = UnitLocalization.Cluster;
import_ClusterRegistry.ClusterRegistry.register(UnitLocalization.Complete);
//# sourceMappingURL=unit-localization.js.map
