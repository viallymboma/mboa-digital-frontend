import {
  DeleteTableRowSvgIcon,
  EditTableRowSvgIcon,
} from '@/app/svg_components/SvgIcons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ColumnDef } from '@tanstack/react-table';

import CreateContactForm from './CreateContactForm';
import { ContactType } from './dummyData';

// Handle action button click
export const handleAction = (contact: ContactType) => {
  console.log('Action clicked for:', contact);
};

// Define the columns
export const contactColumns: ColumnDef<ContactType>[] = [
    // Add a select column for row selection
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
      accessorKey: 'name',
      header: 'Noms',
      enableSorting: true,
    },
    {
      accessorKey: 'city',
      header: 'Ville',
      enableSorting: true,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      enableSorting: true,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      enableSorting: true,
    },
    {
      accessorKey: 'phone',
      header: 'Téléphone',
      enableSorting: true,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      enableSorting: true,
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        let statusColor = '';
  
        switch (status) {
          case 'Correct':
            statusColor = 'bg-borderGreen text-white';
            break;
          case 'Incorrect':
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
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className='flex gap-4 justify-between'>
          <Dialog>
              <DialogTrigger className='' asChild>
                  <button 
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => handleAction(row.original)}>
                    <EditTableRowSvgIcon />
                  </button>
              </DialogTrigger>
              <DialogContent className={ "sm:max-w-[425px]" }>
                  <DialogHeader>
                      <DialogTitle className='text-[28px]'>Editer votre profiles</DialogTitle>
                      <DialogDescription>
                      </DialogDescription>
                  </DialogHeader>
                  <CreateContactForm />
              </DialogContent>
          </Dialog>
          <button 
            className="text-gray-600 hover:text-gray-900"
            onClick={() => handleAction(row.original)}>
            <DeleteTableRowSvgIcon />
          </button>
        </div>
      ),
      enableSorting: false,
    },
];