/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
/*** THIS FILE IS GENERATED, DO NOT EDIT ***/
import { MutableCluster } from "../cluster/mutation/MutableCluster.js";
import { Attribute, Command, OptionalAttribute, OptionalEvent } from "../cluster/Cluster.js";
import { BitFlag } from "../schema/BitmapSchema.js";
import { TypeFromSchema } from "../tlv/TlvSchema.js";
import { Identity } from "#general";
export declare namespace ThreadNetworkDiagnostics {
    /**
     * These are optional features supported by ThreadNetworkDiagnosticsCluster.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.14.4
     */
    enum Feature {
        /**
         * PacketCounts (PKTCNT)
         *
         * Server supports the counts for the number of received and transmitted packets on the Thread interface.
         */
        PacketCounts = "PacketCounts",
        /**
         * ErrorCounts (ERRCNT)
         *
         * Server supports the counts for the number of errors that have occurred during the reception and transmission
         * of packets on the Thread interface.
         */
        ErrorCounts = "ErrorCounts",
        /**
         * MleCounts (MLECNT)
         *
         * Server supports the counts for various MLE layer happenings.
         */
        MleCounts = "MleCounts",
        /**
         * MacCounts (MACCNT)
         *
         * Server supports the counts for various MAC layer happenings.
         */
        MacCounts = "MacCounts"
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.14.5.3
     */
    enum RoutingRole {
        /**
         * Unspecified routing role.
         */
        Unspecified = 0,
        /**
         * The Node does not currently have a role as a result of the Thread interface not currently being configured or
         * operational.
         */
        Unassigned = 1,
        /**
         * The Node acts as a Sleepy End Device with RX-off-when-idle sleepy radio behavior.
         */
        SleepyEndDevice = 2,
        /**
         * The Node acts as an End Device without RX-off-when-idle sleepy radio behavior.
         */
        EndDevice = 3,
        /**
         * The Node acts as an Router Eligible End Device.
         */
        Reed = 4,
        /**
         * The Node acts as a Router Device.
         */
        Router = 5,
        /**
         * The Node acts as a Leader Device.
         */
        Leader = 6
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.14.5.4
     */
    const TlvNeighborTable: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * This field shall specify the IEEE 802.15.4 extended address for the neighboring Node. The uint64 value is
         * composed by taking the 8 octets of the extended address EUI-64 and treating them as a big-endian integer. For
         * example, octet string (in hexadecimal, from first octet to last) 00112233AABBCCDD would lead to a value of
         * 0x00112233AABBCCDD.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.1
         */
        extAddress: import("../tlv/TlvObject.js").FieldType<number | bigint>;
        /**
         * This field shall specify the duration of time, in seconds, since a frame has been received from the
         * neighboring Node.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.2
         */
        age: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify the RLOC16 of the neighboring Node. The uint16 value is composed by taking the two
         * RLOC16 and treating the octet string as if it was encoding a big-endian integer. For example, octet string
         * (in hexadecimal, from first octet to last) 44AA would lead to a value of 0x44AA.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.3
         */
        rloc16: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify the number of link layer frames that have been received from the neighboring node.
         * This field shall be reset to 0 upon a reboot of the Node.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.4
         */
        linkFrameCounter: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify the number of Mesh Link Establishment frames that have been received from the
         * neighboring node. This field shall be reset to 0 upon a reboot of the Node.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.5
         */
        mleFrameCounter: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
         * scaled from 0 to 255.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.6
         */
        lqi: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field SHOULD specify the average RSSI across all received frames from the neighboring Node since the
         * receiving Node’s last reboot. If there is no known received frames this field SHOULD have the value of null.
         * This field shall have the units of dBm, having the range -128 dBm to 0 dBm.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.7
         */
        averageRssi: import("../tlv/TlvObject.js").FieldType<number | null>;
        /**
         * This field shall specify the RSSI of the most recently received frame from the neighboring Node. If there is
         * no known last received frame the LastRssi field SHOULD have the value of null. This field shall have the
         * units of dBm, having the range -128 dBm to 0 dBm.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.8
         */
        lastRssi: import("../tlv/TlvObject.js").FieldType<number | null>;
        /**
         * This field shall specify the percentage of received frames from the neighboring Node that have resulted in
         * errors.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.9
         */
        frameErrorRate: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify the percentage of received messages from the neighboring Node that have resulted in
         * errors.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.10
         */
        messageErrorRate: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify if the neighboring Node is capable of receiving frames while the Node is in an idle
         * state.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.11
         */
        rxOnWhenIdle: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall specify if the neighboring Node is a full Thread device.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.12
         */
        fullThreadDevice: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall specify if the neighboring Node requires the full Network Data. If set to False, the
         * neighboring Node only requires the stable Network Data.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.13
         */
        fullNetworkData: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall specify if the neighboring Node is a direct child of the Node reporting the NeighborTable
         * attribute.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.14
         */
        isChild: import("../tlv/TlvObject.js").FieldType<boolean>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.14.5.4
     */
    interface NeighborTable extends TypeFromSchema<typeof TlvNeighborTable> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.14.5.5
     */
    const TlvRouteTable: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * This field shall specify the IEEE 802.15.4 extended address for the Node for which this route table entry
         * corresponds. The uint64 value is composed by taking the 8 octets of the extended address EUI-64 and treating
         * them as a big-endian integer. For example, octet string (in hexadecimal, from first octet to last)
         * 00112233AABBCCDD would lead to a value of 0x00112233AABBCCDD.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.1
         */
        extAddress: import("../tlv/TlvObject.js").FieldType<number | bigint>;
        /**
         * This field shall specify the RLOC16 for the Node for which this route table entry corresponds. The uint16
         * value is composed by taking the two RLOC16 and treating the octet string as if it was encoding a big-endian
         * integer. For example, octet string (in hexadecimal, from first octet to last) 44AA would lead to a value of
         * 0x44AA.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.2
         */
        rloc16: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify the Router ID for the Node for which this route table entry corresponds.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.3
         */
        routerId: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify the Router ID for the next hop in the route to the Node for which this route table
         * entry corresponds.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.4
         */
        nextHop: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This Field shall specify the cost of the route to the Node for which this route table entry corresponds.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.5
         */
        pathCost: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
         * scaled from 0 to 255, from the perspective of the Node reporting the neighbor table.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.6
         */
        lqiIn: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
         * scaled from 0 to 255, from the perspective of the Node specified within the NextHop field.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.7
         */
        lqiOut: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify the duration of time, in seconds, since a frame has been received from the Node for
         * which this route table entry corresponds.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.8
         */
        age: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify if the router ID as defined within the RouterId field has been allocated.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.9
         */
        allocated: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall specify if a link has been established to the Node for which this route table entry
         * corresponds.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.10
         */
        linkEstablished: import("../tlv/TlvObject.js").FieldType<boolean>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.14.5.5
     */
    interface RouteTable extends TypeFromSchema<typeof TlvRouteTable> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.14.5.6
     */
    const TlvSecurityPolicy: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * This field shall specify the interval of time, in hours, that Thread security keys are rotated. Null when
         * there is no dataset configured.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.6.1
         */
        rotationTime: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall specify the flags as specified in Thread 1.3.0 section 8.10.1.15. Null when there is no
         * dataset configured.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.6.2
         */
        flags: import("../tlv/TlvObject.js").FieldType<number>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.14.5.6
     */
    interface SecurityPolicy extends TypeFromSchema<typeof TlvSecurityPolicy> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.14.5.7
     */
    const TlvOperationalDatasetComponents: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * This field shall be True if the Node has an active timestamp present, else False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.1
         */
        activeTimestampPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall be True if the Node has a pending timestamp is present, else False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.2
         */
        pendingTimestampPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall be True if the Node has the Thread master key, else False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.3
         */
        masterKeyPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall be True if the Node has the Thread network’s name, else False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.4
         */
        networkNamePresent: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall be True if the Node has an extended Pan ID, else False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.5
         */
        extendedPanIdPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall be True if the Node has the mesh local prefix, else False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.6
         */
        meshLocalPrefixPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall be True if the Node has the Thread network delay set, else False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.7
         */
        delayPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall be True if the Node has a Pan ID, else False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.8
         */
        panIdPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall be True if the Node has configured an operational channel for the Thread network, else
         * False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.9
         */
        channelPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall be True if the Node has been configured with the Thread network Pskc, else False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.10
         */
        pskcPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall be True if the Node has been configured with the Thread network security policies, else
         * False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.11
         */
        securityPolicyPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
        /**
         * This field shall be True if the Node has available a mask of available channels, else False.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.12
         */
        channelMaskPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.14.5.7
     */
    interface OperationalDatasetComponents extends TypeFromSchema<typeof TlvOperationalDatasetComponents> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.14.5.1
     */
    enum NetworkFault {
        /**
         * Indicates an unspecified fault.
         */
        Unspecified = 0,
        /**
         * Indicates the Thread link is down.
         */
        LinkDown = 1,
        /**
         * Indicates there has been Thread hardware failure.
         */
        HardwareFailure = 2,
        /**
         * Indicates the Thread network is jammed.
         */
        NetworkJammed = 3
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.14.5.2
     */
    enum ConnectionStatus {
        /**
         * Node is connected
         */
        Connected = 0,
        /**
         * Node is not connected
         */
        NotConnected = 1
    }
    /**
     * Body of the ThreadNetworkDiagnostics connectionStatus event
     *
     * @see {@link MatterSpecification.v142.Core} § 11.14.8.2
     */
    const TlvConnectionStatusEvent: import("../tlv/TlvObject.js").ObjectSchema<{
        connectionStatus: import("../tlv/TlvObject.js").FieldType<ConnectionStatus>;
    }>;
    /**
     * Body of the ThreadNetworkDiagnostics connectionStatus event
     *
     * @see {@link MatterSpecification.v142.Core} § 11.14.8.2
     */
    interface ConnectionStatusEvent extends TypeFromSchema<typeof TlvConnectionStatusEvent> {
    }
    /**
     * Body of the ThreadNetworkDiagnostics networkFaultChange event
     *
     * @see {@link MatterSpecification.v142.Core} § 11.14.8.1
     */
    const TlvNetworkFaultChangeEvent: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * This field shall represent the set of faults currently detected, as per Section 11.14.5.1, “NetworkFaultEnum
         * Type”.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.8.1.1
         */
        current: import("../tlv/TlvObject.js").FieldType<NetworkFault[]>;
        /**
         * This field shall represent the set of faults detected prior to this change event, as per Section 11.14.5.1,
         * “NetworkFaultEnum Type”.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.14.8.1.2
         */
        previous: import("../tlv/TlvObject.js").FieldType<NetworkFault[]>;
    }>;
    /**
     * Body of the ThreadNetworkDiagnostics networkFaultChange event
     *
     * @see {@link MatterSpecification.v142.Core} § 11.14.8.1
     */
    interface NetworkFaultChangeEvent extends TypeFromSchema<typeof TlvNetworkFaultChangeEvent> {
    }
    /**
     * A ThreadNetworkDiagnosticsCluster supports these elements if it supports feature ErrorCounts.
     */
    const ErrorCountsComponent: {
        readonly attributes: {
            /**
             * Indicates the number of packets dropped either at ingress or egress, due to lack of buffer memory to
             * retain all packets on the ethernet network interface. The OverrunCount attribute shall be reset to 0 upon
             * a reboot of the Node.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.7
             */
            readonly overrunCount: Attribute<number | bigint, any>;
        };
        readonly commands: {
            /**
             * This command is used to reset the count attributes.
             *
             * Reception of this command shall reset the following attributes to 0:
             *
             *   - OverrunCount
             *
             * Upon completion, this command shall send a status code of SUCCESS back to the initiator.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.7.1
             */
            readonly resetCounts: Command<void, void, any>;
        };
    };
    /**
     * A ThreadNetworkDiagnosticsCluster supports these elements if it supports feature MleCounts.
     */
    const MleCountsComponent: {
        readonly attributes: {
            /**
             * Indicates the number of times the Node entered the OT_DEVICE_ROLE_DETACHED role as specified within the
             * Thread specification. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.15
             */
            readonly detachedRoleCount: OptionalAttribute<number, any>;
            /**
             * Indicates the number of times the Node entered the OT_DEVICE_ROLE_CHILD role as specified within the
             * Thread specification. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.16
             */
            readonly childRoleCount: OptionalAttribute<number, any>;
            /**
             * Indicates the number of times the Node entered the OT_DEVICE_ROLE_ROUTER role as specified within the
             * Thread specification. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.17
             */
            readonly routerRoleCount: OptionalAttribute<number, any>;
            /**
             * Indicates the number of times the Node entered the OT_DEVICE_ROLE_LEADER role as specified within the
             * Thread specification. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.18
             */
            readonly leaderRoleCount: OptionalAttribute<number, any>;
            /**
             * Indicates the number of attempts that have been made to attach to a Thread network while the Node was
             * detached from all Thread networks. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.19
             */
            readonly attachAttemptCount: OptionalAttribute<number, any>;
            /**
             * Indicates the number of times that the Thread network that the Node is connected to has changed its
             * Partition ID. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.20
             */
            readonly partitionIdChangeCount: OptionalAttribute<number, any>;
            /**
             * Indicates the number of times a Node has attempted to attach to a different Thread partition that it has
             * determined is better than the partition it is currently attached to. This value shall only be reset upon
             * a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.21
             */
            readonly betterPartitionAttachAttemptCount: OptionalAttribute<number, any>;
            /**
             * Indicates the number of times a Node has changed its parent. This value shall only be reset upon a Node
             * reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.22
             */
            readonly parentChangeCount: OptionalAttribute<number, any>;
        };
    };
    /**
     * A ThreadNetworkDiagnosticsCluster supports these elements if it supports feature MacCounts.
     */
    const MacCountsComponent: {
        readonly attributes: {
            /**
             * Indicates the total number of unique MAC frame transmission requests. The attribute shall only be
             * incremented by 1 for each MAC transmission request regardless of the amount of CCA failures, CSMA-CA
             * attempts, or retransmissions. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.23
             */
            readonly txTotalCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique unicast MAC frame transmission requests. The attribute shall only be
             * incremented by 1 for each unicast MAC transmission request regardless of the amount of CCA failures,
             * CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.24
             */
            readonly txUnicastCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique broadcast MAC frame transmission requests. The attribute shall only
             * be incremented by 1 for each broadcast MAC transmission request regardless of the amount of CCA failures,
             * CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.25
             */
            readonly txBroadcastCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC frame transmission requests with requested acknowledgment. The
             * attribute shall only be incremented by 1 for each MAC transmission request with requested acknowledgment
             * regardless of the amount of CCA failures, CSMA-CA attempts, or retransmissions. This value shall only be
             * reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.26
             */
            readonly txAckRequestedCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC frame transmission requests that were acked. The attribute shall
             * only be incremented by 1 for each MAC transmission request that is acked regardless of the amount of CCA
             * failures, CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.27
             */
            readonly txAckedCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC frame transmission requests withoutrequestedacknowledgment. The
             * attribute shall only be incremented by 1 for each MAC transmission request that is does not request
             * acknowledgement regardless of the amount of CCA failures, CSMA-CA attempts, or retransmissions.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.28
             */
            readonly txNoAckRequestedCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC Data frame transmission requests. The attribute shall only be
             * incremented by 1 for each MAC Data frame transmission request regardless of the amount of CCA failures,
             * CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.29
             */
            readonly txDataCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC Data Poll frame transmission requests. The attribute shall only
             * be incremented by 1 for each MAC Data Poll frame transmission request regardless of the amount of CCA
             * failures, CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.30
             */
            readonly txDataPollCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC Beacon frame transmission requests. The attribute shall only be
             * incremented by 1 for each MAC Beacon frame transmission request regardless of the amount of CCA failures,
             * CSMA-CA attempts, or retransmissions.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.31
             */
            readonly txBeaconCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC Beacon Request frame transmission requests. The attribute shall
             * only be incremented by 1 for each MAC Beacon Request frame transmission request regardless of the amount
             * of CCA failures, CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.32
             */
            readonly txBeaconRequestCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC frame transmission requests that are not counted by any other
             * attribute. The attribute shall only be incremented by 1 for each MAC frame transmission request
             * regardless of the amount of CCA failures, CSMA-CA attempts, or retransmissions. This value shall only be
             * reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.33
             */
            readonly txOtherCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of MAC retransmission attempts. The attribute shall only be incremented by 1
             * for each retransmission attempt that may be triggered by lack of acknowledgement, CSMA/CA failure, or
             * other type of transmission error. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.34
             */
            readonly txRetryCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC transmission packets that meet maximal retry limit for direct
             * packets. The attribute shall only be incremented by 1 for each unique MAC transmission packets that meets
             * the maximal retry limit for direct packets. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.35
             */
            readonly txDirectMaxRetryExpiryCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC transmission packets that meet maximal retry limit for indirect
             * packets. The attribute shall only be incremented by 1 for each unique MAC transmission packets that meets
             * the maximal retry limit for indirect packets. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.36
             */
            readonly txIndirectMaxRetryExpiryCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of CCA failures. The TxErrCcaCount attribute shall only be incremented by 1
             * for each instance of a CCA failure. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.37
             */
            readonly txErrCcaCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC transmission request failures caused by an abort error. The
             * attribute shall only be incremented by 1 for each unique MAC transmission request failure caused by an
             * abort error.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.38
             */
            readonly txErrAbortCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of unique MAC transmission request failures caused by an error as the result
             * of a busy channel (a CSMA/CA fail). The attribute shall only be incremented by 1 for each unique MAC
             * transmission request failure caused by a busy channel such as a CSMA/CA failure.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.39
             */
            readonly txErrBusyChannelCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC frames. This value shall only be reset upon a Node
             * reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.40
             */
            readonly rxTotalCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique unicast MAC frames. This value shall only be reset upon a
             * Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.41
             */
            readonly rxUnicastCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique broadcast MAC frames. This value shall only be reset upon a
             * Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.42
             */
            readonly rxBroadcastCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC Data frames. This value shall only be reset upon a Node
             * reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.43
             */
            readonly rxDataCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC Data Poll frames. This value shall only be reset upon a
             * Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.44
             */
            readonly rxDataPollCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC Beacon frames. This value shall only be reset upon a
             * Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.45
             */
            readonly rxBeaconCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC Beacon Request frames. This value shall only be reset
             * upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.46
             */
            readonly rxBeaconRequestCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC frame requests that are not counted by
             * anyotherattribute. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.47
             */
            readonly rxOtherCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
             * MAC filtering. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.48
             */
            readonly rxAddressFilteredCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC frame requests that have been dropped as a result of a
             * destination address check. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.49
             */
            readonly rxDestAddrFilteredCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received MAC frame requests that have been dropped as a result of being a
             * duplicate of a previously received MAC frame request. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.50
             */
            readonly rxDuplicatedCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
             * missing or malformed frame contents. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.51
             */
            readonly rxErrNoFrameCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
             * originating from an unknown neighbor device. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.52
             */
            readonly rxErrUnknownNeighborCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
             * containing an invalid source address. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.53
             */
            readonly rxErrInvalidSrcAddrCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC frame requests that have been dropped as a result of an
             * error with the security of the received frame. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.54
             */
            readonly rxErrSecCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC frame requests that have been dropped as a result of an
             * error with the FCS of the received frame. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.55
             */
            readonly rxErrFcsCount: OptionalAttribute<number, any>;
            /**
             * Indicates the total number of received unique MAC frame requests that have been dropped as a result of an
             * error that is not counted by any other attribute. This value shall only be reset upon a Node reboot.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.56
             */
            readonly rxErrOtherCount: OptionalAttribute<number, any>;
        };
    };
    /**
     * These elements and properties are present in all ThreadNetworkDiagnostics clusters.
     */
    const Base: {
        readonly id: 53;
        readonly name: "ThreadNetworkDiagnostics";
        readonly revision: 3;
        readonly features: {
            /**
             * Server supports the counts for the number of received and transmitted packets on the Thread interface.
             */
            readonly packetCounts: BitFlag;
            /**
             * Server supports the counts for the number of errors that have occurred during the reception and
             * transmission of packets on the Thread interface.
             */
            readonly errorCounts: BitFlag;
            /**
             * Server supports the counts for various MLE layer happenings.
             */
            readonly mleCounts: BitFlag;
            /**
             * Server supports the counts for various MAC layer happenings.
             */
            readonly macCounts: BitFlag;
        };
        readonly attributes: {
            /**
             * Indicates the 802.15.4 channel number configured on the Node’s Thread interface (that is, the Active
             * Operational Dataset’s current Channel value). A value of null shall indicate that the Thread interface is
             * not currently configured or operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.1
             */
            readonly channel: Attribute<number | null, any>;
            /**
             * Indicates the role that this Node has within the routing of messages through the Thread network, as
             * defined by RoutingRoleEnum. The potential roles are defined in the following table. A value of null shall
             * indicate that the Thread interface is not currently configured or operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.2
             */
            readonly routingRole: Attribute<RoutingRole | null, any>;
            /**
             * Indicates a human-readable (displayable) name for the Thread network that the Node has been configured to
             * join to. A value of null shall indicate that the Thread interface is not currently configured or
             * operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.3
             */
            readonly networkName: Attribute<string | null, any>;
            /**
             * Indicates the 16-bit identifier of the Node on the Thread network. A value of null shall indicate that
             * the Thread interface is not currently configured or operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.4
             */
            readonly panId: Attribute<number | null, any>;
            /**
             * Indicates the unique 64-bit identifier of the Node on the Thread network. A value of null shall indicate
             * that the Thread interface is not currently configured or operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.5
             */
            readonly extendedPanId: Attribute<number | bigint | null, any>;
            /**
             * Indicates the mesh-local IPv6 prefix for the Thread network that the Node has been configured to join to.
             * A value of null shall indicate that the Thread interface is not currently configured or operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.6
             */
            readonly meshLocalPrefix: Attribute<AllowSharedBufferSource | null, any>;
            /**
             * Indicates the current list of Nodes that comprise the neighbor table on the Node.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.8
             */
            readonly neighborTable: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall specify the IEEE 802.15.4 extended address for the neighboring Node. The uint64 value is
                 * composed by taking the 8 octets of the extended address EUI-64 and treating them as a big-endian integer. For
                 * example, octet string (in hexadecimal, from first octet to last) 00112233AABBCCDD would lead to a value of
                 * 0x00112233AABBCCDD.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.1
                 */
                extAddress: import("../tlv/TlvObject.js").FieldType<number | bigint>;
                /**
                 * This field shall specify the duration of time, in seconds, since a frame has been received from the
                 * neighboring Node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.2
                 */
                age: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the RLOC16 of the neighboring Node. The uint16 value is composed by taking the two
                 * RLOC16 and treating the octet string as if it was encoding a big-endian integer. For example, octet string
                 * (in hexadecimal, from first octet to last) 44AA would lead to a value of 0x44AA.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.3
                 */
                rloc16: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the number of link layer frames that have been received from the neighboring node.
                 * This field shall be reset to 0 upon a reboot of the Node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.4
                 */
                linkFrameCounter: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the number of Mesh Link Establishment frames that have been received from the
                 * neighboring node. This field shall be reset to 0 upon a reboot of the Node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.5
                 */
                mleFrameCounter: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
                 * scaled from 0 to 255.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.6
                 */
                lqi: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field SHOULD specify the average RSSI across all received frames from the neighboring Node since the
                 * receiving Node’s last reboot. If there is no known received frames this field SHOULD have the value of null.
                 * This field shall have the units of dBm, having the range -128 dBm to 0 dBm.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.7
                 */
                averageRssi: import("../tlv/TlvObject.js").FieldType<number | null>;
                /**
                 * This field shall specify the RSSI of the most recently received frame from the neighboring Node. If there is
                 * no known last received frame the LastRssi field SHOULD have the value of null. This field shall have the
                 * units of dBm, having the range -128 dBm to 0 dBm.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.8
                 */
                lastRssi: import("../tlv/TlvObject.js").FieldType<number | null>;
                /**
                 * This field shall specify the percentage of received frames from the neighboring Node that have resulted in
                 * errors.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.9
                 */
                frameErrorRate: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the percentage of received messages from the neighboring Node that have resulted in
                 * errors.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.10
                 */
                messageErrorRate: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify if the neighboring Node is capable of receiving frames while the Node is in an idle
                 * state.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.11
                 */
                rxOnWhenIdle: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if the neighboring Node is a full Thread device.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.12
                 */
                fullThreadDevice: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if the neighboring Node requires the full Network Data. If set to False, the
                 * neighboring Node only requires the stable Network Data.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.13
                 */
                fullNetworkData: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if the neighboring Node is a direct child of the Node reporting the NeighborTable
                 * attribute.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.14
                 */
                isChild: import("../tlv/TlvObject.js").FieldType<boolean>;
            }>[], any>;
            /**
             * Indicates the current list of router capable Nodes for which routes have been established.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.9
             */
            readonly routeTable: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall specify the IEEE 802.15.4 extended address for the Node for which this route table entry
                 * corresponds. The uint64 value is composed by taking the 8 octets of the extended address EUI-64 and treating
                 * them as a big-endian integer. For example, octet string (in hexadecimal, from first octet to last)
                 * 00112233AABBCCDD would lead to a value of 0x00112233AABBCCDD.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.1
                 */
                extAddress: import("../tlv/TlvObject.js").FieldType<number | bigint>;
                /**
                 * This field shall specify the RLOC16 for the Node for which this route table entry corresponds. The uint16
                 * value is composed by taking the two RLOC16 and treating the octet string as if it was encoding a big-endian
                 * integer. For example, octet string (in hexadecimal, from first octet to last) 44AA would lead to a value of
                 * 0x44AA.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.2
                 */
                rloc16: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the Router ID for the Node for which this route table entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.3
                 */
                routerId: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the Router ID for the next hop in the route to the Node for which this route table
                 * entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.4
                 */
                nextHop: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This Field shall specify the cost of the route to the Node for which this route table entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.5
                 */
                pathCost: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
                 * scaled from 0 to 255, from the perspective of the Node reporting the neighbor table.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.6
                 */
                lqiIn: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
                 * scaled from 0 to 255, from the perspective of the Node specified within the NextHop field.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.7
                 */
                lqiOut: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the duration of time, in seconds, since a frame has been received from the Node for
                 * which this route table entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.8
                 */
                age: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify if the router ID as defined within the RouterId field has been allocated.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.9
                 */
                allocated: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if a link has been established to the Node for which this route table entry
                 * corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.10
                 */
                linkEstablished: import("../tlv/TlvObject.js").FieldType<boolean>;
            }>[], any>;
            /**
             * Indicates the Thread Leader Partition Id for the Thread network to which the Node is joined. Null if not
             * attached to a Thread network.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.10
             */
            readonly partitionId: Attribute<number | null, any>;
            /**
             * Indicates the Thread Leader Weight used when operating in the Leader role. Null if not attached to a
             * Thread network.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.11
             */
            readonly weighting: Attribute<number | null, any>;
            /**
             * Indicates the full Network Data Version the Node currently uses. Null if not attached to a Thread
             * network.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.12
             */
            readonly dataVersion: Attribute<number | null, any>;
            /**
             * Indicates the Network Data Version for the stable subset of data the Node currently uses. Null if not
             * attached to a Thread network.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.13
             */
            readonly stableDataVersion: Attribute<number | null, any>;
            /**
             * Indicates the 8-bit LeaderRouterId the Node shall attempt to utilize upon becoming a router or leader on
             * the Thread network. Null if not attached to a Thread network.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.14
             */
            readonly leaderRouterId: Attribute<number | null, any>;
            /**
             * Null when there is no dataset configured.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.57
             */
            readonly activeTimestamp: OptionalAttribute<number | bigint | null, any>;
            /**
             * Null when there is no dataset configured.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.58
             */
            readonly pendingTimestamp: OptionalAttribute<number | bigint | null, any>;
            /**
             * Null when there is no dataset configured.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.59
             */
            readonly delay: OptionalAttribute<number | null, any>;
            /**
             * Indicates the current security policies for the Thread partition to which a Node is connected. Null when
             * there is no dataset configured.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.60
             */
            readonly securityPolicy: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall specify the interval of time, in hours, that Thread security keys are rotated. Null when
                 * there is no dataset configured.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.6.1
                 */
                rotationTime: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the flags as specified in Thread 1.3.0 section 8.10.1.15. Null when there is no
                 * dataset configured.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.6.2
                 */
                flags: import("../tlv/TlvObject.js").FieldType<number>;
            }> | null, any>;
            /**
             * Indicates the channels within channel page 0, in the 2.4GHz ISM band. The channels are represented in
             * most significant bit order, with bit value 1 meaning selected, bit value 0 meaning unselected. For
             * example, the most significant bit of the left-most byte indicates channel 0. If channel 0 and channel 10
             * are selected, the mask would be: 80 20 00 00. Null when there is no dataset configured.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.61
             */
            readonly channelPage0Mask: Attribute<AllowSharedBufferSource | null, any>;
            /**
             * Indicates a collection of flags to indicate the presence of various operationally acquired values.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.62
             */
            readonly operationalDatasetComponents: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall be True if the Node has an active timestamp present, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.1
                 */
                activeTimestampPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has a pending timestamp is present, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.2
                 */
                pendingTimestampPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the Thread master key, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.3
                 */
                masterKeyPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the Thread network’s name, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.4
                 */
                networkNamePresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has an extended Pan ID, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.5
                 */
                extendedPanIdPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the mesh local prefix, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.6
                 */
                meshLocalPrefixPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the Thread network delay set, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.7
                 */
                delayPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has a Pan ID, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.8
                 */
                panIdPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has configured an operational channel for the Thread network, else
                 * False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.9
                 */
                channelPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has been configured with the Thread network Pskc, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.10
                 */
                pskcPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has been configured with the Thread network security policies, else
                 * False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.11
                 */
                securityPolicyPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has available a mask of available channels, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.12
                 */
                channelMaskPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
            }> | null, any>;
            /**
             * @see {@link MatterSpecification.v142.Core} § 11.14.6
             */
            readonly activeNetworkFaultsList: Attribute<NetworkFault[], any>;
            /**
             * Indicates the IEEE 802.15.4 extended address for the Node. A value of null shall indicate that the
             * extended address is not yet known. The uint64 value is composed by taking the 8 octets of the extended
             * address EUI-64 and treating them as a big-endian integer. For example, octet string (in hexadecimal, from
             * first octet to last) 00112233AABBCCDD would lead to a value of 0x00112233AABBCCDD.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.64
             */
            readonly extAddress: Attribute<number | bigint | null, any>;
            /**
             * Indicates the RLOC16 of the Node. A value of null shall indicate that the Thread interface is not
             * currently configured or operational. The uint16 value is composed by taking the two RLOC16 and treating
             * the octet string as if it was encoding a big-endian integer. For example, octet string (in hexadecimal,
             * from first octet to last) 44AA would lead to a value of 0x44AA.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.65
             */
            readonly rloc16: Attribute<number | null, any>;
        };
        readonly events: {
            /**
             * The ConnectionStatus Event shall indicate that a Node’s connection status to a Thread network has
             * changed.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.8.2
             */
            readonly connectionStatus: OptionalEvent<import("../tlv/TlvObject.js").TypeFromFields<{
                connectionStatus: import("../tlv/TlvObject.js").FieldType<ConnectionStatus>;
            }>, any>;
            /**
             * The NetworkFaultChange Event shall indicate a change in the set of network faults currently detected by
             * the Node.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.8.1
             */
            readonly networkFaultChange: OptionalEvent<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall represent the set of faults currently detected, as per Section 11.14.5.1, “NetworkFaultEnum
                 * Type”.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.8.1.1
                 */
                current: import("../tlv/TlvObject.js").FieldType<NetworkFault[]>;
                /**
                 * This field shall represent the set of faults detected prior to this change event, as per Section 11.14.5.1,
                 * “NetworkFaultEnum Type”.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.8.1.2
                 */
                previous: import("../tlv/TlvObject.js").FieldType<NetworkFault[]>;
            }>, any>;
        };
        /**
         * This metadata controls which ThreadNetworkDiagnosticsCluster elements matter.js activates for specific
         * feature combinations.
         */
        readonly extensions: readonly [{
            readonly flags: {
                readonly errorCounts: true;
            };
            readonly component: {
                readonly attributes: {
                    /**
                     * Indicates the number of packets dropped either at ingress or egress, due to lack of buffer memory to
                     * retain all packets on the ethernet network interface. The OverrunCount attribute shall be reset to 0 upon
                     * a reboot of the Node.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.7
                     */
                    readonly overrunCount: Attribute<number | bigint, any>;
                };
                readonly commands: {
                    /**
                     * This command is used to reset the count attributes.
                     *
                     * Reception of this command shall reset the following attributes to 0:
                     *
                     *   - OverrunCount
                     *
                     * Upon completion, this command shall send a status code of SUCCESS back to the initiator.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.7.1
                     */
                    readonly resetCounts: Command<void, void, any>;
                };
            };
        }, {
            readonly flags: {
                readonly mleCounts: true;
            };
            readonly component: {
                readonly attributes: {
                    /**
                     * Indicates the number of times the Node entered the OT_DEVICE_ROLE_DETACHED role as specified within the
                     * Thread specification. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.15
                     */
                    readonly detachedRoleCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times the Node entered the OT_DEVICE_ROLE_CHILD role as specified within the
                     * Thread specification. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.16
                     */
                    readonly childRoleCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times the Node entered the OT_DEVICE_ROLE_ROUTER role as specified within the
                     * Thread specification. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.17
                     */
                    readonly routerRoleCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times the Node entered the OT_DEVICE_ROLE_LEADER role as specified within the
                     * Thread specification. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.18
                     */
                    readonly leaderRoleCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of attempts that have been made to attach to a Thread network while the Node was
                     * detached from all Thread networks. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.19
                     */
                    readonly attachAttemptCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times that the Thread network that the Node is connected to has changed its
                     * Partition ID. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.20
                     */
                    readonly partitionIdChangeCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times a Node has attempted to attach to a different Thread partition that it has
                     * determined is better than the partition it is currently attached to. This value shall only be reset upon
                     * a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.21
                     */
                    readonly betterPartitionAttachAttemptCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times a Node has changed its parent. This value shall only be reset upon a Node
                     * reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.22
                     */
                    readonly parentChangeCount: OptionalAttribute<number, any>;
                };
            };
        }, {
            readonly flags: {
                readonly macCounts: true;
            };
            readonly component: {
                readonly attributes: {
                    /**
                     * Indicates the total number of unique MAC frame transmission requests. The attribute shall only be
                     * incremented by 1 for each MAC transmission request regardless of the amount of CCA failures, CSMA-CA
                     * attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.23
                     */
                    readonly txTotalCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique unicast MAC frame transmission requests. The attribute shall only be
                     * incremented by 1 for each unicast MAC transmission request regardless of the amount of CCA failures,
                     * CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.24
                     */
                    readonly txUnicastCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique broadcast MAC frame transmission requests. The attribute shall only
                     * be incremented by 1 for each broadcast MAC transmission request regardless of the amount of CCA failures,
                     * CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.25
                     */
                    readonly txBroadcastCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC frame transmission requests with requested acknowledgment. The
                     * attribute shall only be incremented by 1 for each MAC transmission request with requested acknowledgment
                     * regardless of the amount of CCA failures, CSMA-CA attempts, or retransmissions. This value shall only be
                     * reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.26
                     */
                    readonly txAckRequestedCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC frame transmission requests that were acked. The attribute shall
                     * only be incremented by 1 for each MAC transmission request that is acked regardless of the amount of CCA
                     * failures, CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.27
                     */
                    readonly txAckedCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC frame transmission requests withoutrequestedacknowledgment. The
                     * attribute shall only be incremented by 1 for each MAC transmission request that is does not request
                     * acknowledgement regardless of the amount of CCA failures, CSMA-CA attempts, or retransmissions.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.28
                     */
                    readonly txNoAckRequestedCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC Data frame transmission requests. The attribute shall only be
                     * incremented by 1 for each MAC Data frame transmission request regardless of the amount of CCA failures,
                     * CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.29
                     */
                    readonly txDataCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC Data Poll frame transmission requests. The attribute shall only
                     * be incremented by 1 for each MAC Data Poll frame transmission request regardless of the amount of CCA
                     * failures, CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.30
                     */
                    readonly txDataPollCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC Beacon frame transmission requests. The attribute shall only be
                     * incremented by 1 for each MAC Beacon frame transmission request regardless of the amount of CCA failures,
                     * CSMA-CA attempts, or retransmissions.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.31
                     */
                    readonly txBeaconCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC Beacon Request frame transmission requests. The attribute shall
                     * only be incremented by 1 for each MAC Beacon Request frame transmission request regardless of the amount
                     * of CCA failures, CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.32
                     */
                    readonly txBeaconRequestCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC frame transmission requests that are not counted by any other
                     * attribute. The attribute shall only be incremented by 1 for each MAC frame transmission request
                     * regardless of the amount of CCA failures, CSMA-CA attempts, or retransmissions. This value shall only be
                     * reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.33
                     */
                    readonly txOtherCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of MAC retransmission attempts. The attribute shall only be incremented by 1
                     * for each retransmission attempt that may be triggered by lack of acknowledgement, CSMA/CA failure, or
                     * other type of transmission error. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.34
                     */
                    readonly txRetryCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC transmission packets that meet maximal retry limit for direct
                     * packets. The attribute shall only be incremented by 1 for each unique MAC transmission packets that meets
                     * the maximal retry limit for direct packets. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.35
                     */
                    readonly txDirectMaxRetryExpiryCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC transmission packets that meet maximal retry limit for indirect
                     * packets. The attribute shall only be incremented by 1 for each unique MAC transmission packets that meets
                     * the maximal retry limit for indirect packets. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.36
                     */
                    readonly txIndirectMaxRetryExpiryCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of CCA failures. The TxErrCcaCount attribute shall only be incremented by 1
                     * for each instance of a CCA failure. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.37
                     */
                    readonly txErrCcaCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC transmission request failures caused by an abort error. The
                     * attribute shall only be incremented by 1 for each unique MAC transmission request failure caused by an
                     * abort error.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.38
                     */
                    readonly txErrAbortCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC transmission request failures caused by an error as the result
                     * of a busy channel (a CSMA/CA fail). The attribute shall only be incremented by 1 for each unique MAC
                     * transmission request failure caused by a busy channel such as a CSMA/CA failure.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.39
                     */
                    readonly txErrBusyChannelCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frames. This value shall only be reset upon a Node
                     * reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.40
                     */
                    readonly rxTotalCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique unicast MAC frames. This value shall only be reset upon a
                     * Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.41
                     */
                    readonly rxUnicastCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique broadcast MAC frames. This value shall only be reset upon a
                     * Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.42
                     */
                    readonly rxBroadcastCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC Data frames. This value shall only be reset upon a Node
                     * reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.43
                     */
                    readonly rxDataCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC Data Poll frames. This value shall only be reset upon a
                     * Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.44
                     */
                    readonly rxDataPollCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC Beacon frames. This value shall only be reset upon a
                     * Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.45
                     */
                    readonly rxBeaconCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC Beacon Request frames. This value shall only be reset
                     * upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.46
                     */
                    readonly rxBeaconRequestCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that are not counted by
                     * anyotherattribute. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.47
                     */
                    readonly rxOtherCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
                     * MAC filtering. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.48
                     */
                    readonly rxAddressFilteredCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of a
                     * destination address check. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.49
                     */
                    readonly rxDestAddrFilteredCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received MAC frame requests that have been dropped as a result of being a
                     * duplicate of a previously received MAC frame request. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.50
                     */
                    readonly rxDuplicatedCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
                     * missing or malformed frame contents. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.51
                     */
                    readonly rxErrNoFrameCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
                     * originating from an unknown neighbor device. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.52
                     */
                    readonly rxErrUnknownNeighborCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
                     * containing an invalid source address. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.53
                     */
                    readonly rxErrInvalidSrcAddrCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of an
                     * error with the security of the received frame. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.54
                     */
                    readonly rxErrSecCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of an
                     * error with the FCS of the received frame. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.55
                     */
                    readonly rxErrFcsCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of an
                     * error that is not counted by any other attribute. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.56
                     */
                    readonly rxErrOtherCount: OptionalAttribute<number, any>;
                };
            };
        }];
    };
    /**
     * @see {@link Cluster}
     */
    const ClusterInstance: MutableCluster<{
        readonly id: 53;
        readonly name: "ThreadNetworkDiagnostics";
        readonly revision: 3;
        readonly features: {
            /**
             * Server supports the counts for the number of received and transmitted packets on the Thread interface.
             */
            readonly packetCounts: BitFlag;
            /**
             * Server supports the counts for the number of errors that have occurred during the reception and
             * transmission of packets on the Thread interface.
             */
            readonly errorCounts: BitFlag;
            /**
             * Server supports the counts for various MLE layer happenings.
             */
            readonly mleCounts: BitFlag;
            /**
             * Server supports the counts for various MAC layer happenings.
             */
            readonly macCounts: BitFlag;
        };
        readonly attributes: {
            /**
             * Indicates the 802.15.4 channel number configured on the Node’s Thread interface (that is, the Active
             * Operational Dataset’s current Channel value). A value of null shall indicate that the Thread interface is
             * not currently configured or operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.1
             */
            readonly channel: Attribute<number | null, any>;
            /**
             * Indicates the role that this Node has within the routing of messages through the Thread network, as
             * defined by RoutingRoleEnum. The potential roles are defined in the following table. A value of null shall
             * indicate that the Thread interface is not currently configured or operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.2
             */
            readonly routingRole: Attribute<RoutingRole | null, any>;
            /**
             * Indicates a human-readable (displayable) name for the Thread network that the Node has been configured to
             * join to. A value of null shall indicate that the Thread interface is not currently configured or
             * operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.3
             */
            readonly networkName: Attribute<string | null, any>;
            /**
             * Indicates the 16-bit identifier of the Node on the Thread network. A value of null shall indicate that
             * the Thread interface is not currently configured or operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.4
             */
            readonly panId: Attribute<number | null, any>;
            /**
             * Indicates the unique 64-bit identifier of the Node on the Thread network. A value of null shall indicate
             * that the Thread interface is not currently configured or operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.5
             */
            readonly extendedPanId: Attribute<number | bigint | null, any>;
            /**
             * Indicates the mesh-local IPv6 prefix for the Thread network that the Node has been configured to join to.
             * A value of null shall indicate that the Thread interface is not currently configured or operational.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.6
             */
            readonly meshLocalPrefix: Attribute<AllowSharedBufferSource | null, any>;
            /**
             * Indicates the current list of Nodes that comprise the neighbor table on the Node.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.8
             */
            readonly neighborTable: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall specify the IEEE 802.15.4 extended address for the neighboring Node. The uint64 value is
                 * composed by taking the 8 octets of the extended address EUI-64 and treating them as a big-endian integer. For
                 * example, octet string (in hexadecimal, from first octet to last) 00112233AABBCCDD would lead to a value of
                 * 0x00112233AABBCCDD.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.1
                 */
                extAddress: import("../tlv/TlvObject.js").FieldType<number | bigint>;
                /**
                 * This field shall specify the duration of time, in seconds, since a frame has been received from the
                 * neighboring Node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.2
                 */
                age: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the RLOC16 of the neighboring Node. The uint16 value is composed by taking the two
                 * RLOC16 and treating the octet string as if it was encoding a big-endian integer. For example, octet string
                 * (in hexadecimal, from first octet to last) 44AA would lead to a value of 0x44AA.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.3
                 */
                rloc16: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the number of link layer frames that have been received from the neighboring node.
                 * This field shall be reset to 0 upon a reboot of the Node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.4
                 */
                linkFrameCounter: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the number of Mesh Link Establishment frames that have been received from the
                 * neighboring node. This field shall be reset to 0 upon a reboot of the Node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.5
                 */
                mleFrameCounter: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
                 * scaled from 0 to 255.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.6
                 */
                lqi: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field SHOULD specify the average RSSI across all received frames from the neighboring Node since the
                 * receiving Node’s last reboot. If there is no known received frames this field SHOULD have the value of null.
                 * This field shall have the units of dBm, having the range -128 dBm to 0 dBm.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.7
                 */
                averageRssi: import("../tlv/TlvObject.js").FieldType<number | null>;
                /**
                 * This field shall specify the RSSI of the most recently received frame from the neighboring Node. If there is
                 * no known last received frame the LastRssi field SHOULD have the value of null. This field shall have the
                 * units of dBm, having the range -128 dBm to 0 dBm.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.8
                 */
                lastRssi: import("../tlv/TlvObject.js").FieldType<number | null>;
                /**
                 * This field shall specify the percentage of received frames from the neighboring Node that have resulted in
                 * errors.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.9
                 */
                frameErrorRate: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the percentage of received messages from the neighboring Node that have resulted in
                 * errors.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.10
                 */
                messageErrorRate: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify if the neighboring Node is capable of receiving frames while the Node is in an idle
                 * state.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.11
                 */
                rxOnWhenIdle: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if the neighboring Node is a full Thread device.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.12
                 */
                fullThreadDevice: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if the neighboring Node requires the full Network Data. If set to False, the
                 * neighboring Node only requires the stable Network Data.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.13
                 */
                fullNetworkData: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if the neighboring Node is a direct child of the Node reporting the NeighborTable
                 * attribute.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.14
                 */
                isChild: import("../tlv/TlvObject.js").FieldType<boolean>;
            }>[], any>;
            /**
             * Indicates the current list of router capable Nodes for which routes have been established.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.9
             */
            readonly routeTable: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall specify the IEEE 802.15.4 extended address for the Node for which this route table entry
                 * corresponds. The uint64 value is composed by taking the 8 octets of the extended address EUI-64 and treating
                 * them as a big-endian integer. For example, octet string (in hexadecimal, from first octet to last)
                 * 00112233AABBCCDD would lead to a value of 0x00112233AABBCCDD.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.1
                 */
                extAddress: import("../tlv/TlvObject.js").FieldType<number | bigint>;
                /**
                 * This field shall specify the RLOC16 for the Node for which this route table entry corresponds. The uint16
                 * value is composed by taking the two RLOC16 and treating the octet string as if it was encoding a big-endian
                 * integer. For example, octet string (in hexadecimal, from first octet to last) 44AA would lead to a value of
                 * 0x44AA.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.2
                 */
                rloc16: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the Router ID for the Node for which this route table entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.3
                 */
                routerId: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the Router ID for the next hop in the route to the Node for which this route table
                 * entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.4
                 */
                nextHop: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This Field shall specify the cost of the route to the Node for which this route table entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.5
                 */
                pathCost: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
                 * scaled from 0 to 255, from the perspective of the Node reporting the neighbor table.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.6
                 */
                lqiIn: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
                 * scaled from 0 to 255, from the perspective of the Node specified within the NextHop field.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.7
                 */
                lqiOut: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the duration of time, in seconds, since a frame has been received from the Node for
                 * which this route table entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.8
                 */
                age: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify if the router ID as defined within the RouterId field has been allocated.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.9
                 */
                allocated: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if a link has been established to the Node for which this route table entry
                 * corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.10
                 */
                linkEstablished: import("../tlv/TlvObject.js").FieldType<boolean>;
            }>[], any>;
            /**
             * Indicates the Thread Leader Partition Id for the Thread network to which the Node is joined. Null if not
             * attached to a Thread network.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.10
             */
            readonly partitionId: Attribute<number | null, any>;
            /**
             * Indicates the Thread Leader Weight used when operating in the Leader role. Null if not attached to a
             * Thread network.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.11
             */
            readonly weighting: Attribute<number | null, any>;
            /**
             * Indicates the full Network Data Version the Node currently uses. Null if not attached to a Thread
             * network.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.12
             */
            readonly dataVersion: Attribute<number | null, any>;
            /**
             * Indicates the Network Data Version for the stable subset of data the Node currently uses. Null if not
             * attached to a Thread network.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.13
             */
            readonly stableDataVersion: Attribute<number | null, any>;
            /**
             * Indicates the 8-bit LeaderRouterId the Node shall attempt to utilize upon becoming a router or leader on
             * the Thread network. Null if not attached to a Thread network.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.14
             */
            readonly leaderRouterId: Attribute<number | null, any>;
            /**
             * Null when there is no dataset configured.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.57
             */
            readonly activeTimestamp: OptionalAttribute<number | bigint | null, any>;
            /**
             * Null when there is no dataset configured.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.58
             */
            readonly pendingTimestamp: OptionalAttribute<number | bigint | null, any>;
            /**
             * Null when there is no dataset configured.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.59
             */
            readonly delay: OptionalAttribute<number | null, any>;
            /**
             * Indicates the current security policies for the Thread partition to which a Node is connected. Null when
             * there is no dataset configured.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.60
             */
            readonly securityPolicy: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall specify the interval of time, in hours, that Thread security keys are rotated. Null when
                 * there is no dataset configured.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.6.1
                 */
                rotationTime: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the flags as specified in Thread 1.3.0 section 8.10.1.15. Null when there is no
                 * dataset configured.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.6.2
                 */
                flags: import("../tlv/TlvObject.js").FieldType<number>;
            }> | null, any>;
            /**
             * Indicates the channels within channel page 0, in the 2.4GHz ISM band. The channels are represented in
             * most significant bit order, with bit value 1 meaning selected, bit value 0 meaning unselected. For
             * example, the most significant bit of the left-most byte indicates channel 0. If channel 0 and channel 10
             * are selected, the mask would be: 80 20 00 00. Null when there is no dataset configured.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.61
             */
            readonly channelPage0Mask: Attribute<AllowSharedBufferSource | null, any>;
            /**
             * Indicates a collection of flags to indicate the presence of various operationally acquired values.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.62
             */
            readonly operationalDatasetComponents: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall be True if the Node has an active timestamp present, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.1
                 */
                activeTimestampPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has a pending timestamp is present, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.2
                 */
                pendingTimestampPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the Thread master key, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.3
                 */
                masterKeyPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the Thread network’s name, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.4
                 */
                networkNamePresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has an extended Pan ID, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.5
                 */
                extendedPanIdPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the mesh local prefix, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.6
                 */
                meshLocalPrefixPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the Thread network delay set, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.7
                 */
                delayPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has a Pan ID, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.8
                 */
                panIdPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has configured an operational channel for the Thread network, else
                 * False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.9
                 */
                channelPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has been configured with the Thread network Pskc, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.10
                 */
                pskcPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has been configured with the Thread network security policies, else
                 * False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.11
                 */
                securityPolicyPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has available a mask of available channels, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.12
                 */
                channelMaskPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
            }> | null, any>;
            /**
             * @see {@link MatterSpecification.v142.Core} § 11.14.6
             */
            readonly activeNetworkFaultsList: Attribute<NetworkFault[], any>;
            /**
             * Indicates the IEEE 802.15.4 extended address for the Node. A value of null shall indicate that the
             * extended address is not yet known. The uint64 value is composed by taking the 8 octets of the extended
             * address EUI-64 and treating them as a big-endian integer. For example, octet string (in hexadecimal, from
             * first octet to last) 00112233AABBCCDD would lead to a value of 0x00112233AABBCCDD.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.64
             */
            readonly extAddress: Attribute<number | bigint | null, any>;
            /**
             * Indicates the RLOC16 of the Node. A value of null shall indicate that the Thread interface is not
             * currently configured or operational. The uint16 value is composed by taking the two RLOC16 and treating
             * the octet string as if it was encoding a big-endian integer. For example, octet string (in hexadecimal,
             * from first octet to last) 44AA would lead to a value of 0x44AA.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.6.65
             */
            readonly rloc16: Attribute<number | null, any>;
        };
        readonly events: {
            /**
             * The ConnectionStatus Event shall indicate that a Node’s connection status to a Thread network has
             * changed.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.8.2
             */
            readonly connectionStatus: OptionalEvent<import("../tlv/TlvObject.js").TypeFromFields<{
                connectionStatus: import("../tlv/TlvObject.js").FieldType<ConnectionStatus>;
            }>, any>;
            /**
             * The NetworkFaultChange Event shall indicate a change in the set of network faults currently detected by
             * the Node.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.8.1
             */
            readonly networkFaultChange: OptionalEvent<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall represent the set of faults currently detected, as per Section 11.14.5.1, “NetworkFaultEnum
                 * Type”.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.8.1.1
                 */
                current: import("../tlv/TlvObject.js").FieldType<NetworkFault[]>;
                /**
                 * This field shall represent the set of faults detected prior to this change event, as per Section 11.14.5.1,
                 * “NetworkFaultEnum Type”.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.8.1.2
                 */
                previous: import("../tlv/TlvObject.js").FieldType<NetworkFault[]>;
            }>, any>;
        };
        /**
         * This metadata controls which ThreadNetworkDiagnosticsCluster elements matter.js activates for specific
         * feature combinations.
         */
        readonly extensions: readonly [{
            readonly flags: {
                readonly errorCounts: true;
            };
            readonly component: {
                readonly attributes: {
                    /**
                     * Indicates the number of packets dropped either at ingress or egress, due to lack of buffer memory to
                     * retain all packets on the ethernet network interface. The OverrunCount attribute shall be reset to 0 upon
                     * a reboot of the Node.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.7
                     */
                    readonly overrunCount: Attribute<number | bigint, any>;
                };
                readonly commands: {
                    /**
                     * This command is used to reset the count attributes.
                     *
                     * Reception of this command shall reset the following attributes to 0:
                     *
                     *   - OverrunCount
                     *
                     * Upon completion, this command shall send a status code of SUCCESS back to the initiator.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.7.1
                     */
                    readonly resetCounts: Command<void, void, any>;
                };
            };
        }, {
            readonly flags: {
                readonly mleCounts: true;
            };
            readonly component: {
                readonly attributes: {
                    /**
                     * Indicates the number of times the Node entered the OT_DEVICE_ROLE_DETACHED role as specified within the
                     * Thread specification. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.15
                     */
                    readonly detachedRoleCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times the Node entered the OT_DEVICE_ROLE_CHILD role as specified within the
                     * Thread specification. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.16
                     */
                    readonly childRoleCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times the Node entered the OT_DEVICE_ROLE_ROUTER role as specified within the
                     * Thread specification. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.17
                     */
                    readonly routerRoleCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times the Node entered the OT_DEVICE_ROLE_LEADER role as specified within the
                     * Thread specification. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.18
                     */
                    readonly leaderRoleCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of attempts that have been made to attach to a Thread network while the Node was
                     * detached from all Thread networks. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.19
                     */
                    readonly attachAttemptCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times that the Thread network that the Node is connected to has changed its
                     * Partition ID. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.20
                     */
                    readonly partitionIdChangeCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times a Node has attempted to attach to a different Thread partition that it has
                     * determined is better than the partition it is currently attached to. This value shall only be reset upon
                     * a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.21
                     */
                    readonly betterPartitionAttachAttemptCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the number of times a Node has changed its parent. This value shall only be reset upon a Node
                     * reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.22
                     */
                    readonly parentChangeCount: OptionalAttribute<number, any>;
                };
            };
        }, {
            readonly flags: {
                readonly macCounts: true;
            };
            readonly component: {
                readonly attributes: {
                    /**
                     * Indicates the total number of unique MAC frame transmission requests. The attribute shall only be
                     * incremented by 1 for each MAC transmission request regardless of the amount of CCA failures, CSMA-CA
                     * attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.23
                     */
                    readonly txTotalCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique unicast MAC frame transmission requests. The attribute shall only be
                     * incremented by 1 for each unicast MAC transmission request regardless of the amount of CCA failures,
                     * CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.24
                     */
                    readonly txUnicastCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique broadcast MAC frame transmission requests. The attribute shall only
                     * be incremented by 1 for each broadcast MAC transmission request regardless of the amount of CCA failures,
                     * CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.25
                     */
                    readonly txBroadcastCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC frame transmission requests with requested acknowledgment. The
                     * attribute shall only be incremented by 1 for each MAC transmission request with requested acknowledgment
                     * regardless of the amount of CCA failures, CSMA-CA attempts, or retransmissions. This value shall only be
                     * reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.26
                     */
                    readonly txAckRequestedCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC frame transmission requests that were acked. The attribute shall
                     * only be incremented by 1 for each MAC transmission request that is acked regardless of the amount of CCA
                     * failures, CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.27
                     */
                    readonly txAckedCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC frame transmission requests withoutrequestedacknowledgment. The
                     * attribute shall only be incremented by 1 for each MAC transmission request that is does not request
                     * acknowledgement regardless of the amount of CCA failures, CSMA-CA attempts, or retransmissions.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.28
                     */
                    readonly txNoAckRequestedCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC Data frame transmission requests. The attribute shall only be
                     * incremented by 1 for each MAC Data frame transmission request regardless of the amount of CCA failures,
                     * CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.29
                     */
                    readonly txDataCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC Data Poll frame transmission requests. The attribute shall only
                     * be incremented by 1 for each MAC Data Poll frame transmission request regardless of the amount of CCA
                     * failures, CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.30
                     */
                    readonly txDataPollCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC Beacon frame transmission requests. The attribute shall only be
                     * incremented by 1 for each MAC Beacon frame transmission request regardless of the amount of CCA failures,
                     * CSMA-CA attempts, or retransmissions.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.31
                     */
                    readonly txBeaconCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC Beacon Request frame transmission requests. The attribute shall
                     * only be incremented by 1 for each MAC Beacon Request frame transmission request regardless of the amount
                     * of CCA failures, CSMA-CA attempts, or retransmissions. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.32
                     */
                    readonly txBeaconRequestCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC frame transmission requests that are not counted by any other
                     * attribute. The attribute shall only be incremented by 1 for each MAC frame transmission request
                     * regardless of the amount of CCA failures, CSMA-CA attempts, or retransmissions. This value shall only be
                     * reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.33
                     */
                    readonly txOtherCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of MAC retransmission attempts. The attribute shall only be incremented by 1
                     * for each retransmission attempt that may be triggered by lack of acknowledgement, CSMA/CA failure, or
                     * other type of transmission error. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.34
                     */
                    readonly txRetryCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC transmission packets that meet maximal retry limit for direct
                     * packets. The attribute shall only be incremented by 1 for each unique MAC transmission packets that meets
                     * the maximal retry limit for direct packets. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.35
                     */
                    readonly txDirectMaxRetryExpiryCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC transmission packets that meet maximal retry limit for indirect
                     * packets. The attribute shall only be incremented by 1 for each unique MAC transmission packets that meets
                     * the maximal retry limit for indirect packets. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.36
                     */
                    readonly txIndirectMaxRetryExpiryCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of CCA failures. The TxErrCcaCount attribute shall only be incremented by 1
                     * for each instance of a CCA failure. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.37
                     */
                    readonly txErrCcaCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC transmission request failures caused by an abort error. The
                     * attribute shall only be incremented by 1 for each unique MAC transmission request failure caused by an
                     * abort error.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.38
                     */
                    readonly txErrAbortCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of unique MAC transmission request failures caused by an error as the result
                     * of a busy channel (a CSMA/CA fail). The attribute shall only be incremented by 1 for each unique MAC
                     * transmission request failure caused by a busy channel such as a CSMA/CA failure.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.39
                     */
                    readonly txErrBusyChannelCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frames. This value shall only be reset upon a Node
                     * reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.40
                     */
                    readonly rxTotalCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique unicast MAC frames. This value shall only be reset upon a
                     * Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.41
                     */
                    readonly rxUnicastCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique broadcast MAC frames. This value shall only be reset upon a
                     * Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.42
                     */
                    readonly rxBroadcastCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC Data frames. This value shall only be reset upon a Node
                     * reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.43
                     */
                    readonly rxDataCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC Data Poll frames. This value shall only be reset upon a
                     * Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.44
                     */
                    readonly rxDataPollCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC Beacon frames. This value shall only be reset upon a
                     * Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.45
                     */
                    readonly rxBeaconCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC Beacon Request frames. This value shall only be reset
                     * upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.46
                     */
                    readonly rxBeaconRequestCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that are not counted by
                     * anyotherattribute. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.47
                     */
                    readonly rxOtherCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
                     * MAC filtering. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.48
                     */
                    readonly rxAddressFilteredCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of a
                     * destination address check. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.49
                     */
                    readonly rxDestAddrFilteredCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received MAC frame requests that have been dropped as a result of being a
                     * duplicate of a previously received MAC frame request. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.50
                     */
                    readonly rxDuplicatedCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
                     * missing or malformed frame contents. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.51
                     */
                    readonly rxErrNoFrameCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
                     * originating from an unknown neighbor device. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.52
                     */
                    readonly rxErrUnknownNeighborCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of
                     * containing an invalid source address. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.53
                     */
                    readonly rxErrInvalidSrcAddrCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of an
                     * error with the security of the received frame. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.54
                     */
                    readonly rxErrSecCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of an
                     * error with the FCS of the received frame. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.55
                     */
                    readonly rxErrFcsCount: OptionalAttribute<number, any>;
                    /**
                     * Indicates the total number of received unique MAC frame requests that have been dropped as a result of an
                     * error that is not counted by any other attribute. This value shall only be reset upon a Node reboot.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.14.6.56
                     */
                    readonly rxErrOtherCount: OptionalAttribute<number, any>;
                };
            };
        }];
    }, []>;
    /**
     * The Thread Network Diagnostics Cluster provides a means to acquire standardized diagnostics metrics that may be
     * used by a Node to assist a user or Administrator in diagnosing potential problems. The Thread Network Diagnostics
     * Cluster attempts to centralize all metrics that are relevant to a potential Thread radio running on a Node.
     *
     * ThreadNetworkDiagnosticsCluster supports optional features that you can enable with the
     * ThreadNetworkDiagnosticsCluster.with() factory method.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.14
     */
    interface Cluster extends Identity<typeof ClusterInstance> {
    }
    const Cluster: Cluster;
    /**
     * @see {@link Complete}
     */
    const CompleteInstance: MutableCluster<{
        readonly id: import("#general").Branded<53, "ClusterId">;
        readonly name: "ThreadNetworkDiagnostics";
        readonly revision: 3;
        readonly features: {
            /**
             * Server supports the counts for the number of received and transmitted packets on the Thread interface.
             */
            readonly packetCounts: BitFlag;
            /**
             * Server supports the counts for the number of errors that have occurred during the reception and
             * transmission of packets on the Thread interface.
             */
            readonly errorCounts: BitFlag;
            /**
             * Server supports the counts for various MLE layer happenings.
             */
            readonly mleCounts: BitFlag;
            /**
             * Server supports the counts for various MAC layer happenings.
             */
            readonly macCounts: BitFlag;
        };
        readonly attributes: {
            readonly overrunCount: Attribute<number | bigint, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
                readonly mandatoryIf: [] | [{
                    errorCounts: boolean;
                }];
            };
            readonly detachedRoleCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    mleCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly childRoleCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    mleCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly routerRoleCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    mleCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly leaderRoleCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    mleCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly attachAttemptCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    mleCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly partitionIdChangeCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    mleCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly betterPartitionAttachAttemptCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    mleCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly parentChangeCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    mleCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txTotalCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txUnicastCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txBroadcastCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txAckRequestedCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txAckedCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txNoAckRequestedCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txDataCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txDataPollCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txBeaconCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txBeaconRequestCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txOtherCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txRetryCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txDirectMaxRetryExpiryCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txIndirectMaxRetryExpiryCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txErrCcaCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txErrAbortCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly txErrBusyChannelCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxTotalCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxUnicastCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxBroadcastCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxDataCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxDataPollCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxBeaconCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxBeaconRequestCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxOtherCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxAddressFilteredCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxDestAddrFilteredCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxDuplicatedCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxErrNoFrameCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxErrUnknownNeighborCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxErrInvalidSrcAddrCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxErrSecCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxErrFcsCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly rxErrOtherCount: OptionalAttribute<number, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | [{
                    macCounts: boolean;
                }];
                readonly mandatoryIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
            };
            readonly channel: Attribute<number | null, any>;
            readonly routingRole: Attribute<RoutingRole | null, any>;
            readonly networkName: Attribute<string | null, any>;
            readonly panId: Attribute<number | null, any>;
            readonly extendedPanId: Attribute<number | bigint | null, any>;
            readonly meshLocalPrefix: Attribute<AllowSharedBufferSource | null, any>;
            readonly neighborTable: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall specify the IEEE 802.15.4 extended address for the neighboring Node. The uint64 value is
                 * composed by taking the 8 octets of the extended address EUI-64 and treating them as a big-endian integer. For
                 * example, octet string (in hexadecimal, from first octet to last) 00112233AABBCCDD would lead to a value of
                 * 0x00112233AABBCCDD.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.1
                 */
                extAddress: import("../tlv/TlvObject.js").FieldType<number | bigint>;
                /**
                 * This field shall specify the duration of time, in seconds, since a frame has been received from the
                 * neighboring Node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.2
                 */
                age: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the RLOC16 of the neighboring Node. The uint16 value is composed by taking the two
                 * RLOC16 and treating the octet string as if it was encoding a big-endian integer. For example, octet string
                 * (in hexadecimal, from first octet to last) 44AA would lead to a value of 0x44AA.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.3
                 */
                rloc16: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the number of link layer frames that have been received from the neighboring node.
                 * This field shall be reset to 0 upon a reboot of the Node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.4
                 */
                linkFrameCounter: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the number of Mesh Link Establishment frames that have been received from the
                 * neighboring node. This field shall be reset to 0 upon a reboot of the Node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.5
                 */
                mleFrameCounter: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
                 * scaled from 0 to 255.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.6
                 */
                lqi: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field SHOULD specify the average RSSI across all received frames from the neighboring Node since the
                 * receiving Node’s last reboot. If there is no known received frames this field SHOULD have the value of null.
                 * This field shall have the units of dBm, having the range -128 dBm to 0 dBm.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.7
                 */
                averageRssi: import("../tlv/TlvObject.js").FieldType<number | null>;
                /**
                 * This field shall specify the RSSI of the most recently received frame from the neighboring Node. If there is
                 * no known last received frame the LastRssi field SHOULD have the value of null. This field shall have the
                 * units of dBm, having the range -128 dBm to 0 dBm.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.8
                 */
                lastRssi: import("../tlv/TlvObject.js").FieldType<number | null>;
                /**
                 * This field shall specify the percentage of received frames from the neighboring Node that have resulted in
                 * errors.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.9
                 */
                frameErrorRate: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the percentage of received messages from the neighboring Node that have resulted in
                 * errors.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.10
                 */
                messageErrorRate: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify if the neighboring Node is capable of receiving frames while the Node is in an idle
                 * state.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.11
                 */
                rxOnWhenIdle: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if the neighboring Node is a full Thread device.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.12
                 */
                fullThreadDevice: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if the neighboring Node requires the full Network Data. If set to False, the
                 * neighboring Node only requires the stable Network Data.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.13
                 */
                fullNetworkData: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if the neighboring Node is a direct child of the Node reporting the NeighborTable
                 * attribute.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.4.14
                 */
                isChild: import("../tlv/TlvObject.js").FieldType<boolean>;
            }>[], any>;
            readonly routeTable: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall specify the IEEE 802.15.4 extended address for the Node for which this route table entry
                 * corresponds. The uint64 value is composed by taking the 8 octets of the extended address EUI-64 and treating
                 * them as a big-endian integer. For example, octet string (in hexadecimal, from first octet to last)
                 * 00112233AABBCCDD would lead to a value of 0x00112233AABBCCDD.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.1
                 */
                extAddress: import("../tlv/TlvObject.js").FieldType<number | bigint>;
                /**
                 * This field shall specify the RLOC16 for the Node for which this route table entry corresponds. The uint16
                 * value is composed by taking the two RLOC16 and treating the octet string as if it was encoding a big-endian
                 * integer. For example, octet string (in hexadecimal, from first octet to last) 44AA would lead to a value of
                 * 0x44AA.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.2
                 */
                rloc16: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the Router ID for the Node for which this route table entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.3
                 */
                routerId: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the Router ID for the next hop in the route to the Node for which this route table
                 * entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.4
                 */
                nextHop: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This Field shall specify the cost of the route to the Node for which this route table entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.5
                 */
                pathCost: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
                 * scaled from 0 to 255, from the perspective of the Node reporting the neighbor table.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.6
                 */
                lqiIn: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the implementation specific mix of IEEE 802.15.4 PDU receive quality indicators,
                 * scaled from 0 to 255, from the perspective of the Node specified within the NextHop field.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.7
                 */
                lqiOut: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the duration of time, in seconds, since a frame has been received from the Node for
                 * which this route table entry corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.8
                 */
                age: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify if the router ID as defined within the RouterId field has been allocated.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.9
                 */
                allocated: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall specify if a link has been established to the Node for which this route table entry
                 * corresponds.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.5.10
                 */
                linkEstablished: import("../tlv/TlvObject.js").FieldType<boolean>;
            }>[], any>;
            readonly partitionId: Attribute<number | null, any>;
            readonly weighting: Attribute<number | null, any>;
            readonly dataVersion: Attribute<number | null, any>;
            readonly stableDataVersion: Attribute<number | null, any>;
            readonly leaderRouterId: Attribute<number | null, any>;
            readonly activeTimestamp: OptionalAttribute<number | bigint | null, any>;
            readonly pendingTimestamp: OptionalAttribute<number | bigint | null, any>;
            readonly delay: OptionalAttribute<number | null, any>;
            readonly securityPolicy: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall specify the interval of time, in hours, that Thread security keys are rotated. Null when
                 * there is no dataset configured.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.6.1
                 */
                rotationTime: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall specify the flags as specified in Thread 1.3.0 section 8.10.1.15. Null when there is no
                 * dataset configured.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.6.2
                 */
                flags: import("../tlv/TlvObject.js").FieldType<number>;
            }> | null, any>;
            readonly channelPage0Mask: Attribute<AllowSharedBufferSource | null, any>;
            readonly operationalDatasetComponents: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall be True if the Node has an active timestamp present, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.1
                 */
                activeTimestampPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has a pending timestamp is present, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.2
                 */
                pendingTimestampPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the Thread master key, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.3
                 */
                masterKeyPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the Thread network’s name, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.4
                 */
                networkNamePresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has an extended Pan ID, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.5
                 */
                extendedPanIdPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the mesh local prefix, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.6
                 */
                meshLocalPrefixPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has the Thread network delay set, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.7
                 */
                delayPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has a Pan ID, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.8
                 */
                panIdPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has configured an operational channel for the Thread network, else
                 * False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.9
                 */
                channelPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has been configured with the Thread network Pskc, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.10
                 */
                pskcPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has been configured with the Thread network security policies, else
                 * False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.11
                 */
                securityPolicyPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
                /**
                 * This field shall be True if the Node has available a mask of available channels, else False.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.5.7.12
                 */
                channelMaskPresent: import("../tlv/TlvObject.js").FieldType<boolean>;
            }> | null, any>;
            readonly activeNetworkFaultsList: Attribute<NetworkFault[], any>;
            readonly extAddress: Attribute<number | bigint | null, any>;
            readonly rloc16: Attribute<number | null, any>;
            readonly clusterRevision: Attribute<number, never>;
            readonly featureMap: Attribute<import("../schema/BitmapSchema.js").TypeFromPartialBitSchema<{
                /**
                 * Server supports the counts for the number of received and transmitted packets on the Thread interface.
                 */
                readonly packetCounts: BitFlag;
                /**
                 * Server supports the counts for the number of errors that have occurred during the reception and
                 * transmission of packets on the Thread interface.
                 */
                readonly errorCounts: BitFlag;
                /**
                 * Server supports the counts for various MLE layer happenings.
                 */
                readonly mleCounts: BitFlag;
                /**
                 * Server supports the counts for various MAC layer happenings.
                 */
                readonly macCounts: BitFlag;
            }>, never>;
            readonly attributeList: Attribute<import("../index.js").AttributeId[], never>;
            readonly acceptedCommandList: Attribute<import("../index.js").CommandId[], never>;
            readonly generatedCommandList: Attribute<import("../index.js").CommandId[], never>;
        };
        readonly commands: {
            readonly resetCounts: Command<void, void, any> & {
                readonly optional: true;
                readonly isConditional: true;
                readonly optionalIf: [] | import("../cluster/Cluster.js").ConditionalFeatureList<import("../schema/BitmapSchema.js").BitSchema>;
                readonly mandatoryIf: [] | [{
                    errorCounts: boolean;
                }];
            };
        };
        readonly events: {
            /**
             * The ConnectionStatus Event shall indicate that a Node’s connection status to a Thread network has
             * changed.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.8.2
             */
            readonly connectionStatus: OptionalEvent<import("../tlv/TlvObject.js").TypeFromFields<{
                connectionStatus: import("../tlv/TlvObject.js").FieldType<ConnectionStatus>;
            }>, any>;
            /**
             * The NetworkFaultChange Event shall indicate a change in the set of network faults currently detected by
             * the Node.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.14.8.1
             */
            readonly networkFaultChange: OptionalEvent<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall represent the set of faults currently detected, as per Section 11.14.5.1, “NetworkFaultEnum
                 * Type”.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.8.1.1
                 */
                current: import("../tlv/TlvObject.js").FieldType<NetworkFault[]>;
                /**
                 * This field shall represent the set of faults detected prior to this change event, as per Section 11.14.5.1,
                 * “NetworkFaultEnum Type”.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.14.8.1.2
                 */
                previous: import("../tlv/TlvObject.js").FieldType<NetworkFault[]>;
            }>, any>;
        };
    }, []>;
    /**
     * This cluster supports all ThreadNetworkDiagnostics features. It may support illegal feature combinations.
     *
     * If you use this cluster you must manually specify which features are active and ensure the set of active features
     * is legal per the Matter specification.
     */
    interface Complete extends Identity<typeof CompleteInstance> {
    }
    const Complete: Complete;
}
export type ThreadNetworkDiagnosticsCluster = ThreadNetworkDiagnostics.Cluster;
export declare const ThreadNetworkDiagnosticsCluster: ThreadNetworkDiagnostics.Cluster;
//# sourceMappingURL=thread-network-diagnostics.d.ts.map