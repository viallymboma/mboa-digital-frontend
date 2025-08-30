'use client';

import { Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { locales } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type LanguageSwitcherProps = {
  currentLocale: string;
  onChange: (locale: string) => void;
  className?: string;
};

export default function LanguageSwitcher({
  currentLocale,
  onChange,
  className,
}: LanguageSwitcherProps) {
  const router = useRouter();

  const handleLocaleChange = (locale: string) => {
    onChange(locale);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer flex-row items-center rounded-2xl bg-[#197BCC] px-3 py-1 text-[15px] font-bold text-white shadow-xl">
          {currentLocale}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-9 w-9 cursor-pointer rounded-full hover:bg-gray-100',
              'focus-visible:ring-primaryColor focus-visible:ring-2',
              'dark:hover:bg-gray-800',
              className,
            )}
            aria-label="Change language"
          >
            <Globe className="h-4 w-4 text-white dark:text-gray-300" />
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-[120px] rounded-md shadow-lg"
      >
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={cn(
              'focus:bg-primaryColor/10 cursor-pointer',
              // currentLocale === locale && 'bg-primaryColor/10 font-medium',
              `${currentLocale !== locale ? 'bg-white text-[#197BCC]' : 'bg-[#197BCC] text-white'} flex items-center gap-2`,
            )}
          >
            <span
              className={`${currentLocale !== locale ? 'bg-white text-[#197BCC]' : 'bg-[#197BCC] text-white'} flex items-center gap-2`}
            >
              {locale.toUpperCase()}
              {currentLocale === locale && (
                <span className="bg-primaryColor h-1.5 w-1.5 rounded-full" />
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}