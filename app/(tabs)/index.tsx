import { Text } from '@/components/Text';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from '@/components/Header';
import { icons } from '@/components/Icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Header />
      <LinearGradient
        colors={['rgb(72,103,246)', 'rgba(72,103,246,0.23)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View>
          <Text style={styles.storeName}>{t('halaEcoStore')}</Text>
          <Text style={styles.storeUrl}>wayl.io/halaeco</Text>
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.balanceContainer}>
          <View style={styles.liveIconWrapper}>
            {icons.live()}
          </View>
          <Text style={styles.balanceLabel}>{t('balance')} {t('iraqiDinar')}</Text>
          <Text style={styles.balanceAmount}>5,178,000</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.shareButton}>
            {icons.share()} 
            <Text style={styles.shareButtonText}>{t('share')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.storeButton}>
            {icons.store(true)}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginHorizontal: 20,
    marginTop: 14,
    minHeight: 644,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  storeName: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 22,
    letterSpacing: -0.5,
    color: '#fff',
  },
  storeUrl: {
    marginTop: 10,
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    opacity: 0.5,
    color: '#fff',
  },
  liveIconWrapper: {
    opacity: 0.9,
    transform: [{ scale: 2.5 }],
    marginBottom: 24,
    marginLeft: 18,
    alignSelf: 'flex-start',
  },
  balanceContainer: {
    marginBottom: 12,
  },
  balanceLabel: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: -0.5,
    opacity: 0.5,
    color: '#fff',
    marginBottom: 14,
  },
  balanceAmount: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 38,
    letterSpacing: -0.5,
    lineHeight: 38,
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  shareButton: {
    height: 44,
    paddingLeft: 14,
    paddingRight: 20,
    borderRadius: 44,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shareButtonText: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  storeButton: {
    height: 44,
    width: 70,
    borderRadius: 44,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
