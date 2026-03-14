/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { MutableCluster } from "../cluster/mutation/MutableCluster.js";
import { WritableAttribute, Command, TlvNoResponse } from "../cluster/Cluster.js";
import { TlvFabricIndex } from "../datatype/FabricIndex.js";
import { TlvNullable } from "../tlv/TlvNullable.js";
import { AccessLevel } from "#model";
import { TlvNoArguments } from "../tlv/TlvNoArguments.js";
import { TlvField, TlvObject } from "../tlv/TlvObject.js";
import { TlvByteString } from "../tlv/TlvString.js";
import { TlvEnum, TlvUInt16, TlvUInt32 } from "../tlv/TlvNumber.js";
import { TlvEndpointNumber } from "../datatype/EndpointNumber.js";
import { StatusResponseError } from "../common/StatusResponseError.js";
import { Status } from "../globals/Status.js";
import { ClusterRegistry } from "../cluster/ClusterRegistry.js";
var JointFabricAdministrator;
((JointFabricAdministrator2) => {
  JointFabricAdministrator2.TlvIcaccsrResponse = TlvObject({
    /**
     * This field shall be a DER-encoded octet string of a properly encoded PKCS #10 Certificate Signing Request
     * (CSR).
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.2.1
     */
    icaccsr: TlvField(0, TlvByteString.bound({ maxLength: 600 }))
  });
  JointFabricAdministrator2.TlvAddIcacRequest = TlvObject({
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
    icacValue: TlvField(1, TlvByteString.bound({ maxLength: 400 }))
  });
  let IcacResponseStatus;
  ((IcacResponseStatus2) => {
    IcacResponseStatus2[IcacResponseStatus2["Ok"] = 0] = "Ok";
    IcacResponseStatus2[IcacResponseStatus2["InvalidPublicKey"] = 1] = "InvalidPublicKey";
    IcacResponseStatus2[IcacResponseStatus2["InvalidIcac"] = 2] = "InvalidIcac";
  })(IcacResponseStatus = JointFabricAdministrator2.IcacResponseStatus || (JointFabricAdministrator2.IcacResponseStatus = {}));
  JointFabricAdministrator2.TlvIcacResponse = TlvObject({
    /**
     * This field shall contain an ICACResponseStatusEnum value representing the status of the AddICAC operation.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.4.1
     */
    statusCode: TlvField(0, TlvEnum())
  });
  JointFabricAdministrator2.TlvOpenJointCommissioningWindowRequest = TlvObject({
    commissioningTimeout: TlvField(0, TlvUInt16),
    pakePasscodeVerifier: TlvField(1, TlvByteString.bound({ length: 97 })),
    discriminator: TlvField(2, TlvUInt16.bound({ max: 4095 })),
    iterations: TlvField(3, TlvUInt32.bound({ min: 1e3, max: 1e5 })),
    salt: TlvField(4, TlvByteString.bound({ minLength: 16, maxLength: 32 }))
  });
  let TransferAnchorResponseStatus;
  ((TransferAnchorResponseStatus2) => {
    TransferAnchorResponseStatus2[TransferAnchorResponseStatus2["Ok"] = 0] = "Ok";
    TransferAnchorResponseStatus2[TransferAnchorResponseStatus2["TransferAnchorStatusDatastoreBusy"] = 1] = "TransferAnchorStatusDatastoreBusy";
    TransferAnchorResponseStatus2[TransferAnchorResponseStatus2["TransferAnchorStatusNoUserConsent"] = 2] = "TransferAnchorStatusNoUserConsent";
  })(TransferAnchorResponseStatus = JointFabricAdministrator2.TransferAnchorResponseStatus || (JointFabricAdministrator2.TransferAnchorResponseStatus = {}));
  JointFabricAdministrator2.TlvTransferAnchorResponse = TlvObject({
    statusCode: TlvField(0, TlvEnum())
  });
  JointFabricAdministrator2.TlvAnnounceJointFabricAdministratorRequest = TlvObject({ endpointId: TlvField(0, TlvEndpointNumber) });
  let StatusCode;
  ((StatusCode2) => {
    StatusCode2[StatusCode2["Busy"] = 2] = "Busy";
    StatusCode2[StatusCode2["PakeParameterError"] = 3] = "PakeParameterError";
    StatusCode2[StatusCode2["WindowNotOpen"] = 4] = "WindowNotOpen";
    StatusCode2[StatusCode2["VidNotVerified"] = 5] = "VidNotVerified";
    StatusCode2[StatusCode2["InvalidAdministratorFabricIndex"] = 6] = "InvalidAdministratorFabricIndex";
  })(StatusCode = JointFabricAdministrator2.StatusCode || (JointFabricAdministrator2.StatusCode = {}));
  class BusyError extends StatusResponseError {
    constructor(message = "Could not be completed because another commissioning is in progress", code = Status.Failure, clusterCode = 2 /* Busy */) {
      super(message, code, clusterCode);
    }
  }
  JointFabricAdministrator2.BusyError = BusyError;
  class PakeParameterError extends StatusResponseError {
    constructor(message = "Provided PAKE parameters were incorrectly formatted or otherwise invalid", code = Status.Failure, clusterCode = 3 /* PakeParameterError */) {
      super(message, code, clusterCode);
    }
  }
  JointFabricAdministrator2.PakeParameterError = PakeParameterError;
  class WindowNotOpenError extends StatusResponseError {
    constructor(message = "No commissioning window was currently open", code = Status.Failure, clusterCode = 4 /* WindowNotOpen */) {
      super(message, code, clusterCode);
    }
  }
  JointFabricAdministrator2.WindowNotOpenError = WindowNotOpenError;
  class VidNotVerifiedError extends StatusResponseError {
    constructor(message = "ICACCSRRequest command has been invoked by a peer against which Fabric Table VID Verification hasn\u2019t been executed", code = Status.Failure, clusterCode = 5 /* VidNotVerified */) {
      super(message, code, clusterCode);
    }
  }
  JointFabricAdministrator2.VidNotVerifiedError = VidNotVerifiedError;
  class InvalidAdministratorFabricIndexError extends StatusResponseError {
    constructor(message = "OpenJointCommissioningWindow command has been invoked but the AdministratorFabricIndex field has the value of null", code = Status.Failure, clusterCode = 6 /* InvalidAdministratorFabricIndex */) {
      super(message, code, clusterCode);
    }
  }
  JointFabricAdministrator2.InvalidAdministratorFabricIndexError = InvalidAdministratorFabricIndexError;
  JointFabricAdministrator2.ClusterInstance = MutableCluster({
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
      administratorFabricIndex: WritableAttribute(
        0,
        TlvNullable(TlvFabricIndex),
        { readAcl: AccessLevel.Administer, writeAcl: AccessLevel.Administer }
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
      icaccsrRequest: Command(
        0,
        TlvNoArguments,
        1,
        JointFabricAdministrator2.TlvIcaccsrResponse,
        { invokeAcl: AccessLevel.Administer }
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
      addIcac: Command(2, JointFabricAdministrator2.TlvAddIcacRequest, 3, JointFabricAdministrator2.TlvIcacResponse, { invokeAcl: AccessLevel.Administer }),
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
      openJointCommissioningWindow: Command(
        4,
        JointFabricAdministrator2.TlvOpenJointCommissioningWindowRequest,
        4,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      ),
      /**
       * This command shall be sent by a candidate Joint Fabric Anchor Administrator to the current Joint Fabric
       * Anchor Administrator to request transfer of the Anchor Fabric.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.25.7.6
       */
      transferAnchorRequest: Command(
        5,
        TlvNoArguments,
        6,
        JointFabricAdministrator2.TlvTransferAnchorResponse,
        { invokeAcl: AccessLevel.Administer }
      ),
      /**
       * This command shall indicate the completion of the transfer of the Anchor Fabric to another Joint Fabric
       * Ecosystem Administrator.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.25.7.8
       */
      transferAnchorComplete: Command(
        7,
        TlvNoArguments,
        7,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
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
      announceJointFabricAdministrator: Command(
        8,
        JointFabricAdministrator2.TlvAnnounceJointFabricAdministratorRequest,
        8,
        TlvNoResponse,
        { invokeAcl: AccessLevel.Administer }
      )
    }
  });
  JointFabricAdministrator2.Cluster = JointFabricAdministrator2.ClusterInstance;
  JointFabricAdministrator2.Complete = JointFabricAdministrator2.Cluster;
})(JointFabricAdministrator || (JointFabricAdministrator = {}));
const JointFabricAdministratorCluster = JointFabricAdministrator.Cluster;
ClusterRegistry.register(JointFabricAdministrator.Complete);
export {
  JointFabricAdministrator,
  JointFabricAdministratorCluster
};
//# sourceMappingURL=joint-fabric-administrator.js.map
