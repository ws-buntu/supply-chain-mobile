export type InventoryStatus = 'Healthy' | 'Watch' | 'Critical';

export interface Metric {
  label: string;
  value: string;
  delta: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface InventoryItem {
  sku: string;
  name: string;
  location: string;
  onHand: number;
  atp: number;
  status: InventoryStatus;
  eta: string;
  risk: string;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  status: 'Approved' | 'In Transit' | 'Needs Review' | 'Draft';
  amount: string;
  eta: string;
  progress: number;
  alert?: string;
}

export interface Supplier {
  name: string;
  tier: 'Strategic' | 'Preferred' | 'Tactical';
  otif: number;
  ackTime: string;
  risk: 'Low' | 'Moderate' | 'High';
  region: string;
}

export const metrics: Metric[] = [
  { label: 'On-time delivery', value: '94.8%', delta: '+2.1% vs last week', tone: 'positive' },
  { label: 'Open POs', value: '184', delta: '12 require approval', tone: 'neutral' },
  { label: 'ATP risk', value: '6 SKUs', delta: '2 at critical threshold', tone: 'warning' },
  { label: 'Supplier score', value: '89.3', delta: '+1.7 points', tone: 'positive' },
];

export const inventoryItems: InventoryItem[] = [
  {
    sku: 'SKU-90421',
    name: 'High-Performance Servo Valve',
    location: 'Dallas RDC',
    onHand: 8200,
    atp: 5100,
    status: 'Healthy',
    eta: 'ETA 18h',
    risk: 'Stable supply',
  },
  {
    sku: 'SKU-20480',
    name: 'Industrial Battery Pack',
    location: 'Chicago Hub',
    onHand: 1620,
    atp: 960,
    status: 'Watch',
    eta: 'ETA 41h',
    risk: 'Lead time drift',
  },
  {
    sku: 'SKU-77841',
    name: 'Smart Sensor Module',
    location: 'Memphis DC',
    onHand: 870,
    atp: 420,
    status: 'Critical',
    eta: 'ETA 9h',
    risk: 'Low remaining buffer',
  },
  {
    sku: 'SKU-11364',
    name: 'Thermal Control Unit',
    location: 'Laredo Node',
    onHand: 2890,
    atp: 2140,
    status: 'Healthy',
    eta: 'ETA 36h',
    risk: 'Normal replenishment',
  },
];

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-48172',
    supplier: 'Apex Components',
    status: 'Approved',
    amount: '$184,500',
    eta: 'Apr 18',
    progress: 78,
    alert: 'Dock inspection cleared',
  },
  {
    id: 'PO-48193',
    supplier: 'Northstar Logistics',
    status: 'In Transit',
    amount: '$92,140',
    eta: 'Apr 17',
    progress: 54,
    alert: 'Temperature excursion flagged',
  },
  {
    id: 'PO-48208',
    supplier: 'BluePeak Electronics',
    status: 'Needs Review',
    amount: '$46,900',
    eta: 'Apr 19',
    progress: 32,
    alert: 'Supplier OTIF below 85%',
  },
  {
    id: 'PO-48241',
    supplier: 'Harbor Industrial',
    status: 'Draft',
    amount: '$28,350',
    eta: 'Apr 23',
    progress: 18,
  },
];

export const suppliers: Supplier[] = [
  { name: 'Apex Components', tier: 'Strategic', otif: 96, ackTime: '2.4h', risk: 'Low', region: 'North America' },
  { name: 'Northstar Logistics', tier: 'Preferred', otif: 87, ackTime: '3.1h', risk: 'Moderate', region: 'Europe' },
  { name: 'BluePeak Electronics', tier: 'Tactical', otif: 81, ackTime: '5.8h', risk: 'High', region: 'APAC' },
  { name: 'Harbor Industrial', tier: 'Preferred', otif: 92, ackTime: '2.9h', risk: 'Low', region: 'North America' },
];
