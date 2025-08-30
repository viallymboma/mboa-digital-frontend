import { AbstractIntlMessages } from 'next-intl';

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export async function loadMessages(
  locale: Locale,
): Promise<AbstractIntlMessages> {
  try {
    return (await import(`../../public/locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for ${locale}`, error);
    return (await import(`../../public/locales/${defaultLocale}.json`)).default;
  }
}

export function getSavedLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;

  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('NEXT_LOCALE='))
    ?.split('=')[1];

  return locales.includes(cookieValue as Locale)
    ? (cookieValue as Locale)
    : defaultLocale;
}