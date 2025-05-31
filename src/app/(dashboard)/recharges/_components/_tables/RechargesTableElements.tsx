import { RechargeListContentType } from '@/types/recharges';
// import { MoreOptionRechargesSvgIcon } from '@/app/svg_components/SvgIcons';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
import { ColumnDef } from '@tanstack/react-table';

import RechargeActionUI from '../RechargeActionUI';

// import { RechargeListContentType } from './dummyData';

// Handle action button click
export const handleAction = (contact: RechargeListContentType) => {
  console.log('Action clicked for:', contact);
};

// Define the columns
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
    enableHiding: false,
  },
  {
    accessorKey: 'receiver',
    header: 'Receiver',
    cell: ({ row }) => {
      const receiverName = row.original.debitPhoneNumber;
      const receiverContact = row.original.debitBankAccountNumber;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{receiverName}</span>
          <span className="text-sm text-gray-600">{receiverContact}</span>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'operator',
    header: 'Operator',
    enableSorting: true,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    enableSorting: true,
  },
  {
    accessorKey: 'creditSms',
    header: 'Credit SMS',
    enableSorting: true,
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    enableSorting: true,
  },
  {
    accessorKey: 'creditSmsSum',
    header: 'Credit SMS Sum',
    enableSorting: true,
  },
  {
    accessorKey: 'archived',
    header: 'Status',
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.getValue('archived') as string;
      let statusColor = '';

      switch (status) {
        case 'Success':
          statusColor = 'bg-green-100 text-green-800';
          break;
        case 'Failed':
          statusColor = 'bg-red-100 text-red-800';
          break;
        case 'Pending':
          statusColor = 'bg-yellow-100 text-yellow-800';
          break;
        default:
          statusColor = 'bg-gray-100 text-gray-800';
      }

      return (
        <span
          className={`px-2 py-1 text-sm font-medium rounded-full ${statusColor}`}
        >
          {status}
        </span>
      );
    },
  },
  {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <RechargeActionUI rowData={row.original} />,
        enableSorting: false,
    },
  // {
  //   accessorKey: 'actions',
  //   header: 'Actions',
  //   cell: ({ row }) => (
  //     <div className="flex gap-4 justify-between">

  //       <Popover>
  //         <PopoverTrigger>
  //           <MoreOptionRechargesSvgIcon />
  //         </PopoverTrigger>
  //         <PopoverContent onClick={() => console.log('Delete:', row.original)}>
  //           hello
  //         </PopoverContent>

  //       </Popover>

  //       {/* <button
  //         className="text-gray-600 hover:text-gray-900"
  //         onClick={() => console.log('Edit:', row.original)}
  //       >
  //         Edit
  //       </button>
  //       <button
  //         className="text-gray-600 hover:text-gray-900"
  //         onClick={() => console.log('Delete:', row.original)}
  //       >
  //         Delete
  //       </button> */}
  //     </div>
  //   ),
  //   enableSorting: false,
  // },
];

