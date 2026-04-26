import { Text } from '@/components/Text';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from './Icons';

export const Header = ({ title, dark = false, rightAccessory }: any) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <Image 
        source={require('../assets/images/icon.png')} 
        style={styles.avatar} 
      />
      {title ? (
        <Text style={[styles.title, { color: dark ? '#fff' : Theme.ink }]}>
          {title}
        </Text>
      ) : (
        <Image 
          source={require('../assets/wayl-store-wordmark.png')} 
          style={[styles.wordmark, dark && styles.wordmarkDark]} 
        />
      )}
      <View style={{ flex: 1 }} />
      {rightAccessory && <View>{rightAccessory}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  title: {
    fontFamily: 'System', // Could add custom font here
    fontWeight: '700',
    fontSize: 25,
    letterSpacing: -0.5,
  },
  wordmark: {
    height: 22,
    width: 80, // rough estimate
    resizeMode: 'contain',
  },
  wordmarkDark: {
    tintColor: '#fff',
  }
});
