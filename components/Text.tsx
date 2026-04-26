import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useFontFamily, FontWeight } from '@/hooks/useFontFamily';

export interface TextProps extends RNTextProps {
  weight?: FontWeight;
}

export function Text({ style, weight, ...props }: TextProps) {
  // Try to extract fontWeight from style if it exists
  let extractedWeight: FontWeight | undefined = weight;
  
  if (!weight && style) {
    const flatStyle = StyleSheet.flatten(style);
    if (flatStyle.fontWeight) {
      // Map standard font weights to our weights
      const fw = String(flatStyle.fontWeight);
      if (fw === '400' || fw === 'normal') extractedWeight = 'Regular';
      else if (fw === '500') extractedWeight = 'Medium';
      else if (fw === '600') extractedWeight = 'SemiBold';
      else if (fw === '700' || fw === 'bold') extractedWeight = 'Bold';
      else if (fw === '800') extractedWeight = 'ExtraBold';
      else if (fw === '900') extractedWeight = 'Black';
      else if (fw === '300') extractedWeight = 'Light';
      else if (fw === '200') extractedWeight = 'ExtraLight';
      else if (fw === '100') extractedWeight = 'Thin';
    }
  }

  const fontFamily = useFontFamily(extractedWeight || 'Regular');

  return (
    <RNText 
      {...props} 
      style={[
        style, 
        { fontFamily },
        // We might want to remove fontWeight to avoid conflicts on Android
        // but react-native usually handles it fine if fontFamily is explicit
        { fontWeight: undefined } 
      ]} 
    />
  );
}
