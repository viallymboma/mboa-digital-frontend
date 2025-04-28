import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ColumnDef } from '@tanstack/react-table';

import {
  MoneyTransferOperator,
  PaymentsType,
} from './dummyData';

// import { PaymentsType, MoneyTransferOperator } from './dummyRechargesData';

// Handle action button click
export const handleAction = (recharge: PaymentsType) => {
  console.log('Action clicked for:', recharge);
};

// Define the columns
export const paymentsColumns: ColumnDef<PaymentsType>[] = [
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
    accessorKey: 'receiverInfo',
    header: 'Receiver Info',
    cell: ({ row }) => {
      const receiverName = row.original.receiverName;
      const receiverContact = row.original.receiverContact;
      const transactionID = row.original.transactionID;
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex flex-col">
                <div className='flex gap-2 items-center flex-row'>
                  <span className="font-medium">{receiverName}</span>
                  |
                  <span className="text-sm text-gray-500">{receiverContact}</span>
                </div>
                <div className='flex items-start'>
                  <span className="text-sm text-gray-500">{transactionID}</span>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col">
                <span className="font-medium">{receiverName}</span>
                <span className="text-sm">{receiverContact}</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    enableSorting: true,
  },
  // {
  //   accessorKey: 'transactionID',
  //   header: 'Transaction ID',
  //   enableSorting: true,
  // },
  {
    accessorKey: 'dateTime',
    header: 'Date/Time',
    enableSorting: true,
  },
  {
    accessorKey: 'operatorMoneyTransfer',
    header: 'Operator',
    enableSorting: true,
    cell: ({ row }) => {
      const operator = row.getValue('operatorMoneyTransfer') as MoneyTransferOperator;
      return (
        <span className={`px-2 py-1 rounded-full ${
          operator === MoneyTransferOperator.ORANGE_MONEY 
            ? 'bg-orange-100 text-orange-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {operator}
        </span>
      );
    },
  },
  {
    accessorKey: 'numberOfSms',
    header: 'SMS Count',
    enableSorting: true,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    enableSorting: true,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      return <span>{amount.toLocaleString()} FCFA</span>;
    },
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    enableSorting: true,
    cell: ({ row }) => {
      const cost = parseFloat(row.getValue('cost'));
      return <span>{cost.toLocaleString()} FCFA</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      let statusColor = '';

      switch (status) {
        case 'Completed':
          statusColor = 'bg-green-100 text-green-800';
          break;
        case 'Failed':
          statusColor = 'bg-red-100 text-red-800';
          break;
        case 'Pending':
          statusColor = 'bg-yellow-100 text-yellow-800';
          break;
        case 'Processing':
          statusColor = 'bg-blue-100 text-blue-800';
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
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const rowData = row.original;
  
      return (
        <div className="flex gap-4 justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="bg-black p-2 rounded-xl text-white hover:text-gray-900"
                onClick={() => handleAction(rowData)}
              >
                Details
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="text-[28px]">Recharge Details</DialogTitle>
                <DialogDescription />
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Receiver Information</h3>
                    <p>{rowData.receiverName}</p>
                    <p>{rowData.receiverContact}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Transaction Details</h3>
                    <p>ID: {rowData.transactionID}</p>
                    <p>Date: {rowData.dateTime}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Payment Information</h3>
                    <p>Operator: {rowData.operatorMoneyTransfer}</p>
                    <p>Amount: {rowData.amount.toLocaleString()} FCFA</p>
                    <p>Cost: {rowData.cost.toLocaleString()} FCFA</p>
                  </div>
                  <div>
                    <h3 className="font-medium">SMS Information</h3>
                    <p>Number of SMS: {rowData.numberOfSms}</p>
                    <p>Status: 
                      <span className={`ml-2 px-2 py-1 text-sm font-medium rounded-full ${
                        rowData.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        rowData.status === 'Failed' ? 'bg-red-100 text-red-800' :
                        rowData.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {rowData.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
    enableSorting: false,
  }
];