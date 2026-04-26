import { Text } from '@/components/Text';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Header } from '@/components/Header';
import { icons, Theme } from '@/components/Icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useAppStore } from '@/store';

export default function ProductsScreen() {
  const { t } = useTranslation();
  const products = useAppStore(state => state.products);

  return (
    <View style={styles.container}>
      <Header 
        title={t('products', 'Products')} 
        rightAccessory={
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/add-product')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {icons.plus()}
          </TouchableOpacity>
        }
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {products.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{t('noProducts', 'No products found.')}</Text>
          </View>
        ) : (
          products.map((p, i) => (
          <React.Fragment key={p.id || i}>
            <TouchableOpacity 
              style={styles.productRow}
              onPress={() => router.push('/product-detail')}
            >
              <Image source={p.img} style={styles.productImg} />
              <View style={styles.productInfo}>
                <View style={styles.kindRow}>
                  {icons.shape(p.color)}
                  <Text style={[styles.kindText, { color: p.color }]}>
                    {p.kind === "Physical Product" ? t('physicalProduct', p.kind) : t('digitalProduct', p.kind)}
                  </Text>
                </View>
                <Text style={styles.productName} numberOfLines={1}>{p.name}</Text>
                <Text style={styles.productPrice}>{p.price}</Text>
              </View>
            </TouchableOpacity>
            {i < products.length - 1 && (
              <View style={styles.divider} />
            )}
          </React.Fragment>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.bg,
  },
  addButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 100, 
    gap: 14,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 54,
    paddingVertical: 8,
  },
  productImg: {
    width: 54,
    height: 54,
    borderRadius: 8,
    backgroundColor: 'rgb(241,241,241)',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
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
  },
  productName: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: Theme.ink,
    marginTop: 6,
  },
  productPrice: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    color: Theme.inkDim,
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.divider,
    marginLeft: 64,
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
