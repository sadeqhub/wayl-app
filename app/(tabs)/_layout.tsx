import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { icons, Theme } from '@/components/Icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Theme.navBg,
          borderTopColor: Theme.navBorder,
          height: 82,
          paddingTop: 14,
          paddingBottom: 28,
          position: 'absolute',
          elevation: 0,
          direction: 'ltr',
        },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {icons.home(focused)}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {icons.stack(focused)}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {icons.receipt(focused)}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {icons.store(focused)}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {icons.gear(focused)}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
