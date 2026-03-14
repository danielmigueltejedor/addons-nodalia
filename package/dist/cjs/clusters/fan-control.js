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
var fan_control_exports = {};
__export(fan_control_exports, {
  FanControl: () => FanControl,
  FanControlCluster: () => FanControlCluster
});
module.exports = __toCommonJS(fan_control_exports);
var import_MutableCluster = require("../cluster/mutation/MutableCluster.js");
var import_Cluster = require("../cluster/Cluster.js");
var import_TlvNumber = require("../tlv/TlvNumber.js");
var import_TlvNullable = require("../tlv/TlvNullable.js");
var import_BitmapSchema = require("../schema/BitmapSchema.js");
var import_TlvObject = require("../tlv/TlvObject.js");
var import_TlvBoolean = require("../tlv/TlvBoolean.js");
var import_ClusterRegistry = require("../cluster/ClusterRegistry.js");
/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
var FanControl;
((FanControl2) => {
  let Feature;
  ((Feature2) => {
    Feature2["MultiSpeed"] = "MultiSpeed";
    Feature2["Auto"] = "Auto";
    Feature2["Rocking"] = "Rocking";
    Feature2["Wind"] = "Wind";
    Feature2["Step"] = "Step";
    Feature2["AirflowDirection"] = "AirflowDirection";
  })(Feature = FanControl2.Feature || (FanControl2.Feature = {}));
  FanControl2.Rock = {
    /**
     * Indicate rock left to right
     */
    rockLeftRight: (0, import_BitmapSchema.BitFlag)(0),
    /**
     * Indicate rock up and down
     */
    rockUpDown: (0, import_BitmapSchema.BitFlag)(1),
    /**
     * Indicate rock around
     */
    rockRound: (0, import_BitmapSchema.BitFlag)(2)
  };
  FanControl2.Wind = {
    /**
     * Indicate sleep wind
     *
     * The fan speed, based on current settings, shall gradually slow down to a final minimum speed. For this
     * process, the sequence, speeds and duration are MS.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 4.4.5.2.1
     */
    sleepWind: (0, import_BitmapSchema.BitFlag)(0),
    /**
     * Indicate natural wind
     *
     * The fan speed shall vary to emulate natural wind. For this setting, the sequence, speeds and duration are MS.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 4.4.5.2.2
     */
    naturalWind: (0, import_BitmapSchema.BitFlag)(1)
  };
  let AirflowDirection;
  ((AirflowDirection2) => {
    AirflowDirection2[AirflowDirection2["Forward"] = 0] = "Forward";
    AirflowDirection2[AirflowDirection2["Reverse"] = 1] = "Reverse";
  })(AirflowDirection = FanControl2.AirflowDirection || (FanControl2.AirflowDirection = {}));
  let StepDirection;
  ((StepDirection2) => {
    StepDirection2[StepDirection2["Increase"] = 0] = "Increase";
    StepDirection2[StepDirection2["Decrease"] = 1] = "Decrease";
  })(StepDirection = FanControl2.StepDirection || (FanControl2.StepDirection = {}));
  FanControl2.TlvStepRequest = (0, import_TlvObject.TlvObject)({
    /**
     * This field shall indicate whether the speed-oriented attributes increase or decrease to the next step value.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 4.4.7.1.1
     */
    direction: (0, import_TlvObject.TlvField)(0, (0, import_TlvNumber.TlvEnum)()),
    /**
     * This field shall indicate if the speed-oriented attributes wrap between highest and lowest step value.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 4.4.7.1.2
     */
    wrap: (0, import_TlvObject.TlvOptionalField)(1, import_TlvBoolean.TlvBoolean),
    /**
     * This field shall indicate that the fan being off (FanMode = Off, PercentSetting = 0, or SpeedSetting = 0) is
     * included as a step value.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 4.4.7.1.3
     */
    lowestOff: (0, import_TlvObject.TlvOptionalField)(2, import_TlvBoolean.TlvBoolean)
  });
  let FanMode;
  ((FanMode2) => {
    FanMode2[FanMode2["Off"] = 0] = "Off";
    FanMode2[FanMode2["Low"] = 1] = "Low";
    FanMode2[FanMode2["Medium"] = 2] = "Medium";
    FanMode2[FanMode2["High"] = 3] = "High";
    FanMode2[FanMode2["On"] = 4] = "On";
    FanMode2[FanMode2["Auto"] = 5] = "Auto";
    FanMode2[FanMode2["Smart"] = 6] = "Smart";
  })(FanMode = FanControl2.FanMode || (FanControl2.FanMode = {}));
  let FanModeSequence;
  ((FanModeSequence2) => {
    FanModeSequence2[FanModeSequence2["OffLowMedHigh"] = 0] = "OffLowMedHigh";
    FanModeSequence2[FanModeSequence2["OffLowHigh"] = 1] = "OffLowHigh";
    FanModeSequence2[FanModeSequence2["OffLowMedHighAuto"] = 2] = "OffLowMedHighAuto";
    FanModeSequence2[FanModeSequence2["OffLowHighAuto"] = 3] = "OffLowHighAuto";
    FanModeSequence2[FanModeSequence2["OffHighAuto"] = 4] = "OffHighAuto";
    FanModeSequence2[FanModeSequence2["OffHigh"] = 5] = "OffHigh";
  })(FanModeSequence = FanControl2.FanModeSequence || (FanControl2.FanModeSequence = {}));
  FanControl2.MultiSpeedComponent = import_MutableCluster.MutableCluster.Component({
    attributes: {
      /**
       * Indicates the maximum value to which the SpeedSetting attribute can be set.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.5
       */
      speedMax: (0, import_Cluster.FixedAttribute)(4, import_TlvNumber.TlvUInt8.bound({ min: 1, max: 100 })),
      /**
       * Indicates the speed setting for the fan. This attribute may be written by a client to indicate a new fan
       * speed. If the FanMode attribute is set to Auto, the value of this attribute shall be set to null.
       *
       * The server shall support all values between 0 and SpeedMax.
       *
       * If a client writes null to this attribute, the attribute value shall NOT change. If the fan is in a state
       * where this attribute cannot be changed to the requested value, the server shall return INVALID_IN_STATE.
       *
       * When this attribute is successfully written to, the server shall set the value of the FanMode and
       * PercentSetting attributes to values that abide by the mapping requirements listed below.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.6
       */
      speedSetting: (0, import_Cluster.WritableAttribute)(5, (0, import_TlvNullable.TlvNullable)(import_TlvNumber.TlvUInt8)),
      /**
       * Indicates the actual currently operating fan speed, or zero to indicate that the fan is off. There may be
       * a temporary mismatch between the value of this attribute and the value of the SpeedSetting attribute due
       * to other system requirements or constraints that would not allow the fan to operate at the requested
       * setting.
       *
       * For example, if the value of this attribute is currently 5, and the SpeedSetting attribute is newly set
       * to 2, the value of this attribute may stay above 2 for a period necessary to dissipate internal heat,
       * maintain product operational safety, etc.
       *
       * When the value of the FanMode attribute is AUTO, the value of this attribute may vary across the range
       * over time.
       *
       * See Section 4.4.6.6.1, “Speed Rules” for more details.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.7
       */
      speedCurrent: (0, import_Cluster.Attribute)(6, import_TlvNumber.TlvUInt8)
    }
  });
  FanControl2.RockingComponent = import_MutableCluster.MutableCluster.Component({
    attributes: {
      /**
       * This attribute is a bitmap that indicates the rocking motions that are supported by the server.
       *
       * If this attribute is supported by the server, at least one bit shall be set in this attribute.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.8
       */
      rockSupport: (0, import_Cluster.FixedAttribute)(7, (0, import_TlvNumber.TlvBitmap)(import_TlvNumber.TlvUInt8, FanControl2.Rock)),
      /**
       * This attribute is a bitmap that indicates the currently active fan rocking motion setting. Each bit shall
       * only be set to 1, if the corresponding bit in the RockSupport attribute is set to 1, otherwise a status
       * code of CONSTRAINT_ERROR shall be returned.
       *
       * If a combination of supported bits is set by a client, and the server does not support the combination,
       * the lowest supported single bit in the combination shall be set and active, and all other bits shall
       * indicate zero.
       *
       * For example: If RockUpDown and RockRound are both set, but this combination is not possible, then only
       * RockUpDown becomes active.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.9
       */
      rockSetting: (0, import_Cluster.WritableAttribute)(8, (0, import_TlvNumber.TlvBitmap)(import_TlvNumber.TlvUInt8, FanControl2.Rock))
    }
  });
  FanControl2.WindComponent = import_MutableCluster.MutableCluster.Component({
    attributes: {
      /**
       * This attribute is a bitmap that indicates what wind modes are supported by the server.
       *
       * If this attribute is supported by the server, at least one bit shall be set in this attribute.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.10
       */
      windSupport: (0, import_Cluster.FixedAttribute)(9, (0, import_TlvNumber.TlvBitmap)(import_TlvNumber.TlvUInt8, FanControl2.Wind)),
      /**
       * This attribute is a bitmap that indicates the current active fan wind feature settings. Each bit shall
       * only be set to 1, if the corresponding bit in the WindSupport attribute is set to 1, otherwise a status
       * code of CONSTRAINT_ERROR shall be returned.
       *
       * If a combination of supported bits is set by a client, and the server does not support the combination,
       * the lowest supported single bit in the combination shall be set and active, and all other bits shall
       * indicate zero.
       *
       * For example: If Sleep Wind and Natural Wind are set, but this combination is not possible, then only
       * Sleep Wind becomes active.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.11
       */
      windSetting: (0, import_Cluster.WritableAttribute)(10, (0, import_TlvNumber.TlvBitmap)(import_TlvNumber.TlvUInt8, FanControl2.Wind))
    }
  });
  FanControl2.AirflowDirectionComponent = import_MutableCluster.MutableCluster.Component({
    attributes: {
      /**
       * Indicates the current airflow direction of the fan. This attribute may be written by a client to indicate
       * a new airflow direction for the fan. This attribute shall be set to one of the values in the
       * AirflowDirectionEnum table.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.12
       */
      airflowDirection: (0, import_Cluster.WritableAttribute)(11, (0, import_TlvNumber.TlvEnum)())
    }
  });
  FanControl2.StepComponent = import_MutableCluster.MutableCluster.Component({
    commands: {
      /**
       * This command indirectly changes the speed-oriented attributes of the fan in steps rather than using the
       * speed-oriented attributes, FanMode, PercentSetting, or SpeedSetting, directly. This command supports, for
       * example, a user-operated and wall-mounted toggle switch that can be used to increase or decrease the
       * speed of the fan by pressing the toggle switch up or down until the desired fan speed is reached. How
       * this command is interpreted by the server and how it affects the values of the speed-oriented attributes
       * is implementation specific.
       *
       * For example, a fan supports this command, and the value of the FanModeSequence attribute is 0. The
       * current value of the FanMode attribute is 2, or Medium. This command is received with the Direction field
       * set to Increase. As per it’s specific implementation, the server reacts to the command by setting the
       * value of the FanMode attribute to 3, or High, which in turn sets the PercentSetting and SpeedSetting (if
       * present) attributes to appropriate values, as defined by Section 4.4.6.3.1, “Percent Rules” and Section
       * 4.4.6.6.1, “Speed Rules” respectively.
       *
       * This command supports these fields:
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.7.1
       */
      step: (0, import_Cluster.Command)(0, FanControl2.TlvStepRequest, 0, import_Cluster.TlvNoResponse)
    }
  });
  FanControl2.Base = import_MutableCluster.MutableCluster.Component({
    id: 514,
    name: "FanControl",
    revision: 5,
    features: {
      /**
       * Legacy Fan Control cluster revision 0-1 defined 3 speeds (low, medium and high) plus automatic speed
       * control but left it up to the implementer to decide what was supported. Therefore, it is assumed that
       * legacy client implementations are capable of determining, from the server, the number of speeds supported
       * between 1, 2, or 3, and whether automatic speed control is supported.
       *
       * The MultiSpeed feature includes attributes that support a running fan speed value from 0 to SpeedMax.
       *
       * See Section 4.4.6.6.1, “Speed Rules” for more details.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.4.1
       */
      multiSpeed: (0, import_BitmapSchema.BitFlag)(0),
      /**
       * Automatic mode supported for fan speed
       */
      auto: (0, import_BitmapSchema.BitFlag)(1),
      /**
       * Rocking movement supported
       */
      rocking: (0, import_BitmapSchema.BitFlag)(2),
      /**
       * Wind emulation supported
       */
      wind: (0, import_BitmapSchema.BitFlag)(3),
      /**
       * Step command supported
       */
      step: (0, import_BitmapSchema.BitFlag)(4),
      /**
       * Airflow Direction attribute is supported
       */
      airflowDirection: (0, import_BitmapSchema.BitFlag)(5)
    },
    attributes: {
      /**
       * Indicates the current speed mode of the fan.
       *
       * This attribute shall be set to one of the values in FanModeEnum supported by the server as indicated in
       * the FanModeSequence attribute. The Low value shall be supported if and only if the FanModeSequence
       * attribute value is less than 4. The Medium value shall be supported if and only if the FanModeSequence
       * attribute value is 0 or 2.
       *
       * This attribute may be written by a client to request a different fan mode. The server shall return
       * INVALID_IN_STATE to indicate that the fan is not in a state where this attribute can be changed to the
       * requested value.
       *
       * The server may have values that this attribute can never be set to or that will be ignored bytheserver.
       * For example, where this cluster appears on the same or another endpoint as other clusters with a system
       * dependency, for example the Thermostat cluster, attempting to set this attribute to Off may not be
       * allowed by the system.
       *
       * If an attempt is made to set this attribute to a value not supported by the server as indicated in the
       * FanModeSequence attribute, the server shall respond with CONSTRAINT_ERROR.
       *
       * When this attribute is successfully written to, the PercentSetting and SpeedSetting (if present)
       * attributes shall be set to appropriate values, as defined by Section 4.4.6.3.1, “Percent Rules” and
       * Section 4.4.6.6.1, “Speed Rules” respectively, unless otherwise specified below.
       *
       * When this attribute is set to any valid value, the PercentCurrent and SpeedCurrent (if present)
       * attributes shall indicate the actual currently operating fan speed, unless otherwise specified below.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.1
       */
      fanMode: (0, import_Cluster.WritableAttribute)(0, (0, import_TlvNumber.TlvEnum)(), { persistent: true }),
      /**
       * This attribute indicates the fan speed ranges that shall be supported by the server.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.2
       */
      fanModeSequence: (0, import_Cluster.FixedAttribute)(1, (0, import_TlvNumber.TlvEnum)()),
      /**
       * Indicates the speed setting for the fan with a value of 0 indicating that the fan is off and a value of
       * 100 indicating that the fan is set to run at its maximum speed. If the FanMode attribute is set to Auto,
       * the value of this attribute shall be set to null.
       *
       * This attribute may be written to by a client to indicate a new fan speed. If a client writes null to this
       * attribute, the attribute value shall NOT change. If the fan is in a state where this attribute cannot be
       * changed to the requested value, the server shall return INVALID_IN_STATE.
       *
       * When this attribute is successfully written, the server shall set the value of the FanMode and
       * SpeedSetting (if present) attributes to values that abide by the mapping requirements listed below.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.3
       */
      percentSetting: (0, import_Cluster.WritableAttribute)(2, (0, import_TlvNullable.TlvNullable)(import_TlvNumber.TlvPercent)),
      /**
       * Indicates the actual currently operating fan speed, or zero to indicate that the fan is off. There may be
       * a temporary mismatch between the value of this attribute and the value of the PercentSetting attribute
       * due to other system requirements or constraints that would not allow the fan to operate at the requested
       * setting.
       *
       * For example, if the value of this attribute is currently 50%, and the PercentSetting attribute is newly
       * set to 25%, the value of this attribute may stay above 25% for a period necessary to dissipate internal
       * heat, maintain product operational safety, etc.
       *
       * When the value of the FanMode attribute is AUTO, the value of this attribute may vary across the range
       * over time.
       *
       * See Section 4.4.6.3.1, “Percent Rules” for more details.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 4.4.6.4
       */
      percentCurrent: (0, import_Cluster.Attribute)(3, import_TlvNumber.TlvPercent)
    },
    /**
     * This metadata controls which FanControlCluster elements matter.js activates for specific feature
     * combinations.
     */
    extensions: import_MutableCluster.MutableCluster.Extensions(
      { flags: { multiSpeed: true }, component: FanControl2.MultiSpeedComponent },
      { flags: { rocking: true }, component: FanControl2.RockingComponent },
      { flags: { wind: true }, component: FanControl2.WindComponent },
      { flags: { airflowDirection: true }, component: FanControl2.AirflowDirectionComponent },
      { flags: { step: true }, component: FanControl2.StepComponent }
    )
  });
  FanControl2.ClusterInstance = (0, import_MutableCluster.MutableCluster)(FanControl2.Base);
  FanControl2.Cluster = FanControl2.ClusterInstance;
  const SPD = { multiSpeed: true };
  const RCK = { rocking: true };
  const WND = { wind: true };
  const DIR = { airflowDirection: true };
  const STEP = { step: true };
  FanControl2.CompleteInstance = (0, import_MutableCluster.MutableCluster)({
    id: FanControl2.Cluster.id,
    name: FanControl2.Cluster.name,
    revision: FanControl2.Cluster.revision,
    features: FanControl2.Cluster.features,
    attributes: {
      ...FanControl2.Cluster.attributes,
      speedMax: import_MutableCluster.MutableCluster.AsConditional(FanControl2.MultiSpeedComponent.attributes.speedMax, { mandatoryIf: [SPD] }),
      speedSetting: import_MutableCluster.MutableCluster.AsConditional(
        FanControl2.MultiSpeedComponent.attributes.speedSetting,
        { mandatoryIf: [SPD] }
      ),
      speedCurrent: import_MutableCluster.MutableCluster.AsConditional(
        FanControl2.MultiSpeedComponent.attributes.speedCurrent,
        { mandatoryIf: [SPD] }
      ),
      rockSupport: import_MutableCluster.MutableCluster.AsConditional(FanControl2.RockingComponent.attributes.rockSupport, { mandatoryIf: [RCK] }),
      rockSetting: import_MutableCluster.MutableCluster.AsConditional(FanControl2.RockingComponent.attributes.rockSetting, { mandatoryIf: [RCK] }),
      windSupport: import_MutableCluster.MutableCluster.AsConditional(FanControl2.WindComponent.attributes.windSupport, { mandatoryIf: [WND] }),
      windSetting: import_MutableCluster.MutableCluster.AsConditional(FanControl2.WindComponent.attributes.windSetting, { mandatoryIf: [WND] }),
      airflowDirection: import_MutableCluster.MutableCluster.AsConditional(
        FanControl2.AirflowDirectionComponent.attributes.airflowDirection,
        { mandatoryIf: [DIR] }
      )
    },
    commands: { step: import_MutableCluster.MutableCluster.AsConditional(FanControl2.StepComponent.commands.step, { mandatoryIf: [STEP] }) }
  });
  FanControl2.Complete = FanControl2.CompleteInstance;
})(FanControl || (FanControl = {}));
const FanControlCluster = FanControl.Cluster;
import_ClusterRegistry.ClusterRegistry.register(FanControl.Complete);
//# sourceMappingURL=fan-control.js.map
