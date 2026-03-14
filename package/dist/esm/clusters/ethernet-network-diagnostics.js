/**
 * @license
 * Copyright 2022-2026 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { MutableCluster } from "../cluster/mutation/MutableCluster.js";
import { Attribute, Command, TlvNoResponse, OptionalAttribute } from "../cluster/Cluster.js";
import { TlvUInt64, TlvEnum } from "../tlv/TlvNumber.js";
import { TlvNoArguments } from "../tlv/TlvNoArguments.js";
import { AccessLevel } from "#model";
import { BitFlag } from "../schema/BitmapSchema.js";
import { TlvNullable } from "../tlv/TlvNullable.js";
import { TlvBoolean } from "../tlv/TlvBoolean.js";
import { ClusterRegistry } from "../cluster/ClusterRegistry.js";
var EthernetNetworkDiagnostics;
((EthernetNetworkDiagnostics2) => {
  let Feature;
  ((Feature2) => {
    Feature2["PacketCounts"] = "PacketCounts";
    Feature2["ErrorCounts"] = "ErrorCounts";
  })(Feature = EthernetNetworkDiagnostics2.Feature || (EthernetNetworkDiagnostics2.Feature = {}));
  let PhyRate;
  ((PhyRate2) => {
    PhyRate2[PhyRate2["Rate10M"] = 0] = "Rate10M";
    PhyRate2[PhyRate2["Rate100M"] = 1] = "Rate100M";
    PhyRate2[PhyRate2["Rate1G"] = 2] = "Rate1G";
    PhyRate2[PhyRate2["Rate25G"] = 3] = "Rate25G";
    PhyRate2[PhyRate2["Rate5G"] = 4] = "Rate5G";
    PhyRate2[PhyRate2["Rate10G"] = 5] = "Rate10G";
    PhyRate2[PhyRate2["Rate40G"] = 6] = "Rate40G";
    PhyRate2[PhyRate2["Rate100G"] = 7] = "Rate100G";
    PhyRate2[PhyRate2["Rate200G"] = 8] = "Rate200G";
    PhyRate2[PhyRate2["Rate400G"] = 9] = "Rate400G";
  })(PhyRate = EthernetNetworkDiagnostics2.PhyRate || (EthernetNetworkDiagnostics2.PhyRate = {}));
  EthernetNetworkDiagnostics2.PacketCountsComponent = MutableCluster.Component({
    attributes: {
      /**
       * Indicates the number of packets that have been received on the ethernet network interface. The attribute
       * shall be reset to 0 upon a reboot of the Node.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.16.6.3
       */
      packetRxCount: Attribute(2, TlvUInt64, { omitChanges: true, default: 0 }),
      /**
       * Indicates the number of packets that have been successfully transferred on the ethernetnetworkinterface.
       * The attribute shall be reset to 0 upon a reboot of the Node.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.16.6.4
       */
      packetTxCount: Attribute(3, TlvUInt64, { omitChanges: true, default: 0 })
    }
  });
  EthernetNetworkDiagnostics2.ErrorCountsComponent = MutableCluster.Component({
    attributes: {
      /**
       * Indicates the number of failed packet transmissions that have occurred on the ethernetnetworkinterface.
       * The attribute shall be reset to 0 upon a reboot of the Node.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.16.6.5
       */
      txErrCount: Attribute(4, TlvUInt64, { omitChanges: true, default: 0 }),
      /**
       * Indicates the number of collisions that have occurred while attempting to transmit a packet on the
       * ethernet network interface. The attribute shall be reset to 0 upon a reboot of the Node.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.16.6.6
       */
      collisionCount: Attribute(5, TlvUInt64, { omitChanges: true, default: 0 }),
      /**
       * Indicates the number of packets dropped either at ingress or egress, due to lack of buffer memory to
       * retain all packets on the ethernet network interface. The attribute shall be reset to 0 upon a reboot of
       * the Node.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.16.6.7
       */
      overrunCount: Attribute(6, TlvUInt64, { omitChanges: true, default: 0 })
    }
  });
  EthernetNetworkDiagnostics2.PacketCountsOrErrorCountsComponent = MutableCluster.Component({
    commands: {
      /**
       * This command is used to reset the count attributes.
       *
       * Reception of this command shall reset the following attributes to 0:
       *
       *   - PacketRxCount
       *
       *   - PacketTxCount
       *
       *   - TxErrCount
       *
       *   - CollisionCount
       *
       *   - OverrunCount
       *
       * @see {@link MatterSpecification.v142.Core} § 11.16.7.1
       */
      resetCounts: Command(0, TlvNoArguments, 0, TlvNoResponse, { invokeAcl: AccessLevel.Manage })
    }
  });
  EthernetNetworkDiagnostics2.Base = MutableCluster.Component({
    id: 55,
    name: "EthernetNetworkDiagnostics",
    revision: 1,
    features: {
      /**
       * Node makes available the counts for the number of received and transmitted packets on the ethernet
       * interface.
       */
      packetCounts: BitFlag(0),
      /**
       * Node makes available the counts for the number of errors that have occurred during the reception and
       * transmission of packets on the ethernet interface.
       */
      errorCounts: BitFlag(1)
    },
    attributes: {
      /**
       * Indicates the current nominal, usable speed at the top of the physical layer of the Node. A value of null
       * shall indicate that the interface is not currently configured or operational.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.16.6.1
       */
      phyRate: OptionalAttribute(0, TlvNullable(TlvEnum()), { default: null }),
      /**
       * Indicates if the Node is currently utilizing the full-duplex operating mode. A value of null shall
       * indicate that the interface is not currently configured or operational.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.16.6.2
       */
      fullDuplex: OptionalAttribute(1, TlvNullable(TlvBoolean), { default: null }),
      /**
       * Indicates the value of the Carrier Detect control signal present on the ethernet network interface. A
       * value of null shall indicate that the interface is not currently configured or operational.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.16.6.8
       */
      carrierDetect: OptionalAttribute(7, TlvNullable(TlvBoolean), { omitChanges: true, default: null }),
      /**
       * Indicates the duration of time, in minutes, that it has been since the ethernet network interface has
       * reset for any reason.
       *
       * @see {@link MatterSpecification.v142.Core} § 11.16.6.9
       */
      timeSinceReset: OptionalAttribute(8, TlvUInt64, { omitChanges: true, default: 0 })
    },
    /**
     * This metadata controls which EthernetNetworkDiagnosticsCluster elements matter.js activates for specific
     * feature combinations.
     */
    extensions: MutableCluster.Extensions(
      { flags: { packetCounts: true }, component: EthernetNetworkDiagnostics2.PacketCountsComponent },
      { flags: { errorCounts: true }, component: EthernetNetworkDiagnostics2.ErrorCountsComponent },
      { flags: { packetCounts: true }, component: EthernetNetworkDiagnostics2.PacketCountsOrErrorCountsComponent },
      { flags: { errorCounts: true }, component: EthernetNetworkDiagnostics2.PacketCountsOrErrorCountsComponent }
    )
  });
  EthernetNetworkDiagnostics2.ClusterInstance = MutableCluster(EthernetNetworkDiagnostics2.Base);
  EthernetNetworkDiagnostics2.Cluster = EthernetNetworkDiagnostics2.ClusterInstance;
  const PKTCNT = { packetCounts: true };
  const ERRCNT = { errorCounts: true };
  EthernetNetworkDiagnostics2.CompleteInstance = MutableCluster({
    id: EthernetNetworkDiagnostics2.Cluster.id,
    name: EthernetNetworkDiagnostics2.Cluster.name,
    revision: EthernetNetworkDiagnostics2.Cluster.revision,
    features: EthernetNetworkDiagnostics2.Cluster.features,
    attributes: {
      ...EthernetNetworkDiagnostics2.Cluster.attributes,
      packetRxCount: MutableCluster.AsConditional(
        EthernetNetworkDiagnostics2.PacketCountsComponent.attributes.packetRxCount,
        { mandatoryIf: [PKTCNT] }
      ),
      packetTxCount: MutableCluster.AsConditional(
        EthernetNetworkDiagnostics2.PacketCountsComponent.attributes.packetTxCount,
        { mandatoryIf: [PKTCNT] }
      ),
      txErrCount: MutableCluster.AsConditional(
        EthernetNetworkDiagnostics2.ErrorCountsComponent.attributes.txErrCount,
        { mandatoryIf: [ERRCNT] }
      ),
      collisionCount: MutableCluster.AsConditional(
        EthernetNetworkDiagnostics2.ErrorCountsComponent.attributes.collisionCount,
        { mandatoryIf: [ERRCNT] }
      ),
      overrunCount: MutableCluster.AsConditional(
        EthernetNetworkDiagnostics2.ErrorCountsComponent.attributes.overrunCount,
        { mandatoryIf: [ERRCNT] }
      )
    },
    commands: {
      resetCounts: MutableCluster.AsConditional(
        EthernetNetworkDiagnostics2.PacketCountsOrErrorCountsComponent.commands.resetCounts,
        { mandatoryIf: [PKTCNT, ERRCNT] }
      )
    }
  });
  EthernetNetworkDiagnostics2.Complete = EthernetNetworkDiagnostics2.CompleteInstance;
})(EthernetNetworkDiagnostics || (EthernetNetworkDiagnostics = {}));
const EthernetNetworkDiagnosticsCluster = EthernetNetworkDiagnostics.Cluster;
ClusterRegistry.register(EthernetNetworkDiagnostics.Complete);
export {
  EthernetNetworkDiagnostics,
  EthernetNetworkDiagnosticsCluster
};
//# sourceMappingURL=ethernet-network-diagnostics.js.map
