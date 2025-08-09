// app/(dashboard)/companies/_component/CompanyTable.tsx
'use client';
import React from 'react';

import GenericTable from '@/app/_components/tables/GenericTable';
import { EnterpriseType } from '@/types/company';
import { ColumnDef } from '@tanstack/react-table';

import {
  companyColumns,
  TransformedCompanyType,
} from './CompanyTableElements';

// import {
//   companyColumns,
//   TransformedCompanyType,
// } from './CompanyTableElements';

export type CompanyTableProps = {
  companies?: EnterpriseType[];
};

const CompanyTable: React.FC<CompanyTableProps> = ({ companies }) => {

    console.log(companies, "all companies");
  const transformedData = React.useMemo(
    () =>
      companies?.map((company) => ({
        id: company.id,
        socialRaison: company.socialRaison,
        emailEnterprise: company.emailEnterprise,
        telephoneEnterprise: company.telephoneEnterprise,
        villeEnterprise: company.villeEnterprise,
        pays: company.pays.nom,
        createdAt: new Date(company.createdAt).toLocaleDateString(),
        status: company.archived ? 'Inactive' : 'Active',
      })) || [],
    [companies]
  );

  const [data, setData] = React.useState(transformedData);

  React.useEffect(() => {
    setData(transformedData);
  }, [transformedData]);

  const handleReorder = (reorderedData: typeof data) => {
    setData(reorderedData);
  };

  return (
    <GenericTable
      data={data}
      columns={companyColumns as ColumnDef<TransformedCompanyType>[]}
      title="List of Companies"
      description="List of all available companies"
      defaultPageSize={7}
      onReorder={handleReorder}
    />
  );
};

export default CompanyTable;