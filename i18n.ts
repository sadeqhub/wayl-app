import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';

let memoryLang = 'ar';

const resources = {
  en: {
    translation: {
      settings: "Settings",
      store: "Store",
      myStore: "My Store",
      paymentMethods: "Payment methods",
      notifications: "Notifications",
      account: "Account",
      verification: "Verification",
      preferences: "Preferences",
      shareStore: "Share store",
      language: "Language",
      english: "English",
      arabic: "العربية",
      verified: "Verified",
      on: "On",
      connected: "3 connected",
      halaEcoStore: "Hala Eco Store",
      balance: "Balance",
      iraqiDinar: "(Iraqi Dinar)",
      share: "Share",
      products: "Products",
      sales: "Sales",
      home: "Home",
      addProduct: "Add Product",
      premiumNeeded: "Premium needed",
      productVariants: "Product Variants",
      createProduct: "Create Product",
      customers: "Customers",
      storeStatistic: "Store Statistic",
      cashOrders: "Cash Orders",
      electronicOrders: "Electronic Orders",
      productType: "Product Type",
      productTitle: "Product Title",
      quantity: "Quantity",
      price: "Price",
      uploadPhoto: "Upload Photo",
      photoSelected: "Photo Selected",
      tellCustomers: "Tell your customers about your product...",
      physical: "Physical",
      digital: "Digital",
      service: "Service",
      unlimited: "Unlimited",
      fillRequired: "Please fill required fields (Title, Price)",
      premiumUpgradeDesc: "Upgrade your account to add custom sizes, colors, or materials to your product listings.",
      uploading: "Uploading...",
      noProducts: "No products found.",
      noSales: "No sales yet.",
    }
  },
  ar: {
    translation: {
      settings: "الإعدادات",
      store: "المتجر",
      myStore: "متجري",
      paymentMethods: "طرق الدفع",
      notifications: "الإشعارات",
      account: "الحساب",
      verification: "التحقق",
      preferences: "التفضيلات",
      shareStore: "مشاركة المتجر",
      language: "اللغة",
      english: "English",
      arabic: "العربية",
      verified: "موثق",
      on: "مفعل",
      connected: "٣ متصلة",
      halaEcoStore: "متجر هلا إيكو",
      balance: "الرصيد",
      iraqiDinar: "(دينار عراقي)",
      share: "مشاركة",
      products: "المنتجات",
      sales: "المبيعات",
      home: "الرئيسية",
      addProduct: "إضافة منتج",
      premiumNeeded: "يتطلب باقة بريميوم",
      productVariants: "خيارات المنتج",
      createProduct: "إنشاء المنتج",
      customers: "العملاء",
      physicalProduct: "منتج ملموس",
      digitalProduct: "منتج رقمي",
      complete: "مكتمل",
      pending: "قيد الانتظار",
      rejected: "مرفوض",
      editProduct: "تعديل المنتج",
      customerDetails: "تفاصيل العميل",
      customerName: "اسم العميل",
      orderPlaced: "تم الطلب",
      recently: "مؤخراً",
      status: "الحالة: ",
      unknown: "غير معروف",
      contactCustomer: "التواصل مع العميل",
      contactSubtitle: "تواصل مباشرة لحل مشكلات الطلب أو تقديم التحديثات.",
      messageWhatsApp: "مراسلة عبر واتساب",
      socialLinks: "روابط التواصل",
      electronicOrders: "الطلبات الإلكترونية",
      productType: "نوع المنتج",
      productTitle: "اسم المنتج",
      quantity: "الكمية",
      price: "السعر",
      uploadPhoto: "رفع صورة",
      photoSelected: "تم اختيار الصورة",
      tellCustomers: "أخبر عملاءك عن منتجك...",
      physical: "ملموس",
      digital: "رقمي",
      service: "خدمة",
      unlimited: "غير محدود",
      fillRequired: "يرجى ملء الحقول المطلوبة (الاسم، السعر)",
      premiumUpgradeDesc: "قم بترقية حسابك لإضافة مقاسات وألوان وخامات مخصصة لمنتجاتك.",
      uploading: "جاري الرفع...",
      noProducts: "لا توجد منتجات.",
      noSales: "لا توجد مبيعات بعد.",
    }
  }
};

const STORE_LANGUAGE_KEY = "settings.lang";

const languageDetectorPlugin = {
  type: 'languageDetector' as const,
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      const language = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      if (language) {
        memoryLang = language;
        return callback(language);
      } else {
        return callback('ar'); // Default to arabic
      }
    } catch (error) {
      console.log('Error reading language', error);
      return callback(memoryLang);
    }
  },
  cacheUserLanguage: async function (language: string) {
    memoryLang = language;
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      console.log('Error reading language', error);
    }
  }
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  } as any);

export const changeLanguage = async (lang: 'en' | 'ar') => {
  await i18n.changeLanguage(lang);
  const isRTL = lang === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    setTimeout(async () => {
      try {
        await Updates.reloadAsync();
      } catch (e) {
        console.log('Reload error:', e);
      }
    }, 100);
  }
};

export default i18n;
