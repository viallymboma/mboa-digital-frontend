import {
  EnterpriseType,
  UserType,
} from '@/types/contact';
import { ColumnDef } from '@tanstack/react-table';

import ContactActionUI from './ContactActionUI';
import SelectAllCheckbox from './table-sub-ui/SelectAllCheckbox';
import SelectedTableRow from './table-sub-ui/SelectedTableRow';

export type TransformedContactType = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    enterprise: EnterpriseType;
    createdAt: string;
    status?: string;
    archived: boolean;
    socialRaison?: string, 
    smsSenderId: string, 
    activityDomain: string, 
    contribuableNumber?: string; 
    villeEntreprise: string;
    pays: string,
    user: UserType, 
}

// Handle action button click
export const handleAction = (contact: TransformedContactType) => {
  console.log('Action clicked for:', contact);
};

export const contactColumns: ColumnDef<TransformedContactType>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <SelectAllCheckbox table={table} />
        ),
        cell: ({ row }) => (
            <SelectedTableRow row={row} />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorFn: (row) => row.id,
        id: 'id',
        header: 'Uniq ID',
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.firstname,
        id: 'firstname',
        header: 'Prenom',
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.lastname,
        id: 'lastname',
        header: 'Nom',
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.city,
        id: 'city',
        header: 'Ville',
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.country,
        id: 'country',
        header: 'Pays',
        enableSorting: true,
    },
    {
        accessorFn: (row) => new Date(row.createdAt).toLocaleDateString(),
        id: 'createdAt',
        header: 'Date',
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.phoneNumber,
        id: 'phoneNumber',
        header: 'Téléphone',
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
        cell: ({ row }) => {
            
            return (
            <ContactActionUI rowData={row.original} />
        )},
        enableSorting: false,
    },
];