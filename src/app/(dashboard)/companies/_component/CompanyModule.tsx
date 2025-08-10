// app/(dashboard)/companies/_component/CompanyModule.tsx
'use client';
import React from 'react';

// import CreateCompanyForm from './CreateCompanyForm';
import SignUpForm from '@/app/(login)/sign-up/_components/SignUpForm';
// import EmptyStateUI from '@/app/_components/_global/EmptyStateUI';
import {
  AddNewContactSvgIcon,
  ContactEmptyUISvgIcon,
  SvgLogoIcon,
} from '@/app/svg_components/SvgIcons';
import { useCompanies } from '@/hooks/useCompanies';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';
import CompanyTableModule from './CompanyTableModule';

const CompanyModule = () => {
  const { companies, isLoading, error } = useCompanies();

  const buttons = [
    {
      label: 'company.emptyUI.newCompany',
      icon: AddNewContactSvgIcon,
      dialoContentStyle: 'sm:max-w-[525px]',
      buttonBg: 'bg-primaryAppearance',
      dialogContent: (
        <div className="flex max-h-[60vh] overflow-y-auto flex-col gap-[2rem]">
            <SignUpForm />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center w-full h-screen">
        <div className="absolute m-auto w-[10rem] h-[10rem] animate-spin p-4 rounded-full border-t-[10px] border-t-purple-600 border-primaryAppearanceLight"></div>
        <div className="flex items-center justify-center w-[10rem] h-[10rem] rounded-full">
          <SvgLogoIcon height="98" width="100" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-white">
        <div className="w-20 h-20 animate-spin p-4 rounded-full border-[10px] border-t-[10px] border-t-blue-500 border-white">
          error
        </div>
      </div>
    );
  }

  if (Array.isArray(companies) && companies.length === 0) {
    return (
      <EmptyStateUI
        SvgIcon={ContactEmptyUISvgIcon}
        mainTitle="company.emptyUI.mainTitle"
        secondTitle="company.emptyUI.secondTitle"
        buttons={buttons}
      />
    );
  }

  return <CompanyTableModule companies={companies} />;
};

export default CompanyModule;