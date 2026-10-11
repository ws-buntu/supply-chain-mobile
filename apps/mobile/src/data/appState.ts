export type RoleKey = 'procurement' | 'warehouse' | 'supplier' | 'executive';

export interface RoleProfile {
  key: RoleKey;
  label: string;
  summary: string;
  accent: string;
  chip: string;
}

export const roleProfiles: Record<RoleKey, RoleProfile> = {
  procurement: {
    key: 'procurement',
    label: 'Procurement Lead',
    summary: 'Approvals, sourcing, and supplier performance',
    accent: '#1d4ed8',
    chip: '#dbeafe',
  },
  warehouse: {
    key: 'warehouse',
    label: 'Warehouse Manager',
    summary: 'Inventory flow, receiving, and ATP coverage',
    accent: '#0f766e',
    chip: '#ccfbf1',
  },
  supplier: {
    key: 'supplier',
    label: 'Supplier Ops',
    summary: 'Dock readiness, lead-time signals, and OTIF',
    accent: '#a16207',
    chip: '#fef3c7',
  },
  executive: {
    key: 'executive',
    label: 'Executive',
    summary: 'Risk exposure, service levels, and operating KPIs',
    accent: '#7c3aed',
    chip: '#ede9fe',
  },
};

export const roleOrder: RoleKey[] = ['procurement', 'warehouse', 'supplier', 'executive'];