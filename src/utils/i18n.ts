// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../../public/locales/en/common.json';
import fr from '../../public/locales/fr/common.json';

export const resources = {
    en: { translation: en },
    fr: { translation: fr },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'fr', // Default language
    fallbackLng: 'fr',
    interpolation: {
        escapeValue: false, // React already escapes values
    },
});

export default i18n;