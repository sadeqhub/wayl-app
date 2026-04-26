import { Text } from '@/components/Text';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, Theme } from '@/components/Icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function ProductDetailScreen() {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          {icons.arrowLeft()}
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.iconButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          {icons.dots()}
        </TouchableOpacity>
      </View>

      <Image 
        source={require('../assets/p1.png')} 
        style={styles.heroImage} 
      />

      <View style={styles.infoContainer}>
        <View style={styles.kindRow}>
          {icons.shape(Theme.physical)}
          <Text style={styles.kindText}>{t('physicalProduct', 'Physical Product')}</Text>
        </View>
        <Text style={styles.productTitle}>TP–7 Ultra-Portable Audio Recorder</Text>
        <Text style={styles.productDescription}>
          Studio-quality audio. Pro controls. Designed for field recording, interviews, and music sessions.
        </Text>
        <Text style={styles.priceContainer}>
          1,895,000 <Text style={styles.currency}>{t('iraqiDinar').replace('(', '').replace(')', '')}</Text>
        </Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/add-product')}>
          <Text style={styles.primaryBtnText}>{t('editProduct', 'Edit product')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          {icons.share()}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.bg,
  },
  topBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21,22,24,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    marginHorizontal: 18,
    marginTop: 14,
    height: 280,
    borderRadius: 20,
    width: 'auto',
    backgroundColor: 'rgb(241,241,241)',
  },
  infoContainer: {
    marginHorizontal: 18,
    marginTop: 20,
  },
  kindRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  kindText: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 12,
    color: Theme.physical,
  },
  productTitle: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 25,
    letterSpacing: -0.5,
    color: Theme.ink,
    marginTop: 10,
  },
  productDescription: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    color: Theme.inkMuted,
    marginTop: 10,
    lineHeight: 21,
  },
  priceContainer: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 28,
    letterSpacing: -0.5,
    color: Theme.ink,
    marginTop: 18,
  },
  currency: {
    fontSize: 16,
    color: Theme.inkDim,
    fontWeight: '500',
  },
  actionRow: {
    position: 'absolute',
    bottom: 34,
    left: 18,
    right: 18,
    flexDirection: 'row',
    gap: 10,
  },
  primaryBtn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: Theme.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  shareBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(21,22,24,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
