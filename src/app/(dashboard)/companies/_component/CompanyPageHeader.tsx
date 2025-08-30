// app/(dashboard)/companies/_component/CompanyPageHeader.tsx
'use client';
import React from 'react';

import SignUpForm from '@/app/(login)/sign-up/_components/SignUpForm';
import { AddNewContactSvgIcon } from '@/app/svg_components/SvgIcons';
import { useCompanies } from '@/hooks/useCompanies';
import useGetLocalStorage from '@/hooks/useGetLocalStorage';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';

const CompanyPageHeader = () => {
  const { getLocalStorage } = useGetLocalStorage();
  const user = getLocalStorage('user');
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const { companies } = useCompanies();

  const buttons = isSuperAdmin
    ? [
        {
          label: 'company.newCompanyBtn',
          icon: AddNewContactSvgIcon,
          dialoContentStyle: 'sm:max-w-[525px]',
          buttonBg: 'bg-black',
          dialogContent: (
            <div className="flex max-h-[60vh] overflow-y-auto flex-col gap-[2rem]">
              <SignUpForm />
            </div>
          )
        },
      ]
    : [];

  const breadcrumbLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Companies' },
  ];

  return (
    <GenericPageHeader
      data={companies}
      buttons={buttons}
      title="Companies"
      breadcrumbLinks={breadcrumbLinks}
    />
  );
};

export default CompanyPageHeader;