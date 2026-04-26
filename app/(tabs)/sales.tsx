import { Text } from '@/components/Text';
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '@/components/Header';
import { icons, Theme } from '@/components/Icons';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { useAppStore } from '@/store';

const STATUS_STYLES = {
  Complete: { dot: Theme.green, label: Theme.green },
  Pending:  { dot: Theme.amber, label: Theme.amber },
  Rejected: { dot: Theme.red,   label: Theme.red   },
};

const StackedAvatars = ({ count }: { count: number }) => {
  const colors = ["#F3D9A4", "#C7DCC0", "#D9C3E8", "#F5B5B5", "#A5C7E8", "#FFD1A8"];
  return (
    <View style={styles.avatarsContainer}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[
          styles.avatarBubble,
          { backgroundColor: colors[i % colors.length] }
        ]}>
          <Text style={styles.avatarText}>
            {["AM","FA","HA","ZH","MK","NA"][(count - 1 - i) % 6]}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default function SalesScreen() {
  const { t } = useTranslation();
  const sales = useAppStore(state => state.sales);

  return (
    <View style={styles.container}>
      <Header title={t('sales', 'Sales')} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {sales.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{t('noSales', 'No sales yet.')}</Text>
          </View>
        ) : (
          sales.map((s, i) => {
          const style = STATUS_STYLES[s.status as keyof typeof STATUS_STYLES];
          return (
            <TouchableOpacity 
              key={s.id || i} 
              style={[
                styles.salesRow,
                i < sales.length - 1 && styles.borderBottom
              ]}
              onPress={() => router.push({
                pathname: '/customer-detail',
                params: { name: s.name, status: s.status, date: s.date, phone: s.phone }
              })}
            >
              <View style={styles.checkDot}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill={style.dot}>
                  <Circle cx="12" cy="12" r="10"/>
                  <Path d="M8 12l3 3 5-6" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
              </View>
              
              <View style={styles.salesInfo}>
                <View style={styles.statusRow}>
                  {icons.shape(style.label)}
                  <Text style={[styles.statusText, { color: style.label }]}>
                    {t(s.status.toLowerCase(), s.status)} · {s.date}
                  </Text>
                </View>
                <Text style={styles.salesName}>{s.name}</Text>
              </View>
              
              <StackedAvatars count={s.avatars} />
            </TouchableOpacity>
          );
        }))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.bg,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 100,
  },
  salesRow: {
    minHeight: 80,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.divider,
  },
  checkDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  salesInfo: {
    flex: 1,
    minWidth: 0,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 12,
  },
  salesName: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: Theme.ink,
    marginTop: 8,
  },
  avatarsContainer: {
    flexDirection: 'row-reverse',
  },
  avatarBubble: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
    elevation: 2,
  },
  avatarText: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 16,
    color: Theme.inkMuted,
  }
});
