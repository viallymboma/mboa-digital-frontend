"use client";
import React from 'react';

import { MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

import SearchInput from '@/app/_components/form/SearchInput';
import LanguageSwitcher from '@/app/_components/LanguageSwitcher';
import {
  HomeSvgIcon,
  MessagingSvgIcon,
  NotificationSvgIcon,
  SearchSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import useGetLocalStorage from '@/hooks/useGetLocalStorage';

import ThemeSwitcher from './ThemeSwitcher';

const DahsboardHeader = () => {
  const { isMobile } = useSidebar();
  const t = useTranslations('register');
  const { getLocalStorage } = useGetLocalStorage();

  return (
    <div className="border-b-[1px] border-b-slate-200 flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="pl-4 flex flex-row items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <SearchInput placeholder={t('searchLang')} leftIcon={<SearchSvgIcon />} />
      </div>
      {isMobile ? (
        <div className="flex flex-row items-center gap-2 pr-4">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-3">
              <Button className="bg-primaryAppearance flex flex-row gap-2 rounded-[20px] p-3">
                <MessagingSvgIcon />
                <span>{getLocalStorage("user")?.enterprise?.smsCredit} SMS</span>
                {t('remainingSMS')}
              </Button>
              <Button className="bg-transparent">
                <HomeSvgIcon />
              </Button>
              <Button className="bg-transparent">
                <NotificationSvgIcon />
              </Button>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2 pr-4">
          <Button className="bg-primaryAppearance flex flex-row gap-2 rounded-[20px] p-3">
            <MessagingSvgIcon />
            <span>{getLocalStorage("user")?.enterprise?.smsCredit} SMS</span>
            {t('remainingSMS')}
          </Button>
          <Button className="bg-transparent">
            <HomeSvgIcon />
          </Button>
          <Button className="bg-transparent">
            <NotificationSvgIcon />
          </Button>
          <ThemeSwitcher />
        </div>
      )}
    </div>
  );
};

export default DahsboardHeader;

// "use client";
// import React from 'react';

// import { MoreHorizontal } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// import SearchInput from '@/app/_components/form/SearchInput';
// import LanguageSwitcher from '@/app/_components/LanguageSwitcher';
// import {
//   HomeSvgIcon,
//   MessagingSvgIcon,
//   NotificationSvgIcon,
//   SearchSvgIcon,
// } from '@/app/svg_components/SvgIcons';
// import { Button } from '@/components/ui/button';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import {
//   SidebarTrigger,
//   useSidebar,
// } from '@/components/ui/sidebar';
// // import { useCompanies } from '@/hooks/useCompanies';
// import useGetLocalStorage from '@/hooks/useGetLocalStorage';

// import ThemeSwitcher from './ThemeSwitcher';

// const DahsboardHeader = () => {
//     const { isMobile } = useSidebar(); 
//     const { t } = useTranslation();
//     const { getLocalStorage } = useGetLocalStorage ();
//     // const { companyFreshInfo, companyFreshInfoError, companyFreshInfoIsLoading } = useCompanies();
//     // console.log('companyFreshInfo', companyFreshInfo);
//     return (
//         <div className={`border-b-[1px] border-b-slate-200 flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12`}>
//             <div className='pl-4 flex flex-row items-center gap-4'>
//                 <SidebarTrigger className="-ml-1" />
//                 <SearchInput placeholder={t('register.searchLang')} leftIcon={<SearchSvgIcon />} />
//             </div>
//             {
//                 isMobile ? 
//                     <div className='flex flex-row items-center gap-2 pr-4 '>
//                         <Popover>
//                             <PopoverTrigger>
//                             <MoreHorizontal />
//                             </PopoverTrigger>
//                             <PopoverContent className='flex flex-col gap-3'>
//                                 <Button className='bg-primaryAppearance flex flex-row gap-2 rounded-[20px] p-3'>
//                                     <MessagingSvgIcon />
//                                     {/* {
//                                         companyFreshInfoIsLoading ? '...' : companyFreshInfoError ? '!' : companyFreshInfo ? companyFreshInfo[0]?.smsCredit : getLocalStorage("user")?.enterprise?.smsCredit
//                                     } */}
//                                     <span>{ getLocalStorage("user")?.enterprise?.smsCredit } SMS</span>
//                                     {t('register.remainingSMS')}
//                                 </Button>
//                                 <Button className='bg-transparent'>
//                                     <HomeSvgIcon />
//                                 </Button>
//                                 <Button className='bg-transparent'>
//                                     <NotificationSvgIcon />
//                                 </Button>
//                                 <LanguageSwitcher />
//                                 <ThemeSwitcher />
//                             </PopoverContent>
//                         </Popover>
//                     </div>
//                     :
//                     <div className='flex flex-row items-center gap-2 pr-4'>
//                         <Button className='bg-primaryAppearance flex flex-row gap-2 rounded-[20px] p-3'>
//                             <MessagingSvgIcon />
//                             <span>{ getLocalStorage("user")?.enterprise?.smsCredit } SMS</span>
//                             {t('register.remainingSMS')}
//                         </Button>
//                         <Button className='bg-transparent'>
//                             <HomeSvgIcon />
//                         </Button>
//                         <Button className='bg-transparent'>
//                             <NotificationSvgIcon />
//                         </Button>
//                         {/* <LanguageSwitcher /> */}
//                         <ThemeSwitcher />
//                     </div>
//             }
//         </div>
//     )
// }

// export default DahsboardHeader