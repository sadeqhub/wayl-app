import { Text } from '@/components/Text';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from './Icons';

export const StatCard = ({ color, icon, title, orders, amount }: any) => (
  <View style={[styles.card, { backgroundColor: color }]}>
    <View style={styles.headerRow}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={styles.statsRow}>
      {[{ label: "Orders:", value: orders }, { label: "Amount:", value: amount }].map((x,i) => (
        <View key={i} style={styles.statBox}>
          <Text style={styles.statLabel}>{x.label}</Text>
          <Text style={styles.statValue}>{x.value}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    minHeight: 132,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'column',
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 24,
  },
  iconContainer: {
  },
  title: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    color: Theme.ink,
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 22,
    elevation: 2,
  },
  statLabel: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 12,
    color: '#000',
    opacity: 0.5,
  },
  statValue: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
    marginTop: 6,
  }
});
