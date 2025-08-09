// app/(dashboard)/companies/_component/CompanyContactsPageHeader.tsx
'use client';
import React from 'react';

import GenericPageHeader
  from '@/app/(dashboard)/_components/_global/GenericPageHeader';
// import SignUpForm from '@/app/(login)/sign-up/_components/SignUpForm';
import { AddNewContactSvgIcon } from '@/app/svg_components/SvgIcons';
// import GenericPageHeader from '@/app/_components/_global/GenericPageHeader';
// import CreateCompanyForm from './CreateCompanyForm';
import useGetLocalStorage from '@/hooks/useGetLocalStorage';

// import GenericPageHeader from '../../_components/_global/GenericPageHeader';

const CompanyContactsPageHeader = () => {
  const { getLocalStorage } = useGetLocalStorage();
  const user = getLocalStorage('user');
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const buttons = isSuperAdmin
    ? [
        {
          label: 'company.newCompanyBtn',
          icon: AddNewContactSvgIcon,
          dialoContentStyle: 'sm:max-w-[525px]',
          buttonBg: 'bg-black',
          dialogContent: (
            <div className="flex max-h-[60vh] overflow-y-auto flex-col gap-[2rem]">
              {/* <SignUpForm /> */}
            </div>
          )
        },
      ]
    : [];

  const breadcrumbLinks = [
    { label: 'Companies', href: '/companies' },
    { label: 'Company Contacts' },
  ];

  return (
    <GenericPageHeader
      buttons={buttons}
      title="Companies Contacts"
      breadcrumbLinks={breadcrumbLinks}
    />
  );
};

export default CompanyContactsPageHeader;