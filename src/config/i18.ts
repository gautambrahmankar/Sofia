import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {storage} from '../utils/storage';
import {
  home_en,
  products_en,
  profile_en,
  scanFace_en,
} from '../translations/en';
import {
  home_tr,
  products_tr,
  profile_tr,
  scanFace_tr,
} from '../translations/tr';

// Load saved language from MMKV (default to English)
const savedLanguage = storage.getString('appLanguage') || 'en';

// Define translations
const resources = {
  en: {
    tap_to_scan: 'Tap to scan',
    our_results: 'Our results',
    select_language: 'Select Language',
    english: '🇬🇧 English',
    turkish: '🇹🇷 Türkçe',
    cancel: 'Cancel',
    ...profile_en,
    ...home_en,
    ...products_en,
    ...scanFace_en,
  },
  tr: {
    tap_to_scan: 'Taramak için dokunun',
    our_results: 'Sonuçlarımız',
    select_language: 'Dil Seçiniz',
    english: '🇬🇧 İngilizce',
    turkish: '🇹🇷 Türkçe',
    cancel: 'İptal',
    ...profile_tr,
    ...home_tr,
    ...products_tr,
    ...scanFace_tr,
  },
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {translation: resources.en},
    tr: {translation: resources.tr},
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Function to change language and persist it in MMKV
export const changeLanguage = language => {
  i18n.changeLanguage(language);
  storage.set('appLanguage', language);
};

export default i18n;
