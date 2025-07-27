// import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import en from './locales/en/translation.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  // lng: Localization.locale.split('-')[0],
  resources: {
    // en: { translation: en },
  },
});

export default i18n;
