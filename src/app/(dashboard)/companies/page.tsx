// app/(dashboard)/companies/page.tsx
import React from 'react';

import CompanyModule from './_component/CompanyModule';
import CompanyPageHeader from './_component/CompanyPageHeader';

const CompanyPage = () => {
  return (
    <div className="flex flex-col">
      <CompanyPageHeader />
      <div className="h-full flex flex-col items-center justify-center">
        <CompanyModule />
      </div>
    </div>
  );
};

export default CompanyPage;