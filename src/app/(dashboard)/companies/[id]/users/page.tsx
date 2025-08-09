'use client';
import React from 'react';

import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

// import EmptyStateUI from '@/app/_components/_global/EmptyStateUI';
import {
  ContactEmptyUISvgIcon,
  SvgLogoIcon,
} from '@/app/svg_components/SvgIcons';
import { useCompanyUsers } from '@/hooks/useCompanyUsers';

import EmptyStateUI from '../../../_components/_global/EmptyStateUI';
import CompanyUsersPageHeader from './_component/CompanyUsersPageHeader';
import UserTableModule from './_component/UserTableModule';

// import UserTableModule from './_component/UserTableModule';

const CompanyUsersPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const enterpriseId = params.id as string;
  const { users, isLoading, error } = useCompanyUsers(enterpriseId);

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
          {t('company.users.error', { defaultValue: 'Error: {message}', message: error.message })}
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <EmptyStateUI
        SvgIcon={ContactEmptyUISvgIcon}
        mainTitle={t('company.users.emptyUI.mainTitle')}
        secondTitle={t('company.users.emptyUI.secondTitle')}
        buttons={[]}
      />
    );
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4"><CompanyUsersPageHeader /></h1>
      <div className="h-full flex flex-col items-center justify-center">
        <UserTableModule users={users} />
      </div>
    </div>
  );
};

export default CompanyUsersPage;