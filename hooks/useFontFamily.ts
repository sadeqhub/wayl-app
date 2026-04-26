import { useTranslation } from 'react-i18next';

export type FontWeight = 
  | 'Thin' 
  | 'ExtraLight' 
  | 'Light' 
  | 'Regular' 
  | 'Medium' 
  | 'SemiBold' 
  | 'Bold' 
  | 'ExtraBold' 
  | 'Black' 
  | 'Super';

export function useFontFamily(weight: FontWeight = 'Regular') {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  if (isArabic) {
    switch (weight) {
      case 'Thin':
        return 'GraphikArabic-Thin';
      case 'ExtraLight':
        return 'GraphikArabic-ExtraLight';
      case 'Light':
        return 'GraphikArabic-Light';
      case 'Regular':
        return 'GraphikArabic';
      case 'Medium':
        return 'GraphikArabic-Medium';
      case 'SemiBold':
        return 'GraphikArabic-SemiBold';
      case 'Bold':
        return 'GraphikArabic-Bold';
      case 'ExtraBold':
      case 'Black':
        return 'GraphikArabic-Black';
      case 'Super':
        return 'GraphikArabic-Super';
      default:
        return 'GraphikArabic';
    }
  } else {
    switch (weight) {
      case 'Thin':
      case 'ExtraLight':
        return 'PPMori-Extralight';
      case 'Light':
        return 'PPMori-Light';
      case 'Regular':
        return 'PPMori-Regular';
      case 'Medium':
        return 'PPMori-Medium';
      case 'SemiBold':
        return 'PPMori-SemiBold';
      case 'Bold':
        return 'PPMori-Bold';
      case 'ExtraBold':
      case 'Black':
      case 'Super':
        return 'PPMori-ExtraBold';
      default:
        return 'PPMori-Regular';
    }
  }
}
