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
import { HistoriesType } from '@/types/history';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ColumnDef } from '@tanstack/react-table';

import MessageDetailsCard from '../MessageDetailsCard';

export const handleAction = (contact: HistoriesType) => {
  console.log('Action clicked for:', contact);
};

export const historiesColumns: ColumnDef<HistoriesType>[] = [
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
    accessorKey: 'content',
    header: 'Content',
    enableSorting: true,
  },
  {
    accessorKey: 'receivers',
    header: 'Receivers',
    enableSorting: true,
    cell: ({ row }) => {
      const receivers = row.getValue('receivers') as string[];
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex flex-row truncate max-w-[100px]">
                {receivers.map((receiver, index) => (
                  <span key={index} className="text-sm">
                    {receiver}
                    {index < receivers.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col">
                {receivers.map((receiver, index) => (
                  <span key={index} className="text-sm">
                    {receiver}
                  </span>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    enableSorting: true,
  },
  {
    accessorKey: 'smsUsedCount',
    header: 'SMS Used',
    enableSorting: true,
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    enableSorting: true,
    cell: ({ row }) => {
      const cost = row.getValue('cost') as number;
      return <span>{cost.toLocaleString('fr-FR')} FCFA</span>;
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
        case 'Delivered':
          statusColor = 'bg-blue-100 text-blue-800';
          break;
        case 'Sent':
          statusColor = 'bg-green-100 text-green-800';
          break;
        case 'Failed':
          statusColor = 'bg-red-100 text-red-800';
          break;
        case 'Pending':
          statusColor = 'bg-yellow-100 text-yellow-800';
          break;
        case 'Draft':
          statusColor = 'bg-gray-100 text-gray-800';
          break;
        default:
          statusColor = 'bg-gray-100 text-gray-800';
      }
      return (
        <span className={`px-2 py-1 text-sm font-medium rounded-full ${statusColor}`}>
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
                Détails
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="text-[28px]">Détails du message</DialogTitle>
                <DialogDescription />
              </DialogHeader>
              <MessageDetailsCard
                dateTime={rowData.date}
                smsUsedCount={rowData.smsUsedCount}
                receiverContact={rowData.receivers}
                messageContent={rowData.content}
                status={rowData.status}
              />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
    enableSorting: false,
  },
];
