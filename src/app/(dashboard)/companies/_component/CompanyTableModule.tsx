// app/(dashboard)/companies/_component/CompanyTableModule.tsx
import React from 'react';

import StatsCard from '@/app/(dashboard)/contacts/_component/StatsCard';
import { ContactStatisticsSvgIcon } from '@/app/svg_components/SvgIcons';
import { EnterpriseType } from '@/types/company';

import CompanyTable from './CompanyTable';

// import CompanyTable from './CompanyTable';

export type CompanyTableModuleProps = {
  companies?: EnterpriseType[];
};

const CompanyTableModule: React.FC<CompanyTableModuleProps> = ({ companies }) => {
  return (
    <div className="w-[100%]">
      <div className="flex items-center gap-4 py-4">
        <StatsCard
          value={companies?.length || '0'}
          label="Total Companies"
          icon={<ContactStatisticsSvgIcon />}
          color="black"
          borderColor="border-primaryAppearance"
          trend={{ value: '+ 5.5%', isPositive: true }}
        />
      </div>
      <CompanyTable companies={companies} />
    </div>
  );
};

export default CompanyTableModule;