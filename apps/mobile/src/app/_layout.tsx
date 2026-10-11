import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AppLayout() {
  return <View style={styles.layout} />;
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});
