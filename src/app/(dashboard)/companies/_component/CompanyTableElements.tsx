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
import { ColumnDef } from '@tanstack/react-table';

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

  return (
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
        <DropdownMenuItem
          onClick={() => document.getElementById(`edit-company-${rowData.id}`)?.click()}
        >
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
  );
};

export const companyColumns: ColumnDef<TransformedCompanyType>[] = [
//   {
//     id: 'select',
//     header: ({ table }) => <SelectAllCheckbox table={table} />,
//     cell: ({ row }) => <SelectedTableRow row={row} />,
//     enableSorting: false,
//     enableHiding: false,
//   },
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

// // import SelectAllCheckbox
// //   from '@/app/(dashboard)/contacts/_component/table-sub-ui/SelectAllCheckbox';
// // import SelectedTableRow
// //   from '@/app/(dashboard)/contacts/_component/table-sub-ui/SelectedTableRow';
// // app/(dashboard)/companies/_component/CompanyTableElements.tsx
// import { ColumnDef } from '@tanstack/react-table';

// export type TransformedCompanyType = {
//   id: string;
//   socialRaison: string;
//   emailEnterprise: string;
//   telephoneEnterprise: string;
//   villeEnterprise: string;
//   pays: string;
//   createdAt: string;
//   status: string;
// };

// export const companyColumns: ColumnDef<TransformedCompanyType>[] = [
// //   {
// //     id: 'select',
// //     header: ({ table }) => <SelectAllCheckbox table={table} />,
// //     cell: ({ row }) => <SelectedTableRow row={row} />,
// //     enableSorting: false,
// //     enableHiding: false,
// //   },
//   {
//     accessorFn: (row) => row.socialRaison,
//     id: 'socialRaison',
//     header: 'Company Name',
//     enableSorting: true,
//   },
//   {
//     accessorFn: (row) => row.emailEnterprise,
//     id: 'emailEnterprise',
//     header: 'Email',
//     enableSorting: true,
//   },
//   {
//     accessorFn: (row) => row.telephoneEnterprise,
//     id: 'telephoneEnterprise',
//     header: 'Phone',
//     enableSorting: true,
//   },
//   {
//     accessorFn: (row) => row.villeEnterprise,
//     id: 'villeEnterprise',
//     header: 'City',
//     enableSorting: true,
//   },
//   {
//     accessorFn: (row) => row.pays,
//     id: 'pays',
//     header: 'Country',
//     enableSorting: true,
//   },
//   {
//     accessorFn: (row) => row.createdAt,
//     id: 'createdAt',
//     header: 'Created At',
//     enableSorting: true,
//   },
//   {
//     accessorFn: (row) => row.status,
//     id: 'status',
//     header: 'Status',
//     enableSorting: true,
//     cell: ({ getValue }) => {
//       const status = getValue() as string;
//       const statusColor = status === 'Active' ? 'bg-borderGreen text-white' : 'bg-red-100 text-red-800';
//       return (
//         <span className={`px-2 py-1 text-sm font-medium rounded-full ${statusColor}`}>
//           {status}
//         </span>
//       );
//     },
//   },
// ];