import { EnterpriseType } from '@/types/contact';
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
  status: string;
  archived: boolean;
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

// // Define the columns
// export const contactColumns: ColumnDef< EnterpriseContactResponseType>[] = [
//     // Add a select column for row selection
//     {
//       id: 'select',
//       header: ({ table }) => (
//         <input
//           type="checkbox"
//           checked={table.getIsAllRowsSelected()}
//           onChange={table.getToggleAllRowsSelectedHandler()}
//           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//         />
//       ),
//       cell: ({ row }) => (
//         <input
//           type="checkbox"
//           checked={row.getIsSelected()}
//           onChange={row.getToggleSelectedHandler()}
//           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: 'id',
//       header: 'Uniq ID',
//       enableSorting: true,
//     },
//     {
//       accessorKey: 'firstname',
//       header: 'Prenom',
//       enableSorting: true,
//     },
//     {
//       accessorKey: 'lastname',
//       header: 'Nom',
//       enableSorting: true,
//     },
//     {
//       accessorKey: 'city',
//       header: 'Ville',
//       enableSorting: true,
//     },
//     {
//       accessorKey: 'Country',
//       header: 'country',
//       enableSorting: true,
//     },
//     // {
//     //   accessorKey: 'type',
//     //   header: 'Type',
//     //   enableSorting: true,
//     // },
//     {
//       accessorKey: 'createdAt',
//       header: 'Date',
//       enableSorting: true,
//     },
//     {
//       accessorKey: 'phoneNumber',
//       header: 'Téléphone',
//       enableSorting: true,
//     },
//     {
//       accessorKey: 'status',
//       header: 'Status',
//       enableSorting: true,
//       cell: ({ row }) => {
//         const status = row.getValue('status') as string;
//         let statusColor = '';
  
//         switch (status) {
//           case 'Correct':
//             statusColor = 'bg-borderGreen text-white';
//             break;
//           case 'Incorrect':
//             statusColor = 'bg-red-100 text-red-800';
//             break;
//           case 'Pending':
//             statusColor = 'bg-yellow-100 text-yellow-800';
//             break;
//           default:
//             statusColor = 'bg-gray-100 text-gray-800';
//         }
  
//         return (
//           <span
//             className={`px-2 py-1 text-sm font-medium rounded-full ${statusColor}`}
//           >
//             {status}
//           </span>
//         );
//       },
//     },
//     {
//       accessorKey: 'actions',
//       header: 'Actions',
//       cell: ({ row }) => (
//         <div className='flex gap-4 justify-between'>
//           <Dialog>
//               <DialogTrigger className='' asChild>
//                   <button 
//                     className="text-gray-600 hover:text-gray-900"
//                     onClick={() => handleAction(row.original)}>
//                     <EditTableRowSvgIcon />
//                   </button>
//               </DialogTrigger>
//               <DialogContent className={ "sm:max-w-[425px]" }>
//                   <DialogHeader>
//                       <DialogTitle className='text-[28px]'>Editer votre profiles</DialogTitle>
//                       <DialogDescription>
//                       </DialogDescription>
//                   </DialogHeader>
//                   <CreateContactForm />
//               </DialogContent>
//           </Dialog>
//           <button 
//             className="text-gray-600 hover:text-gray-900"
//             onClick={() => handleAction(row.original)}>
//             <DeleteTableRowSvgIcon />
//           </button>
//         </div>
//       ),
//       enableSorting: false,
//     },
// ];