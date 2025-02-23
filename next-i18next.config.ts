// next-i18next.config.ts
import { UserConfig } from 'next-i18next';

const NextI18NextConfig: UserConfig = {
  i18n: {
    locales: ['en', 'fr'], // Define supported languages
    defaultLocale: 'en',   // Default language
  },
  localePath: './public/locales', // Path to translation files
};

export default NextI18NextConfig;

// module.exports = {
//     i18n: {
//         defaultLocale: 'en',
//       locales: ['en', 'fr'], // Add more locales as needed
//     },
// };