/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { MutableCluster } from "../cluster/mutation/MutableCluster.js";
import { Attribute, Command, TlvNoResponse } from "../cluster/Cluster.js";
import { TlvByteString, TlvString } from "../tlv/TlvString.js";
import { AccessLevel } from "#model";
import { TlvNodeId } from "../datatype/NodeId.js";
import { TlvVendorId } from "../datatype/VendorId.js";
import { TlvArray } from "../tlv/TlvArray.js";
import { TlvField, TlvOptionalField, TlvObject } from "../tlv/TlvObject.js";
import { TlvUInt16, TlvEnum, TlvEpochUs, TlvUInt64, TlvEpochS } from "../tlv/TlvNumber.js";
import { TlvNullable } from "../tlv/TlvNullable.js";
import { TlvEndpointNumber } from "../datatype/EndpointNumber.js";
import { TlvGroupId } from "../datatype/GroupId.js";
import { TlvClusterId } from "../datatype/ClusterId.js";
import { TlvSubjectId } from "../datatype/SubjectId.js";
import { TlvDeviceTypeId } from "../datatype/DeviceTypeId.js";
import { ClusterRegistry } from "../cluster/ClusterRegistry.js";
var JointFabricDatastore;
((JointFabricDatastore2) => {
  let DatastoreGroupKeySecurityPolicy;
  ((DatastoreGroupKeySecurityPolicy2) => {
    DatastoreGroupKeySecurityPolicy2[DatastoreGroupKeySecurityPolicy2["TrustFirst"] = 0] = "TrustFirst";
  })(DatastoreGroupKeySecurityPolicy = JointFabricDatastore2.DatastoreGroupKeySecurityPolicy || (JointFabricDatastore2.DatastoreGroupKeySecurityPolicy = {}));
  let DatastoreGroupKeyMulticastPolicy;
  ((DatastoreGroupKeyMulticastPolicy2) => {
    DatastoreGroupKeyMulticastPolicy2[DatastoreGroupKeyMulticastPolicy2["PerGroupId"] = 0] = "PerGroupId";
    DatastoreGroupKeyMulticastPolicy2[DatastoreGroupKeyMulticastPolicy2["AllNodes"] = 1] = "AllNodes";
  })(DatastoreGroupKeyMulticastPolicy = JointFabricDatastore2.DatastoreGroupKeyMulticastPolicy || (JointFabricDatastore2.DatastoreGroupKeyMulticastPolicy = {}));
  JointFabricDatastore2.TlvDatastoreGroupKeySet = TlvObject({
    groupKeySetId: TlvField(0, TlvUInt16),
    groupKeySecurityPolicy: TlvField(1, TlvEnum()),
    epochKey0: TlvField(2, TlvNullable(TlvByteString.bound({ length: 16 }))),
    epochStartTime0: TlvField(3, TlvNullable(TlvEpochUs)),
    epochKey1: TlvField(4, TlvNullable(TlvByteString.bound({ length: 16 }))),
    epochStartTime1: TlvField(5, TlvNullable(TlvEpochUs)),
    epochKey2: TlvField(6, TlvNullable(TlvByteString.bound({ length: 16 }))),
    epochStartTime2: TlvField(7, TlvNullable(TlvEpochUs)),
    groupKeyMulticastPolicy: TlvOptionalField(8, TlvEnum())
  });
  let DatastoreAccessControlEntryPrivilege;
  ((DatastoreAccessControlEntryPrivilege2) => {
    DatastoreAccessControlEntryPrivilege2[DatastoreAccessControlEntryPrivilege2["View"] = 1] = "View";
    DatastoreAccessControlEntryPrivilege2[DatastoreAccessControlEntryPrivilege2["ProxyView"] = 2] = "ProxyView";
    DatastoreAccessControlEntryPrivilege2[DatastoreAccessControlEntryPrivilege2["Operate"] = 3] = "Operate";
    DatastoreAccessControlEntryPrivilege2[DatastoreAccessControlEntryPrivilege2["Manage"] = 4] = "Manage";
    DatastoreAccessControlEntryPrivilege2[DatastoreAccessControlEntryPrivilege2["Administer"] = 5] = "Administer";
  })(DatastoreAccessControlEntryPrivilege = JointFabricDatastore2.DatastoreAccessControlEntryPrivilege || (JointFabricDatastore2.DatastoreAccessControlEntryPrivilege = {}));
  JointFabricDatastore2.TlvDatastoreGroupInformationEntry = TlvObject({
    /**
     * The unique identifier for the group.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.1
     */
    groupId: TlvField(0, TlvUInt64),
    /**
     * The friendly name for the group.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.2
     */
    friendlyName: TlvField(1, TlvString.bound({ maxLength: 32 })),
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
    groupKeySetId: TlvField(2, TlvNullable(TlvUInt16.bound({ min: 1, max: 65534 }))),
    /**
     * CAT value for this group. This is used for control of individual members of a group (non-broadcast commands).
     *
     * Allowable values include the range 0x0000 to 0xEFFF, and the Administrator CAT and Anchor CAT values.
     *
     * This value may be null when unicast communication is not used for the group.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.4
     */
    groupCat: TlvField(3, TlvNullable(TlvUInt16)),
    /**
     * Current version number for this CAT.
     *
     * This value shall be null when GroupCAT value is null.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.5
     */
    groupCatVersion: TlvField(4, TlvNullable(TlvUInt16.bound({ min: 1, max: 65534 }))),
    /**
     * The permission level associated with ACL entries for this group. There should be only one Administrator group
     * per fabric, and at most one Manage group per Ecosystem (Vendor Entry).
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.5.6
     */
    groupPermission: TlvField(5, TlvEnum())
  });
  let DatastoreState;
  ((DatastoreState2) => {
    DatastoreState2[DatastoreState2["Pending"] = 0] = "Pending";
    DatastoreState2[DatastoreState2["Committed"] = 1] = "Committed";
    DatastoreState2[DatastoreState2["DeletePending"] = 2] = "DeletePending";
    DatastoreState2[DatastoreState2["CommitFailed"] = 3] = "CommitFailed";
  })(DatastoreState = JointFabricDatastore2.DatastoreState || (JointFabricDatastore2.DatastoreState = {}));
  JointFabricDatastore2.TlvDatastoreStatusEntry = TlvObject({
    /**
     * This field shall contain the current state of the target device operation.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.1
     */
    state: TlvField(0, TlvEnum()),
    /**
     * This field shall contain the timestamp of the last update.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.2
     */
    updateTimestamp: TlvField(1, TlvEpochS),
    /**
     * This field shall contain the StatusCode of the last failed operation where the State field is set to
     * CommitFailure.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.2.3
     */
    failureCode: TlvField(2, TlvEnum())
  });
  JointFabricDatastore2.TlvDatastoreNodeInformationEntry = TlvObject({
    /**
     * The unique identifier for the node.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.14.1
     */
    nodeId: TlvField(1, TlvNodeId),
    /**
     * Friendly name for this node which is not propagated to nodes.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.14.2
     */
    friendlyName: TlvField(2, TlvString.bound({ maxLength: 32 })),
    /**
     * Set to Pending prior to completing commissioning, set to Committed after commissioning complete is
     * successful, or set to CommitFailed if commissioning failed with the FailureCode Field set to the error.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.14.3
     */
    commissioningStatusEntry: TlvField(3, JointFabricDatastore2.TlvDatastoreStatusEntry)
  });
  JointFabricDatastore2.TlvDatastoreAdministratorInformationEntry = TlvObject({
    /**
     * The unique identifier for the node.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.1
     */
    nodeId: TlvField(1, TlvNodeId),
    /**
     * Friendly name for this node which is not propagated to nodes.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.2
     */
    friendlyName: TlvField(2, TlvString.bound({ maxLength: 32 })),
    /**
     * The Vendor ID for the node.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.3
     */
    vendorId: TlvField(3, TlvVendorId),
    /**
     * The ICAC used to issue the NOC.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.15.4
     */
    icac: TlvField(4, TlvByteString.bound({ maxLength: 400 }))
  });
  JointFabricDatastore2.TlvDatastoreEndpointGroupIdEntry = TlvObject({
    /**
     * The unique identifier for the node.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.1
     */
    nodeId: TlvField(0, TlvNodeId),
    /**
     * The unique identifier for the endpoint.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.2
     */
    endpointId: TlvField(1, TlvEndpointNumber),
    /**
     * The unique identifier for the group.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.3
     */
    groupId: TlvField(2, TlvGroupId),
    /**
     * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.8.4
     */
    statusEntry: TlvField(3, JointFabricDatastore2.TlvDatastoreStatusEntry)
  });
  JointFabricDatastore2.TlvDatastoreBindingTarget = TlvObject({
    /**
     * This field is the binding’s remote target node ID. If the Endpoint field is present, this field shall be
     * present.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.1
     */
    node: TlvOptionalField(1, TlvNodeId),
    /**
     * This field is the binding’s target group ID that represents remote endpoints. If the Endpoint field is
     * present, this field shall NOT be present.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.2
     */
    group: TlvOptionalField(2, TlvGroupId),
    /**
     * This field is the binding’s remote endpoint that the local endpoint is bound to. If the Group field is
     * present, this field shall NOT be present.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.3
     */
    endpoint: TlvOptionalField(3, TlvEndpointNumber),
    /**
     * This field is the binding’s cluster ID (client & server) on the local and target endpoint(s). If this field
     * is present, the client cluster shall also exist on this endpoint (with this Binding cluster). If this field
     * is present, the target shall be this cluster on the target endpoint(s).
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.6.4
     */
    cluster: TlvOptionalField(4, TlvClusterId)
  });
  JointFabricDatastore2.TlvDatastoreEndpointBindingEntry = TlvObject({
    /**
     * The unique identifier for the node.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.1
     */
    nodeId: TlvField(0, TlvNodeId),
    /**
     * The unique identifier for the endpoint.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.2
     */
    endpointId: TlvField(1, TlvEndpointNumber),
    /**
     * The unique identifier for the entry in the Datastore’s EndpointBindingList attribute, which is a list of
     * DatastoreEndpointBindingEntryStruct.
     *
     * This field is used to uniquely identify an entry in the EndpointBindingList attribute for the purpose of
     * deletion (RemoveBindingFromEndpointForNode Command).
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.3
     */
    listId: TlvField(2, TlvUInt16),
    /**
     * The binding target structure.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.4
     */
    binding: TlvField(3, JointFabricDatastore2.TlvDatastoreBindingTarget),
    /**
     * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.7.5
     */
    statusEntry: TlvField(4, JointFabricDatastore2.TlvDatastoreStatusEntry)
  });
  JointFabricDatastore2.TlvDatastoreNodeKeySetEntry = TlvObject({
    /**
     * The unique identifier for the node.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.3.1
     */
    nodeId: TlvField(0, TlvNodeId),
    groupKeySetId: TlvField(1, TlvUInt16),
    /**
     * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.3.3
     */
    statusEntry: TlvField(2, JointFabricDatastore2.TlvDatastoreStatusEntry)
  });
  let DatastoreAccessControlEntryAuthMode;
  ((DatastoreAccessControlEntryAuthMode2) => {
    DatastoreAccessControlEntryAuthMode2[DatastoreAccessControlEntryAuthMode2["Pase"] = 1] = "Pase";
    DatastoreAccessControlEntryAuthMode2[DatastoreAccessControlEntryAuthMode2["Case"] = 2] = "Case";
    DatastoreAccessControlEntryAuthMode2[DatastoreAccessControlEntryAuthMode2["Group"] = 3] = "Group";
  })(DatastoreAccessControlEntryAuthMode = JointFabricDatastore2.DatastoreAccessControlEntryAuthMode || (JointFabricDatastore2.DatastoreAccessControlEntryAuthMode = {}));
  JointFabricDatastore2.TlvDatastoreAccessControlTarget = TlvObject({
    cluster: TlvField(0, TlvNullable(TlvClusterId)),
    endpoint: TlvField(1, TlvNullable(TlvEndpointNumber)),
    deviceType: TlvField(2, TlvNullable(TlvDeviceTypeId))
  });
  JointFabricDatastore2.TlvDatastoreAccessControlEntry = TlvObject({
    privilege: TlvField(1, TlvEnum()),
    authMode: TlvField(2, TlvEnum()),
    subjects: TlvField(3, TlvNullable(TlvArray(TlvSubjectId))),
    targets: TlvField(4, TlvNullable(TlvArray(JointFabricDatastore2.TlvDatastoreAccessControlTarget)))
  });
  JointFabricDatastore2.TlvDatastoreAclEntry = TlvObject({
    /**
     * The unique identifier for the node.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.1
     */
    nodeId: TlvField(0, TlvNodeId),
    /**
     * The unique identifier for the ACL entry in the Datastore’s list of DatastoreACLEntry.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.2
     */
    listId: TlvField(1, TlvUInt16),
    /**
     * The Access Control Entry structure.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.3
     */
    aclEntry: TlvField(2, JointFabricDatastore2.TlvDatastoreAccessControlEntry),
    /**
     * Indicates whether entry in this list is pending, committed, delete-pending, or commit-failed.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.13.4
     */
    statusEntry: TlvField(3, JointFabricDatastore2.TlvDatastoreStatusEntry)
  });
  JointFabricDatastore2.TlvDatastoreEndpointEntry = TlvObject({
    /**
     * The unique identifier for the endpoint.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.1
     */
    endpointId: TlvField(0, TlvEndpointNumber),
    /**
     * The unique identifier for the node.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.2
     */
    nodeId: TlvField(1, TlvNodeId),
    /**
     * Friendly name for this endpoint which is propagated to nodes. Any changes to Friendly Name or Group Id List
     * (add/remove entry) must follow the pending→committed workflow with current state reflected in the Status
     * Entry.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.3
     */
    friendlyName: TlvField(2, TlvString.bound({ maxLength: 32 })),
    /**
     * Indicates whether changes to Friendly Name are pending, committed, or commit-failed.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.24.5.9.4
     */
    statusEntry: TlvField(3, JointFabricDatastore2.TlvDatastoreStatusEntry)
  });
  JointFabricDatastore2.TlvAddKeySetRequest = TlvObject({ groupKeySet: TlvField(0, JointFabricDatastore2.TlvDatastoreGroupKeySet) });
  JointFabricDatastore2.TlvUpdateKeySetRequest = TlvObject({ groupKeySet: TlvField(0, JointFabricDatastore2.TlvDatastoreGroupKeySet) });
  JointFabricDatastore2.TlvRemoveKeySetRequest = TlvObject({ groupKeySetId: TlvField(0, TlvUInt16) });
  JointFabricDatastore2.TlvAddGroupRequest = TlvObject({
    groupId: TlvField(0, TlvGroupId),
    friendlyName: TlvField(1, TlvString.bound({ maxLength: 32 })),
    groupKeySetId: TlvField(2, TlvNullable(TlvUInt16.bound({ min: 1, max: 65534 }))),
    groupCat: TlvField(3, TlvNullable(TlvUInt16)),
    groupCatVersion: TlvField(4, TlvNullable(TlvUInt16.bound({ min: 1, max: 65534 }))),
    groupPermission: TlvField(5, TlvEnum())
  });
  JointFabricDatastore2.TlvUpdateGroupRequest = TlvObject({
    groupId: TlvField(0, TlvGroupId),
    friendlyName: TlvField(1, TlvNullable(TlvString.bound({ maxLength: 32 }))),
    groupKeySetId: TlvField(2, TlvNullable(TlvUInt16.bound({ min: 1 }))),
    groupCat: TlvField(3, TlvNullable(TlvUInt16)),
    groupCatVersion: TlvField(4, TlvNullable(TlvUInt16.bound({ min: 1 }))),
    groupPermission: TlvField(5, TlvEnum())
  });
  JointFabricDatastore2.TlvRemoveGroupRequest = TlvObject({ groupId: TlvField(0, TlvGroupId) });
  JointFabricDatastore2.TlvAddAdminRequest = TlvObject({
    nodeId: TlvField(1, TlvNodeId),
    friendlyName: TlvField(2, TlvString.bound({ maxLength: 32 })),
    vendorId: TlvField(3, TlvVendorId),
    icac: TlvField(4, TlvByteString.bound({ maxLength: 400 }))
  });
  JointFabricDatastore2.TlvUpdateAdminRequest = TlvObject({
    nodeId: TlvField(0, TlvNullable(TlvNodeId)),
    friendlyName: TlvField(1, TlvNullable(TlvString.bound({ maxLength: 32 }))),
    icac: TlvField(2, TlvNullable(TlvByteString.bound({ maxLength: 400 })))
  });
  JointFabricDatastore2.TlvRemoveAdminRequest = TlvObject({ nodeId: TlvField(0, TlvNodeId) });
  JointFabricDatastore2.TlvAddPendingNodeRequest = TlvObject({
    nodeId: TlvField(0, TlvNodeId),
    friendlyName: TlvField(1, TlvString.bound({ maxLength: 32 }))
  });
  JointFabricDatastore2.TlvRefreshNodeRequest = TlvObject({ nodeId: TlvField(0, TlvNodeId) });
  JointFabricDatastore2.TlvUpdateNodeRequest = TlvObject({
    nodeId: TlvField(0, TlvNodeId),
    friendlyName: TlvField(1, TlvString.bound({ maxLength: 32 }))
  });
  JointFabricDatastore2.TlvRemoveNodeRequest = TlvObject({ nodeId: TlvField(0, TlvNodeId) });
  JointFabricDatastore2.TlvUpdateEndpointForNodeRequest = TlvObject({
    endpointId: TlvField(0, TlvEndpointNumber),
    nodeId: TlvField(1, TlvNodeId),
    friendlyName: TlvField(2, TlvString.bound({ maxLength: 32 }))
  });
  JointFabricDatastore2.TlvAddGroupIdToEndpointForNodeRequest = TlvObject({
    nodeId: TlvField(0, TlvNodeId),
    endpointId: TlvField(1, TlvEndpointNumber),
    groupId: TlvField(2, TlvGroupId)
  });
  JointFabricDatastore2.TlvRemoveGroupIdFromEndpointForNodeRequest = TlvObject({
    nodeId: TlvField(0, TlvNodeId),
    endpointId: TlvField(1, TlvEndpointNumber),
    groupId: TlvField(2, TlvGroupId)
  });
  JointFabricDatastore2.TlvAddBindingToEndpointForNodeRequest = TlvObject({
    nodeId: TlvField(0, TlvNodeId),
    endpointId: TlvField(1, TlvEndpointNumber),
    binding: TlvField(2, JointFabricDatastore2.TlvDatastoreBindingTarget)
  });
  JointFabricDatastore2.TlvRemoveBindingFromEndpointForNodeRequest = TlvObject({
    listId: TlvField(0, TlvUInt16),
    endpointId: TlvField(1, TlvEndpointNumber),
    nodeId: TlvField(2, TlvNodeId)
  });
  JointFabricDatastore2.TlvAddAclToNodeRequest = TlvObject({
    nodeId: TlvField(0, TlvNodeId),
    aclEntry: TlvField(1, JointFabricDatastore2.TlvDatastoreAccessControlEntry)
  });
  JointFabricDatastore2.TlvRemoveAclFromNodeRequest = TlvObject({
    listId: TlvField(0, TlvUInt16),
    nodeId: TlvField(1, TlvNodeId)
  });
  JointFabricDatastore2.ClusterInstance = MutableCluster({
    id: 1874,
    name: "JointFabricDatastore",
    revision: 1,
    attributes: {
      /**
       * This shall indicate the Anchor Root CA used to sign all NOC Issuers in the Joint Fabric for the accessing
       * fabric. A null value indicates that the Joint Fabric is not yet formed.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.1
       */
      anchorRootCa: Attribute(
        0,
        TlvByteString,
        { readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This shall indicate the Node identifier of the Joint Fabric Anchor Root CA for the accessing fabric.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.2
       */
      anchorNodeId: Attribute(
        1,
        TlvNodeId,
        { readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This shall indicate the Vendor identifier of the Joint Fabric Anchor Root CA for the accessing fabric.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.3
       */
      anchorVendorId: Attribute(
        2,
        TlvVendorId,
        { readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * Friendly name for the accessing fabric which can be propagated to nodes.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.4
       */
      friendlyName: Attribute(
        3,
        TlvString.bound({ maxLength: 32 }),
        { readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This shall indicate the list of DatastoreGroupKeySetStruct used in the Joint Fabric for the accessing
       * fabric.
       *
       * This attribute shall contain at least one entry, the IPK, which has GroupKeySetID of 0.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.5
       */
      groupKeySetList: Attribute(
        4,
        TlvArray(JointFabricDatastore2.TlvDatastoreGroupKeySet),
        { default: [], readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This shall indicate the list of groups in the Joint Fabric for the accessing fabric.
       *
       * This list must include, at a minimum, one group with GroupCAT value set to Administrator CAT and one
       * group with GroupCAT value set to Anchor CAT.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.6
       */
      groupList: Attribute(
        5,
        TlvArray(JointFabricDatastore2.TlvDatastoreGroupInformationEntry),
        { default: [], readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This shall indicate the list of nodes in the Joint Fabric for the accessing fabric.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.7
       */
      nodeList: Attribute(
        6,
        TlvArray(JointFabricDatastore2.TlvDatastoreNodeInformationEntry),
        { default: [], readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
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
      adminList: Attribute(
        7,
        TlvArray(JointFabricDatastore2.TlvDatastoreAdministratorInformationEntry),
        { default: [], readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This shall indicate the current state of the Joint Fabric Datastore Cluster for the accessing fabric.
       *
       * The Committed status indicates the DataStore is ready for use. The Pending status indicates that the
       * DataStore is not yet ready for use. The DeletePending status indicates that the DataStore is in the
       * process of being transferred to another Joint Fabric Anchor Administrator.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.9
       */
      status: Attribute(
        8,
        JointFabricDatastore2.TlvDatastoreStatusEntry,
        { readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This shall indicate the group membership of endpoints in the accessing fabric.
       *
       * Any changes to this List (add/remove entry) must follow the pending→committed workflow with current state
       * reflected in the Status Entry.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.10
       */
      endpointGroupIdList: Attribute(
        9,
        TlvArray(JointFabricDatastore2.TlvDatastoreEndpointGroupIdEntry),
        { default: [], readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This shall indicate the binding list for endpoints in the accessing fabric.
       *
       * Any changes to this List (add/remove entry) must follow the pending→committed workflow with current state
       * reflected in the Status Entry.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.11
       */
      endpointBindingList: Attribute(
        10,
        TlvArray(JointFabricDatastore2.TlvDatastoreEndpointBindingEntry),
        { default: [], readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This shall indicate the KeySet entries for nodes in the accessing fabric.
       *
       * Any changes to this List (add/remove entry) must follow the pending→committed workflow with current state
       * reflected in the Status Entry.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.12
       */
      nodeKeySetList: Attribute(
        11,
        TlvArray(JointFabricDatastore2.TlvDatastoreNodeKeySetEntry),
        { default: [], readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This shall indicate the ACL entries for nodes in the accessing fabric.
       *
       * Any changes to this List (add/remove entry) must follow the pending→committed workflow with current state
       * reflected in the Status Entry.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.13
       */
      nodeAclList: Attribute(
        12,
        TlvArray(JointFabricDatastore2.TlvDatastoreAclEntry),
        { default: [], readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      ),
      /**
       * This shall indicate the Endpoint entries for nodes in the accessing fabric.
       *
       * Any changes to this List (add/remove entry) must follow the pending→committed workflow with current state
       * reflected in the Status Entry.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.6.14
       */
      nodeEndpointList: Attribute(
        13,
        TlvArray(JointFabricDatastore2.TlvDatastoreEndpointEntry),
        { default: [], readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
      )
    },
    commands: {
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
      addKeySet: Command(0, JointFabricDatastore2.TlvAddKeySetRequest, 0, TlvNoResponse, { invokeAcl: AccessLevel.Administer }),
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
      updateKeySet: Command(
        1,
        JointFabricDatastore2.TlvUpdateKeySetRequest,
        1,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      ),
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
      removeKeySet: Command(
        2,
        JointFabricDatastore2.TlvRemoveKeySetRequest,
        2,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      ),
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
      addGroup: Command(3, JointFabricDatastore2.TlvAddGroupRequest, 3, TlvNoResponse, { invokeAcl: AccessLevel.Administer }),
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
      updateGroup: Command(4, JointFabricDatastore2.TlvUpdateGroupRequest, 4, TlvNoResponse, { invokeAcl: AccessLevel.Administer }),
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
      removeGroup: Command(5, JointFabricDatastore2.TlvRemoveGroupRequest, 5, TlvNoResponse, { invokeAcl: AccessLevel.Administer }),
      /**
       * This command shall be used to add an admin to the Joint Fabric Datastore Cluster of the accessing fabric.
       *
       * NodeID, FriendlyName, VendorID and ICAC represent the admin to be added to the Joint Fabric Datastore
       * Cluster.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.24.7.7
       */
      addAdmin: Command(6, JointFabricDatastore2.TlvAddAdminRequest, 6, TlvNoResponse, { invokeAcl: AccessLevel.Administer }),
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
      updateAdmin: Command(7, JointFabricDatastore2.TlvUpdateAdminRequest, 7, TlvNoResponse, { invokeAcl: AccessLevel.Administer }),
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
      removeAdmin: Command(8, JointFabricDatastore2.TlvRemoveAdminRequest, 8, TlvNoResponse, { invokeAcl: AccessLevel.Administer }),
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
      addPendingNode: Command(
        9,
        JointFabricDatastore2.TlvAddPendingNodeRequest,
        9,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      ),
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
      refreshNode: Command(10, JointFabricDatastore2.TlvRefreshNodeRequest, 10, TlvNoResponse, { invokeAcl: AccessLevel.Administer }),
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
      updateNode: Command(11, JointFabricDatastore2.TlvUpdateNodeRequest, 11, TlvNoResponse, { invokeAcl: AccessLevel.Administer }),
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
      removeNode: Command(12, JointFabricDatastore2.TlvRemoveNodeRequest, 12, TlvNoResponse, { invokeAcl: AccessLevel.Administer }),
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
      updateEndpointForNode: Command(
        13,
        JointFabricDatastore2.TlvUpdateEndpointForNodeRequest,
        13,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      ),
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
      addGroupIdToEndpointForNode: Command(
        14,
        JointFabricDatastore2.TlvAddGroupIdToEndpointForNodeRequest,
        14,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      ),
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
      removeGroupIdFromEndpointForNode: Command(
        15,
        JointFabricDatastore2.TlvRemoveGroupIdFromEndpointForNodeRequest,
        15,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      ),
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
      addBindingToEndpointForNode: Command(
        16,
        JointFabricDatastore2.TlvAddBindingToEndpointForNodeRequest,
        16,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      ),
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
      removeBindingFromEndpointForNode: Command(
        17,
        JointFabricDatastore2.TlvRemoveBindingFromEndpointForNodeRequest,
        17,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      ),
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
      addAclToNode: Command(
        18,
        JointFabricDatastore2.TlvAddAclToNodeRequest,
        18,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      ),
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
      removeAclFromNode: Command(
        19,
        JointFabricDatastore2.TlvRemoveAclFromNodeRequest,
        19,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      )
    }
  });
  JointFabricDatastore2.Cluster = JointFabricDatastore2.ClusterInstance;
  JointFabricDatastore2.Complete = JointFabricDatastore2.Cluster;
})(JointFabricDatastore || (JointFabricDatastore = {}));
const JointFabricDatastoreCluster = JointFabricDatastore.Cluster;
ClusterRegistry.register(JointFabricDatastore.Complete);
export {
  JointFabricDatastore,
  JointFabricDatastoreCluster
};
//# sourceMappingURL=joint-fabric-datastore.js.map
