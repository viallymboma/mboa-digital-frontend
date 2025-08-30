"use client";

import React from 'react';

import { GlobeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguageStore } from '@/stores/languageStore';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguageStore();
  const [ isHydrated, setIsHydrated ] = React.useState(false);

  const languages = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    // { code: "es", label: "Español" },
  ];

  React.useEffect(() => {
      setIsHydrated(true);
  }, []);

  if (!isHydrated) {
      return null; // or a loading spinner
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <GlobeIcon className="w-5 h-5" />
          {languages.find((lang) => lang.code === language)?.label || "Select Language"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;

