'use client';

import {
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { SvgLogoIcon } from '@/app/svg_components/SvgIcons';
import {
  getSavedLocale,
  loadMessages,
  Locale,
} from '@/lib/i18n';

import LanguageSwitcher from './LanguageSwitcher';

// import LanguageSwitcher from './LanguageSwitcher';

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getSavedLocale());
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const loadedMessages = await loadMessages(locale);
      setMessages(loadedMessages as Record<string, string>);
    };
    initialize();
  }, [locale]);

  const changeLocale = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    setLocale(newLocale as Locale);
  };

  if (!messages) {
    return (
      // <div className="flex h-screen flex-col items-center justify-center bg-slate-50">
      //   <h1 className="mb-8 text-3xl font-bold text-slate-800">
      //     Mboa SMS platform
      //   </h1>
      //   <div className="relative flex flex-col items-center">
      //     <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500"></div>
      //     <div className="mt-4 text-sm text-slate-600">
      //       a better way to manage your contacts...
      //     </div>
      //   </div>
      // </div>
      <div className='relative flex items-center justify-center w-full h-screen'>
                  <div className="absolute  m-auto w-[10rem] h-[10rem] animate-spin p-4 rounded-full  border-t-[10px]  border-t-purple-600 border-primaryAppearanceLight">
                  </div>
                  <div className='flex items-center justify-center w-[10rem] h-[10rem] rounded-full'>
                      <SvgLogoIcon height='98' width='100' />
                  </div>
              </div>
    );
  }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      now={new Date()}
      onError={console.error}
    >
      {children}
      <div className="fixed right-6 bottom-[10%] z-[1000] h-fit">
        <LanguageSwitcher currentLocale={locale} onChange={changeLocale} />
      </div>
    </NextIntlClientProvider>
  );
}