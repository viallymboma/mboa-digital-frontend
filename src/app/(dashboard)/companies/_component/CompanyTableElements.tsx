import React from 'react';

import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { useCompanies } from '@/hooks/useCompanies';
import { useTranslation } from 'react-i18next';

// import SelectAllCheckbox
//   from '@/app/(dashboard)/contacts/_component/table-sub-ui/SelectAllCheckbox';
// import SelectedTableRow
//   from '@/app/(dashboard)/contacts/_component/table-sub-ui/SelectedTableRow';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCompanies } from '@/hooks/useCompanies';
import { EnterpriseType } from '@/types/company';
import { ColumnDef } from '@tanstack/react-table';

import EditCompanyForm from './EditCompanyForm';

export type TransformedCompanyType = {
  id: string;
  socialRaison: string;
  emailEnterprise: string;
  telephoneEnterprise: string;
  villeEnterprise: string;
  pays: string;
  createdAt: string;
  status: string;
};

const CompanyActionUI: React.FC<{ rowData: TransformedCompanyType }> = ({ rowData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { deleteCompany } = useCompanies();
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  console.log('CompanyActionUI rowData:', rowData);

  // Map TransformedCompanyType to EnterpriseType for EditCompanyForm
  const company: EnterpriseType = {
    ...rowData,
    numeroCommerce: rowData.id, // Adjust based on actual data structure
    urlImage: '',
    urlSiteweb: '',
    adresseEnterprise: '',
    smsESenderId: '',
    smsCredit: 0,
    activityDomain: '',
    contribuableNumber: '', 
    statusCode: rowData.status === 'Active' ? 200 : 404, // Example mapping
    error: '', 
    message: '', 
    updatedAt: '',
    version: 0, 
    user: [], 
    enterpriseContacts: [],
    groupes: [],
    recharges: [], 
    archived: rowData.status !== 'Active',
    pays: {
      id: rowData.pays, nom: rowData.pays,
      createdAt: '',
      updatedAt: '',
      version: 0,
      code: '',
      continent: '',
      imageUrl: '',
      archived: false
    }, // Adjust based on actual pays structure
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/companies/${rowData.id}/users`)}>
            {t('company.users.pageTitle')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/companies/${rowData.id}/contacts`)}>
            {t('contact.pageTitle', { defaultValue: 'Contacts' })}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            {t('company.editCompany', { defaultValue: 'Edit Company' })}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              try {
                await deleteCompany(rowData.id);
              } catch (error) {
                console.error('Failed to delete company:', error);
              }
            }}
          >
            {t('company.deleteCompany', { defaultValue: 'Delete Company' })}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditOpen && (
        <EditCompanyForm company={company} onClose={() => setIsEditOpen(false)} />
      )}
    </>
  );
};

export const companyColumns: ColumnDef<TransformedCompanyType>[] = [
  {
    accessorFn: (row) => row.socialRaison,
    id: 'socialRaison',
    header: 'Company Name',
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.emailEnterprise,
    id: 'emailEnterprise',
    header: 'Email',
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.telephoneEnterprise,
    id: 'telephoneEnterprise',
    header: 'Phone',
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.villeEnterprise,
    id: 'villeEnterprise',
    header: 'City',
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.pays,
    id: 'pays',
    header: 'Country',
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.createdAt,
    id: 'createdAt',
    header: 'Created At',
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.status,
    id: 'status',
    header: 'Status',
    enableSorting: true,
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const statusColor = status === 'Active' ? 'bg-borderGreen text-white' : 'bg-red-100 text-red-800';
      return (
        <span className={`px-2 py-1 text-sm font-medium rounded-full ${statusColor}`}>
          {status}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CompanyActionUI rowData={row.original} />,
    enableSorting: false,
  },
];
