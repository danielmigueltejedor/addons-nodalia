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
var joint_fabric_administrator_exports = {};
__export(joint_fabric_administrator_exports, {
  JointFabricAdministrator: () => JointFabricAdministrator,
  JointFabricAdministratorCluster: () => JointFabricAdministratorCluster
});
module.exports = __toCommonJS(joint_fabric_administrator_exports);
var import_MutableCluster = require("../cluster/mutation/MutableCluster.js");
var import_Cluster = require("../cluster/Cluster.js");
var import_FabricIndex = require("../datatype/FabricIndex.js");
var import_TlvNullable = require("../tlv/TlvNullable.js");
var import_model = require("#model");
var import_TlvNoArguments = require("../tlv/TlvNoArguments.js");
var import_TlvObject = require("../tlv/TlvObject.js");
var import_TlvString = require("../tlv/TlvString.js");
var import_TlvNumber = require("../tlv/TlvNumber.js");
var import_EndpointNumber = require("../datatype/EndpointNumber.js");
var import_StatusResponseError = require("../common/StatusResponseError.js");
var import_Status = require("../globals/Status.js");
var import_ClusterRegistry = require("../cluster/ClusterRegistry.js");
/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
var JointFabricAdministrator;
((JointFabricAdministrator2) => {
  JointFabricAdministrator2.TlvIcaccsrResponse = (0, import_TlvObject.TlvObject)({
    /**
     * This field shall be a DER-encoded octet string of a properly encoded PKCS #10 Certificate Signing Request
     * (CSR).
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.2.1
     */
    icaccsr: (0, import_TlvObject.TlvField)(0, import_TlvString.TlvByteString.bound({ maxLength: 600 }))
  });
  JointFabricAdministrator2.TlvAddIcacRequest = (0, import_TlvObject.TlvObject)({
    /**
     * This field shall contain an ICAC encoded using Matter Certificate Encoding.
     *
     * ### Effect on Receipt
     *
     * If this command is received without an armed fail-safe context (see Section 11.10.7.2, “ArmFailSafe
     * Command”), then this command shall fail with a FAILSAFE_REQUIRED status code sent back to the initiator.
     *
     * This command shall be received over a CASE session otherwise it shall fail with an INVALID_COMMAND status
     * code.
     *
     * Upon receipt, the ICACValue shall be validated in the following ways:
     *
     *   1. Verify the ICAC using Crypto_VerifyChain(certificates = [ICACValue, RootCACertificate]) where
     *      RootCACertificate is the associated RCAC of the accessing fabric. If this check fails, the error status
     *      shall be InvalidICAC.
     *
     *   2. The public key of the ICAC shall match the public key present in the last ICACCSRResponse provided to
     *      the Administrator that sent the AddICAC command. If this check fails, the error status shall be
     *      InvalidPublicKey.
     *
     *   3. The DN Encoding Rules shall be validated for the ICAC. If this check fails, the error status shall be
     *      InvalidICAC.
     *
     * If any of the above validation checks fail, the server shall immediately respond to the client with an
     * ICACResponse. The StatusCode field of the ICACResponse shall be set to the error status value specified in
     * the above validation checks.
     *
     * If all the checks succeed, then the ICACValue shall be used as described in the Joint Commissioning Method.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.3.1
     */
    icacValue: (0, import_TlvObject.TlvField)(1, import_TlvString.TlvByteString.bound({ maxLength: 400 }))
  });
  let IcacResponseStatus;
  ((IcacResponseStatus2) => {
    IcacResponseStatus2[IcacResponseStatus2["Ok"] = 0] = "Ok";
    IcacResponseStatus2[IcacResponseStatus2["InvalidPublicKey"] = 1] = "InvalidPublicKey";
    IcacResponseStatus2[IcacResponseStatus2["InvalidIcac"] = 2] = "InvalidIcac";
  })(IcacResponseStatus = JointFabricAdministrator2.IcacResponseStatus || (JointFabricAdministrator2.IcacResponseStatus = {}));
  JointFabricAdministrator2.TlvIcacResponse = (0, import_TlvObject.TlvObject)({
    /**
     * This field shall contain an ICACResponseStatusEnum value representing the status of the AddICAC operation.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.4.1
     */
    statusCode: (0, import_TlvObject.TlvField)(0, (0, import_TlvNumber.TlvEnum)())
  });
  JointFabricAdministrator2.TlvOpenJointCommissioningWindowRequest = (0, import_TlvObject.TlvObject)({
    commissioningTimeout: (0, import_TlvObject.TlvField)(0, import_TlvNumber.TlvUInt16),
    pakePasscodeVerifier: (0, import_TlvObject.TlvField)(1, import_TlvString.TlvByteString.bound({ length: 97 })),
    discriminator: (0, import_TlvObject.TlvField)(2, import_TlvNumber.TlvUInt16.bound({ max: 4095 })),
    iterations: (0, import_TlvObject.TlvField)(3, import_TlvNumber.TlvUInt32.bound({ min: 1e3, max: 1e5 })),
    salt: (0, import_TlvObject.TlvField)(4, import_TlvString.TlvByteString.bound({ minLength: 16, maxLength: 32 }))
  });
  let TransferAnchorResponseStatus;
  ((TransferAnchorResponseStatus2) => {
    TransferAnchorResponseStatus2[TransferAnchorResponseStatus2["Ok"] = 0] = "Ok";
    TransferAnchorResponseStatus2[TransferAnchorResponseStatus2["TransferAnchorStatusDatastoreBusy"] = 1] = "TransferAnchorStatusDatastoreBusy";
    TransferAnchorResponseStatus2[TransferAnchorResponseStatus2["TransferAnchorStatusNoUserConsent"] = 2] = "TransferAnchorStatusNoUserConsent";
  })(TransferAnchorResponseStatus = JointFabricAdministrator2.TransferAnchorResponseStatus || (JointFabricAdministrator2.TransferAnchorResponseStatus = {}));
  JointFabricAdministrator2.TlvTransferAnchorResponse = (0, import_TlvObject.TlvObject)({
    statusCode: (0, import_TlvObject.TlvField)(0, (0, import_TlvNumber.TlvEnum)())
  });
  JointFabricAdministrator2.TlvAnnounceJointFabricAdministratorRequest = (0, import_TlvObject.TlvObject)({ endpointId: (0, import_TlvObject.TlvField)(0, import_EndpointNumber.TlvEndpointNumber) });
  let StatusCode;
  ((StatusCode2) => {
    StatusCode2[StatusCode2["Busy"] = 2] = "Busy";
    StatusCode2[StatusCode2["PakeParameterError"] = 3] = "PakeParameterError";
    StatusCode2[StatusCode2["WindowNotOpen"] = 4] = "WindowNotOpen";
    StatusCode2[StatusCode2["VidNotVerified"] = 5] = "VidNotVerified";
    StatusCode2[StatusCode2["InvalidAdministratorFabricIndex"] = 6] = "InvalidAdministratorFabricIndex";
  })(StatusCode = JointFabricAdministrator2.StatusCode || (JointFabricAdministrator2.StatusCode = {}));
  class BusyError extends import_StatusResponseError.StatusResponseError {
    constructor(message = "Could not be completed because another commissioning is in progress", code = import_Status.Status.Failure, clusterCode = 2 /* Busy */) {
      super(message, code, clusterCode);
    }
  }
  JointFabricAdministrator2.BusyError = BusyError;
  class PakeParameterError extends import_StatusResponseError.StatusResponseError {
    constructor(message = "Provided PAKE parameters were incorrectly formatted or otherwise invalid", code = import_Status.Status.Failure, clusterCode = 3 /* PakeParameterError */) {
      super(message, code, clusterCode);
    }
  }
  JointFabricAdministrator2.PakeParameterError = PakeParameterError;
  class WindowNotOpenError extends import_StatusResponseError.StatusResponseError {
    constructor(message = "No commissioning window was currently open", code = import_Status.Status.Failure, clusterCode = 4 /* WindowNotOpen */) {
      super(message, code, clusterCode);
    }
  }
  JointFabricAdministrator2.WindowNotOpenError = WindowNotOpenError;
  class VidNotVerifiedError extends import_StatusResponseError.StatusResponseError {
    constructor(message = "ICACCSRRequest command has been invoked by a peer against which Fabric Table VID Verification hasn\u2019t been executed", code = import_Status.Status.Failure, clusterCode = 5 /* VidNotVerified */) {
      super(message, code, clusterCode);
    }
  }
  JointFabricAdministrator2.VidNotVerifiedError = VidNotVerifiedError;
  class InvalidAdministratorFabricIndexError extends import_StatusResponseError.StatusResponseError {
    constructor(message = "OpenJointCommissioningWindow command has been invoked but the AdministratorFabricIndex field has the value of null", code = import_Status.Status.Failure, clusterCode = 6 /* InvalidAdministratorFabricIndex */) {
      super(message, code, clusterCode);
    }
  }
  JointFabricAdministrator2.InvalidAdministratorFabricIndexError = InvalidAdministratorFabricIndexError;
  JointFabricAdministrator2.ClusterInstance = (0, import_MutableCluster.MutableCluster)({
    id: 1875,
    name: "JointFabricAdministrator",
    revision: 1,
    attributes: {
      /**
       * The AdministratorFabricIndex attribute shall indicate the FabricIndex from the Endpoint 0’s Operational
       * Cluster Fabrics attribute (i.e. the Fabric Table) which is associated withtheJointFabric. This field
       * shall have the value of null if there is no fabric associated with the JointFabric.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.25.6.1
       */
      administratorFabricIndex: (0, import_Cluster.WritableAttribute)(
        0,
        (0, import_TlvNullable.TlvNullable)(import_FabricIndex.TlvFabricIndex),
        { readAcl: import_model.AccessLevel.Administer, writeAcl: import_model.AccessLevel.Administer }
      )
    },
    commands: {
      /**
       * This command shall be generated during Joint Commissioning Method and subsequently be responded in the
       * form of an ICACCSRResponse command.
       *
       * If this command is received without an armed fail-safe context (see Section 11.10.7.2, “ArmFailSafe
       * Command”), then this command shall fail with a FAILSAFE_REQUIRED status code sent back to the initiator.
       *
       * If this command is received from a peer against FabricFabric Table Vendor ID Verification Procedure
       * hasn’t been executed then it shall fail with a JfVidNotVerified status code sent back to the initiator.
       *
       * If a prior AddICAC command was successfully executed within the fail-safe timer period, then this command
       * shall fail with a CONSTRAINT_ERROR status code sent back to the initiator.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.25.7.1
       */
      icaccsrRequest: (0, import_Cluster.Command)(
        0,
        import_TlvNoArguments.TlvNoArguments,
        1,
        JointFabricAdministrator2.TlvIcaccsrResponse,
        { invokeAcl: import_model.AccessLevel.Administer }
      ),
      /**
       * This command shall be generated and executed during Joint Commissioning Method and subsequently be
       * responded in the form of an ICACResponse command.
       *
       * A Commissioner or Administrator shall issue this command after issuing the ICACCSRRequest command and
       * receiving its response.
       *
       * A Commissioner or Administrator shall issue this command after performing the Attestation Procedure,
       * Fabric Table VID Verification and after validating that the peer is authorized to act as an Administrator
       * in its own Fabric.
       *
       * Check ICA Cross Signing for details about the generation of ICACValue.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.25.7.3
       */
      addIcac: (0, import_Cluster.Command)(2, JointFabricAdministrator2.TlvAddIcacRequest, 3, JointFabricAdministrator2.TlvIcacResponse, { invokeAcl: import_model.AccessLevel.Administer }),
      /**
       * > [!NOTE]
       *
       * > This is an alias onto the OpenCommissioningWindow command within the Joint Fabric Administrator
       *   Cluster. Refer to the OpenCommissioningWindow command for a description of the command behavior and
       *   parameters.
       *
       * This command shall fail with a InvalidAdministratorFabricIndex status code sent back to the initiator if
       * the AdministratorFabricIndex field has the value of null.
       *
       * The parameters for OpenJointCommissioningWindow command are as follows:
       *
       * @see {@link MatterSpecification.v142.Core} § 11.25.7.5
       */
      openJointCommissioningWindow: (0, import_Cluster.Command)(
        4,
        JointFabricAdministrator2.TlvOpenJointCommissioningWindowRequest,
        4,
        import_Cluster.TlvNoResponse,
        { invokeAcl: import_model.AccessLevel.Administer }
      ),
      /**
       * This command shall be sent by a candidate Joint Fabric Anchor Administrator to the current Joint Fabric
       * Anchor Administrator to request transfer of the Anchor Fabric.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.25.7.6
       */
      transferAnchorRequest: (0, import_Cluster.Command)(
        5,
        import_TlvNoArguments.TlvNoArguments,
        6,
        JointFabricAdministrator2.TlvTransferAnchorResponse,
        { invokeAcl: import_model.AccessLevel.Administer }
      ),
      /**
       * This command shall indicate the completion of the transfer of the Anchor Fabric to another Joint Fabric
       * Ecosystem Administrator.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.25.7.8
       */
      transferAnchorComplete: (0, import_Cluster.Command)(
        7,
        import_TlvNoArguments.TlvNoArguments,
        7,
        import_Cluster.TlvNoResponse,
        { invokeAcl: import_model.AccessLevel.Administer }
      ),
      /**
       * This command shall be used for communicating to client the endpoint that holds the Joint Fabric
       * Administrator Cluster.
       *
       * This field shall contain the unique identifier for the endpoint that holds the Joint Fabric Administrator
       * Cluster.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.25.7.9
       */
      announceJointFabricAdministrator: (0, import_Cluster.Command)(
        8,
        JointFabricAdministrator2.TlvAnnounceJointFabricAdministratorRequest,
        8,
        import_Cluster.TlvNoResponse,
        { invokeAcl: import_model.AccessLevel.Administer }
      )
    }
  });
  JointFabricAdministrator2.Cluster = JointFabricAdministrator2.ClusterInstance;
  JointFabricAdministrator2.Complete = JointFabricAdministrator2.Cluster;
})(JointFabricAdministrator || (JointFabricAdministrator = {}));
const JointFabricAdministratorCluster = JointFabricAdministrator.Cluster;
import_ClusterRegistry.ClusterRegistry.register(JointFabricAdministrator.Complete);
//# sourceMappingURL=joint-fabric-administrator.js.map
