import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { RoleProfile } from '../data/appState';
import { inventoryItems, metrics, purchaseOrders, suppliers } from '../data/mockData';

interface HomeDashboardProps {
  role: RoleProfile;
}

export default function HomeDashboard({ role }: HomeDashboardProps) {
  const title = role.key === 'executive' ? 'Executive overview' : role.key === 'warehouse' ? 'Warehouse overview' : role.key === 'supplier' ? 'Supplier network overview' : 'Procurement overview';

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.metricsGrid}>
        {metrics.map((metric) => (
          <View key={metric.label} style={styles.metricCard}>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={[styles.metricDelta, metric.tone === 'warning' ? styles.warningText : metric.tone === 'positive' ? styles.positiveText : styles.neutralText]}>
              {metric.delta}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Inventory watchlist</Text>
        {inventoryItems.slice(0, 2).map((item) => (
          <View key={item.sku} style={styles.inlineRow}>
            <View>
              <Text style={styles.inlineSku}>{item.sku}</Text>
              <Text style={styles.inlineName}>{item.name}</Text>
            </View>
            <Text style={[styles.inlineStatus, item.status === 'Critical' ? styles.critical : item.status === 'Watch' ? styles.warning : styles.healthy]}>{item.status}</Text>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Open approvals</Text>
        {purchaseOrders.slice(0, 2).map((po) => (
          <View key={po.id} style={styles.inlineRow}>
            <View>
              <Text style={styles.inlineSku}>{po.id}</Text>
              <Text style={styles.inlineName}>{po.supplier}</Text>
            </View>
            <Text style={styles.inlineValue}>{po.amount}</Text>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Supplier health</Text>
        {suppliers.slice(0, 2).map((supplier) => (
          <View key={supplier.name} style={styles.inlineRow}>
            <View>
              <Text style={styles.inlineSku}>{supplier.name}</Text>
              <Text style={styles.inlineName}>{supplier.region}</Text>
            </View>
            <Text style={styles.inlineValue}>{supplier.otif}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  metricValue: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  metricDelta: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: '700',
  },
  positiveText: {
    color: '#166534',
  },
  neutralText: {
    color: '#475569',
  },
  warningText: {
    color: '#b45309',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  inlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  inlineSku: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 0.8,
  },
  inlineName: {
    fontSize: 14,
    color: '#0f172a',
    marginTop: 4,
  },
  inlineValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  inlineStatus: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
  healthy: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  warning: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  critical: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
});
