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














// import { RechargeListContentType } from '@/types/recharges';
// // import { MoreOptionRechargesSvgIcon } from '@/app/svg_components/SvgIcons';
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from '@/components/ui/popover';
// import { ColumnDef } from '@tanstack/react-table';

// import RechargeActionUI from '../RechargeActionUI';

// // import { RechargeListContentType } from './dummyData';

// // Handle action button click
// export const handleAction = (contact: RechargeListContentType) => {
//   console.log('Action clicked for:', contact);
// };

// // Define the columns
// export const rechargesColumns: ColumnDef<RechargeListContentType>[] = [
//   {
//     id: 'select',
//     header: ({ table }) => (
//       <input
//         type="checkbox"
//         checked={table.getIsAllRowsSelected()}
//         onChange={table.getToggleAllRowsSelectedHandler()}
//         className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//       />
//     ),
//     cell: ({ row }) => (
//       <input
//         type="checkbox"
//         checked={row.getIsSelected()}
//         onChange={row.getToggleSelectedHandler()}
//         className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: 'receiver',
//     header: 'Receiver',
//     cell: ({ row }) => {
//       const receiverName = row.original.debitPhoneNumber;
//       const receiverContact = row.original.debitBankAccountNumber;
//       return (
//         <div className="flex flex-col">
//           <span className="font-medium">{receiverName}</span>
//           <span className="text-sm text-gray-600">{receiverContact}</span>
//         </div>
//       );
//     },
//     enableSorting: true,
//   },
//   {
//     accessorKey: 'operator',
//     header: 'Operator',
//     enableSorting: true,
//   },
//   {
//     accessorKey: 'date',
//     header: 'Date',
//     enableSorting: true,
//   },
//   {
//     accessorKey: 'creditSms',
//     header: 'Credit SMS',
//     enableSorting: true,
//   },
//   {
//     accessorKey: 'cost',
//     header: 'Cost',
//     enableSorting: true,
//   },
//   {
//     accessorKey: 'creditSmsSum',
//     header: 'Credit SMS Sum',
//     enableSorting: true,
//   },
//   {
//     accessorKey: 'archived',
//     header: 'Status',
//     enableSorting: true,
//     cell: ({ row }) => {
//       const status = row.getValue('archived') as string;
//       let statusColor = '';

//       switch (status) {
//         case 'Success':
//           statusColor = 'bg-green-100 text-green-800';
//           break;
//         case 'Failed':
//           statusColor = 'bg-red-100 text-red-800';
//           break;
//         case 'Pending':
//           statusColor = 'bg-yellow-100 text-yellow-800';
//           break;
//         default:
//           statusColor = 'bg-gray-100 text-gray-800';
//       }

//       return (
//         <span
//           className={`px-2 py-1 text-sm font-medium rounded-full ${statusColor}`}
//         >
//           {status}
//         </span>
//       );
//     },
//   },
//   {
//         id: 'actions',
//         header: 'Actions',
//         cell: ({ row }) => <RechargeActionUI rowData={row.original} />,
//         enableSorting: false,
//     },
//   // {
//   //   accessorKey: 'actions',
//   //   header: 'Actions',
//   //   cell: ({ row }) => (
//   //     <div className="flex gap-4 justify-between">

//   //       <Popover>
//   //         <PopoverTrigger>
//   //           <MoreOptionRechargesSvgIcon />
//   //         </PopoverTrigger>
//   //         <PopoverContent onClick={() => console.log('Delete:', row.original)}>
//   //           hello
//   //         </PopoverContent>

//   //       </Popover>

//   //       {/* <button
//   //         className="text-gray-600 hover:text-gray-900"
//   //         onClick={() => console.log('Edit:', row.original)}
//   //       >
//   //         Edit
//   //       </button>
//   //       <button
//   //         className="text-gray-600 hover:text-gray-900"
//   //         onClick={() => console.log('Delete:', row.original)}
//   //       >
//   //         Delete
//   //       </button> */}
//   //     </div>
//   //   ),
//   //   enableSorting: false,
//   // },
// ];

