// ─── Plant Topology Types & Data ─────────────────────────────────────────────

export type GridConnection = "on-grid" | "off-grid" | "hybrid";
export type EquipmentType = "solar-array" | "combiner" | "inverter" | "battery" | "transformer" | "grid" | "load" | "junction";

export interface TopologyNode {
  id: string;
  type: EquipmentType;
  label: string;
  status: "online" | "warning" | "offline";
  capacity?: number; // kW or kWh
  output?: number;   // current kW
  detail?: string;   // e.g. "98% SoC", "58°C"
}

export interface TopologyConnection {
  from: string;
  to: string;
  bidirectional?: boolean;
  powerKW?: number;
  label?: string;
}

export interface PlantTopology {
  gridConnection: GridConnection;
  nodes: TopologyNode[];
  connections: TopologyConnection[];
}

// ─── Layout engine: assigns (col, row) positions per node type ──────────────

// Column assignments by equipment type (left-to-right flow)
const COL_ORDER: Record<EquipmentType, number> = {
  "solar-array": 0,
  "combiner": 1,
  "inverter": 2,
  "junction": 3,
  "battery": 3,
  "transformer": 4,
  "load": 4,
  "grid": 4,
};

export interface LayoutNode extends TopologyNode {
  x: number;
  y: number;
}

export interface LayoutEdge {
  from: LayoutNode;
  to: LayoutNode;
  bidirectional: boolean;
  powerKW?: number;
  label?: string;
}

export function computeLayout(topology: PlantTopology): { nodes: LayoutNode[]; edges: LayoutEdge[] } {
  // Group nodes by column
  const columns: Map<number, TopologyNode[]> = new Map();
  for (const node of topology.nodes) {
    const col = COL_ORDER[node.type];
    if (!columns.has(col)) columns.set(col, []);
    columns.get(col)!.push(node);
  }

  const colX: Record<number, number> = { 0: 50, 1: 200, 2: 350, 3: 500, 4: 650 };
  const nodeMap = new Map<string, LayoutNode>();

  for (const [col, nodes] of columns.entries()) {
    const x = colX[col] ?? col * 150 + 50;
    const totalHeight = nodes.length * 80;
    const startY = Math.max(40, (400 - totalHeight) / 2);
    nodes.forEach((node, i) => {
      const layoutNode: LayoutNode = { ...node, x, y: startY + i * 80 };
      nodeMap.set(node.id, layoutNode);
    });
  }

  const layoutNodes = Array.from(nodeMap.values());

  const edges: LayoutEdge[] = topology.connections
    .map(conn => {
      const from = nodeMap.get(conn.from);
      const to = nodeMap.get(conn.to);
      if (!from || !to) return null;
      return { from, to, bidirectional: conn.bidirectional ?? false, powerKW: conn.powerKW, label: conn.label };
    })
    .filter(Boolean) as LayoutEdge[];

  return { nodes: layoutNodes, edges };
}

// ─── Plant topologies ────────────────────────────────────────────────────────

// P1: Large on-grid plant — Rajasthan Solar Park
export const topologyP1: PlantTopology = {
  gridConnection: "on-grid",
  nodes: [
    { id: "arr-1", type: "solar-array", label: "Array A", status: "online", capacity: 2500, output: 2200 },
    { id: "arr-2", type: "solar-array", label: "Array B", status: "online", capacity: 2500, output: 2350 },
    { id: "cb-1", type: "combiner", label: "CB-1", status: "online" },
    { id: "cb-2", type: "combiner", label: "CB-2", status: "online" },
    { id: "inv-1", type: "inverter", label: "INV-01", status: "online", capacity: 1250, output: 1100, detail: "42°C" },
    { id: "inv-2", type: "inverter", label: "INV-02", status: "online", capacity: 1250, output: 1180, detail: "44°C" },
    { id: "inv-3", type: "inverter", label: "INV-03", status: "warning", capacity: 1250, output: 900, detail: "58°C High" },
    { id: "inv-4", type: "inverter", label: "INV-04", status: "online", capacity: 1250, output: 1150, detail: "41°C" },
    { id: "junc", type: "junction", label: "AC Bus", status: "online", output: 4330 },
    { id: "xfmr", type: "transformer", label: "Step-Up TX", status: "online", capacity: 5000 },
    { id: "grid", type: "grid", label: "Utility Grid", status: "online" },
  ],
  connections: [
    { from: "arr-1", to: "cb-1", powerKW: 2200 },
    { from: "arr-2", to: "cb-2", powerKW: 2350 },
    { from: "cb-1", to: "inv-1", powerKW: 1100 },
    { from: "cb-1", to: "inv-2", powerKW: 1100 },
    { from: "cb-2", to: "inv-3", powerKW: 900 },
    { from: "cb-2", to: "inv-4", powerKW: 1150 },
    { from: "inv-1", to: "junc", powerKW: 1100 },
    { from: "inv-2", to: "junc", powerKW: 1180 },
    { from: "inv-3", to: "junc", powerKW: 900 },
    { from: "inv-4", to: "junc", powerKW: 1150 },
    { from: "junc", to: "xfmr", powerKW: 4330 },
    { from: "xfmr", to: "grid", powerKW: 4330, label: "Export" },
  ],
};

// P2: Hybrid with battery — Gujarat Sun Farm
export const topologyP2: PlantTopology = {
  gridConnection: "hybrid",
  nodes: [
    { id: "arr-1", type: "solar-array", label: "Array A", status: "online", capacity: 1600, output: 1400 },
    { id: "arr-2", type: "solar-array", label: "Array B", status: "online", capacity: 1600, output: 1350 },
    { id: "cb-1", type: "combiner", label: "CB-1", status: "online" },
    { id: "cb-2", type: "combiner", label: "CB-2", status: "warning", detail: "Fuse Alert" },
    { id: "inv-1", type: "inverter", label: "INV-01", status: "online", capacity: 1600, output: 1400, detail: "40°C" },
    { id: "inv-2", type: "inverter", label: "INV-02", status: "online", capacity: 1600, output: 1350, detail: "43°C" },
    { id: "junc", type: "junction", label: "AC Bus", status: "online", output: 2750 },
    { id: "batt", type: "battery", label: "Battery 500kWh", status: "online", capacity: 500, output: -120, detail: "Charging • 72% SoC" },
    { id: "load", type: "load", label: "Facility Load", status: "online", output: 1800 },
    { id: "grid", type: "grid", label: "Utility Grid", status: "online" },
  ],
  connections: [
    { from: "arr-1", to: "cb-1", powerKW: 1400 },
    { from: "arr-2", to: "cb-2", powerKW: 1350 },
    { from: "cb-1", to: "inv-1", powerKW: 1400 },
    { from: "cb-2", to: "inv-2", powerKW: 1350 },
    { from: "inv-1", to: "junc", powerKW: 1400 },
    { from: "inv-2", to: "junc", powerKW: 1350 },
    { from: "junc", to: "batt", powerKW: 120, bidirectional: true, label: "Charging" },
    { from: "junc", to: "load", powerKW: 1800, label: "Load" },
    { from: "junc", to: "grid", powerKW: 830, label: "Export" },
  ],
};

// P3: Off-grid with battery — Karnataka PV Station
export const topologyP3: PlantTopology = {
  gridConnection: "off-grid",
  nodes: [
    { id: "arr-1", type: "solar-array", label: "Array A", status: "online", capacity: 1050, output: 850 },
    { id: "arr-2", type: "solar-array", label: "Array B", status: "offline", capacity: 1050, output: 0, detail: "Fault" },
    { id: "cb-1", type: "combiner", label: "CB-1", status: "online" },
    { id: "cb-2", type: "combiner", label: "CB-2", status: "offline" },
    { id: "inv-1", type: "inverter", label: "INV-01", status: "online", capacity: 1050, output: 850, detail: "39°C" },
    { id: "inv-2", type: "inverter", label: "INV-02", status: "offline", capacity: 1050, output: 0, detail: "Comm Fault" },
    { id: "junc", type: "junction", label: "AC Bus", status: "warning", output: 850 },
    { id: "batt", type: "battery", label: "Battery 1MWh", status: "online", capacity: 1000, output: 350, detail: "Discharging • 58% SoC" },
    { id: "load", type: "load", label: "Village Load", status: "online", output: 1200 },
  ],
  connections: [
    { from: "arr-1", to: "cb-1", powerKW: 850 },
    { from: "arr-2", to: "cb-2", powerKW: 0 },
    { from: "cb-1", to: "inv-1", powerKW: 850 },
    { from: "cb-2", to: "inv-2", powerKW: 0 },
    { from: "inv-1", to: "junc", powerKW: 850 },
    { from: "inv-2", to: "junc", powerKW: 0 },
    { from: "batt", to: "junc", powerKW: 350, bidirectional: true, label: "Discharging" },
    { from: "junc", to: "load", powerKW: 1200, label: "Load" },
  ],
};

// P4: On-grid with transformer and load — Tamil Nadu Array
export const topologyP4: PlantTopology = {
  gridConnection: "on-grid",
  nodes: [
    { id: "arr-1", type: "solar-array", label: "Array A", status: "online", capacity: 1500, output: 1380 },
    { id: "arr-2", type: "solar-array", label: "Array B", status: "online", capacity: 1500, output: 1420 },
    { id: "arr-3", type: "solar-array", label: "Array C", status: "online", capacity: 1500, output: 1350 },
    { id: "cb-1", type: "combiner", label: "CB-1", status: "online" },
    { id: "cb-2", type: "combiner", label: "CB-2", status: "online" },
    { id: "cb-3", type: "combiner", label: "CB-3", status: "online" },
    { id: "inv-1", type: "inverter", label: "INV-01", status: "online", capacity: 1500, output: 1380, detail: "38°C" },
    { id: "inv-2", type: "inverter", label: "INV-02", status: "online", capacity: 1500, output: 1420, detail: "40°C" },
    { id: "inv-3", type: "inverter", label: "INV-03", status: "online", capacity: 1500, output: 1350, detail: "37°C" },
    { id: "junc", type: "junction", label: "AC Bus", status: "online", output: 4150 },
    { id: "xfmr", type: "transformer", label: "Step-Up TX", status: "online", capacity: 5000 },
    { id: "load", type: "load", label: "Factory Load", status: "online", output: 2800 },
    { id: "grid", type: "grid", label: "Utility Grid", status: "online" },
  ],
  connections: [
    { from: "arr-1", to: "cb-1", powerKW: 1380 },
    { from: "arr-2", to: "cb-2", powerKW: 1420 },
    { from: "arr-3", to: "cb-3", powerKW: 1350 },
    { from: "cb-1", to: "inv-1", powerKW: 1380 },
    { from: "cb-2", to: "inv-2", powerKW: 1420 },
    { from: "cb-3", to: "inv-3", powerKW: 1350 },
    { from: "inv-1", to: "junc", powerKW: 1380 },
    { from: "inv-2", to: "junc", powerKW: 1420 },
    { from: "inv-3", to: "junc", powerKW: 1350 },
    { from: "junc", to: "xfmr", powerKW: 4150 },
    { from: "xfmr", to: "load", powerKW: 2800, label: "Load" },
    { from: "xfmr", to: "grid", powerKW: 1350, label: "Export" },
  ],
};

// Map plant IDs to topologies
export const plantTopologies: Record<string, PlantTopology> = {
  p1: topologyP1,
  p2: topologyP2,
  p3: topologyP3,
  p4: topologyP4,
};
