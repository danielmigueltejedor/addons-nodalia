/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
/*** THIS FILE IS GENERATED, DO NOT EDIT ***/
import { MutableCluster } from "../cluster/mutation/MutableCluster.js";
import { Attribute, Command } from "../cluster/Cluster.js";
import { TypeFromSchema } from "../tlv/TlvSchema.js";
import { Status } from "../globals/Status.js";
import { Identity } from "#general";
export declare namespace JointFabricDatastore {
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.16
     */
    enum DatastoreGroupKeySecurityPolicy {
        /**
         * Message counter synchronization using trust-first
         */
        TrustFirst = 0
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.17
     */
    enum DatastoreGroupKeyMulticastPolicy {
        /**
         * Indicates filtering of multicast messages for a specific Group ID
         */
        PerGroupId = 0,
        /**
         * Indicates not filtering of multicast messages
         */
        AllNodes = 1
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.18
     */
    const TlvDatastoreGroupKeySet: import("../tlv/TlvObject.js").ObjectSchema<{
        groupKeySetId: import("../tlv/TlvObject.js").FieldType<number>;
        groupKeySecurityPolicy: import("../tlv/TlvObject.js").FieldType<DatastoreGroupKeySecurityPolicy>;
        epochKey0: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
        epochStartTime0: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
        epochKey1: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
        epochStartTime1: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
        epochKey2: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
        epochStartTime2: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
        groupKeyMulticastPolicy: import("../tlv/TlvObject.js").OptionalFieldType<DatastoreGroupKeyMulticastPolicy>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.18
     */
    interface DatastoreGroupKeySet extends TypeFromSchema<typeof TlvDatastoreGroupKeySet> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.4
     */
    enum DatastoreAccessControlEntryPrivilege {
        /**
         * Can read and observe all (except Access Control Cluster)
         */
        View = 1,
        /**
         * @deprecated
         */
        ProxyView = 2,
        /**
         * View privileges, and can perform the primary function of this Node (except Access Control Cluster)
         */
        Operate = 3,
        /**
         * Operate privileges, and can modify persistent configuration of this Node (except Access Control Cluster)
         */
        Manage = 4,
        /**
         * Manage privileges, and can observe and modify the Access Control Cluster
         */
        Administer = 5
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.5
     */
    const TlvDatastoreGroupInformationEntry: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * The unique identifier for the group.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.1
         */
        groupId: import("../tlv/TlvObject.js").FieldType<number | bigint>;
        /**
         * The friendly name for the group.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.2
         */
        friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
        /**
         * The unique identifier for the group key set.
         *
         * This value may be null when multicast communication is not used for the group. When GroupPermission is Admin
         * or Manage, this value shall be null.
         *
         * A value of 0 is not allowed since this value is reserved for IPK and the group entry for this value is not
         * managed by the Datastore.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.3
         */
        groupKeySetId: import("../tlv/TlvObject.js").FieldType<number | null>;
        /**
         * CAT value for this group. This is used for control of individual members of a group (non-broadcast commands).
         *
         * Allowable values include the range 0x0000 to 0xEFFF, and the Administrator CAT and Anchor CAT values.
         *
         * This value may be null when unicast communication is not used for the group.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.4
         */
        groupCat: import("../tlv/TlvObject.js").FieldType<number | null>;
        /**
         * Current version number for this CAT.
         *
         * This value shall be null when GroupCAT value is null.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.5
         */
        groupCatVersion: import("../tlv/TlvObject.js").FieldType<number | null>;
        /**
         * The permission level associated with ACL entries for this group. There should be only one Administrator group
         * per fabric, and at most one Manage group per Ecosystem (Vendor Entry).
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.6
         */
        groupPermission: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryPrivilege>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.5
     */
    interface DatastoreGroupInformationEntry extends TypeFromSchema<typeof TlvDatastoreGroupInformationEntry> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.1
     */
    enum DatastoreState {
        /**
         * Target device operation is pending
         */
        Pending = 0,
        /**
         * Target device operation has been committed
         */
        Committed = 1,
        /**
         * Target device delete operation is pending
         */
        DeletePending = 2,
        /**
         * Target device operation has failed
         */
        CommitFailed = 3
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2
     */
    const TlvDatastoreStatusEntry: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * This field shall contain the current state of the target device operation.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
         */
        state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
        /**
         * This field shall contain the timestamp of the last update.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
         */
        updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * This field shall contain the StatusCode of the last failed operation where the State field is set to
         * CommitFailure.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
         */
        failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2
     */
    interface DatastoreStatusEntry extends TypeFromSchema<typeof TlvDatastoreStatusEntry> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.14
     */
    const TlvDatastoreNodeInformationEntry: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * The unique identifier for the node.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.14.1
         */
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        /**
         * Friendly name for this node which is not propagated to nodes.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.14.2
         */
        friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
        /**
         * Set to Pending prior to completing commissioning, set to Committed after commissioning complete is
         * successful, or set to CommitFailed if commissioning failed with the FailureCode Field set to the error.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.14.3
         */
        commissioningStatusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            /**
             * This field shall contain the current state of the target device operation.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
             */
            state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
            /**
             * This field shall contain the timestamp of the last update.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
             */
            updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
            /**
             * This field shall contain the StatusCode of the last failed operation where the State field is set to
             * CommitFailure.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
             */
            failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
        }>>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.14
     */
    interface DatastoreNodeInformationEntry extends TypeFromSchema<typeof TlvDatastoreNodeInformationEntry> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.15
     */
    const TlvDatastoreAdministratorInformationEntry: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * The unique identifier for the node.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.1
         */
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        /**
         * Friendly name for this node which is not propagated to nodes.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.2
         */
        friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
        /**
         * The Vendor ID for the node.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.3
         */
        vendorId: import("../tlv/TlvObject.js").FieldType<import("../datatype/VendorId.js").VendorId>;
        /**
         * The ICAC used to issue the NOC.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.4
         */
        icac: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.15
     */
    interface DatastoreAdministratorInformationEntry extends TypeFromSchema<typeof TlvDatastoreAdministratorInformationEntry> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.8
     */
    const TlvDatastoreEndpointGroupIdEntry: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * The unique identifier for the node.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.1
         */
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        /**
         * The unique identifier for the endpoint.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.2
         */
        endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
        /**
         * The unique identifier for the group.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.3
         */
        groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
        /**
         * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.4
         */
        statusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            /**
             * This field shall contain the current state of the target device operation.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
             */
            state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
            /**
             * This field shall contain the timestamp of the last update.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
             */
            updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
            /**
             * This field shall contain the StatusCode of the last failed operation where the State field is set to
             * CommitFailure.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
             */
            failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
        }>>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.8
     */
    interface DatastoreEndpointGroupIdEntry extends TypeFromSchema<typeof TlvDatastoreEndpointGroupIdEntry> {
    }
    /**
     * The DatastoreBindingTargetStruct represents a Binding on a specific Node (identified by the
     * DatastoreEndpointBindingEntryStruct) which is managed by the Datastore. Only bindings on a specific Node that are
     * fabric-scoped to the Joint Fabric are managed by the Datastore. As a result, references to nodes and groups are
     * specific to the Joint Fabric.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6
     */
    const TlvDatastoreBindingTarget: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * This field is the binding’s remote target node ID. If the Endpoint field is present, this field shall be
         * present.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.1
         */
        node: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/NodeId.js").NodeId>;
        /**
         * This field is the binding’s target group ID that represents remote endpoints. If the Endpoint field is
         * present, this field shall NOT be present.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.2
         */
        group: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/GroupId.js").GroupId>;
        /**
         * This field is the binding’s remote endpoint that the local endpoint is bound to. If the Group field is
         * present, this field shall NOT be present.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.3
         */
        endpoint: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
        /**
         * This field is the binding’s cluster ID (client & server) on the local and target endpoint(s). If this field
         * is present, the client cluster shall also exist on this endpoint (with this Binding cluster). If this field
         * is present, the target shall be this cluster on the target endpoint(s).
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.4
         */
        cluster: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/ClusterId.js").ClusterId>;
    }>;
    /**
     * The DatastoreBindingTargetStruct represents a Binding on a specific Node (identified by the
     * DatastoreEndpointBindingEntryStruct) which is managed by the Datastore. Only bindings on a specific Node that are
     * fabric-scoped to the Joint Fabric are managed by the Datastore. As a result, references to nodes and groups are
     * specific to the Joint Fabric.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6
     */
    interface DatastoreBindingTarget extends TypeFromSchema<typeof TlvDatastoreBindingTarget> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.7
     */
    const TlvDatastoreEndpointBindingEntry: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * The unique identifier for the node.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.1
         */
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        /**
         * The unique identifier for the endpoint.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.2
         */
        endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
        /**
         * The unique identifier for the entry in the Datastore’s EndpointBindingList attribute, which is a list of
         * DatastoreEndpointBindingEntryStruct.
         *
         * This field is used to uniquely identify an entry in the EndpointBindingList attribute for the purpose of
         * deletion (RemoveBindingFromEndpointForNode Command).
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.3
         */
        listId: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * The binding target structure.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.4
         */
        binding: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            /**
             * This field is the binding’s remote target node ID. If the Endpoint field is present, this field shall be
             * present.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.1
             */
            node: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/NodeId.js").NodeId>;
            /**
             * This field is the binding’s target group ID that represents remote endpoints. If the Endpoint field is
             * present, this field shall NOT be present.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.2
             */
            group: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/GroupId.js").GroupId>;
            /**
             * This field is the binding’s remote endpoint that the local endpoint is bound to. If the Group field is
             * present, this field shall NOT be present.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.3
             */
            endpoint: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
            /**
             * This field is the binding’s cluster ID (client & server) on the local and target endpoint(s). If this field
             * is present, the client cluster shall also exist on this endpoint (with this Binding cluster). If this field
             * is present, the target shall be this cluster on the target endpoint(s).
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.4
             */
            cluster: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/ClusterId.js").ClusterId>;
        }>>;
        /**
         * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.5
         */
        statusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            /**
             * This field shall contain the current state of the target device operation.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
             */
            state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
            /**
             * This field shall contain the timestamp of the last update.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
             */
            updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
            /**
             * This field shall contain the StatusCode of the last failed operation where the State field is set to
             * CommitFailure.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
             */
            failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
        }>>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.7
     */
    interface DatastoreEndpointBindingEntry extends TypeFromSchema<typeof TlvDatastoreEndpointBindingEntry> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.3
     */
    const TlvDatastoreNodeKeySetEntry: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * The unique identifier for the node.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.3.1
         */
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        groupKeySetId: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.3.3
         */
        statusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            /**
             * This field shall contain the current state of the target device operation.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
             */
            state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
            /**
             * This field shall contain the timestamp of the last update.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
             */
            updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
            /**
             * This field shall contain the StatusCode of the last failed operation where the State field is set to
             * CommitFailure.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
             */
            failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
        }>>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.3
     */
    interface DatastoreNodeKeySetEntry extends TypeFromSchema<typeof TlvDatastoreNodeKeySetEntry> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.10
     */
    enum DatastoreAccessControlEntryAuthMode {
        /**
         * Passcode authenticated session
         */
        Pase = 1,
        /**
         * Certificate authenticated session
         */
        Case = 2,
        /**
         * Group authenticated session
         */
        Group = 3
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.11
     */
    const TlvDatastoreAccessControlTarget: import("../tlv/TlvObject.js").ObjectSchema<{
        cluster: import("../tlv/TlvObject.js").FieldType<import("../datatype/ClusterId.js").ClusterId | null>;
        endpoint: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber | null>;
        deviceType: import("../tlv/TlvObject.js").FieldType<import("../datatype/DeviceTypeId.js").DeviceTypeId | null>;
    }>;
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.11
     */
    interface DatastoreAccessControlTarget extends TypeFromSchema<typeof TlvDatastoreAccessControlTarget> {
    }
    /**
     * The DatastoreAccessControlEntryStruct represents an ACL on a specific Node (identified by the
     * DatastoreACLEntryStruct) which is managed by the Datastore. Only ACLs on a specific Node that are fabric-scoped
     * to the Joint Fabric are managed by the Datastore. As a result, references to nodes and groups are specific to the
     * Joint Fabric.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.12
     */
    const TlvDatastoreAccessControlEntry: import("../tlv/TlvObject.js").ObjectSchema<{
        privilege: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryPrivilege>;
        authMode: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryAuthMode>;
        subjects: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId[] | null>;
        targets: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            cluster: import("../tlv/TlvObject.js").FieldType<import("../datatype/ClusterId.js").ClusterId | null>;
            endpoint: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber | null>;
            deviceType: import("../tlv/TlvObject.js").FieldType<import("../datatype/DeviceTypeId.js").DeviceTypeId | null>;
        }>[] | null>;
    }>;
    /**
     * The DatastoreAccessControlEntryStruct represents an ACL on a specific Node (identified by the
     * DatastoreACLEntryStruct) which is managed by the Datastore. Only ACLs on a specific Node that are fabric-scoped
     * to the Joint Fabric are managed by the Datastore. As a result, references to nodes and groups are specific to the
     * Joint Fabric.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.12
     */
    interface DatastoreAccessControlEntry extends TypeFromSchema<typeof TlvDatastoreAccessControlEntry> {
    }
    /**
     * The DatastoreACLEntryStruct is a holder for an ACL (DatastoreAccessControlEntryStruct) on a specific Node which
     * is managed by the Datastore. Only ACLs on a specific Node that are fabric-scoped to the Joint Fabric are managed
     * by the Datastore. As a result, references to nodes and groups are specific to the Joint Fabric.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.13
     */
    const TlvDatastoreAclEntry: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * The unique identifier for the node.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.1
         */
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        /**
         * The unique identifier for the ACL entry in the Datastore’s list of DatastoreACLEntry.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.2
         */
        listId: import("../tlv/TlvObject.js").FieldType<number>;
        /**
         * The Access Control Entry structure.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.3
         */
        aclEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            privilege: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryPrivilege>;
            authMode: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryAuthMode>;
            subjects: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId[] | null>;
            targets: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                cluster: import("../tlv/TlvObject.js").FieldType<import("../datatype/ClusterId.js").ClusterId | null>;
                endpoint: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber | null>;
                deviceType: import("../tlv/TlvObject.js").FieldType<import("../datatype/DeviceTypeId.js").DeviceTypeId | null>;
            }>[] | null>;
        }>>;
        /**
         * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.4
         */
        statusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            /**
             * This field shall contain the current state of the target device operation.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
             */
            state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
            /**
             * This field shall contain the timestamp of the last update.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
             */
            updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
            /**
             * This field shall contain the StatusCode of the last failed operation where the State field is set to
             * CommitFailure.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
             */
            failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
        }>>;
    }>;
    /**
     * The DatastoreACLEntryStruct is a holder for an ACL (DatastoreAccessControlEntryStruct) on a specific Node which
     * is managed by the Datastore. Only ACLs on a specific Node that are fabric-scoped to the Joint Fabric are managed
     * by the Datastore. As a result, references to nodes and groups are specific to the Joint Fabric.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.13
     */
    interface DatastoreAclEntry extends TypeFromSchema<typeof TlvDatastoreAclEntry> {
    }
    /**
     * The DatastoreEndpointEntryStruct represents an Endpoint on a specific Node which is managed bytheDatastore. Only
     * Nodes on the Joint Fabric are managed by the Datastore. As a result, references to NodeID are specific to the
     * Joint Fabric.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.9
     */
    const TlvDatastoreEndpointEntry: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * The unique identifier for the endpoint.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.1
         */
        endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
        /**
         * The unique identifier for the node.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.2
         */
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        /**
         * Friendly name for this endpoint which is propagated to nodes. Any changes to Friendly Name or Group Id List
         * (add/remove entry) must follow the pending→committed workflow with current state reflected in the Status
         * Entry.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.3
         */
        friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
        /**
         * Indicates whether changes to Friendly Name are pending, committed, or commit-failed.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.4
         */
        statusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            /**
             * This field shall contain the current state of the target device operation.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
             */
            state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
            /**
             * This field shall contain the timestamp of the last update.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
             */
            updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
            /**
             * This field shall contain the StatusCode of the last failed operation where the State field is set to
             * CommitFailure.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
             */
            failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
        }>>;
    }>;
    /**
     * The DatastoreEndpointEntryStruct represents an Endpoint on a specific Node which is managed bytheDatastore. Only
     * Nodes on the Joint Fabric are managed by the Datastore. As a result, references to NodeID are specific to the
     * Joint Fabric.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.9
     */
    interface DatastoreEndpointEntry extends TypeFromSchema<typeof TlvDatastoreEndpointEntry> {
    }
    /**
     * Input to the JointFabricDatastore addKeySet command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.1
     */
    const TlvAddKeySetRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        groupKeySet: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            groupKeySetId: import("../tlv/TlvObject.js").FieldType<number>;
            groupKeySecurityPolicy: import("../tlv/TlvObject.js").FieldType<DatastoreGroupKeySecurityPolicy>;
            epochKey0: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
            epochStartTime0: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
            epochKey1: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
            epochStartTime1: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
            epochKey2: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
            epochStartTime2: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
            groupKeyMulticastPolicy: import("../tlv/TlvObject.js").OptionalFieldType<DatastoreGroupKeyMulticastPolicy>;
        }>>;
    }>;
    /**
     * Input to the JointFabricDatastore addKeySet command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.1
     */
    interface AddKeySetRequest extends TypeFromSchema<typeof TlvAddKeySetRequest> {
    }
    /**
     * Input to the JointFabricDatastore updateKeySet command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.2
     */
    const TlvUpdateKeySetRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        groupKeySet: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            groupKeySetId: import("../tlv/TlvObject.js").FieldType<number>;
            groupKeySecurityPolicy: import("../tlv/TlvObject.js").FieldType<DatastoreGroupKeySecurityPolicy>;
            epochKey0: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
            epochStartTime0: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
            epochKey1: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
            epochStartTime1: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
            epochKey2: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
            epochStartTime2: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
            groupKeyMulticastPolicy: import("../tlv/TlvObject.js").OptionalFieldType<DatastoreGroupKeyMulticastPolicy>;
        }>>;
    }>;
    /**
     * Input to the JointFabricDatastore updateKeySet command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.2
     */
    interface UpdateKeySetRequest extends TypeFromSchema<typeof TlvUpdateKeySetRequest> {
    }
    /**
     * Input to the JointFabricDatastore removeKeySet command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.3
     */
    const TlvRemoveKeySetRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        groupKeySetId: import("../tlv/TlvObject.js").FieldType<number>;
    }>;
    /**
     * Input to the JointFabricDatastore removeKeySet command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.3
     */
    interface RemoveKeySetRequest extends TypeFromSchema<typeof TlvRemoveKeySetRequest> {
    }
    /**
     * Input to the JointFabricDatastore addGroup command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.4
     */
    const TlvAddGroupRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
        friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
        groupKeySetId: import("../tlv/TlvObject.js").FieldType<number | null>;
        groupCat: import("../tlv/TlvObject.js").FieldType<number | null>;
        groupCatVersion: import("../tlv/TlvObject.js").FieldType<number | null>;
        groupPermission: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryPrivilege>;
    }>;
    /**
     * Input to the JointFabricDatastore addGroup command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.4
     */
    interface AddGroupRequest extends TypeFromSchema<typeof TlvAddGroupRequest> {
    }
    /**
     * Input to the JointFabricDatastore updateGroup command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.5
     */
    const TlvUpdateGroupRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
        friendlyName: import("../tlv/TlvObject.js").FieldType<string | null>;
        groupKeySetId: import("../tlv/TlvObject.js").FieldType<number | null>;
        groupCat: import("../tlv/TlvObject.js").FieldType<number | null>;
        groupCatVersion: import("../tlv/TlvObject.js").FieldType<number | null>;
        groupPermission: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryPrivilege>;
    }>;
    /**
     * Input to the JointFabricDatastore updateGroup command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.5
     */
    interface UpdateGroupRequest extends TypeFromSchema<typeof TlvUpdateGroupRequest> {
    }
    /**
     * Input to the JointFabricDatastore removeGroup command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.6
     */
    const TlvRemoveGroupRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
    }>;
    /**
     * Input to the JointFabricDatastore removeGroup command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.6
     */
    interface RemoveGroupRequest extends TypeFromSchema<typeof TlvRemoveGroupRequest> {
    }
    /**
     * Input to the JointFabricDatastore addAdmin command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.7
     */
    const TlvAddAdminRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
        vendorId: import("../tlv/TlvObject.js").FieldType<import("../datatype/VendorId.js").VendorId>;
        icac: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
    }>;
    /**
     * Input to the JointFabricDatastore addAdmin command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.7
     */
    interface AddAdminRequest extends TypeFromSchema<typeof TlvAddAdminRequest> {
    }
    /**
     * Input to the JointFabricDatastore updateAdmin command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.8
     */
    const TlvUpdateAdminRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId | null>;
        friendlyName: import("../tlv/TlvObject.js").FieldType<string | null>;
        icac: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
    }>;
    /**
     * Input to the JointFabricDatastore updateAdmin command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.8
     */
    interface UpdateAdminRequest extends TypeFromSchema<typeof TlvUpdateAdminRequest> {
    }
    /**
     * Input to the JointFabricDatastore removeAdmin command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.9
     */
    const TlvRemoveAdminRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
    }>;
    /**
     * Input to the JointFabricDatastore removeAdmin command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.9
     */
    interface RemoveAdminRequest extends TypeFromSchema<typeof TlvRemoveAdminRequest> {
    }
    /**
     * Input to the JointFabricDatastore addPendingNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.10
     */
    const TlvAddPendingNodeRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
    }>;
    /**
     * Input to the JointFabricDatastore addPendingNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.10
     */
    interface AddPendingNodeRequest extends TypeFromSchema<typeof TlvAddPendingNodeRequest> {
    }
    /**
     * Input to the JointFabricDatastore refreshNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.11
     */
    const TlvRefreshNodeRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
    }>;
    /**
     * Input to the JointFabricDatastore refreshNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.11
     */
    interface RefreshNodeRequest extends TypeFromSchema<typeof TlvRefreshNodeRequest> {
    }
    /**
     * Input to the JointFabricDatastore updateNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.12
     */
    const TlvUpdateNodeRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
    }>;
    /**
     * Input to the JointFabricDatastore updateNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.12
     */
    interface UpdateNodeRequest extends TypeFromSchema<typeof TlvUpdateNodeRequest> {
    }
    /**
     * Input to the JointFabricDatastore removeNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.13
     */
    const TlvRemoveNodeRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
    }>;
    /**
     * Input to the JointFabricDatastore removeNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.13
     */
    interface RemoveNodeRequest extends TypeFromSchema<typeof TlvRemoveNodeRequest> {
    }
    /**
     * Input to the JointFabricDatastore updateEndpointForNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.14
     */
    const TlvUpdateEndpointForNodeRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
    }>;
    /**
     * Input to the JointFabricDatastore updateEndpointForNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.14
     */
    interface UpdateEndpointForNodeRequest extends TypeFromSchema<typeof TlvUpdateEndpointForNodeRequest> {
    }
    /**
     * Input to the JointFabricDatastore addGroupIdToEndpointForNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.15
     */
    const TlvAddGroupIdToEndpointForNodeRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
        groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
    }>;
    /**
     * Input to the JointFabricDatastore addGroupIdToEndpointForNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.15
     */
    interface AddGroupIdToEndpointForNodeRequest extends TypeFromSchema<typeof TlvAddGroupIdToEndpointForNodeRequest> {
    }
    /**
     * Input to the JointFabricDatastore removeGroupIdFromEndpointForNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.16
     */
    const TlvRemoveGroupIdFromEndpointForNodeRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
        groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
    }>;
    /**
     * Input to the JointFabricDatastore removeGroupIdFromEndpointForNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.16
     */
    interface RemoveGroupIdFromEndpointForNodeRequest extends TypeFromSchema<typeof TlvRemoveGroupIdFromEndpointForNodeRequest> {
    }
    /**
     * Input to the JointFabricDatastore addBindingToEndpointForNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.17
     */
    const TlvAddBindingToEndpointForNodeRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
        binding: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            /**
             * This field is the binding’s remote target node ID. If the Endpoint field is present, this field shall be
             * present.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.1
             */
            node: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/NodeId.js").NodeId>;
            /**
             * This field is the binding’s target group ID that represents remote endpoints. If the Endpoint field is
             * present, this field shall NOT be present.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.2
             */
            group: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/GroupId.js").GroupId>;
            /**
             * This field is the binding’s remote endpoint that the local endpoint is bound to. If the Group field is
             * present, this field shall NOT be present.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.3
             */
            endpoint: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
            /**
             * This field is the binding’s cluster ID (client & server) on the local and target endpoint(s). If this field
             * is present, the client cluster shall also exist on this endpoint (with this Binding cluster). If this field
             * is present, the target shall be this cluster on the target endpoint(s).
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.4
             */
            cluster: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/ClusterId.js").ClusterId>;
        }>>;
    }>;
    /**
     * Input to the JointFabricDatastore addBindingToEndpointForNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.17
     */
    interface AddBindingToEndpointForNodeRequest extends TypeFromSchema<typeof TlvAddBindingToEndpointForNodeRequest> {
    }
    /**
     * Input to the JointFabricDatastore removeBindingFromEndpointForNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.18
     */
    const TlvRemoveBindingFromEndpointForNodeRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        listId: import("../tlv/TlvObject.js").FieldType<number>;
        endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
    }>;
    /**
     * Input to the JointFabricDatastore removeBindingFromEndpointForNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.18
     */
    interface RemoveBindingFromEndpointForNodeRequest extends TypeFromSchema<typeof TlvRemoveBindingFromEndpointForNodeRequest> {
    }
    /**
     * Input to the JointFabricDatastore addAclToNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.19
     */
    const TlvAddAclToNodeRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
        aclEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
            privilege: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryPrivilege>;
            authMode: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryAuthMode>;
            subjects: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId[] | null>;
            targets: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                cluster: import("../tlv/TlvObject.js").FieldType<import("../datatype/ClusterId.js").ClusterId | null>;
                endpoint: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber | null>;
                deviceType: import("../tlv/TlvObject.js").FieldType<import("../datatype/DeviceTypeId.js").DeviceTypeId | null>;
            }>[] | null>;
        }>>;
    }>;
    /**
     * Input to the JointFabricDatastore addAclToNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.19
     */
    interface AddAclToNodeRequest extends TypeFromSchema<typeof TlvAddAclToNodeRequest> {
    }
    /**
     * Input to the JointFabricDatastore removeAclFromNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.20
     */
    const TlvRemoveAclFromNodeRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        listId: import("../tlv/TlvObject.js").FieldType<number>;
        nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
    }>;
    /**
     * Input to the JointFabricDatastore removeAclFromNode command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.7.20
     */
    interface RemoveAclFromNodeRequest extends TypeFromSchema<typeof TlvRemoveAclFromNodeRequest> {
    }
    /**
     * @see {@link Cluster}
     */
    const ClusterInstance: MutableCluster<{
        readonly id: 1874;
        readonly name: "JointFabricDatastore";
        readonly revision: 1;
        readonly attributes: {
            /**
             * This shall indicate the Anchor Root CA used to sign all NOC Issuers in the Joint Fabric for the accessing
             * fabric. A null value indicates that the Joint Fabric is not yet formed.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.1
             */
            readonly anchorRootCa: Attribute<AllowSharedBufferSource, any>;
            /**
             * This shall indicate the Node identifier of the Joint Fabric Anchor Root CA for the accessing fabric.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.2
             */
            readonly anchorNodeId: Attribute<import("../datatype/NodeId.js").NodeId, any>;
            /**
             * This shall indicate the Vendor identifier of the Joint Fabric Anchor Root CA for the accessing fabric.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.3
             */
            readonly anchorVendorId: Attribute<import("../datatype/VendorId.js").VendorId, any>;
            /**
             * Friendly name for the accessing fabric which can be propagated to nodes.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.4
             */
            readonly friendlyName: Attribute<string, any>;
            /**
             * This shall indicate the list of DatastoreGroupKeySetStruct used in the Joint Fabric for the accessing
             * fabric.
             *
             * This attribute shall contain at least one entry, the IPK, which has GroupKeySetID of 0.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.5
             */
            readonly groupKeySetList: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                groupKeySetId: import("../tlv/TlvObject.js").FieldType<number>;
                groupKeySecurityPolicy: import("../tlv/TlvObject.js").FieldType<DatastoreGroupKeySecurityPolicy>;
                epochKey0: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
                epochStartTime0: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
                epochKey1: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
                epochStartTime1: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
                epochKey2: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
                epochStartTime2: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
                groupKeyMulticastPolicy: import("../tlv/TlvObject.js").OptionalFieldType<DatastoreGroupKeyMulticastPolicy>;
            }>[], any>;
            /**
             * This shall indicate the list of groups in the Joint Fabric for the accessing fabric.
             *
             * This list must include, at a minimum, one group with GroupCAT value set to Administrator CAT and one
             * group with GroupCAT value set to Anchor CAT.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.6
             */
            readonly groupList: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * The unique identifier for the group.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.1
                 */
                groupId: import("../tlv/TlvObject.js").FieldType<number | bigint>;
                /**
                 * The friendly name for the group.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.2
                 */
                friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
                /**
                 * The unique identifier for the group key set.
                 *
                 * This value may be null when multicast communication is not used for the group. When GroupPermission is Admin
                 * or Manage, this value shall be null.
                 *
                 * A value of 0 is not allowed since this value is reserved for IPK and the group entry for this value is not
                 * managed by the Datastore.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.3
                 */
                groupKeySetId: import("../tlv/TlvObject.js").FieldType<number | null>;
                /**
                 * CAT value for this group. This is used for control of individual members of a group (non-broadcast commands).
                 *
                 * Allowable values include the range 0x0000 to 0xEFFF, and the Administrator CAT and Anchor CAT values.
                 *
                 * This value may be null when unicast communication is not used for the group.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.4
                 */
                groupCat: import("../tlv/TlvObject.js").FieldType<number | null>;
                /**
                 * Current version number for this CAT.
                 *
                 * This value shall be null when GroupCAT value is null.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.5
                 */
                groupCatVersion: import("../tlv/TlvObject.js").FieldType<number | null>;
                /**
                 * The permission level associated with ACL entries for this group. There should be only one Administrator group
                 * per fabric, and at most one Manage group per Ecosystem (Vendor Entry).
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.6
                 */
                groupPermission: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryPrivilege>;
            }>[], any>;
            /**
             * This shall indicate the list of nodes in the Joint Fabric for the accessing fabric.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.7
             */
            readonly nodeList: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * The unique identifier for the node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.14.1
                 */
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                /**
                 * Friendly name for this node which is not propagated to nodes.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.14.2
                 */
                friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
                /**
                 * Set to Pending prior to completing commissioning, set to Committed after commissioning complete is
                 * successful, or set to CommitFailed if commissioning failed with the FailureCode Field set to the error.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.14.3
                 */
                commissioningStatusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    /**
                     * This field shall contain the current state of the target device operation.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
                     */
                    state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
                    /**
                     * This field shall contain the timestamp of the last update.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
                     */
                    updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
                    /**
                     * This field shall contain the StatusCode of the last failed operation where the State field is set to
                     * CommitFailure.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
                     */
                    failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
                }>>;
            }>[], any>;
            /**
             * This shall indicate the list of administrators in the Joint Fabric for the accessing fabric.
             *
             * Only one Administrator may serve as the Anchor Root CA and Anchor Fabric Administrator and shall have
             * index value 0. All other Joint Fabric Administrators shall be referenced at index 1 or greater.
             *
             * A null value or empty list indicates that the Joint Fabric is not yet formed.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.8
             */
            readonly adminList: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * The unique identifier for the node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.1
                 */
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                /**
                 * Friendly name for this node which is not propagated to nodes.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.2
                 */
                friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
                /**
                 * The Vendor ID for the node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.3
                 */
                vendorId: import("../tlv/TlvObject.js").FieldType<import("../datatype/VendorId.js").VendorId>;
                /**
                 * The ICAC used to issue the NOC.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.4
                 */
                icac: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
            }>[], any>;
            /**
             * This shall indicate the current state of the Joint Fabric Datastore Cluster for the accessing fabric.
             *
             * The Committed status indicates the DataStore is ready for use. The Pending status indicates that the
             * DataStore is not yet ready for use. The DeletePending status indicates that the DataStore is in the
             * process of being transferred to another Joint Fabric Anchor Administrator.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.9
             */
            readonly status: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall contain the current state of the target device operation.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
                 */
                state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
                /**
                 * This field shall contain the timestamp of the last update.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
                 */
                updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * This field shall contain the StatusCode of the last failed operation where the State field is set to
                 * CommitFailure.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
                 */
                failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
            }>, any>;
            /**
             * This shall indicate the group membership of endpoints in the accessing fabric.
             *
             * Any changes to this List (add/remove entry) must follow the pending→committed workflow with current state
             * reflected in the Status Entry.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.10
             */
            readonly endpointGroupIdList: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * The unique identifier for the node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.1
                 */
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                /**
                 * The unique identifier for the endpoint.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.2
                 */
                endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
                /**
                 * The unique identifier for the group.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.3
                 */
                groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
                /**
                 * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.4
                 */
                statusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    /**
                     * This field shall contain the current state of the target device operation.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
                     */
                    state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
                    /**
                     * This field shall contain the timestamp of the last update.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
                     */
                    updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
                    /**
                     * This field shall contain the StatusCode of the last failed operation where the State field is set to
                     * CommitFailure.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
                     */
                    failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
                }>>;
            }>[], any>;
            /**
             * This shall indicate the binding list for endpoints in the accessing fabric.
             *
             * Any changes to this List (add/remove entry) must follow the pending→committed workflow with current state
             * reflected in the Status Entry.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.11
             */
            readonly endpointBindingList: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * The unique identifier for the node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.1
                 */
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                /**
                 * The unique identifier for the endpoint.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.2
                 */
                endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
                /**
                 * The unique identifier for the entry in the Datastore’s EndpointBindingList attribute, which is a list of
                 * DatastoreEndpointBindingEntryStruct.
                 *
                 * This field is used to uniquely identify an entry in the EndpointBindingList attribute for the purpose of
                 * deletion (RemoveBindingFromEndpointForNode Command).
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.3
                 */
                listId: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * The binding target structure.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.4
                 */
                binding: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    /**
                     * This field is the binding’s remote target node ID. If the Endpoint field is present, this field shall be
                     * present.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.1
                     */
                    node: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/NodeId.js").NodeId>;
                    /**
                     * This field is the binding’s target group ID that represents remote endpoints. If the Endpoint field is
                     * present, this field shall NOT be present.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.2
                     */
                    group: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/GroupId.js").GroupId>;
                    /**
                     * This field is the binding’s remote endpoint that the local endpoint is bound to. If the Group field is
                     * present, this field shall NOT be present.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.3
                     */
                    endpoint: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
                    /**
                     * This field is the binding’s cluster ID (client & server) on the local and target endpoint(s). If this field
                     * is present, the client cluster shall also exist on this endpoint (with this Binding cluster). If this field
                     * is present, the target shall be this cluster on the target endpoint(s).
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.4
                     */
                    cluster: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/ClusterId.js").ClusterId>;
                }>>;
                /**
                 * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.5
                 */
                statusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    /**
                     * This field shall contain the current state of the target device operation.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
                     */
                    state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
                    /**
                     * This field shall contain the timestamp of the last update.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
                     */
                    updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
                    /**
                     * This field shall contain the StatusCode of the last failed operation where the State field is set to
                     * CommitFailure.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
                     */
                    failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
                }>>;
            }>[], any>;
            /**
             * This shall indicate the KeySet entries for nodes in the accessing fabric.
             *
             * Any changes to this List (add/remove entry) must follow the pending→committed workflow with current state
             * reflected in the Status Entry.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.12
             */
            readonly nodeKeySetList: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * The unique identifier for the node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.3.1
                 */
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                groupKeySetId: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.3.3
                 */
                statusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    /**
                     * This field shall contain the current state of the target device operation.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
                     */
                    state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
                    /**
                     * This field shall contain the timestamp of the last update.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
                     */
                    updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
                    /**
                     * This field shall contain the StatusCode of the last failed operation where the State field is set to
                     * CommitFailure.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
                     */
                    failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
                }>>;
            }>[], any>;
            /**
             * This shall indicate the ACL entries for nodes in the accessing fabric.
             *
             * Any changes to this List (add/remove entry) must follow the pending→committed workflow with current state
             * reflected in the Status Entry.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.13
             */
            readonly nodeAclList: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * The unique identifier for the node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.1
                 */
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                /**
                 * The unique identifier for the ACL entry in the Datastore’s list of DatastoreACLEntry.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.2
                 */
                listId: import("../tlv/TlvObject.js").FieldType<number>;
                /**
                 * The Access Control Entry structure.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.3
                 */
                aclEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    privilege: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryPrivilege>;
                    authMode: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryAuthMode>;
                    subjects: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId[] | null>;
                    targets: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                        cluster: import("../tlv/TlvObject.js").FieldType<import("../datatype/ClusterId.js").ClusterId | null>;
                        endpoint: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber | null>;
                        deviceType: import("../tlv/TlvObject.js").FieldType<import("../datatype/DeviceTypeId.js").DeviceTypeId | null>;
                    }>[] | null>;
                }>>;
                /**
                 * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.4
                 */
                statusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    /**
                     * This field shall contain the current state of the target device operation.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
                     */
                    state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
                    /**
                     * This field shall contain the timestamp of the last update.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
                     */
                    updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
                    /**
                     * This field shall contain the StatusCode of the last failed operation where the State field is set to
                     * CommitFailure.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
                     */
                    failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
                }>>;
            }>[], any>;
            /**
             * This shall indicate the Endpoint entries for nodes in the accessing fabric.
             *
             * Any changes to this List (add/remove entry) must follow the pending→committed workflow with current state
             * reflected in the Status Entry.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.6.14
             */
            readonly nodeEndpointList: Attribute<import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * The unique identifier for the endpoint.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.1
                 */
                endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
                /**
                 * The unique identifier for the node.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.2
                 */
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                /**
                 * Friendly name for this endpoint which is propagated to nodes. Any changes to Friendly Name or Group Id List
                 * (add/remove entry) must follow the pending→committed workflow with current state reflected in the Status
                 * Entry.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.3
                 */
                friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
                /**
                 * Indicates whether changes to Friendly Name are pending, committed, or commit-failed.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.4
                 */
                statusEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    /**
                     * This field shall contain the current state of the target device operation.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
                     */
                    state: import("../tlv/TlvObject.js").FieldType<DatastoreState>;
                    /**
                     * This field shall contain the timestamp of the last update.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
                     */
                    updateTimestamp: import("../tlv/TlvObject.js").FieldType<number>;
                    /**
                     * This field shall contain the StatusCode of the last failed operation where the State field is set to
                     * CommitFailure.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
                     */
                    failureCode: import("../tlv/TlvObject.js").FieldType<Status>;
                }>>;
            }>[], any>;
        };
        readonly commands: {
            /**
             * This command shall be used to add a KeySet to the Joint Fabric Datastore Cluster of the accessing fabric.
             *
             * GroupKeySet represents the KeySet to be added to the Joint Fabric Datastore Cluster.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. Ensure there are no KeySets in the KeySetList attribute with the given GroupKeySetID.
             *
             *   2. If a match is found, return CONSTRAINT_ERROR.
             *
             *   3. Add the Epoch Key Entry for the KeySet to the KeySetList attribute.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.1
             */
            readonly addKeySet: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                groupKeySet: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    groupKeySetId: import("../tlv/TlvObject.js").FieldType<number>;
                    groupKeySecurityPolicy: import("../tlv/TlvObject.js").FieldType<DatastoreGroupKeySecurityPolicy>;
                    epochKey0: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
                    epochStartTime0: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
                    epochKey1: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
                    epochStartTime1: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
                    epochKey2: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
                    epochStartTime2: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
                    groupKeyMulticastPolicy: import("../tlv/TlvObject.js").OptionalFieldType<DatastoreGroupKeyMulticastPolicy>;
                }>>;
            }>, void, any>;
            /**
             * This command shall be used to update a KeySet in the Joint Fabric Datastore Cluster of the accessing
             * fabric.
             *
             * GroupKeySet represents the KeySet to be updated in the Joint Fabric Datastore Cluster.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. Find the Epoch Key Entry for the KeySet in the KeySetList attribute with the given GroupKeySetID,
             *      and update any changed fields.
             *
             *   2. If entry is not found, return NOT_FOUND.
             *
             *   3. If any fields are changed as a result of this command:
             *
             *     a. Iterate through each Node Information Entry:
             *
             *       i. If the NodeKeySetList contains an entry with the given GroupKeySetID:
             *
             *         A. Update the Status on the given DatastoreNodeKeySetEntryStruct tp Pending.
             *
             *         B. Update the GroupKeySet on the given Node with the new values.
             *
             *           I. If successful, update the Status on this DatastoreNodeKeySetEntryStruct to Committed.
             *
             *           II. If not successful, update the State field of the StatusEntry on this
             *               DatastoreNodeKeySetEntryStruct to CommitFailed and FailureCode code to the returned error.
             *               The pending change shall be applied in a subsequent Node Refresh.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.2
             */
            readonly updateKeySet: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                groupKeySet: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    groupKeySetId: import("../tlv/TlvObject.js").FieldType<number>;
                    groupKeySecurityPolicy: import("../tlv/TlvObject.js").FieldType<DatastoreGroupKeySecurityPolicy>;
                    epochKey0: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
                    epochStartTime0: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
                    epochKey1: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
                    epochStartTime1: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
                    epochKey2: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
                    epochStartTime2: import("../tlv/TlvObject.js").FieldType<number | bigint | null>;
                    groupKeyMulticastPolicy: import("../tlv/TlvObject.js").OptionalFieldType<DatastoreGroupKeyMulticastPolicy>;
                }>>;
            }>, void, any>;
            /**
             * This command shall be used to remove a KeySet from the Joint Fabric Datastore Cluster of the accessing
             * fabric.
             *
             * GroupKeySetID represents the unique identifier for the KeySet to be removed from the Joint Fabric
             * Datastore Cluster.
             *
             * Attempt to remove the IPK, which has GroupKeySetID of 0, shall fail with response CONSTRAINT_ERROR.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. If entry is not found, return NOT_FOUND.
             *
             *   2. Ensure there are no Nodes using this KeySet. To do this:
             *
             *     a. Iterate through each Node Information Entry:
             *
             *       i. If the NodeKeySetList list contains an entry with the given GroupKeySetID, and the entry does
             *          NOT have Status DeletePending, then return CONSTRAINT_ERROR.
             *
             *   3. Remove the DatastoreGroupKeySetStruct for the given GroupKeySetID from the GroupKeySetList
             *      attribute.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.3
             */
            readonly removeKeySet: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                groupKeySetId: import("../tlv/TlvObject.js").FieldType<number>;
            }>, void, any>;
            /**
             * This command shall be used to add a group to the Joint Fabric Datastore Cluster of the accessing fabric.
             *
             * GroupInformationEntry represents the group to be added to the Joint Fabric Datastore Cluster.
             *
             * GroupCAT values shall fall within the range 1 to 65534. Attempts to add a group with a GroupCAT value of
             * Administrator CAT or Anchor CAT shall fail with CONSTRAINT_ERROR.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. Ensure there are no Groups in the GroupList attribute with the given GroupID. If a match is found,
             *      return CONSTRAINT_ERROR.
             *
             *   2. Add the DatastoreGroupInformationEntryStruct for the Group with the given GroupID to the GroupList
             *      attribute.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.4
             */
            readonly addGroup: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
                friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
                groupKeySetId: import("../tlv/TlvObject.js").FieldType<number | null>;
                groupCat: import("../tlv/TlvObject.js").FieldType<number | null>;
                groupCatVersion: import("../tlv/TlvObject.js").FieldType<number | null>;
                groupPermission: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryPrivilege>;
            }>, void, any>;
            /**
             * This command shall be used to update a group in the Joint Fabric Datastore Cluster of the accessing
             * fabric.
             *
             * GroupID represents the group to be updated in the Joint Fabric Datastore Cluster. NULL values for the
             * additional parameters will be ignored (not updated).
             *
             * GroupCAT values shall fall within the range 1 to 65534. Attempts to update the GroupCAT on an existing
             * group which has a GroupCAT value of Administrator CAT or Anchor CAT shall fail with CONSTRAINT_ERROR.
             *
             * Attempts to set the GroupCAT to Administrator CAT or Anchor CAT shall fail with CONSTRAINT_ERROR.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. If entry is not found, return NOT_FOUND.
             *
             *   2. Update the DatastoreGroupInformationEntryStruct for the Group with the given GroupID to match the
             *      non-NULL fields passed in.
             *
             *   3. If any fields are changed as a result of this command:
             *
             *     a. Iterate through each Node Information Entry:
             *
             *       i. If the GroupKeySetID changed:
             *
             *         I. Add a DatastoreNodeKeySetEntryStruct with the new GroupKeySetID, and Status set to Pending.
             *
             *         II. Add this KeySet to the Node.
             *
             *   1. If successful, Set the Status to Committed for this entry in the NodeKeySetList.
             *
             *   2. If not successful, Set the Status to CommitFailed and the FailureCode to the returned error. The
             *      pending change shall be applied in a subsequent Node Refresh.
             *
             *     A. If the NodeKeySetList list contains an entry with the previous GroupKeySetID:
             *
             *     III. Set the Status set to DeletePending.
             *
             *     IV. Remove this KeySet from the Node.
             *
             *   1. If successful, Remove this entry from the NodeKeySetList.
             *
             *   2. If not successful, the pending change shall be applied in a subsequent Node Refresh.
             *
             * ii. If the GroupCAT, GroupCATVersion or GroupPermission changed:
             *
             *   A. If the ACLList contains an entry for this Group, update the ACL List Entry in the Datastore with the
             *      new values and Status Pending, update the ACL attribute on the given Node with the new values. If
             *      the update succeeds, set the Status to Committed on the ACLList Entry in the Datastore.
             *
             * iii. If the FriendlyName changed:
             *
             *   A. Iterate through each Endpoint Information Entry:
             *
             *     I. If the GroupIDList contains an entry with the given GroupID:
             *
             *       1. Update the GroupIDList Entry in the Datastore with the new values and Status Pending
             *
             *       2. Update the Groups on the given Node with the new values.
             *
             *       1. If the update succeeds, set the Status to Committed on the GroupIDList Entry in the Datastore.
             *
             *       2. If not successful, the pending change shall be applied in a subsequent Node Refresh.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.5
             */
            readonly updateGroup: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
                friendlyName: import("../tlv/TlvObject.js").FieldType<string | null>;
                groupKeySetId: import("../tlv/TlvObject.js").FieldType<number | null>;
                groupCat: import("../tlv/TlvObject.js").FieldType<number | null>;
                groupCatVersion: import("../tlv/TlvObject.js").FieldType<number | null>;
                groupPermission: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryPrivilege>;
            }>, void, any>;
            /**
             * This command shall be used to remove a group from the Joint Fabric Datastore Cluster of the accessing
             * fabric.
             *
             * GroupID represents the unique identifier for the group to be removed from the Joint Fabric Datastore
             * Cluster.
             *
             * Attempts to remove a group with GroupCAT value set to Administrator CAT or Anchor CAT shall fail with
             * CONSTRAINT_ERROR.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. If entry is not found, return NOT_FOUND.
             *
             *   2. Ensure there are no Nodes in this group. To do this:
             *
             *     a. Iterate through each Node Information Entry:
             *
             *       i. If the GroupIDList contains an entry with the given GroupID, and the entry does NOT have Status
             *          DeletePending, then return CONSTRAINT_ERROR.
             *
             *   3. Remove the DatastoreGroupInformationEntryStruct for the Group with the given GroupID from the
             *      GroupList attribute.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.6
             */
            readonly removeGroup: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
            }>, void, any>;
            /**
             * This command shall be used to add an admin to the Joint Fabric Datastore Cluster of the accessing fabric.
             *
             * NodeID, FriendlyName, VendorID and ICAC represent the admin to be added to the Joint Fabric Datastore
             * Cluster.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.7
             */
            readonly addAdmin: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
                vendorId: import("../tlv/TlvObject.js").FieldType<import("../datatype/VendorId.js").VendorId>;
                icac: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
            }>, void, any>;
            /**
             * This command shall be used to update an admin in the Joint Fabric Datastore Cluster of the accessing
             * fabric.
             *
             * NodeID represents the admin to be updated in the Joint Fabric Datastore Cluster. NULL values for the
             * additional parameters will be ignored (not updated).
             *
             * If entry is not found, return NOT_FOUND.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.8
             */
            readonly updateAdmin: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId | null>;
                friendlyName: import("../tlv/TlvObject.js").FieldType<string | null>;
                icac: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource | null>;
            }>, void, any>;
            /**
             * This command shall be used to remove an admin from the Joint Fabric Datastore Cluster of the accessing
             * fabric.
             *
             * NodeID represents the unique identifier for the admin to be removed from the Joint Fabric Datastore
             * Cluster.
             *
             * If entry is not found, return NOT_FOUND.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.9
             */
            readonly removeAdmin: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
            }>, void, any>;
            /**
             * The command shall be used to add a node to the Joint Fabric Datastore Cluster of the accessing fabric.
             *
             * NodeID represents the node to be added to the Joint Fabric Datastore Cluster.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. Update CommissioningStatusEntry of the Node Information Entry with the given NodeID to Pending.
             *
             * If a Node Information Entry exists for the given NodeID, this command shall return INVALID_CONSTRAINT.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.10
             */
            readonly addPendingNode: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
            }>, void, any>;
            /**
             * The command shall be used to request that Datastore information relating to a Node of the accessing
             * fabric is refreshed.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. Confirm that a Node Information Entry exists for the given NodeID, and if not, return NOT_FOUND.
             *
             *   2. Update the CommissioningStatusEntry for the Node Information Entry to Pending.
             *
             *   3. Ensure the Endpoint List for the Node Information Entry with the given NodeID matches Endpoint list
             *      on the given Node. This involves the following steps:
             *
             *     a. Read the PartsList of the Descriptor cluster from the Node.
             *
             *     b. For each Endpoint Information Entry in the Endpoint List of the Node Information Entry that does
             *        not match an Endpoint ID in the PartsList, remove the Endpoint Information Entry.
             *
             *     c. For each Endpoint Information Entry in the Endpoint List of the Node Information Entry that
             *        matches an Endpoint ID in the PartsList:
             *
             *       i. Check that each entry in Node’s Group List occurs in the GroupIDList of the Endpoint Information
             *          Entry.
             *
             *         A. Add any missing entries to the GroupIDList of the Endpoint Information Entry.
             *
             *         B. For any entries in the GroupIDList with Status of Pending:
             *
             *           I. Add the corresponding change to the Node’s Group List.
             *
             *   1. If successful, mark the Status to Committed.
             *
             *   2. If not successful, update the Status to CommitFailed and the FailureCode to the returned error. The
             *      error shall be handled in a subsequent Node Refresh.
             *
             * C. For any entries in the GroupIDList with Status of DeletePending:
             *
             *   1. If successful, remove the corresponding entry from the Node’s Group List.
             *
             *   2. If not successful, update the Status to CommitFailed and the FailureCode to the returned error. The
             *      error shall be handled in a subsequent Node Refresh.
             *
             * D. For any entries in the GroupIDList with Status of CommitFailure:
             *
             *   I. A CommitFailure with an unrecoverable FailureCode shall be handled by removing the entry from the
             *      GroupIDList.
             *
             *   II. A CommitFailure with a recoverable FailureCode (i.e. TIMEOUT, BUSY) shall be handle in a subsequent
             *       Node Refresh.
             *
             * ii. Check that each entry in Node’s Binding List occurs in the BindingList of the Endpoint Information
             * Entry.
             *
             *   A. Add any missing entries to the BindingList of the Endpoint Information Entry.
             *
             *   B. For any entries in the BindingList with Status of Pending:
             *
             *     I. Add the corresponding change to the Node’s Binding List.
             *
             *       1. If successful, mark the Status to Committed.
             *
             *       2. If not successful, update the Status to CommitFailed and the FailureCode to the returned error.
             *          The error shall be handled in a subsequent Node Refresh.
             *
             *   C. For any entries in the BindingList with Status of DeletePending:
             *
             *     1. If successful, remove the corresponding entry from the Node’s BindingList.
             *
             *     2. If not successful, update the Status to CommitFailed and the FailureCode to the returned error.
             *        The error shall be handled in a subsequent Node Refresh.
             *
             *   D. For any entries in the BindingList with Status of CommitFailure:
             *
             *     I. A CommitFailure with an unrecoverable FailureCode shall be handled by removing the entry from the
             *        BindingList.
             *
             *     II. A CommitFailure with a recoverable FailureCode (i.e. TIMEOUT, BUSY) shall be handle in a
             *         subsequent Node Refresh.
             *
             * 4. Ensure the GroupKeySetList for the Node Information Entry with the given NodeID matches the Group Keys
             * on the given Node. This involves the following steps:
             *
             *   a. Read the Group Keys from the Node.
             *
             *   b. For each GroupKeySetEntry in the GroupKeySetList of the Node Information Entry with a Pending
             *      Status:
             *
             *     i. Add the corresponding DatastoreGroupKeySetStruct to the Node’s Group Key list.
             *
             *       A. If successful, mark the Status to Committed.
             *
             *       B. If not successful, update the Status to CommitFailed and the FailureCode to the returned error.
             *          The error shall be handled in a subsequent Node Refresh.
             *
             *   c. For each GroupKeySetEntry in the GroupKeySetList of the Node Information Entry with a CommitFailure
             *      Status:
             *
             *     i. A CommitFailure with an unrecoverable FailureCode shall be handled by removing the entry from the
             *        GroupKeySetList.
             *
             *     ii. A CommitFailure with a recoverable FailureCode (i.e. TIMEOUT, BUSY) shall be handle in a
             *         subsequent Node Refresh.
             *
             *   d. All remaining entries in the GroupKeySetList should be replaced by the remaining entries on the
             *      Node.
             *
             * 5. Ensure the ACLList for the Node Information Entry with the given NodeID matches the ACL attribute on
             * the given Node. This involves the following steps:
             *
             *   a. Read the ACL attribute on the Node.
             *
             *   b. For each DatastoreACLEntryStruct in the ACLList of the Node Information Entry with a Pending Status:
             *
             *     i. Add the corresponding DatastoreACLEntryStruct to the Node’s ACL attribute.
             *
             *       A. If successful, mark the Status to Committed.
             *
             *       B. If not successful, update the Status to CommitFailed and the FailureCode to the returned error.
             *          The error shall be handled in a subsequent Node Refresh.
             *
             *   c. For each DatastoreACLEntryStruct in the ACLList of the Node Information Entry with a CommitFailure
             *      Status:
             *
             *     i. A CommitFailure with an unrecoverable FailureCode (i.e. RESOURCE_EXHAUSTED, CONSTRAINT_ERROR)
             *        shall be handled by removing the entry from the ACLList.
             *
             *     ii. A CommitFailure with a recoverable FailureCode (i.e. TIMEOUT, BUSY) shall be handle in a
             *         subsequent Node Refresh.
             *
             *   d. All remaining entries in the ACLList should be replaced by the remaining entries on the Node.
             *
             * 6. Update the CommissioningStatusEntry for the Node Information Entry to Committed.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.11
             */
            readonly refreshNode: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
            }>, void, any>;
            /**
             * The command shall be used to update the friendly name for a node in the Joint Fabric Datastore Cluster of
             * the accessing fabric.
             *
             * NodeID represents the node to be updated in the Joint Fabric Datastore Cluster.
             *
             * If a Node Information Entry does not exist for the given NodeID, this command shall return NOT_FOUND.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.12
             */
            readonly updateNode: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
            }>, void, any>;
            /**
             * This command shall be used to remove a node from the Joint Fabric Datastore Cluster of the accessing
             * fabric.
             *
             * NodeID represents the unique identifier for the node to be removed from the Joint Fabric Datastore
             * Cluster.
             *
             * If a Node Information Entry does not exist for the given NodeID, this command shall return NOT_FOUND.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.13
             */
            readonly removeNode: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
            }>, void, any>;
            /**
             * This command shall be used to update the state of an endpoint for a node in the Joint Fabric Datastore
             * Cluster of the accessing fabric.
             *
             * EndpointID represents the unique identifier for the endpoint to be updated in the Joint Fabric Datastore
             * Cluster.
             *
             * NodeID represents the unique identifier for the node to which the endpoint belongs.
             *
             * If an Endpoint Information Entry does not exist for the given NodeID and EndpointID, this command shall
             * return NOT_FOUND.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.14
             */
            readonly updateEndpointForNode: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                friendlyName: import("../tlv/TlvObject.js").FieldType<string>;
            }>, void, any>;
            /**
             * This command shall be used to add a Group ID to an endpoint for a node in the Joint Fabric Datastore
             * Cluster of the accessing fabric.
             *
             * GroupID represents the unique identifier for the group to be added to the endpoint.
             *
             * EndpointID represents the unique identifier for the endpoint to be updated in the Joint Fabric Datastore
             * Cluster.
             *
             * NodeID represents the unique identifier for the node to which the endpoint belongs.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. Confirm that an Endpoint Information Entry exists for the given NodeID and EndpointID, and if not,
             *      return NOT_FOUND.
             *
             *   2. Ensure the Group Key List for the Node Information Entry with the given NodeID includes the KeySet
             *      for the given Group ID. If it does not:
             *
             *     a. Add an entry for the KeySet of the given Group ID to the Group Key List for the Node. The new
             *        entry’s status shall be set to Pending.
             *
             *     b. Add a Group Key Entry for this KeySet to the given Node ID.
             *
             *       i. If this succeeds, update the new KeySet entry in the Datastore to Committed.
             *
             *       ii. If not successful, the pending change shall be applied in a subsequent Node Refresh.
             *
             *   3. Ensure the Group List for the Endpoint Information Entry with the given NodeID and EndpointID
             *      includes an entry for the given Group. If it does not:
             *
             *     a. Add a Group entry for the given Group ID to the Group List for the Endpoint and Node. The new
             *        entry’s status shall be set to Pending.
             *
             *     b. Add this Group entry to the given Endpoint ID on the given Node ID.
             *
             *       i. If this succeeds, update the new Group entry in the Datastore to Committed.
             *
             *       ii. If not successful, update the Status to CommitFailed and the FailureCode to the returned error.
             *           The error shall be handled in a subsequent Node Refresh.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.15
             */
            readonly addGroupIdToEndpointForNode: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
                groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
            }>, void, any>;
            /**
             * This command shall be used to remove a Group ID from an endpoint for a node in the Joint Fabric Datastore
             * Cluster of the accessing fabric.
             *
             * GroupID represents the unique identifier for the group to be removed from the endpoint.
             *
             * EndpointID represents the unique identifier for the endpoint to be updated in the Joint Fabric Datastore
             * Cluster.
             *
             * NodeID represents the unique identifier for the node to which the endpoint belongs.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. Confirm that an Endpoint Information Entry exists for the given NodeID and EndpointID, and if not,
             *      return NOT_FOUND.
             *
             *   2. Ensure the Group List for the Endpoint Information Entry with the given NodeID and EndpointID does
             *      not include an entry for the given Group. If it does:
             *
             *     a. Update the status to DeletePending of the Group entry for the given Group ID in the Group List.
             *
             *     b. Remove this Group entry for the given Endpoint ID on the given Node ID.
             *
             *       i. If this succeeds, remove the Group entry for the given Group ID in the Group List for this
             *          NodeID and EndpointID in the Datastore.
             *
             *       ii. If not successful, the pending change shall be applied in a subsequent Node Refresh.
             *
             *   3. Ensure the Group Key List for the Node Information Entry with the given NodeID does not include the
             *      KeySet for the given Group ID. If it does:
             *
             *     a. Update the status to DeletePending for the entry for the KeySet of the given Group ID in the Node
             *        Group Key List.
             *
             *     b. Remove the Group Key Entry for this KeySet from the given Node ID.
             *
             *       i. If this succeeds, remove the KeySet entry for the given Node ID.
             *
             *       ii. If not successful, update the Status to CommitFailed and the FailureCode to the returned error.
             *           The error shall be handled in a subsequent Node Refresh.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.16
             */
            readonly removeGroupIdFromEndpointForNode: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
                groupId: import("../tlv/TlvObject.js").FieldType<import("../datatype/GroupId.js").GroupId>;
            }>, void, any>;
            /**
             * This command shall be used to add a binding to an endpoint for a node in the Joint Fabric Datastore
             * Cluster of the accessing fabric.
             *
             * Binding represents the binding to be added to the endpoint.
             *
             * EndpointID represents the unique identifier for the endpoint to be updated in the Joint Fabric Datastore
             * Cluster.
             *
             * NodeID represents the unique identifier for the node to which the endpoint belongs.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. Confirm that an Endpoint Information Entry exists for the given NodeID and EndpointID, and if not,
             *      return NOT_FOUND.
             *
             *   2. Ensure the Binding List for the Node Information Entry with the given NodeID includes the given
             *      Binding. If it does not:
             *
             *     a. Add the Binding to the Binding List for the Node Information Entry for the given NodeID. The new
             *        entry’s status shall be set to Pending.
             *
             *     b. Add this Binding to the given Node ID.
             *
             *       i. If this succeeds, update the new Binding in the Datastore to Committed.
             *
             *       ii. If not successful, update the Status to CommitFailed and the FailureCode to the returned error.
             *           The error shall be handled in a subsequent Node Refresh.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.17
             */
            readonly addBindingToEndpointForNode: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
                binding: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    /**
                     * This field is the binding’s remote target node ID. If the Endpoint field is present, this field shall be
                     * present.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.1
                     */
                    node: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/NodeId.js").NodeId>;
                    /**
                     * This field is the binding’s target group ID that represents remote endpoints. If the Endpoint field is
                     * present, this field shall NOT be present.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.2
                     */
                    group: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/GroupId.js").GroupId>;
                    /**
                     * This field is the binding’s remote endpoint that the local endpoint is bound to. If the Group field is
                     * present, this field shall NOT be present.
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.3
                     */
                    endpoint: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
                    /**
                     * This field is the binding’s cluster ID (client & server) on the local and target endpoint(s). If this field
                     * is present, the client cluster shall also exist on this endpoint (with this Binding cluster). If this field
                     * is present, the target shall be this cluster on the target endpoint(s).
                     *
                     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.4
                     */
                    cluster: import("../tlv/TlvObject.js").OptionalFieldType<import("../datatype/ClusterId.js").ClusterId>;
                }>>;
            }>, void, any>;
            /**
             * This command shall be used to remove a binding from an endpoint for a node in the Joint Fabric Datastore
             * Cluster of the accessing fabric.
             *
             * ListID represents the unique identifier for the binding entry in the Datastore’s EndpointBindingList
             * attribute to be removed from the endpoint.
             *
             * EndpointID represents the unique identifier for the endpoint to be updated in the Joint Fabric Datastore
             * Cluster.
             *
             * NodeID represents the unique identifier for the node to which the endpoint belongs.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. Confirm that an Endpoint Information Entry exists for the given NodeID and EndpointID, and if not,
             *      return NOT_FOUND.
             *
             *   2. Ensure the Binding List for the Node Information Entry with the given NodeID does not include an
             *      entry with the given ListID. If it does:
             *
             *     a. Update the status to DeletePending for the given Binding in the Binding List.
             *
             *     b. Remove this Binding from the given Node ID.
             *
             *       i. If this succeeds, remove the given Binding from the Binding List.
             *
             *       ii. If not successful, update the Status to CommitFailed and the FailureCode to the returned error.
             *           The error shall be handled in a subsequent Node Refresh.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.18
             */
            readonly removeBindingFromEndpointForNode: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                listId: import("../tlv/TlvObject.js").FieldType<number>;
                endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
            }>, void, any>;
            /**
             * This command shall be used to add an ACL to a node in the Joint Fabric Datastore Cluster of the accessing
             * fabric.
             *
             * NodeID represents the unique identifier for the node to which the ACL is to be added.
             *
             * ACLEntry represents the ACL to be added to the Joint Fabric Datastore Cluster.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. Confirm that a Node Information Entry exists for the given NodeID, and if not, return NOT_FOUND.
             *
             *   2. Ensure the ACL List for the given NodeID includes the given ACLEntry. If it does not:
             *
             *     a. Add the ACLEntry to the ACL List for the given NodeID. The new entry’s status shall be set to
             *        Pending.
             *
             *     b. Add this ACLEntry to the given Node ID.
             *
             *       i. If this succeeds, update the new ACLEntry in the Datastore to Committed.
             *
             *       ii. If not successful, update the Status to CommitFailed and the FailureCode to the returned error.
             *           The error shall be handled in a subsequent Node Refresh.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.19
             */
            readonly addAclToNode: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
                aclEntry: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                    privilege: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryPrivilege>;
                    authMode: import("../tlv/TlvObject.js").FieldType<DatastoreAccessControlEntryAuthMode>;
                    subjects: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId[] | null>;
                    targets: import("../tlv/TlvObject.js").FieldType<import("../tlv/TlvObject.js").TypeFromFields<{
                        cluster: import("../tlv/TlvObject.js").FieldType<import("../datatype/ClusterId.js").ClusterId | null>;
                        endpoint: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber | null>;
                        deviceType: import("../tlv/TlvObject.js").FieldType<import("../datatype/DeviceTypeId.js").DeviceTypeId | null>;
                    }>[] | null>;
                }>>;
            }>, void, any>;
            /**
             * This command shall be used to remove an ACL from a node in the Joint Fabric Datastore Cluster of the
             * accessing fabric.
             *
             * ListID represents the unique identifier for the DatastoreACLEntryStruct to be removed from the
             * Datastore’s list of DatastoreACLEntry.
             *
             * NodeID represents the unique identifier for the node from which the ACL is to be removed.
             *
             * Upon receipt of this command, the Datastore shall:
             *
             *   1. Confirm that a Node Information Entry exists for the given NodeID, and if not, return NOT_FOUND.
             *
             *   2. Ensure the ACL List for the given NodeID does not include the given ACLEntry. If it does:
             *
             *     a. Update the status to DeletePending for the given ACLEntry in the ACL List.
             *
             *     b. Remove this ACLEntry from the given Node ID.
             *
             *       i. If this succeeds, remove the given ACLEntry from the Node ACL List.
             *
             *       ii. If not successful, update the Status to CommitFailed and the FailureCode to the returned error.
             *           The error shall be handled in a subsequent Node Refresh.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.24.7.20
             */
            readonly removeAclFromNode: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                listId: import("../tlv/TlvObject.js").FieldType<number>;
                nodeId: import("../tlv/TlvObject.js").FieldType<import("../datatype/NodeId.js").NodeId>;
            }>, void, any>;
        };
    }, []>;
    /**
     * The Joint Fabric Datastore Cluster is a cluster that provides a mechanism for the Joint Fabric Administrators to
     * manage the set of Nodes, Groups, and Group membership among Nodes in the Joint Fabric.
     *
     * When an Ecosystem Administrator Node is commissioned onto the Joint Fabric, the Ecosystem Administrator Node has
     * no knowledge of what Nodes and Groups are present, or what set-up information related to the Joint Fabric is
     * provided by the user. To address lack of knowledge, the Joint Fabric Datastore provides the information required
     * for all Ecosystem Administrators to maintain a consistent view of the Joint Fabric including Nodes, Groups,
     * settings and privileges.
     *
     * The Joint Fabric Datastore cluster server shall only be accessible on a Node which is acting as the Joint Fabric
     * Anchor Administrator. When not acting as the Joint Fabric Anchor Administrator, the Joint Fabric Datastore
     * cluster shall NOT be accessible.
     *
     * The Admin level of access to the Joint Fabric Datastore cluster server shall be limited to JF Administrator Nodes
     * identified using the Administrator CAT.
     *
     * > [!NOTE]
     *
     * > Support for Joint Fabric Datastore cluster is provisional.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24
     */
    interface Cluster extends Identity<typeof ClusterInstance> {
    }
    const Cluster: Cluster;
    const Complete: Cluster;
}
export type JointFabricDatastoreCluster = JointFabricDatastore.Cluster;
export declare const JointFabricDatastoreCluster: JointFabricDatastore.Cluster;
//# sourceMappingURL=joint-fabric-datastore.d.ts.map