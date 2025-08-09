import { ColumnDef } from '@tanstack/react-table';

import { userTableTranslations } from './userTableTranslations';

export type TransformedUserType = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  status: string;
};

export const userColumns = (lang: 'en' | 'fr'): ColumnDef<TransformedUserType>[] => {
  const t = userTableTranslations[lang];
  return [
    // {
    //   id: 'select',
    //   header: ({ table }) => <SelectAllCheckbox table={table} />,
    //   cell: ({ row }) => <SelectedTableRow row={row} />,
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorFn: (row) => row.firstName || t.unknown,
      id: 'firstName',
      header: t.firstName,
      enableSorting: true,
    },
    {
      accessorFn: (row) => row.lastName || t.unknown,
      id: 'lastName',
      header: t.lastName,
      enableSorting: true,
    },
    {
      accessorFn: (row) => row.email,
      id: 'email',
      header: t.email,
      enableSorting: true,
    },
    {
      accessorFn: (row) => row.phoneNumber,
      id: 'phoneNumber',
      header: t.phoneNumber,
      enableSorting: true,
    },
    {
      accessorFn: (row) => row.role,
      id: 'role',
      header: t.role,
      enableSorting: true,
    },
    {
      accessorFn: (row) => row.createdAt,
      id: 'createdAt',
      header: t.createdAt,
      enableSorting: true,
    },
    {
      accessorFn: (row) => row.status,
      id: 'status',
      header: t.status,
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
  ];
};

// import { useTranslation } from 'react-i18next';

// import SelectAllCheckbox
//   from '@/app/(dashboard)/contacts/_component/table-sub-ui/SelectAllCheckbox';
// import SelectedTableRow
//   from '@/app/(dashboard)/contacts/_component/table-sub-ui/SelectedTableRow';
// import { ColumnDef } from '@tanstack/react-table';

// export type TransformedUserType = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   role: string;
//   createdAt: string;
//   status: string;
// };

// export const userColumns = (): ColumnDef<TransformedUserType>[] => {
//   const { t } = useTranslation();
//   return [
//     {
//       id: 'select',
//       header: ({ table }) => <SelectAllCheckbox table={table} />,
//       cell: ({ row }) => <SelectedTableRow row={row} />,
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorFn: (row) => row.firstName,
//       id: 'firstName',
//       header: t('register.firstName'),
//       enableSorting: true,
//     },
//     {
//       accessorFn: (row) => row.lastName,
//       id: 'lastName',
//       header: t('register.lastName'),
//       enableSorting: true,
//     },
//     {
//       accessorFn: (row) => row.email,
//       id: 'email',
//       header: t('register.email'),
//       enableSorting: true,
//     },
//     {
//       accessorFn: (row) => row.phoneNumber,
//       id: 'phoneNumber',
//       header: t('contact.contactForm.phoneNumber'),
//       enableSorting: true,
//     },
//     {
//       accessorFn: (row) => row.role,
//       id: 'role',
//       header: t('company.users.role', { defaultValue: 'Role' }),
//       enableSorting: true,
//     },
//     {
//       accessorFn: (row) => row.createdAt,
//       id: 'createdAt',
//       header: t('company.createdAt', { defaultValue: 'Created At' }),
//       enableSorting: true,
//     },
//     {
//       accessorFn: (row) => row.status,
//       id: 'status',
//       header: t('company.status', { defaultValue: 'Status' }),
//       enableSorting: true,
//       cell: ({ getValue }) => {
//         const status = getValue() as string;
//         const statusColor = status === 'Active' ? 'bg-borderGreen text-white' : 'bg-red-100 text-red-800';
//         return (
//           <span className={`px-2 py-1 text-sm font-medium rounded-full ${statusColor}`}>
//             {status}
//           </span>
//         );
//       },
//     },
//   ];
// };