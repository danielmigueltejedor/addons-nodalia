/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { MutableCluster } from "../cluster/mutation/MutableCluster.js";
import {
  FabricScopedAttribute,
  Attribute,
  FixedAttribute,
  Command,
  TlvNoResponse,
  OptionalFixedAttribute,
  OptionalCommand
} from "../cluster/Cluster.js";
import { TlvArray } from "../tlv/TlvArray.js";
import { TlvField, TlvObject, TlvOptionalField } from "../tlv/TlvObject.js";
import { TlvNodeId } from "../datatype/NodeId.js";
import { TlvSubjectId } from "../datatype/SubjectId.js";
import { TlvEnum, TlvUInt32, TlvUInt16, TlvBitmap } from "../tlv/TlvNumber.js";
import { TlvFabricIndex } from "../datatype/FabricIndex.js";
import { AccessLevel } from "#model";
import { TlvByteString, TlvString } from "../tlv/TlvString.js";
import { BitFlag } from "../schema/BitmapSchema.js";
import { ClusterRegistry } from "../cluster/ClusterRegistry.js";
var IcdManagement;
((IcdManagement2) => {
  let Feature;
  ((Feature2) => {
    Feature2["CheckInProtocolSupport"] = "CheckInProtocolSupport";
    Feature2["UserActiveModeTrigger"] = "UserActiveModeTrigger";
    Feature2["LongIdleTimeSupport"] = "LongIdleTimeSupport";
    Feature2["DynamicSitLitSupport"] = "DynamicSitLitSupport";
  })(Feature = IcdManagement2.Feature || (IcdManagement2.Feature = {}));
  let ClientType;
  ((ClientType2) => {
    ClientType2[ClientType2["Permanent"] = 0] = "Permanent";
    ClientType2[ClientType2["Ephemeral"] = 1] = "Ephemeral";
  })(ClientType = IcdManagement2.ClientType || (IcdManagement2.ClientType = {}));
  IcdManagement2.TlvMonitoringRegistration = TlvObject({
    /**
     * This field shall indicate the NodeID of the Node to which Check-In messages will be sent when the
     * MonitoredSubject is not subscribed.
     *
     * @see {@link MatterSpecification.v142.Core} § 9.16.5.3.1
     */
    checkInNodeId: TlvField(1, TlvNodeId),
    /**
     * This field shall indicate the monitored Subject ID. This field shall be used to determine if a particular
     * client has an active subscription for the given entry. The MonitoredSubject, when it is a NodeID, may be the
     * same as the CheckInNodeID. The MonitoredSubject gives the registering client the flexibility of having a
     * different CheckInNodeID from the MonitoredSubject. A subscription shall count as an active subscription for
     * this entry if:
     *
     *   - It is on the associated fabric of this entry, and
     *
     *   - The subject of this entry matches the ISD of the SubscriptionRequest message that created the
     *     subscription. Matching shall be determined using the subject_matches function defined in the Access
     *     Control Privilege Granting Algorithm.
     *
     * For example, if the MonitoredSubject is Node ID 0x1111_2222_3333_AAAA, and one of the subscribers to the
     * server on the entry’s associated fabric bears that Node ID, then the entry matches.
     *
     * Another example is if the MonitoredSubject has the value 0xFFFF_FFFD_AA12_0002, and one of the subscribers to
     * the server on the entry’s associated fabric bears the CASE Authenticated TAG value 0xAA12 and the version
     * 0x0002 or higher within its NOC, then the entry matches.
     *
     * @see {@link MatterSpecification.v142.Core} § 9.16.5.3.2
     */
    monitoredSubject: TlvField(2, TlvSubjectId),
    /**
     * This field shall indicate the client’s type to inform the ICD of the availability for communication of the
     * client.
     *
     * @see {@link MatterSpecification.v142.Core} § 9.16.5.3.4
     */
    clientType: TlvField(4, TlvEnum()),
    fabricIndex: TlvField(254, TlvFabricIndex)
  });
  IcdManagement2.TlvRegisterClientRequest = TlvObject({
    /**
     * This field shall provide the node ID to which a Check-In message will be sent if there are no active
     * subscriptions matching MonitoredSubject.
     *
     * @see {@link MatterSpecification.v142.Core} § 9.16.7.1.1
     */
    checkInNodeId: TlvField(0, TlvNodeId),
    /**
     * This field shall provide the monitored subject ID.
     *
     * @see {@link MatterSpecification.v142.Core} § 9.16.7.1.2
     */
    monitoredSubject: TlvField(1, TlvSubjectId),
    /**
     * This field shall contain the ICDToken, a 128-bit symmetric key shared by the ICD and the ICD Client, used to
     * encrypt Check-In messages from this ICD to the MonitoredSubject.
     *
     * @see {@link MatterSpecification.v142.Core} § 9.16.7.1.3
     */
    key: TlvField(2, TlvByteString.bound({ length: 16 })),
    /**
     * This field shall provide the verification key. The verification key represents the key already stored on the
     * server. The verification key provided in this field shall be used by the server to guarantee that a client
     * with manage permissions can only modify entries that contain a Key equal to the verification key. The
     * verification key shall be provided for clients with manage permissions. The verification key SHOULD NOT be
     * provided by clients with administrator permissions for theservercluster. The verification key shall be
     * ignored by the server if it is provided by a client with administrator permissions for the server cluster.
     *
     * @see {@link MatterSpecification.v142.Core} § 9.16.7.1.4
     */
    verificationKey: TlvOptionalField(3, TlvByteString.bound({ length: 16 })),
    /**
     * This field shall provide the client type of the client registering.
     *
     * ### Effect on Receipt
     *
     * On receipt of the RegisterClient command, the server shall perform the following procedure:
     *
     *   1. The server verifies that an entry for the fabric is available in the server’s list of registered
     *      clients.
     *
     *     a. If one of the entries in storage for the fabric has the same CheckInNodeID as the received
     *        CheckInNodeID, the server shall continue from step 2.
     *
     *     b. If there is an available entry for the fabric, an entry is created for the fabric and the received
     *        CheckInNodeID, MonitoredSubject, Key and ClientType are stored. The server shall continue from step 5.
     *
     *     c. If there are no available entries for the fabric, the status shall be RESOURCE_EXHAUSTED and the
     *        server shall continue from step 6.
     *
     *   2. The server shall verify the privileges of the command’s ISD.
     *
     *     a. If the ISD of the command has administrator privileges for the server cluster, the server shall
     *        continue from step 4.
     *
     *     b. If the ISD of the command does not have administrator privileges for the server cluster, the server
     *        shall continue from step 3.
     *
     *   3. The server shall verify that the received verification key is equal to the key previously stored in the
     *      list of registered clients with the matching CheckInNodeID.
     *
     *     a. If the verification key does not have a valid value, the status shall be FAILURE. the server shall
     *        continue from step 6.
     *
     *     b. If the verification key is not equal to the Key value stored in the entry, the status shall be
     *        FAILURE. The server shall continue from step 6.
     *
     *     c. If the verification key is equal to the Key value stored in the entry, the server shall continue from
     *        step 4.
     *
     *   4. The entry shall be updated with the received CheckInNodeID, MonitoredSubject, Key and ClientType.
     *
     *     a. If the update fails, the status shall be FAILURE. The server shall continue from step 6.
     *
     *     b. If the update succeeds, the server shall continue from step 5.
     *
     *   5. The server shall persist the client information.
     *
     *     a. If the persistence fails, the status shall be FAILURE and the server shall continue from step 6.
     *
     *     b. If the persistence succeeds, the status shall be SUCCESS and the server shall continue from step 6.
     *
     *   6. The server shall generate a response.
     *
     *     a. If the status is SUCCESS, the server shall generate a RegisterClientResponse command.
     *
     *     b. If the status is not SUCCESS, the server shall generate a default response with the Status field set
     *        to the evaluated error status.
     *
     * @see {@link MatterSpecification.v142.Core} § 9.16.7.1.5
     */
    clientType: TlvField(4, TlvEnum())
  });
  IcdManagement2.TlvRegisterClientResponse = TlvObject({ icdCounter: TlvField(0, TlvUInt32) });
  IcdManagement2.TlvUnregisterClientRequest = TlvObject({
    /**
     * This field shall provide the registered client node ID to remove from storage.
     *
     * @see {@link MatterSpecification.v142.Core} § 9.16.7.3.1
     */
    checkInNodeId: TlvField(0, TlvNodeId),
    /**
     * This field shall provide the verification key associated with the CheckInNodeID to removefromstorage. The
     * verification key represents the key already stored on the server. The verification key provided in this field
     * shall be used by the server to guarantee that a client with manage permissions can only remove entries that
     * contain a Key equal to the stored key. The verification key shall be provided for clients with manage
     * permissions. The verification key SHOULD NOT be provided by clients with administrator permissions for the
     * server cluster. The verification key shall be ignored by the server if it is provided by a client with
     * administrator permissions for the server cluster.
     *
     * ### Effect on Receipt
     *
     * On receipt of the UnregisterClient command, the server shall perform the following procedure:
     *
     *   1. The server shall check whether there is a entry stored on the device for the fabric with the same
     *      CheckInNodeID.
     *
     *     a. If there are no entries stored for the fabric, the status shall be NOT_FOUND. The server shall
     *        continue from step 6.
     *
     *     b. If there is an error when reading from storage, the status shall be FAILURE. The server shall continue
     *        from step 6.
     *
     *     c. If there is at least one entry stored on the server for the fabric, the server shall continue from
     *        step 2.
     *
     *   2. The server shall verify if one of the entries for the fabric has the corresponding CheckInNodeID
     *      received in the command.
     *
     *     a. If no entries have the corresponding CheckInNodeID, the status shall be NOT_FOUND. The server shall
     *        continue from step 6.
     *
     *     b. If an entry has the corresponding CheckInNodeID, the server shall continue to step 3.
     *
     *   3. The server shall check whether the ISD of the command has administrator permissions for the server
     *      cluster.
     *
     *     a. If the ISD of the command has administrator privileges for the server cluster, the server shall
     *        continue from step 5.
     *
     *     b. If the ISD of the command does not have administrator privileges for the server cluster, the server
     *        shall continue from step 4.
     *
     *   4. The server shall verify that the received verification key is equal to the key previously stored in the
     *      list of registered clients with the matching CheckInNodeID.
     *
     *     a. If the verification key does not have a valid value, the status shall be FAILURE. the server shall
     *        continue from step 6.
     *
     *     b. If the verification key is not equal to the Key value stored in the entry, the status shall be
     *        FAILURE. The server shall continue from step 6.
     *
     *     c. If the verification key is equal to the Key value stored in the entry, the server shall continue from
     *        step 5.
     *
     *   5. The server shall delete the entry with the matching CheckInNodeID from storage and will persist the
     *      change.
     *
     *     a. If the removal of the entry fails, the status shall be FAILURE. The server shall continue from step 6.
     *
     *     b. If the removal succeeds, the status shall be SUCCESS and the server shall continue to step 6.
     *
     *   6. The server shall generate a response with the Status field set to the evaluated status.
     *
     * @see {@link MatterSpecification.v142.Core} § 9.16.7.3.2
     */
    verificationKey: TlvOptionalField(1, TlvByteString.bound({ length: 16 }))
  });
  IcdManagement2.UserActiveModeTrigger = {
    /**
     * Power Cycle to transition the device to ActiveMode
     */
    powerCycle: BitFlag(0),
    /**
     * Settings menu on the device informs how to transition the device to ActiveMode
     */
    settingsMenu: BitFlag(1),
    /**
     * Custom Instruction on how to transition the device to ActiveMode
     */
    customInstruction: BitFlag(2),
    /**
     * Device Manual informs how to transition the device to ActiveMode
     */
    deviceManual: BitFlag(3),
    /**
     * Actuate Sensor to transition the device to ActiveMode
     */
    actuateSensor: BitFlag(4),
    /**
     * Actuate Sensor for N seconds to transition the device to ActiveMode
     */
    actuateSensorSeconds: BitFlag(5),
    /**
     * Actuate Sensor N times to transition the device to ActiveMode
     */
    actuateSensorTimes: BitFlag(6),
    /**
     * Actuate Sensor until light blinks to transition the device to ActiveMode
     */
    actuateSensorLightsBlink: BitFlag(7),
    /**
     * Press Reset Button to transition the device to ActiveMode
     */
    resetButton: BitFlag(8),
    /**
     * Press Reset Button until light blinks to transition the device to ActiveMode
     */
    resetButtonLightsBlink: BitFlag(9),
    /**
     * Press Reset Button for N seconds to transition the device to ActiveMode
     */
    resetButtonSeconds: BitFlag(10),
    /**
     * Press Reset Button N times to transition the device to ActiveMode
     */
    resetButtonTimes: BitFlag(11),
    /**
     * Press Setup Button to transition the device to ActiveMode
     */
    setupButton: BitFlag(12),
    /**
     * Press Setup Button for N seconds to transition the device to ActiveMode
     */
    setupButtonSeconds: BitFlag(13),
    /**
     * Press Setup Button until light blinks to transition the device to ActiveMode
     */
    setupButtonLightsBlink: BitFlag(14),
    /**
     * Press Setup Button N times to transition the device to ActiveMode
     */
    setupButtonTimes: BitFlag(15),
    /**
     * Press the N Button to transition the device to ActiveMode
     */
    appDefinedButton: BitFlag(16)
  };
  let OperatingMode;
  ((OperatingMode2) => {
    OperatingMode2[OperatingMode2["Sit"] = 0] = "Sit";
    OperatingMode2[OperatingMode2["Lit"] = 1] = "Lit";
  })(OperatingMode = IcdManagement2.OperatingMode || (IcdManagement2.OperatingMode = {}));
  IcdManagement2.TlvStayActiveRequest = TlvObject({ stayActiveDuration: TlvField(0, TlvUInt32) });
  IcdManagement2.TlvStayActiveResponse = TlvObject({
    /**
     * This field shall provide the actual duration that the ICD server can stay active from the time it receives
     * the StayActiveRequest command.
     *
     * ### Minimum Value for PromisedActiveDuration
     *
     * The minimum value of the PromisedActiveDuration field shall be equal to either 30000 milliseconds or
     * StayActiveDuration (from the received StayActiveRequest command), whichever is smaller.
     *
     * Example scenarios:
     *
     *   - A Client requests an ICD to stay awake for 20000 milliseconds in its StayActiveDuration field. The ICD
     *     responds with 20000 in its PromisedActiveDuration if it can stay active for that duration.
     *
     *   - A Client requests an ICD to stay awake for 35000 milliseconds in its StayActiveDuration field. The ICD
     *     responds with 30000 in its PromisedActiveDuration since it can only stay active for that minimal amount.
     *
     *   - A Client requests an ICD to stay awake for 10000 milliseconds in its StayActiveDuration field, but the
     *     ICD’s remaining active time is 20000 milliseconds. The ICD responds with 20000 milliseconds in its
     *     PromisedActiveDuration field since it intends to stay active that long.
     *
     * @see {@link MatterSpecification.v142.Core} § 9.16.7.5.1
     */
    promisedActiveDuration: TlvField(0, TlvUInt32)
  });
  IcdManagement2.CheckInProtocolSupportComponent = MutableCluster.Component({
    attributes: {
      /**
       * This attribute shall contain all clients registered to receive notification if their subscriptionislost.
       * The maximum number of entries that can be in the list shall be ClientsSupportedPerFabric for each fabric
       * supported on the server, as indicated by the value of the SupportedFabrics attribute in the Operational
       * Credentials cluster.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.6.4
       */
      registeredClients: FabricScopedAttribute(
        3,
        TlvArray(IcdManagement2.TlvMonitoringRegistration),
        { persistent: true, default: [], readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This attribute returns the value of the ICD Counter.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.6.5
       */
      icdCounter: Attribute(
        4,
        TlvUInt32,
        {
          persistent: true,
          omitChanges: true,
          default: 0,
          readAcl: AccessLevel.Administer,
          writeAcl: AccessLevel.Administer
        }
      ),
      /**
       * Indicates the maximum number of entries that the server is able to store for each fabric in the
       * RegisteredClients attribute.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.6.6
       */
      clientsSupportedPerFabric: FixedAttribute(5, TlvUInt16.bound({ min: 1 }), { default: 1 }),
      /**
       * Indicates the maximum time in seconds between two Check-In messages when back-off is active. The
       * MaximumCheckInBackoff shall NOT be smaller than the IdleModeDuration.
       *
       * If the MaximumCheckInBackoff is equal to the IdleModeDuration, it means the ICD does not back-off.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.6.10
       */
      maximumCheckInBackoff: FixedAttribute(9, TlvUInt32.bound({ max: 64800 }), { default: 1 })
    },
    commands: {
      /**
       * This command allows a client to register itself with the ICD to be notified when the device is available
       * for communication.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.7.1
       */
      registerClient: Command(
        0,
        IcdManagement2.TlvRegisterClientRequest,
        1,
        IcdManagement2.TlvRegisterClientResponse,
        { invokeAcl: AccessLevel.Manage }
      ),
      /**
       * This command allows a client to unregister itself with the ICD. Example: a client that is leaving the
       * network (e.g. running on a phone which is leaving the home) can (and should) remove its subscriptions and
       * send this UnregisterClient command before leaving to prevent the burden on the ICD of an absent client.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.7.3
       */
      unregisterClient: Command(
        2,
        IcdManagement2.TlvUnregisterClientRequest,
        2,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Manage }
      )
    }
  });
  IcdManagement2.UserActiveModeTriggerComponent = MutableCluster.Component({
    attributes: {
      /**
       * Indicates which user action(s) will trigger the ICD to switch to Active mode. If the attribute indicates
       * support for a trigger that is dependent on the UserActiveModeTriggerInstruction in the
       * UserActiveModeTriggerHint table, the UserActiveModeTriggerInstruction attribute shall be implemented and
       * shall provide the required information, unless specified otherwise in the requirement column of the
       * UserActiveModeTriggerHint table.
       *
       * ActuateSensorLightsBlink, ResetButtonLightsBlink and SetupButtonLightsBlink (i.e. bits 7, 9 and 14) have
       * a dependency on the UserActiveModeTriggerInstruction attribute but do not require the attribute to be
       * present.
       *
       * An ICD can indicate multiple ways of being put into Active Mode by setting multiple bits in the bitmap at
       * the same time. However, a device shall NOT set more than one bit which has a dependency on the
       * UserActiveModeTriggerInstruction attribute.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.6.7
       */
      userActiveModeTriggerHint: FixedAttribute(6, TlvBitmap(TlvUInt32, IcdManagement2.UserActiveModeTrigger))
    }
  });
  IcdManagement2.LongIdleTimeSupportComponent = MutableCluster.Component({
    attributes: {
      /**
       * Indicates the operating mode of the ICD as specified in the OperatingModeEnum.
       *
       *   - If the ICD is operating as a LIT ICD, OperatingMode shall be LIT.
       *
       *   - If the ICD is operating as a SIT ICD, OperatingMode shall be SIT.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.6.9
       */
      operatingMode: Attribute(8, TlvEnum())
    },
    commands: {
      /**
       * This command allows a client to request that the server stays in active mode for at least a given time
       * duration (in milliseconds) from when this command is received.
       *
       * This StayActiveDuration may be longer than the ActiveModeThreshold value and would, typically, be used by
       * the client to request the server to stay active and responsive for this period to allow a sequence of
       * message exchanges during that period. The client may slightly overestimate the duration it wants the ICD
       * to be active for, in order to account for network delays.
       *
       * ### Effect on Receipt
       *
       * When receiving a StayActiveRequest command, the server shall calculate the maximum PromisedActiveDuration
       * it can remain active as the greater of the following two values:
       *
       *   - StayActiveDuration: Specified in the received command by the client.
       *
       *   - Remaining Active Time: The server’s planned remaining active time based on the ActiveModeThreshold
       *     and its internal resources and power budget.
       *
       * A server may replace StayActiveDuration with Minimum Active Duration in the above calculation.
       *
       * PromisedActiveDuration represents the guaranteed minimum time the server will remain active, taking into
       * account both the requested duration and the server’s capabilities.
       *
       * The ICD shall report the calculated PromisedActiveDuration in a StayActiveResponse message back to the
       * client.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.7.4
       */
      stayActiveRequest: Command(3, IcdManagement2.TlvStayActiveRequest, 4, IcdManagement2.TlvStayActiveResponse)
    }
  });
  IcdManagement2.Base = MutableCluster.Component({
    id: 70,
    name: "IcdManagement",
    revision: 3,
    features: {
      /**
       * When this feature is supported, the device shall support all the associated commands and attributes to
       * properly support the Check-In Protocol.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.4.1
       */
      checkInProtocolSupport: BitFlag(0),
      /**
       * This feature is supported if and only if the device has a user active mode trigger.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.4.2
       */
      userActiveModeTrigger: BitFlag(1),
      /**
       * This feature is supported if and only the device is a Long Idle Time ICD.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.4.3
       */
      longIdleTimeSupport: BitFlag(2),
      /**
       * This feature is supported if and only if the device can switch between SIT and LIT operating modes even
       * if it has a valid registered client. See the dynamic SIT / LIT operating mode switching for more details.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.4.4
       */
      dynamicSitLitSupport: BitFlag(3)
    },
    attributes: {
      /**
       * Indicates the maximum interval in seconds the server can stay in idle mode. The IdleModeDuration shall
       * NOT be smaller than the ActiveModeDuration.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.6.1
       */
      idleModeDuration: FixedAttribute(0, TlvUInt32.bound({ min: 1, max: 64800 }), { default: 1 }),
      /**
       * Indicates the minimum interval in milliseconds the server typically will stay in active mode after
       * initial transition out of idle mode. The ActiveModeDuration does not include the ActiveModeThreshold.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.6.2
       */
      activeModeDuration: FixedAttribute(1, TlvUInt32, { default: 300 }),
      /**
       * Indicates the minimum amount of time in milliseconds the server typically will stay active after network
       * activity when in active mode.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.6.3
       */
      activeModeThreshold: FixedAttribute(2, TlvUInt16, { default: 300 }),
      /**
       * The meaning of the attribute is dependent upon the UserActiveModeTriggerHint attribute value, and the
       * conformance is in indicated in the "dependency" column in UserActiveModeTriggerHint table. The
       * UserActiveModeTriggerInstruction attribute may give additional information on how to transition the
       * device to Active Mode. If the attribute is present, the value shall be encoded as a valid UTF-8 string
       * with a maximum length of 128 bytes. If the UserActiveModeTriggerHint has the ActuateSensorSeconds,
       * ActuateSensorTimes, ResetButtonSeconds, ResetButtonTimes, SetupButtonSeconds or SetupButtonTimes set, the
       * string shall consist solely of an encoding of N as a decimal unsigned integer using the ASCII digits 0-9,
       * and without leading zeros.
       *
       * For example, given UserActiveModeTriggerHint="1024", ResetButtonSeconds is set which indicates "Press
       * Reset Button for N seconds". Therefore, a value of UserActiveModeTriggerInstruction="6" would indicate
       * that N is 6 in that context.
       *
       * When CustomInstruction is set by the UserActiveModeTriggerHint attribute, indicating presence of a custom
       * string, the ICD SHOULD perform localization (translation to user’s preferred language, as indicated in
       * the Device’s currently configured locale). The Custom Instruction option SHOULD NOT be used by an ICD
       * that does not have knowledge of the user’s language preference.
       *
       * When the UserActiveModeTriggerHint key indicates a light to blink (ActuateSensorLightsBlink,
       * ResetButtonLightsBlink or SetupButtonLightsBlink), information on color of light may be made available
       * via the UserActiveModeTriggerInstruction attribute. When using such color indication in the
       * UserActiveModeTriggerInstruction attribute, the string shall consist of exactly 6 hexadecimal digits
       * using the ASCII characters 0-F and encoding the RGB color value as used in HTML encodings.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.6.8
       */
      userActiveModeTriggerInstruction: OptionalFixedAttribute(7, TlvString.bound({ maxLength: 128 }))
    },
    commands: {
      /**
       * This command allows a client to request that the server stays in active mode for at least a given time
       * duration (in milliseconds) from when this command is received.
       *
       * This StayActiveDuration may be longer than the ActiveModeThreshold value and would, typically, be used by
       * the client to request the server to stay active and responsive for this period to allow a sequence of
       * message exchanges during that period. The client may slightly overestimate the duration it wants the ICD
       * to be active for, in order to account for network delays.
       *
       * ### Effect on Receipt
       *
       * When receiving a StayActiveRequest command, the server shall calculate the maximum PromisedActiveDuration
       * it can remain active as the greater of the following two values:
       *
       *   - StayActiveDuration: Specified in the received command by the client.
       *
       *   - Remaining Active Time: The server’s planned remaining active time based on the ActiveModeThreshold
       *     and its internal resources and power budget.
       *
       * A server may replace StayActiveDuration with Minimum Active Duration in the above calculation.
       *
       * PromisedActiveDuration represents the guaranteed minimum time the server will remain active, taking into
       * account both the requested duration and the server’s capabilities.
       *
       * The ICD shall report the calculated PromisedActiveDuration in a StayActiveResponse message back to the
       * client.
       *
       * @see {@link MatterSpecification.v142.Core} § 9.16.7.4
       */
      stayActiveRequest: OptionalCommand(3, IcdManagement2.TlvStayActiveRequest, 4, IcdManagement2.TlvStayActiveResponse)
    },
    /**
     * This metadata controls which IcdManagementCluster elements matter.js activates for specific feature
     * combinations.
     */
    extensions: MutableCluster.Extensions(
      { flags: { checkInProtocolSupport: true }, component: IcdManagement2.CheckInProtocolSupportComponent },
      { flags: { userActiveModeTrigger: true }, component: IcdManagement2.UserActiveModeTriggerComponent },
      { flags: { longIdleTimeSupport: true }, component: IcdManagement2.LongIdleTimeSupportComponent },
      { flags: { longIdleTimeSupport: true, checkInProtocolSupport: false }, component: false },
      { flags: { longIdleTimeSupport: true, userActiveModeTrigger: false }, component: false },
      { flags: { dynamicSitLitSupport: true, longIdleTimeSupport: false }, component: false }
    )
  });
  IcdManagement2.ClusterInstance = MutableCluster(IcdManagement2.Base);
  IcdManagement2.Cluster = IcdManagement2.ClusterInstance;
  const CIP = { checkInProtocolSupport: true };
  const UAT = { userActiveModeTrigger: true };
  const LITS = { longIdleTimeSupport: true };
  IcdManagement2.CompleteInstance = MutableCluster({
    id: IcdManagement2.Cluster.id,
    name: IcdManagement2.Cluster.name,
    revision: IcdManagement2.Cluster.revision,
    features: IcdManagement2.Cluster.features,
    attributes: {
      ...IcdManagement2.Cluster.attributes,
      registeredClients: MutableCluster.AsConditional(
        IcdManagement2.CheckInProtocolSupportComponent.attributes.registeredClients,
        { mandatoryIf: [CIP] }
      ),
      icdCounter: MutableCluster.AsConditional(
        IcdManagement2.CheckInProtocolSupportComponent.attributes.icdCounter,
        { mandatoryIf: [CIP] }
      ),
      clientsSupportedPerFabric: MutableCluster.AsConditional(
        IcdManagement2.CheckInProtocolSupportComponent.attributes.clientsSupportedPerFabric,
        { mandatoryIf: [CIP] }
      ),
      userActiveModeTriggerHint: MutableCluster.AsConditional(
        IcdManagement2.UserActiveModeTriggerComponent.attributes.userActiveModeTriggerHint,
        { mandatoryIf: [UAT] }
      ),
      operatingMode: MutableCluster.AsConditional(
        IcdManagement2.LongIdleTimeSupportComponent.attributes.operatingMode,
        { mandatoryIf: [LITS] }
      ),
      maximumCheckInBackoff: MutableCluster.AsConditional(
        IcdManagement2.CheckInProtocolSupportComponent.attributes.maximumCheckInBackoff,
        { mandatoryIf: [CIP] }
      )
    },
    commands: {
      ...IcdManagement2.Cluster.commands,
      registerClient: MutableCluster.AsConditional(
        IcdManagement2.CheckInProtocolSupportComponent.commands.registerClient,
        { mandatoryIf: [CIP] }
      ),
      unregisterClient: MutableCluster.AsConditional(
        IcdManagement2.CheckInProtocolSupportComponent.commands.unregisterClient,
        { mandatoryIf: [CIP] }
      ),
      stayActiveRequest: MutableCluster.AsConditional(
        IcdManagement2.LongIdleTimeSupportComponent.commands.stayActiveRequest,
        { mandatoryIf: [LITS] }
      )
    }
  });
  IcdManagement2.Complete = IcdManagement2.CompleteInstance;
})(IcdManagement || (IcdManagement = {}));
const IcdManagementCluster = IcdManagement.Cluster;
ClusterRegistry.register(IcdManagement.Complete);
export {
  IcdManagement,
  IcdManagementCluster
};
//# sourceMappingURL=icd-management.js.map
