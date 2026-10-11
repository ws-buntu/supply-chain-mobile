import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { RoleProfile } from '../data/appState';
import { suppliers } from '../data/mockData';

interface SuppliersBoardProps {
  role: RoleProfile;
}

export default function SuppliersBoard({ role }: SuppliersBoardProps) {
  const title = role.key === 'supplier' ? 'Supplier commitments' : role.key === 'procurement' ? 'Supplier network' : role.key === 'executive' ? 'Partner performance' : 'Supplier collaboration';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {suppliers.map((supplier) => (
        <View key={supplier.name} style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.name}>{supplier.name}</Text>
            <Text style={[styles.tier, supplier.tier === 'Strategic' ? styles.tierStrategic : supplier.tier === 'Preferred' ? styles.tierPreferred : styles.tierTactical]}>{supplier.tier}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCell}>
              <Text style={styles.label}>OTIF</Text>
              <Text style={styles.value}>{supplier.otif}%</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.label}>Ack</Text>
              <Text style={styles.value}>{supplier.ackTime}</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.label}>Risk</Text>
              <Text style={styles.value}>{supplier.risk}</Text>
            </View>
          </View>

          <Text style={styles.region}>{supplier.region}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a', marginBottom: 8 },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  tier: { fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, overflow: 'hidden' },
  tierStrategic: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
  tierPreferred: { backgroundColor: '#dcfce7', color: '#166534' },
  tierTactical: { backgroundColor: '#fef3c7', color: '#92400e' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  statCell: { flex: 1 },
  label: { color: '#64748b', fontSize: 12 },
  value: { color: '#0f172a', fontSize: 16, fontWeight: '700', marginTop: 4 },
  region: { marginTop: 12, color: '#475569', fontSize: 13 },
});
