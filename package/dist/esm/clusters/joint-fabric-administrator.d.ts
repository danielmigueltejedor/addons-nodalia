/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
/*** THIS FILE IS GENERATED, DO NOT EDIT ***/
import { MutableCluster } from "../cluster/mutation/MutableCluster.js";
import { WritableAttribute, Command } from "../cluster/Cluster.js";
import { TypeFromSchema } from "../tlv/TlvSchema.js";
import { StatusResponseError } from "../common/StatusResponseError.js";
import { Status } from "../globals/Status.js";
import { Identity } from "#general";
export declare namespace JointFabricAdministrator {
    /**
     * This command shall be generated in response to a ICACCSRRequest command.
     *
     * Check ICAC Cross Signing for details about the generation of the ICACCSR.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.2
     */
    const TlvIcaccsrResponse: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * This field shall be a DER-encoded octet string of a properly encoded PKCS #10 Certificate Signing Request
         * (CSR).
         *
         * @see {@link MatterSpecification.v142.Core} § 11.25.7.2.1
         */
        icaccsr: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
    }>;
    /**
     * This command shall be generated in response to a ICACCSRRequest command.
     *
     * Check ICAC Cross Signing for details about the generation of the ICACCSR.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.2
     */
    interface IcaccsrResponse extends TypeFromSchema<typeof TlvIcaccsrResponse> {
    }
    /**
     * Input to the JointFabricAdministrator addIcac command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.3
     */
    const TlvAddIcacRequest: import("../tlv/TlvObject.js").ObjectSchema<{
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
        icacValue: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
    }>;
    /**
     * Input to the JointFabricAdministrator addIcac command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.3
     */
    interface AddIcacRequest extends TypeFromSchema<typeof TlvAddIcacRequest> {
    }
    /**
     * This enumeration is used by the ICACResponse command to convey the outcome of this cluster’s operations.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.4.1
     */
    enum IcacResponseStatus {
        /**
         * No error
         */
        Ok = 0,
        /**
         * Public Key in the ICAC is invalid
         */
        InvalidPublicKey = 1,
        /**
         * ICAC chain validation failed / ICAC DN Encoding rules verification failed
         */
        InvalidIcac = 2
    }
    /**
     * This command shall be generated in response to the AddICAC command.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.4
     */
    const TlvIcacResponse: import("../tlv/TlvObject.js").ObjectSchema<{
        /**
         * This field shall contain an ICACResponseStatusEnum value representing the status of the AddICAC operation.
         *
         * @see {@link MatterSpecification.v142.Core} § 11.25.7.4.1
         */
        statusCode: import("../tlv/TlvObject.js").FieldType<IcacResponseStatus>;
    }>;
    /**
     * This command shall be generated in response to the AddICAC command.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.4
     */
    interface IcacResponse extends TypeFromSchema<typeof TlvIcacResponse> {
    }
    /**
     * Input to the JointFabricAdministrator openJointCommissioningWindow command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.5
     */
    const TlvOpenJointCommissioningWindowRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        commissioningTimeout: import("../tlv/TlvObject.js").FieldType<number>;
        pakePasscodeVerifier: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
        discriminator: import("../tlv/TlvObject.js").FieldType<number>;
        iterations: import("../tlv/TlvObject.js").FieldType<number>;
        salt: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
    }>;
    /**
     * Input to the JointFabricAdministrator openJointCommissioningWindow command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.5
     */
    interface OpenJointCommissioningWindowRequest extends TypeFromSchema<typeof TlvOpenJointCommissioningWindowRequest> {
    }
    /**
     * This enumeration is used by the TransferAnchorResponse command to convey the detailed outcome of this cluster’s
     * TransferAnchorRequest command.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.4.2
     */
    enum TransferAnchorResponseStatus {
        /**
         * No error
         */
        Ok = 0,
        /**
         * Anchor Transfer was not started due to on-going Datastore operations
         */
        TransferAnchorStatusDatastoreBusy = 1,
        /**
         * User has not consented for Anchor Transfer
         */
        TransferAnchorStatusNoUserConsent = 2
    }
    /**
     * This command shall be generated in response to the Transfer Anchor Request command.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.7
     */
    const TlvTransferAnchorResponse: import("../tlv/TlvObject.js").ObjectSchema<{
        statusCode: import("../tlv/TlvObject.js").FieldType<TransferAnchorResponseStatus>;
    }>;
    /**
     * This command shall be generated in response to the Transfer Anchor Request command.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.7
     */
    interface TransferAnchorResponse extends TypeFromSchema<typeof TlvTransferAnchorResponse> {
    }
    /**
     * Input to the JointFabricAdministrator announceJointFabricAdministrator command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.9
     */
    const TlvAnnounceJointFabricAdministratorRequest: import("../tlv/TlvObject.js").ObjectSchema<{
        endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
    }>;
    /**
     * Input to the JointFabricAdministrator announceJointFabricAdministrator command
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.7.9
     */
    interface AnnounceJointFabricAdministratorRequest extends TypeFromSchema<typeof TlvAnnounceJointFabricAdministratorRequest> {
    }
    /**
     * @see {@link MatterSpecification.v142.Core} § 11.25.5.1
     */
    enum StatusCode {
        /**
         * Could not be completed because another commissioning is in progress
         */
        Busy = 2,
        /**
         * Provided PAKE parameters were incorrectly formatted or otherwise invalid
         */
        PakeParameterError = 3,
        /**
         * No commissioning window was currently open
         */
        WindowNotOpen = 4,
        /**
         * ICACCSRRequest command has been invoked by a peer against which Fabric Table VID Verification hasn’t been
         * executed
         */
        VidNotVerified = 5,
        /**
         * OpenJointCommissioningWindow command has been invoked but the AdministratorFabricIndex field has the value of
         * null
         */
        InvalidAdministratorFabricIndex = 6
    }
    /**
     * Thrown for cluster status code {@link StatusCode.Busy}.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.5.1
     */
    class BusyError extends StatusResponseError {
        constructor(message?: string, code?: Status, clusterCode?: StatusCode);
    }
    /**
     * Thrown for cluster status code {@link StatusCode.PakeParameterError}.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.5.1
     */
    class PakeParameterError extends StatusResponseError {
        constructor(message?: string, code?: Status, clusterCode?: StatusCode);
    }
    /**
     * Thrown for cluster status code {@link StatusCode.WindowNotOpen}.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.5.1
     */
    class WindowNotOpenError extends StatusResponseError {
        constructor(message?: string, code?: Status, clusterCode?: StatusCode);
    }
    /**
     * Thrown for cluster status code {@link StatusCode.VidNotVerified}.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.5.1
     */
    class VidNotVerifiedError extends StatusResponseError {
        constructor(message?: string, code?: Status, clusterCode?: StatusCode);
    }
    /**
     * Thrown for cluster status code {@link StatusCode.InvalidAdministratorFabricIndex}.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25.5.1
     */
    class InvalidAdministratorFabricIndexError extends StatusResponseError {
        constructor(message?: string, code?: Status, clusterCode?: StatusCode);
    }
    /**
     * @see {@link Cluster}
     */
    const ClusterInstance: MutableCluster<{
        readonly id: 1875;
        readonly name: "JointFabricAdministrator";
        readonly revision: 1;
        readonly attributes: {
            /**
             * The AdministratorFabricIndex attribute shall indicate the FabricIndex from the Endpoint 0’s Operational
             * Cluster Fabrics attribute (i.e. the Fabric Table) which is associated withtheJointFabric. This field
             * shall have the value of null if there is no fabric associated with the JointFabric.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.25.6.1
             */
            readonly administratorFabricIndex: WritableAttribute<import("../datatype/FabricIndex.js").FabricIndex | null, any>;
        };
        readonly commands: {
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
            readonly icaccsrRequest: Command<void, import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall be a DER-encoded octet string of a properly encoded PKCS #10 Certificate Signing Request
                 * (CSR).
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.25.7.2.1
                 */
                icaccsr: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
            }>, any>;
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
            readonly addIcac: Command<import("../tlv/TlvObject.js").TypeFromFields<{
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
                icacValue: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
            }>, import("../tlv/TlvObject.js").TypeFromFields<{
                /**
                 * This field shall contain an ICACResponseStatusEnum value representing the status of the AddICAC operation.
                 *
                 * @see {@link MatterSpecification.v142.Core} § 11.25.7.4.1
                 */
                statusCode: import("../tlv/TlvObject.js").FieldType<IcacResponseStatus>;
            }>, any>;
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
            readonly openJointCommissioningWindow: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                commissioningTimeout: import("../tlv/TlvObject.js").FieldType<number>;
                pakePasscodeVerifier: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
                discriminator: import("../tlv/TlvObject.js").FieldType<number>;
                iterations: import("../tlv/TlvObject.js").FieldType<number>;
                salt: import("../tlv/TlvObject.js").FieldType<AllowSharedBufferSource>;
            }>, void, any>;
            /**
             * This command shall be sent by a candidate Joint Fabric Anchor Administrator to the current Joint Fabric
             * Anchor Administrator to request transfer of the Anchor Fabric.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.25.7.6
             */
            readonly transferAnchorRequest: Command<void, import("../tlv/TlvObject.js").TypeFromFields<{
                statusCode: import("../tlv/TlvObject.js").FieldType<TransferAnchorResponseStatus>;
            }>, any>;
            /**
             * This command shall indicate the completion of the transfer of the Anchor Fabric to another Joint Fabric
             * Ecosystem Administrator.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.25.7.8
             */
            readonly transferAnchorComplete: Command<void, void, any>;
            /**
             * This command shall be used for communicating to client the endpoint that holds the Joint Fabric
             * Administrator Cluster.
             *
             * This field shall contain the unique identifier for the endpoint that holds the Joint Fabric Administrator
             * Cluster.
             *
             * @see {@link MatterSpecification.v142.Core} § 11.25.7.9
             */
            readonly announceJointFabricAdministrator: Command<import("../tlv/TlvObject.js").TypeFromFields<{
                endpointId: import("../tlv/TlvObject.js").FieldType<import("../datatype/EndpointNumber.js").EndpointNumber>;
            }>, void, any>;
        };
    }, []>;
    /**
     * An instance of the Joint Fabric Administrator Cluster only applies to Joint Fabric Administrator nodes fulfilling
     * the role of Anchor CA.
     *
     * > [!NOTE]
     *
     * > Support for Joint Fabric Administrator Cluster is provisional.
     *
     * @see {@link MatterSpecification.v142.Core} § 11.25
     */
    interface Cluster extends Identity<typeof ClusterInstance> {
    }
    const Cluster: Cluster;
    const Complete: Cluster;
}
export type JointFabricAdministratorCluster = JointFabricAdministrator.Cluster;
export declare const JointFabricAdministratorCluster: JointFabricAdministrator.Cluster;
//# sourceMappingURL=joint-fabric-administrator.d.ts.map