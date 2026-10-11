import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { RoleProfile } from '../data/appState';
import { inventoryItems } from '../data/mockData';

interface InventoryBoardProps {
  role: RoleProfile;
}

export default function InventoryBoard({ role }: InventoryBoardProps) {
  const title = role.key === 'supplier' ? 'Material exposure' : role.key === 'executive' ? 'Network stock view' : 'Inventory visibility';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {inventoryItems.map((item) => (
        <View key={item.sku} style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sku}>{item.sku}</Text>
            <Text style={[styles.badge, item.status === 'Critical' ? styles.badgeCritical : item.status === 'Watch' ? styles.badgeWarning : styles.badgeHealthy]}>
              {item.status}
            </Text>
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>{item.location}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBlock}>
              <Text style={styles.label}>On hand</Text>
              <Text style={styles.value}>{item.onHand.toLocaleString()}</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.label}>ATP</Text>
              <Text style={styles.value}>{item.atp.toLocaleString()}</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.label}>ETA</Text>
              <Text style={styles.value}>{item.eta}</Text>
            </View>
          </View>

          <Text style={styles.risk}>{item.risk}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a', marginBottom: 8 },
  card: { backgroundColor: '#ffffff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#0f172a', shadowOpacity: 0.06, shadowRadius: 12, elevation: 3 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sku: { fontSize: 13, fontWeight: '700', color: '#475569', letterSpacing: 0.8 },
  name: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginTop: 8 },
  meta: { fontSize: 14, color: '#64748b', marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  statBlock: { flex: 1 },
  label: { fontSize: 12, color: '#64748b', marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  risk: { marginTop: 12, fontSize: 13, color: '#2563eb', fontWeight: '600' },
  badge: { fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, fontWeight: '700', overflow: 'hidden' },
  badgeHealthy: { backgroundColor: '#dcfce7', color: '#166534' },
  badgeWarning: { backgroundColor: '#fef3c7', color: '#92400e' },
  badgeCritical: { backgroundColor: '#fee2e2', color: '#991b1b' },
});
