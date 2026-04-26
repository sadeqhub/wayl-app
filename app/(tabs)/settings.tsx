import { Text } from '@/components/Text';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/Header';
import { icons, Theme } from '@/components/Icons';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../i18n';
import { useFontFamily } from '@/hooks/useFontFamily';

const getSettingsGroups = (t: any, i18n: any) => [
  {
    title: t('store'),
    items: [
      { icon: icons.store(true), label: t('myStore'), detail: t('halaEcoStore') },
      { icon: icons.card(), label: t('paymentMethods'), detail: t('connected') },
      { icon: icons.bell(), label: t('notifications'), detail: t('on') },
    ],
  },
  {
    title: t('account'),
    items: [
      { icon: icons.verified(), label: t('verification'), detail: t('verified') },
      { icon: icons.gear(true), label: t('preferences') },
      { icon: icons.share(), label: t('shareStore') },
      { 
        icon: icons.gear(true), // We can use gear or globe icon, but let's stick to gear or maybe globe if available. I'll use gear for now.
        label: t('language'), 
        detail: i18n.language === 'ar' ? t('arabic') : t('english'),
        action: 'toggleLanguage'
      },
    ],
  },
];

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const groups = getSettingsGroups(t, i18n);

  const fontMedium = useFontFamily('Medium');
  const fontRegular = useFontFamily('Regular');

  const handlePress = (item: any) => {
    if (item.action === 'toggleLanguage') {
      const newLang = i18n.language === 'ar' ? 'en' : 'ar';
      changeLanguage(newLang);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={t('settings')} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {groups.map((group, gi) => (
          <View key={gi} style={styles.groupContainer}>
            <Text style={[styles.groupTitle, { fontFamily: fontMedium }]}>{group.title}</Text>
            <View style={styles.itemsContainer}>
              {group.items.map((item, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.itemRow,
                    i < group.items.length - 1 && styles.itemBorder
                  ]}
                  onTouchEnd={() => handlePress(item)}
                >
                  <View style={styles.itemIcon}>{item.icon}</View>
                  <Text style={[styles.itemLabel, { fontFamily: fontMedium }]}>{item.label}</Text>
                  {item.detail && (
                    <Text style={[styles.itemDetail, { fontFamily: fontRegular }]}>{item.detail}</Text>
                  )}
                  <View style={styles.chevronIcon}>{icons.chevronRight()}</View>
                </View>
              ))}
            </View>
          </View>
        ))}
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
    gap: 24,
  },
  groupContainer: {
    
  },
  groupTitle: {
    fontSize: 12,
    color: Theme.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.96, // 0.08em
    marginBottom: 8,
    marginHorizontal: 12,
  },
  itemsContainer: {
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  itemRow: {
    minHeight: 56,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.divider,
  },
  itemIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
    color: Theme.ink,
  },
  itemDetail: {
    fontSize: 14,
    color: Theme.inkDim,
    flexShrink: 1,
  },
  chevronIcon: {
  }
});
