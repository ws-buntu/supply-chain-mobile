import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import HomeDashboard from './src/app/index';
import InventoryBoard from './src/app/inventory';
import OrdersBoard from './src/app/orders';
import SuppliersBoard from './src/app/suppliers';
import { roleOrder, roleProfiles, type RoleKey } from './src/data/appState';
import { purchaseOrders, type PurchaseOrder } from './src/data/mockData';

type TabKey = 'dashboard' | 'inventory' | 'orders' | 'suppliers';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'dashboard', label: 'Overview' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'orders', label: 'Orders' },
  { key: 'suppliers', label: 'Suppliers' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [roleKey, setRoleKey] = useState<RoleKey>('procurement');
  const [orders, setOrders] = useState<PurchaseOrder[]>(purchaseOrders);
  const activeRole = roleProfiles[roleKey];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.shell}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.eyebrow}>SupplyChainGo</Text>
            <Text style={styles.title}>Operations</Text>
          </View>
          <View style={[styles.rolePill, { backgroundColor: activeRole.chip }]}>
            <Text style={[styles.roleText, { color: activeRole.accent }]}>{activeRole.label}</Text>
          </View>
        </View>

        <View style={styles.roleSwitcher}>
          {roleOrder.map((key) => {
            const profile = roleProfiles[key];
            const selected = key === roleKey;
            return (
              <Pressable
                key={key}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setRoleKey(key)}
                style={[styles.roleOption, selected && { borderColor: profile.accent, backgroundColor: profile.chip }]}
              >
                <Text style={[styles.roleOptionLabel, selected && { color: profile.accent }]}>{profile.label}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.roleHint}>Persona preview only; this is not an access-control boundary.</Text>
        <Text style={styles.roleSummary}>{activeRole.summary}</Text>

        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
              >
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {activeTab === 'dashboard' && <HomeDashboard role={activeRole} />}
          {activeTab === 'inventory' && <InventoryBoard role={activeRole} />}
          {activeTab === 'orders' && <OrdersBoard role={activeRole} orders={orders} onApprove={(orderId) => setOrders((currentOrders) => currentOrders.map((order) => order.id === orderId ? { ...order, status: 'Approved' } : order))} />}
          {activeTab === 'suppliers' && <SuppliersBoard role={activeRole} />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  shell: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#2563eb',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },
  rolePill: {
    backgroundColor: '#dbeafe',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  roleSwitcher: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  roleOption: {
    borderWidth: 1,
    borderColor: '#dbe3f0',
    borderRadius: 999,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  roleOptionLabel: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '700',
  },
  roleHint: {
    color: '#94a3b8',
    fontSize: 10,
    marginBottom: 3,
  },
  roleSummary: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 14,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 14,
    padding: 6,
    marginBottom: 18,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
  },
  tabButtonActive: {
    backgroundColor: '#0f172a',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  tabLabelActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 36,
  },
});
