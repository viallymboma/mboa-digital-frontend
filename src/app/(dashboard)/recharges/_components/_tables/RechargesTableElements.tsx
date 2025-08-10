import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import {
  PaymentMethod,
  RechargeListContentType,
} from '@/types/recharges';
import { ColumnDef } from '@tanstack/react-table';

import RechargeActionUI from '../RechargeActionUI';

// import RechargeActionUI from './RechargeActionUI';

export const rechargesColumns: ColumnDef<RechargeListContentType>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <input
                type="checkbox"
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
        ),
        enableSorting: false,
    },
    {
        accessorKey: 'debitPhoneNumber',
        header: 'Phone Number',
    },
    {
        accessorKey: 'paymentMethod',
        header: 'Payment Method',
        cell: ({ row }) => {
            const method = row.getValue('paymentMethod') as PaymentMethod;
            return (
                <Badge variant="outline" className="capitalize">
                    {method.replace('_', ' ').toLowerCase()}
                </Badge>
            );
        },
    },
    
    {
        accessorKey: 'qteMessage',
        header: 'Quantity SMS',
        cell: ({ row }) => (row.getValue('qteMessage') as number).toLocaleString(),
    },
    {
        accessorKey: 'messagePriceUnit',
        header: 'Unit Price',
        cell: ({ row }) => `${row.getValue('messagePriceUnit')} FCFA`,
    },
    {
        id: 'totalPrice',
        header: 'Total Price',
        cell: ({ row }) => {
            const quantity = row.getValue('qteMessage') as number;
            const unitPrice = row.getValue('messagePriceUnit') as number;
            const total = quantity * unitPrice;
            return `${total.toLocaleString()} FCFA`;
        },
        enableSorting: true,
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: ({ row }) => format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy HH:mm'),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const isArchived = row.getValue('status') as string;
            return (
                <Badge className={isArchived === "REFUSE" ? 'bg-red-100 text-red-800' : isArchived === "VALIDE" ? 'bg-green-100 text-green-800' : isArchived === "DEMANDE" ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}>
                    {/* {isArchived ? 'Validee' : 'Pending'} */}
                    { isArchived === "DEMANDE" ? "En attente" : isArchived === "REFUSE" ? "Rejetée" : isArchived === "VALIDE" ? "Validée" : "UNKNOWN"}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'archived',
        header: 'Archived',
        cell: ({ row }) => {
            const isArchived = row.getValue('archived') as boolean;
            return (
                <Badge className={isArchived ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                    {isArchived ? 'Archived' : 'Active'}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'enterprise',
        header: 'Enterprise',
        cell: ({ row }) => row.original.enterprise?.activityDomain || 'N/A',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <RechargeActionUI rowData={row.original} />,
        enableSorting: false,
    },
];
