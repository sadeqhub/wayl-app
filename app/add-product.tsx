import { Text } from '@/components/Text';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { Theme } from '@/components/Icons';
import { router } from 'expo-router';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { TextInput, Linking, TouchableWithoutFeedback, I18nManager, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store';

const FormField = ({ label, suffix, textarea, dimLabel, height = 54, isButton, onPress, value, onChangeText }: any) => {
  const active = (value && value.length > 0);
  const inputRef = React.useRef<TextInput>(null);
  
  const content = (
    <TouchableWithoutFeedback onPress={() => {
      if (isButton && onPress) onPress();
      else inputRef.current?.focus();
    }}>
      <View style={[styles.formField, { height }, textarea && styles.formFieldTextarea]}>
      {isButton ? (
        <Text style={[
          styles.formLabel,
          (dimLabel && !active) && styles.formLabelDim
        ]}>{value || label}</Text>
      ) : (
        <TextInput 
          ref={inputRef}
          style={[
            styles.formLabel,
            textarea && styles.formLabelTextarea,
            { flex: 1, padding: 0, height: '100%', color: (active || !dimLabel) ? Theme.ink : Theme.inkDim, textAlign: I18nManager.isRTL ? 'right' : 'left' }
          ]}
          placeholder={label}
          placeholderTextColor={dimLabel ? Theme.inkDim : Theme.ink}
          multiline={textarea}
          textAlignVertical={textarea ? 'top' : 'center'}
          value={value}
          onChangeText={onChangeText}
        />
      )}
      
      {!textarea && suffix && (
        <View style={styles.suffixRow}>
          <Text style={styles.suffixText}>{suffix.text}</Text>
          {suffix.icon}
        </View>
      )}
    </View>
    </TouchableWithoutFeedback>
  );

  return content;
};

export default function AddProductScreen() {
  const { t } = useTranslation();
  const [productTypeIdx, setProductTypeIdx] = useState(0);
  const PRODUCT_TYPES = ['physical', 'digital', 'service'];
  const [title, setTitle] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const addProduct = useAppStore(state => state.addProduct);

  const handleCreate = () => {
    if (!title || !price) {
      Alert.alert(t('error', 'Error'), t('fillRequired', 'Please fill required fields'));
      return;
    }
    
    addProduct({
      name: title,
      price: `${price} ${t('iraqiDinar').replace('(', '').replace(')', '')}`,
      kind: PRODUCT_TYPES[productTypeIdx] === 'physical' ? 'Physical Product' : 'Digital Product',
      color: PRODUCT_TYPES[productTypeIdx] === 'physical' ? Theme.physical : Theme.digital,
      img: photo ? { uri: photo } : require('../assets/p1.png')
    });
    
    router.back();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsUploading(true);
      setTimeout(() => {
        setPhoto(result.assets[0].uri);
        setIsUploading(false);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={Theme.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M20 12H4M10 6l-6 6 6 6"/></Svg>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('addProduct')}</Text>
          <View style={{ width: 32 }} />
        </View>

        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formStack}>
            <FormField 
              label={t('productType', 'Product Type')} 
              isButton
              onPress={() => setProductTypeIdx((prev) => (prev + 1) % PRODUCT_TYPES.length)}
              suffix={{ text: t(PRODUCT_TYPES[productTypeIdx]), icon:
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={Theme.inkDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M8 9l4-4 4 4M8 15l4 4 4-4"/></Svg>
              }}
            />
            <FormField label={t('productTitle', 'Product Title')} dimLabel value={title} onChangeText={setTitle} />
            <FormField label={t('quantity', 'Quantity')} dimLabel value={qty} onChangeText={setQty} suffix={{ text: t('unlimited', 'Unlimited'), icon:
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={Theme.inkDim} strokeWidth="2"><Circle cx="12" cy="12" r="9"/><Circle cx="12" cy="12" r="3" fill={Theme.inkDim}/></Svg>
            }}/>
            <FormField label={t('price', 'Price')} dimLabel value={price} onChangeText={setPrice} suffix={{ text: t('iraqiDinar').replace('(', '').replace(')', ''), icon: null }}/>
            
            <FormField 
              label={t('uploadPhoto', 'Upload Photo')} 
              dimLabel 
              isButton
              onPress={isUploading ? undefined : pickImage}
              value={isUploading ? t('uploading', 'Uploading...') : photo ? t('photoSelected', 'Photo Selected') : ""}
              height={photo && !isUploading ? 64 : 54}
              suffix={{ text: "", icon:
                isUploading ? (
                  <ActivityIndicator size="small" color={Theme.inkDim} />
                ) : photo ? (
                  <Image source={{ uri: photo }} style={styles.previewImage} />
                ) : (
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={Theme.inkDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Rect x="3" y="3" width="18" height="18" rx="3"/>
                    <Circle cx="9" cy="9" r="2"/>
                    <Path d="M3 17l5-5 4 4 3-3 6 6"/>
                  </Svg>
                )
              }}
            />

            <FormField label={t('tellCustomers', 'Tell your customers about your product...')} dimLabel textarea height={140} value={desc} onChangeText={setDesc} />
          
            {/* Premium locked variants section */}
            <TouchableOpacity 
              style={styles.premiumBox}
              activeOpacity={0.8}
              onPress={() => Linking.openURL('https://wayl.io/pricing')}
            >
              <View style={styles.premiumHeader}>
                <View style={styles.premiumIconWrap}>
                  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={Theme.amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <Rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <Path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </Svg>
                </View>
                <Text style={styles.premiumTitle}>{t('productVariants')}</Text>
                <View style={{ flex: 1 }} />
                <Text style={styles.premiumBadge}>{t('premiumNeeded')}</Text>
              </View>
              <Text style={styles.premiumText}>{t('premiumUpgradeDesc', 'Upgrade your account to add custom sizes, colors, or materials to your product listings.')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
            <Text style={styles.createBtnText}>{t('createProduct')}</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.bg,
  },
  safeArea: {
    flex: 1,
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
  scrollContent: {
    paddingBottom: 120, // space for fixed bottom button
  },
  formStack: {
    marginHorizontal: 20,
    marginTop: 13, 
    gap: 14,
  },
  formField: {
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Theme.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 15,
  },
  formFieldTextarea: {
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'flex-start',
  },
  formLabel: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: Theme.ink,
  },
  formLabelTextarea: {
    fontSize: 14,
  },
  formLabelDim: {
    color: Theme.inkDim,
  },
  suffixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  suffixText: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    color: Theme.inkDim,
  },
  previewImage: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Theme.bg,
  },
  premiumBox: {
    marginTop: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255,187,38,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,187,38,0.2)',
    padding: 16,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  premiumIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,187,38,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumTitle: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: Theme.ink,
  },
  premiumBadge: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 12,
    color: Theme.amber,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  premiumText: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    color: Theme.inkMuted,
    marginTop: 12,
    lineHeight: 20,
  },
  actionRow: {
    position: 'absolute',
    bottom: 34,
    left: 20,
    right: 20,
  },
  createBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: Theme.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtnText: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  }
});
