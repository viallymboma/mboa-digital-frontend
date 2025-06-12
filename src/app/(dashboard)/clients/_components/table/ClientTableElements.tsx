"use client";
import type { TransformedClientType } from '@/types/client';
import { ColumnDef } from '@tanstack/react-table';

import ClientActionUI from './ClientActionUI';
import {
  TableHeaderClientSelectAll,
  TableHeaderClientSelectRow,
} from './table-header-comps/TableHeaderClient';

export const clientColumns: ColumnDef<TransformedClientType>[] = [
    {
        id: 'select',
        header: ({ table }) => <TableHeaderClientSelectAll table={table} />,
        cell: ({ row }) => <TableHeaderClientSelectRow row={row} />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorFn: (row) => row.firstName,
        id: 'firstName',
        header: 'Prénom',
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        header: 'Nom',
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.email,
        id: 'email',
        header: 'Email',
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.phoneNumber,
        id: 'phoneNumber',
        header: 'Téléphone',
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.role,
        id: 'role',
        header: 'Role',
        enableSorting: true,
    },
    {
        accessorFn: (row) => new Date(row.createdAt).toLocaleDateString(),
        id: 'createdAt',
        header: 'Date',
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.archived ? 'Inactive' : 'Active',
        id: 'status',
        header: 'Status',
        enableSorting: true,
        cell: ({ getValue }) => {
            const status = getValue() as string;
            const statusColor = status === 'Active' 
                ? 'bg-borderGreen text-white'
                : 'bg-red-100 text-red-800';

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
        cell: ({ row }) => <ClientActionUI rowData={row.original} />,
        enableSorting: false,
    },
];