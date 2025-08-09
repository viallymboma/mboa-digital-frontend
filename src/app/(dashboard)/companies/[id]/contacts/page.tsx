'use client';
import React from 'react';

import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import EmptyStateUI from '@/app/(dashboard)/_components/_global/EmptyStateUI';
import ContactTableModule
  from '@/app/(dashboard)/contacts/_component/ContactTableModule';
import { ContactEmptyUISvgIcon } from '@/app/svg_components/SvgIcons';
import { useCompanies } from '@/hooks/useCompanies';

import CompanyContactsPageHeader from './_components/CompanyContactsPageHeader';

const CompanyContactsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { companyContacts, companyContactIsLoading, companyContactError } = useCompanies(id);

  if (companyContactIsLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-12 h-12 animate-spin rounded-full border-t-4 border-purple-600"></div>
      </div>
    );
  }

  if (companyContactError) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-white">
        <div className="text-red-500">{t('contact.error', { defaultValue: 'Error: {message}', message: companyContactError.message })}</div>
      </div>
    );
  }

  if (!companyContacts || companyContacts.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
        <EmptyStateUI
          SvgIcon={ContactEmptyUISvgIcon}
          mainTitle={t('contact.emptyUI.mainTitle')}
          secondTitle={t('contact.emptyUI.secondTitle')}
          buttons={[]}
        />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4"><CompanyContactsPageHeader /></h1>
      <ContactTableModule contacts={companyContacts} />
    </div>
  );
};

export default CompanyContactsPage;