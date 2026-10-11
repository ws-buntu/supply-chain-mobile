import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { RoleProfile } from '../data/appState';
import { purchaseOrders } from '../data/mockData';
import type { PurchaseOrder } from '../data/mockData';

interface OrdersBoardProps {
  role: RoleProfile;
  orders: PurchaseOrder[];
  onApprove: (orderId: string) => void;
}

export default function OrdersBoard({ role, orders, onApprove }: OrdersBoardProps) {
  const title = role.key === 'procurement' ? 'Purchase orders' : role.key === 'warehouse' ? 'Inbound receipts' : role.key === 'supplier' ? 'Supplier commitments' : 'Order portfolio';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {role.key === 'procurement' ? <Text style={styles.guidance}>Approvals here are a local prototype and are not synced to a backend.</Text> : null}
      {orders.map((po) => (
        <View key={po.id} style={styles.card}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.id}>{po.id}</Text>
              <Text style={styles.supplier}>{po.supplier}</Text>
            </View>
            <Text style={[styles.status, po.status === 'Needs Review' ? styles.statusWarning : po.status === 'Draft' ? styles.statusDraft : styles.statusSuccess]}>{po.status}</Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Amount</Text>
            <Text style={styles.metaValue}>{po.amount}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>ETA</Text>
            <Text style={styles.metaValue}>{po.eta}</Text>
          </View>

          <View style={styles.progressBlock}>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressFill, { width: `${po.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{po.progress}% complete</Text>
          </View>

          {po.alert ? <Text style={styles.alert}>{po.alert}</Text> : null}
          {role.key === 'procurement' && po.status === 'Needs Review' ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => onApprove(po.id)}
              style={styles.approveButton}
            >
              <Text style={styles.approveButtonLabel}>Approve purchase order</Text>
            </Pressable>
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a', marginBottom: 8 },
  guidance: { color: '#64748b', fontSize: 12, marginTop: -8 },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  id: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  supplier: { color: '#64748b', fontSize: 14, marginTop: 4 },
  status: { fontSize: 12, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, overflow: 'hidden' },
  statusSuccess: { backgroundColor: '#dcfce7', color: '#166534' },
  statusWarning: { backgroundColor: '#fef3c7', color: '#92400e' },
  statusDraft: { backgroundColor: '#e2e8f0', color: '#334155' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  metaLabel: { color: '#64748b', fontSize: 13 },
  metaValue: { color: '#0f172a', fontWeight: '700', fontSize: 14 },
  progressBlock: { marginTop: 14 },
  progressBarTrack: { width: '100%', height: 8, backgroundColor: '#e2e8f0', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#2563eb', borderRadius: 999 },
  progressText: { marginTop: 8, color: '#475569', fontSize: 12 },
  alert: { marginTop: 12, color: '#b45309', backgroundColor: '#fffbeb', borderRadius: 10, padding: 8, fontWeight: '600', fontSize: 12 },
  approveButton: { marginTop: 12, alignItems: 'center', backgroundColor: '#1d4ed8', borderRadius: 10, paddingVertical: 11, paddingHorizontal: 14 },
  approveButtonLabel: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
