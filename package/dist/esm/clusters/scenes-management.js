/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { MutableCluster } from "../cluster/mutation/MutableCluster.js";
import { BitFlag } from "../schema/BitmapSchema.js";
import { FixedAttribute, FabricScopedAttribute, Command, TlvNoResponse, OptionalCommand } from "../cluster/Cluster.js";
import {
  TlvUInt16,
  TlvUInt8,
  TlvUInt32,
  TlvInt8,
  TlvInt16,
  TlvInt32,
  TlvUInt64,
  TlvInt64,
  TlvEnum,
  TlvBitmap
} from "../tlv/TlvNumber.js";
import { TlvArray } from "../tlv/TlvArray.js";
import { TlvField, TlvObject, TlvOptionalField } from "../tlv/TlvObject.js";
import { TlvGroupId } from "../datatype/GroupId.js";
import { TlvBoolean } from "../tlv/TlvBoolean.js";
import { TlvFabricIndex } from "../datatype/FabricIndex.js";
import { TlvString } from "../tlv/TlvString.js";
import { TlvClusterId } from "../datatype/ClusterId.js";
import { TlvAttributeId } from "../datatype/AttributeId.js";
import { AccessLevel } from "#model";
import { TlvNullable } from "../tlv/TlvNullable.js";
import { ClusterRegistry } from "../cluster/ClusterRegistry.js";
var ScenesManagement;
((ScenesManagement2) => {
  let Feature;
  ((Feature2) => {
    Feature2["SceneNames"] = "SceneNames";
  })(Feature = ScenesManagement2.Feature || (ScenesManagement2.Feature = {}));
  ScenesManagement2.TlvSceneInfo = TlvObject({
    /**
     * This field shall indicate the number of scenes currently used in the server’s Scene Table on the endpoint
     * where the Scenes Management cluster appears.
     *
     * This only includes the count for the associated fabric.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.2.1
     */
    sceneCount: TlvField(0, TlvUInt8),
    /**
     * This field shall indicate the scene identifier of the scene last invoked on the associated fabric. If no
     * scene has been invoked, the value of this field shall be 0xFF, the undefined scene identifier.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.2.2
     */
    currentScene: TlvField(1, TlvUInt8),
    /**
     * This field shall indicate the group identifier of the scene last invoked on the associated fabric, or 0 if
     * the scene last invoked is not associated with a group.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.2.3
     */
    currentGroup: TlvField(2, TlvGroupId),
    /**
     * This field shall indicate whether the state of the server corresponds to that associated with the
     * CurrentScene and CurrentGroup fields of the SceneInfoStruct they belong to. TRUE indicates that these fields
     * are valid, FALSE indicates that they are not valid.
     *
     * This field shall be set to False for all other fabrics when an attribute with the Scenes ("S") designation in
     * the Quality column of another cluster present on the same endpoint is modified or when the current scene is
     * modified by a fabric through the RecallScene or StoreScene commands, regardless of the fabric-scoped access
     * quality of the command.
     *
     * In the event where the SceneValid field is set to False for a fabric, the CurrentScene and CurrentGroup
     * fields shall be the last invoked scene and group for that fabric. In the event where no scene was previously
     * invoked for that fabric, the CurrentScene and CurrentGroup fields shall be their default values.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.2.4
     */
    sceneValid: TlvField(3, TlvBoolean),
    /**
     * This field shall indicate the remaining capacity of the Scene Table on this endpoint for the accessing
     * fabric. Note that this value may change between reads, even if no entries are added or deleted on the
     * accessing fabric, due to other clients associated with other fabrics adding or deleting entries that impact
     * the resource usage on the device.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.2.5
     */
    remainingCapacity: TlvField(4, TlvUInt8.bound({ max: 253 })),
    fabricIndex: TlvField(254, TlvFabricIndex)
  });
  ScenesManagement2.TlvAttributeValuePair = TlvObject({
    /**
     * This field shall be present for all instances in a given ExtensionFieldSetStruct.
     *
     * Which Value* field is used shall be determined based on the data type of the attribute indicated by
     * AttributeID, as described in the Value* Fields subsection.
     *
     * The AttributeID field shall NOT refer to an attribute without the Scenes ("S") designation in the Quality
     * column of the cluster specification.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.3.1
     */
    attributeId: TlvField(0, TlvAttributeId),
    valueUnsigned8: TlvOptionalField(1, TlvUInt8),
    valueSigned8: TlvOptionalField(2, TlvInt8),
    valueUnsigned16: TlvOptionalField(3, TlvUInt16),
    valueSigned16: TlvOptionalField(4, TlvInt16),
    valueUnsigned32: TlvOptionalField(5, TlvUInt32),
    valueSigned32: TlvOptionalField(6, TlvInt32),
    valueUnsigned64: TlvOptionalField(7, TlvUInt64),
    valueSigned64: TlvOptionalField(8, TlvInt64)
  });
  ScenesManagement2.TlvExtensionFieldSet = TlvObject({
    /**
     * This field shall indicate the cluster-id of the cluster whose attributes are in the AttributeValueList field.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.4.1
     */
    clusterId: TlvField(0, TlvClusterId),
    /**
     * This field shall indicate a set of attributes and their values which are stored as part of a scene.
     *
     * Attributes which do not have the Scenes ("S") designation in the Quality column of their cluster
     * specification shall NOT be used in the AttributeValueList field.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.4.2
     */
    attributeValueList: TlvField(1, TlvArray(ScenesManagement2.TlvAttributeValuePair))
  });
  ScenesManagement2.TlvAddSceneRequest = TlvObject({
    /**
     * This field shall indicate the group identifier in the Group Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.2.1
     */
    groupId: TlvField(0, TlvGroupId),
    /**
     * This field shall indicate the scene identifier in the Scene Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.2.2
     */
    sceneId: TlvField(1, TlvUInt8.bound({ max: 254 })),
    /**
     * This field shall indicate the transition time of the scene, measured in milliseconds.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.2.3
     */
    transitionTime: TlvField(2, TlvUInt32.bound({ max: 6e7 })),
    /**
     * This field shall indicate the name of the scene.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.2.4
     */
    sceneName: TlvField(3, TlvString.bound({ maxLength: 16 })),
    /**
     * This field shall contains the list of extension fields.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.2.5
     */
    extensionFieldSetStructs: TlvField(4, TlvArray(ScenesManagement2.TlvExtensionFieldSet))
  });
  ScenesManagement2.TlvAddSceneResponse = TlvObject({
    /**
     * This field shall be set according to the Effect on Receipt section for AddScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.3.1
     */
    status: TlvField(0, TlvEnum()),
    /**
     * The GroupID field shall be set to the corresponding field of the received AddScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.3.2
     */
    groupId: TlvField(1, TlvGroupId),
    /**
     * The SceneID field shall be set to the corresponding field of the received AddScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.3.3
     */
    sceneId: TlvField(2, TlvUInt8.bound({ max: 254 }))
  });
  ScenesManagement2.TlvViewSceneRequest = TlvObject({
    /**
     * This field shall indicate the group identifier in the Group Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.4.1
     */
    groupId: TlvField(0, TlvGroupId),
    /**
     * This field shall indicate the scene identifier in the Scene Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.4.2
     */
    sceneId: TlvField(1, TlvUInt8.bound({ max: 254 }))
  });
  ScenesManagement2.TlvViewSceneResponse = TlvObject({
    /**
     * This field shall be set according to the Effect on Receipt section for ViewScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.5.1
     */
    status: TlvField(0, TlvEnum()),
    /**
     * The GroupID field shall be set to the corresponding field of the received ViewScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.5.2
     */
    groupId: TlvField(1, TlvGroupId),
    /**
     * The SceneID field shall be set to the corresponding field of the received ViewScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.5.3
     */
    sceneId: TlvField(2, TlvUInt8.bound({ max: 254 })),
    /**
     * This field shall be set to the corresponding field in the Scene Table entry.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.5.4
     */
    transitionTime: TlvOptionalField(3, TlvUInt32.bound({ max: 6e7 })),
    /**
     * This field shall be set to the corresponding field in the Scene Table entry.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.5.5
     */
    sceneName: TlvOptionalField(4, TlvString.bound({ maxLength: 16 })),
    /**
     * This field shall be set to the corresponding field in the Scene Table entry.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.5.6
     */
    extensionFieldSetStructs: TlvOptionalField(5, TlvArray(ScenesManagement2.TlvExtensionFieldSet))
  });
  ScenesManagement2.TlvRemoveSceneRequest = TlvObject({
    /**
     * This field shall indicate the group identifier in the Group Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.6.1
     */
    groupId: TlvField(0, TlvGroupId),
    /**
     * This field shall indicate the scene identifier in the Scene Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.6.2
     */
    sceneId: TlvField(1, TlvUInt8.bound({ max: 254 }))
  });
  ScenesManagement2.TlvRemoveSceneResponse = TlvObject({
    /**
     * This field shall be set according to the Effect on Receipt section for RemoveScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.7.1
     */
    status: TlvField(0, TlvEnum()),
    /**
     * The GroupID field shall be set to the corresponding field of the received RemoveScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.7.2
     */
    groupId: TlvField(1, TlvGroupId),
    /**
     * The SceneID field shall be set to the corresponding field of the received RemoveScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.7.3
     */
    sceneId: TlvField(2, TlvUInt8.bound({ max: 254 }))
  });
  ScenesManagement2.TlvRemoveAllScenesRequest = TlvObject({
    /**
     * This field shall indicate the group identifier in the Group Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.8.1
     */
    groupId: TlvField(0, TlvGroupId)
  });
  ScenesManagement2.TlvRemoveAllScenesResponse = TlvObject({
    /**
     * This field shall be set according to the Effect on Receipt section for RemoveAllScenes command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.9.1
     */
    status: TlvField(0, TlvEnum()),
    /**
     * The GroupID field shall be set to the corresponding field of the received RemoveAllScenes command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.9.2
     */
    groupId: TlvField(1, TlvGroupId)
  });
  ScenesManagement2.TlvStoreSceneRequest = TlvObject({
    /**
     * This field shall indicate the group identifier in the Group Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.10.1
     */
    groupId: TlvField(0, TlvGroupId),
    /**
     * This field shall indicate the scene identifier in the Scene Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.10.2
     */
    sceneId: TlvField(1, TlvUInt8.bound({ max: 254 }))
  });
  ScenesManagement2.TlvStoreSceneResponse = TlvObject({
    /**
     * This field shall be set according to the Effect on Receipt section for StoreScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.11.1
     */
    status: TlvField(0, TlvEnum()),
    /**
     * The GroupID field shall be set to the corresponding field of the received StoreScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.11.2
     */
    groupId: TlvField(1, TlvGroupId),
    /**
     * The SceneID field shall be set to the corresponding field of the received StoreScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.11.3
     */
    sceneId: TlvField(2, TlvUInt8.bound({ max: 254 }))
  });
  ScenesManagement2.TlvRecallSceneRequest = TlvObject({
    /**
     * This field shall indicate the group identifier in the Group Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.12.1
     */
    groupId: TlvField(0, TlvGroupId),
    /**
     * This field shall indicate the scene identifier in the Scene Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.12.2
     */
    sceneId: TlvField(1, TlvUInt8.bound({ max: 254 })),
    /**
     * This field shall indicate the transition time of the scene, measured in milliseconds.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.12.3
     */
    transitionTime: TlvOptionalField(2, TlvNullable(TlvUInt32.bound({ max: 6e7 })))
  });
  ScenesManagement2.TlvGetSceneMembershipRequest = TlvObject({
    /**
     * This field shall indicate the group identifier in the Group Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.13.1
     */
    groupId: TlvField(0, TlvGroupId)
  });
  ScenesManagement2.TlvGetSceneMembershipResponse = TlvObject({
    /**
     * This field shall be set according to the Effect on Receipt section for GetSceneMembership command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.14.1
     */
    status: TlvField(0, TlvEnum()),
    /**
     * This field shall contain the remaining capacity of the Scene Table of the server (for all groups for the
     * accessing fabric). The following values apply:
     *
     *   - 0 - No further scenes may be added.
     *
     *   - 0 < Capacity < 0xFE - Capacity holds the number of scenes that may be added.
     *
     *   - 0xFE - At least 1 further scene may be added (exact number is unknown).
     *
     *   - null - It is unknown if any further scenes may be added.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.14.2
     */
    capacity: TlvField(1, TlvNullable(TlvUInt8)),
    /**
     * This field shall be set to the corresponding field of the received GetSceneMembership command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.14.3
     */
    groupId: TlvField(2, TlvGroupId),
    /**
     * If the status is not SUCCESS then this field shall be omitted, else this field shall contain the identifiers
     * of all the scenes in the Scene Table with the corresponding Group ID.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.14.4
     */
    sceneList: TlvOptionalField(3, TlvArray(TlvUInt8))
  });
  ScenesManagement2.CopyMode = {
    /**
     * Copy all scenes in the scene table
     */
    copyAllScenes: BitFlag(0)
  };
  ScenesManagement2.TlvCopySceneRequest = TlvObject({
    /**
     * This field shall contain the information of how the scene copy is to proceed.
     *
     * The CopyAllScenes bit of the Mode indicates whether all scenes are to be copied. If this value is set to 1,
     * all scenes are to be copied and the SceneIdentifierFrom and SceneIdentifierTo fields shall be ignored.
     * Otherwise this bit is set to 0.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.15.1
     */
    mode: TlvField(0, TlvBitmap(TlvUInt8, ScenesManagement2.CopyMode)),
    /**
     * This field shall indicate the identifier of the group from which the scene is to be copied. Together with the
     * SceneIdentifierFrom field, this field uniquely identifies the scene to copy from the Scene Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.15.2
     */
    groupIdentifierFrom: TlvField(1, TlvGroupId),
    /**
     * This field shall indicate the identifier of the scene from which the scene is to be copied. Together with the
     * GroupIdentifierFrom field, this field uniquely identifies the scene to copy from the Scene Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.15.3
     */
    sceneIdentifierFrom: TlvField(2, TlvUInt8.bound({ max: 254 })),
    /**
     * This field shall indicate the identifier of the group to which the scene is to be copied. Together with the
     * SceneIdentifierTo field, this field uniquely identifies the scene to copy to the Scene Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.15.4
     */
    groupIdentifierTo: TlvField(3, TlvGroupId),
    /**
     * This field shall indicate the identifier of the scene to which the scene is to be copied. Together with the
     * GroupIdentifierTo field, this field uniquely identifies the scene to copy to the Scene Table.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.15.5
     */
    sceneIdentifierTo: TlvField(4, TlvUInt8.bound({ max: 254 }))
  });
  ScenesManagement2.TlvCopySceneResponse = TlvObject({
    /**
     * This field shall be set according to the Effect on Receipt section for the CopyScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.16.1
     */
    status: TlvField(0, TlvEnum()),
    /**
     * This field shall be set to the same values as in the corresponding fields of the received CopyScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.16.2
     */
    groupIdentifierFrom: TlvField(1, TlvGroupId),
    /**
     * This field shall be set to the same values as in the corresponding fields of the received CopyScene command.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.16.3
     */
    sceneIdentifierFrom: TlvField(2, TlvUInt8.bound({ max: 254 }))
  });
  ScenesManagement2.TlvLogicalSceneTable = TlvObject({
    /**
     * This field is the group identifier for which this scene applies, or 0 if the scene is not associated with a
     * group.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.5.1
     */
    sceneGroupId: TlvField(0, TlvGroupId),
    /**
     * This field is unique within this group, which is used to identify this scene.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.5.2
     */
    sceneId: TlvField(1, TlvUInt8.bound({ max: 254 })),
    /**
     * The field is the name of the scene.
     *
     * If scene names are not supported, any commands that write a scene name shall simply discard the name, and any
     * command that returns a scene name shall return an empty string.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.5.3
     */
    sceneName: TlvOptionalField(2, TlvString.bound({ maxLength: 16 })),
    /**
     * This field is the amount of time, in milliseconds, it will take for a cluster to change from its current
     * state to the requested state.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.5.4
     */
    sceneTransitionTime: TlvField(3, TlvUInt32.bound({ max: 6e7 })),
    /**
     * See the Scene Table Extensions subsections of individual clusters. A Scene Table Extension shall only use
     * attributes with the Scene quality. Each ExtensionFieldSetStruct holds a set of values of these attributes for
     * a cluster implemented on the same endpoint where the Scene ("S") designation appears in the quality column. A
     * scene is the aggregate of all such fields across all clusters on the endpoint.
     *
     * @see {@link MatterSpecification.v142.Cluster} § 1.4.7.5.5
     */
    extensionFields: TlvField(4, TlvArray(ScenesManagement2.TlvExtensionFieldSet))
  });
  ScenesManagement2.Base = MutableCluster.Component({
    id: 98,
    name: "ScenesManagement",
    revision: 1,
    features: {
      /**
       * This feature indicates the ability to store a name for a scene when a scene is added.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 1.4.4.1
       */
      sceneNames: BitFlag(0)
    },
    attributes: {
      /**
       * Indicates the number of entries in the Scene Table on this endpoint. This is the total across all
       * fabrics; note that a single fabric cannot use all those entries (see Handling of fabric-scoping). The
       * minimum size of this table, (i.e., the minimum number of scenes to support across all fabrics per
       * endpoint) shall be 16, unless a device type in which this cluster is used, defines a larger value in the
       * device type definition.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 1.4.8.1
       */
      sceneTableSize: FixedAttribute(1, TlvUInt16),
      /**
       * Indicates a list of fabric scoped information about scenes on this endpoint.
       *
       * The number of list entries for this attribute shall NOT exceed the number of supported fabrics by the
       * device.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 1.4.8.2
       */
      fabricSceneInfo: FabricScopedAttribute(2, TlvArray(ScenesManagement2.TlvSceneInfo), { default: [] })
    },
    commands: {
      /**
       * It is not mandatory for an extension field set to be included in the command for every cluster on that
       * endpoint that has a defined extension field set. Extension field sets may be omitted, including the case
       * of no extension field sets at all.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.2
       */
      addScene: Command(0, ScenesManagement2.TlvAddSceneRequest, 0, ScenesManagement2.TlvAddSceneResponse, { invokeAcl: AccessLevel.Manage }),
      /**
       * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.4
       */
      viewScene: Command(1, ScenesManagement2.TlvViewSceneRequest, 1, ScenesManagement2.TlvViewSceneResponse),
      /**
       * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.6
       */
      removeScene: Command(
        2,
        ScenesManagement2.TlvRemoveSceneRequest,
        2,
        ScenesManagement2.TlvRemoveSceneResponse,
        { invokeAcl: AccessLevel.Manage }
      ),
      /**
       * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.8
       */
      removeAllScenes: Command(
        3,
        ScenesManagement2.TlvRemoveAllScenesRequest,
        3,
        ScenesManagement2.TlvRemoveAllScenesResponse,
        { invokeAcl: AccessLevel.Manage }
      ),
      /**
       * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.10
       */
      storeScene: Command(
        4,
        ScenesManagement2.TlvStoreSceneRequest,
        4,
        ScenesManagement2.TlvStoreSceneResponse,
        { invokeAcl: AccessLevel.Manage }
      ),
      /**
       * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.12
       */
      recallScene: Command(5, ScenesManagement2.TlvRecallSceneRequest, 5, TlvNoResponse),
      /**
       * This command can be used to get the used scene identifiers within a certain group, for the endpoint that
       * implements this cluster.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.13
       */
      getSceneMembership: Command(6, ScenesManagement2.TlvGetSceneMembershipRequest, 6, ScenesManagement2.TlvGetSceneMembershipResponse),
      /**
       * This command allows a client to efficiently copy scenes from one group/scene identifier pair to another
       * group/scene identifier pair.
       *
       * @see {@link MatterSpecification.v142.Cluster} § 1.4.9.15
       */
      copyScene: OptionalCommand(
        64,
        ScenesManagement2.TlvCopySceneRequest,
        64,
        ScenesManagement2.TlvCopySceneResponse,
        { invokeAcl: AccessLevel.Manage }
      )
    },
    /**
     * This metadata controls which ScenesManagementCluster elements matter.js activates for specific feature
     * combinations.
     */
    extensions: MutableCluster.Extensions()
  });
  ScenesManagement2.ClusterInstance = MutableCluster(ScenesManagement2.Base);
  ScenesManagement2.Cluster = ScenesManagement2.ClusterInstance;
  ScenesManagement2.Complete = ScenesManagement2.Cluster;
})(ScenesManagement || (ScenesManagement = {}));
const ScenesManagementCluster = ScenesManagement.Cluster;
ClusterRegistry.register(ScenesManagement.Complete);
export {
  ScenesManagement,
  ScenesManagementCluster
};
//# sourceMappingURL=scenes-management.js.map
