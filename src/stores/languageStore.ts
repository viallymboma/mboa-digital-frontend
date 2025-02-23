// stores/languageStore.ts
'use client';

// import i18n from '@/utils/i18n';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import i18n from '@/utils/i18n';

// import i18n from '../i18n';

interface LanguageState {
  language: string; 
  pageTitle: string;
  changeLanguage: (lang: string) => void; 
  setPageTitle: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: get()?.language, // Default language
      pageTitle: get()?.pageTitle, 
      changeLanguage: (lang: string) => {
        i18n.changeLanguage(lang); // Change the language in i18next
        set({ language: lang }); // Update the Zustand state
      },
      setPageTitle: (pageTitle: string) => {
        return set((state) => { 
            return {
                ...state, 
                pageTitle
            }
        }); // Update the Zustand state
      },
    }),
    {
        name: 'language-storage', // Key in localStorage
        partialize: (state) => ({ 
            language: state.language 
        }), // Only persist the language
    }
  )
);