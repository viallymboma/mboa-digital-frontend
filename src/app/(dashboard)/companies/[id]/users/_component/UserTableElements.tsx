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
