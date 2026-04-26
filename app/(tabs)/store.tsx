import { Text } from '@/components/Text';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/Header';
import { icons, Theme } from '@/components/Icons';
import { StatCard } from '@/components/StatCard';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

const SocialChip = ({ icon, label }: any) => (
  <View style={[styles.chip, !label && styles.iconOnlyChip]}>
    <View style={styles.chipIcon}>{icon}</View>
    {label && <Text style={styles.chipLabel} numberOfLines={1}>{label}</Text>}
  </View>
);

export default function StoreScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.socialCard}>
          <View style={styles.storeNameRow}>
            <Text style={styles.storeName}>{t('halaEcoStore')}</Text>
            {icons.verified()}
          </View>
          <Text style={styles.storeUrl}>wayl.io/halaeco</Text>
          <Text style={styles.socialLinksTitle}>{t('socialLinks', 'Social Links')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.socialRow}>
            <SocialChip icon={<View>{icons.share()}</View>} label={undefined} />
            <SocialChip label="Twitter" icon={
              <Svg width="14" height="14" viewBox="0 0 24 24" fill={Theme.ink}>
                <Path d="M17.53 3H20.5l-6.5 7.4L22 21h-6l-4.7-6-5.4 6H3l7-7.8L2 3h6.2l4.2 5.6L17.53 3zm-1 16h1.7L7.6 4.8H5.8L16.53 19z"/>
              </Svg>} />
            <SocialChip label="Instagram" icon={
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={Theme.ink} strokeWidth="2">
                <Rect x="3" y="3" width="18" height="18" rx="5"/>
                <Circle cx="12" cy="12" r="4"/>
                <Circle cx="17.5" cy="6.5" r="1" fill={Theme.ink}/>
              </Svg>} />
            <SocialChip label="Face" icon={
              <Svg width="14" height="14" viewBox="0 0 24 24" fill={Theme.ink}>
                <Path d="M12 2a10 10 0 0 0-1.6 19.87v-7.02H7.9v-2.85h2.5V9.8c0-2.48 1.48-3.85 3.74-3.85 1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.61.76-1.61 1.55V12h2.74l-.44 2.85h-2.3v7.02A10 10 0 0 0 12 2z"/>
              </Svg>} />
          </ScrollView>
          <View style={styles.magicWandIcon}>{icons.magicWand()}</View>
        </View>

        <Text style={styles.statsTitle}>{t('storeStatistic', 'Store Statistic')}</Text>

        <View style={styles.statCardsContainer}>
          <StatCard color={Theme.cashBg} icon={icons.cash()} title={t('cashOrders', 'Cash Orders')} orders="2,346" amount={`700,000 ${t('iraqiDinar')}`}/>
          <StatCard color={Theme.cardBg} icon={icons.card()} title={t('electronicOrders', 'Electronic Orders')} orders="23,466" amount={`1,200,250 ${t('iraqiDinar')}`}/>
        </View>
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
  socialCard: {
    minHeight: 150,
    borderRadius: 16,
    backgroundColor: 'rgb(241,241,241)',
    padding: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  storeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  storeName: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: Theme.ink,
  },
  storeUrl: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 12,
    color: Theme.ink,
    opacity: 0.5,
    marginTop: 6,
  },
  socialLinksTitle: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 16,
    color: Theme.ink,
    marginTop: 16,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  chip: {
    minHeight: 40,
    paddingVertical: 8,
    paddingLeft: 10,
    paddingRight: 14,
    borderRadius: 38,
    backgroundColor: 'rgba(21,22,24,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(21,22,24,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  iconOnlyChip: {
    minWidth: 40,
    paddingRight: 10,
    justifyContent: 'center',
  },
  chipIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLabel: {
    fontSize: 14,
    color: Theme.ink,
    flexShrink: 1,
  },
  magicWandIcon: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  statsTitle: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
    marginTop: 24,
    marginBottom: 14,
  },
  statCardsContainer: {
    gap: 18,
  }
});
