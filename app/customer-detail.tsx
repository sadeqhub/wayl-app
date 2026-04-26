import { Text } from '@/components/Text';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, Theme } from '@/components/Icons';
import { router, useLocalSearchParams } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

export default function CustomerDetailScreen() {
  const { t } = useTranslation();
  const { name, status, date, phone } = useLocalSearchParams();

  const handleWhatsApp = () => {
    // Attempt to open WhatsApp
    const url = `whatsapp://send?phone=${phone}&text=Hello ${name}, regarding your order from Hala Eco Store:`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // Fallback to regular url if app is not installed
        Linking.openURL(`https://wa.me/${phone}?text=Hello ${name}`);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          {icons.arrowLeft()}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('customerDetails', 'Customer Details')}</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.card}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>
            {(name as string)?.split(' ').map(n => n[0]).join('').substring(0,2) || 'CC'}
          </Text>
        </View>
        <Text style={styles.customerName}>{name || t('customerName', 'Customer Name')}</Text>
        <Text style={styles.orderDate}>{t('orderPlaced', 'Order placed')} {date || t('recently', 'Recently')}</Text>

        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>{t('status', 'Status: ')}</Text>
          <Text style={[
            styles.statusValue, 
            { color: status === 'Complete' ? Theme.green : status === 'Rejected' ? Theme.red : Theme.amber }
          ]}>
            {status ? t(String(status).toLowerCase(), String(status)) : t('unknown', 'Unknown')}
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.contactTitle}>{t('contactCustomer', 'Contact Customer')}</Text>
        <Text style={styles.contactSubtitle}>{t('contactSubtitle', 'Reach out directly to resolve order issues or provide updates.')}</Text>

        <TouchableOpacity style={styles.waButton} onPress={handleWhatsApp}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </Svg>
          <Text style={styles.waButtonText}>{t('messageWhatsApp', 'Message on WhatsApp')}</Text>
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
    justifyContent: 'space-between',
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
  headerTitle: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 17,
    letterSpacing: -0.2,
    color: Theme.ink,
  },
  card: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Theme.cashBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarInitials: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 28,
    color: Theme.ink,
    opacity: 0.6,
  },
  customerName: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 22,
    color: Theme.ink,
  },
  orderDate: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    color: Theme.inkDim,
    marginTop: 6,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: Theme.bg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusLabel: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    color: Theme.ink,
  },
  statusValue: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.divider,
    width: '100%',
    marginVertical: 24,
  },
  contactTitle: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: Theme.ink,
    alignSelf: 'flex-start',
  },
  contactSubtitle: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    color: Theme.inkMuted,
    alignSelf: 'flex-start',
    marginTop: 6,
    lineHeight: 20,
    marginBottom: 20,
  },
  waButton: {
    width: '100%',
    minHeight: 56,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#25D366', // WhatsApp Green
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  waButtonText: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  }
});
