import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import '../i18n';

SplashScreen.preventAutoHideAsync();

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    'PPMori-ExtraBold': require('../assets/fonts/PPMori-ExtraBold.ttf'),
    'PPMori-Bold': require('../assets/fonts/PPMori-Bold.ttf'),
    'PPMori-SemiBold': require('../assets/fonts/PPMori-SemiBold.ttf'),
    'PPMori-Medium': require('../assets/fonts/PPMori-Medium.ttf'),
    'PPMori-Regular': require('../assets/fonts/PPMori-Regular.ttf'),
    'PPMori-Book': require('../assets/fonts/PPMori-Book.ttf'),
    'PPMori-Light': require('../assets/fonts/PPMori-Light.ttf'),
    'PPMori-Extralight': require('../assets/fonts/PPMori-Extralight.ttf'),
    'GraphikArabic-Super': require('../assets/fonts/Graphik Arabic Super.otf'),
    'GraphikArabic-Black': require('../assets/fonts/Graphik Arabic Black.otf'),
    'GraphikArabic-Bold': require('../assets/fonts/Graphik Arabic Bold.otf'),
    'GraphikArabic-SemiBold': require('../assets/fonts/Graphik Arabic SemiBold.otf'),
    'GraphikArabic-Medium': require('../assets/fonts/Graphik Arabic Medium.otf'),
    'GraphikArabic': require('../assets/fonts/Graphik Arabic.otf'),
    'GraphikArabic-Light': require('../assets/fonts/Graphik Arabic Light.otf'),
    'GraphikArabic-ExtraLight': require('../assets/fonts/Graphik Arabic ExtraLight.otf'),
    'GraphikArabic-Thin': require('../assets/fonts/Graphik Arabic Thin.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product-detail" options={{ headerShown: false }} />
        <Stack.Screen name="add-product" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
