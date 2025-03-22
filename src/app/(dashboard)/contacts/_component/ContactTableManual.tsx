import React from 'react';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { SearchInputV2 } from '@/app/_components/form/SearchInput';
import {
  DeleteTableRowSvgIcon,
  EditTableRowSvgIcon,
  FilterSvgIcon,
  SearchSvgIcon,
  TitleListSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { DialogDescription } from '@radix-ui/react-dialog';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import CreateContactForm from './CreateContactForm';
import {
  ContactType,
  dummyData,
  dummyDataReal,
} from './dummyData';

// Define the columns
const columns: ColumnDef<ContactType>[] = [
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

// Handle action button click
const handleAction = (contact: ContactType) => {
  console.log('Action clicked for:', contact);
};

const ContactTableManual = () => {
  // Pagination state
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 7,
  });

  // Translation
  const { t } = useTranslation();

  // Filter state
  const [globalFilter, setGlobalFilter] = React.useState('');

  // Sorting state
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  // Row selection state
  const [rowSelection, setRowSelection] = React.useState({});

  // Create the table instance
  const table = useReactTable({
    data: dummyDataReal,
    columns,
    state: {
      pagination,
      globalFilter,
      sorting,
      columnVisibility,
      rowSelection, // Add row selection state
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection, // Add row selection handler
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
  });

  // Calculate the current range of items being displayed
  const startIndex = pagination.pageIndex * pagination.pageSize + 1;
  const endIndex = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    dummyDataReal.length
  );

  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter columns based on the search query
  const filteredOptions = table.getAllColumns().filter(option =>
    typeof option.columnDef.header === 'string' &&
    option.columnDef.header.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col gap-4 border-primaryAppearance border rounded-[12px]">
      {/* Filter input */}
      <div className=" flex flex-row items-center justify-between">
        <div className='flex flex-row gap-4 items-center'>
          <Button className='h-fit bg-transparent p-4'>
            <TitleListSvgIcon />
          </Button>
          <div>
            <h1 className='text-[20px] font-bold'>Listes des Contacts</h1>
            <p className='text-[14px]'>Liste de toutes les catégories disponibles</p>
          </div>
        </div>
        <div className='flex flex-row gap-4'>
          <SearchInputV2 className='w-fit h-[50px]' onChange={(e) => setGlobalFilter(e.target.value)} placeholder={t('register.searchLang')} leftIcon={<SearchSvgIcon />} />
          <Button className='bg-black p-4 h-fit'>
            <FilterSvgIcon />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Column visibility controls */}
      <div className="w-full flex flex-row items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 border rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
            <span>Colomnes du tableau</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-3 bg-white shadow-md rounded-lg">
            <DropdownMenuLabel className="text-lg font-semibold text-gray-800">Select Columns</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-2" />

            {/* Search Input */}
            <div className="p-2 bg-white sticky top-0 z-10">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Scrollable Checkbox List */}
            <div className="max-h-[200px] overflow-y-auto p-2">
              {filteredOptions.map((option) => (
                <label key={option.id} className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={option.getIsVisible()}
                    onChange={() => option.toggleVisibility()}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-800">{option.columnDef.header as string}</span>
                </label>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* <Separator /> */}

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-primaryAppearanceLight text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 text-left cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {typeof header.column.columnDef.header === 'function'
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border-t">
                    {cell.column.columnDef.cell
                      ? typeof cell.column.columnDef.cell === 'function'
                        ? cell.column.columnDef.cell(cell.getContext())
                        : cell.getValue()
                      : cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {/* Page size selector */}
        <div className='flex flex-row items-center gap-2'>
          <h1 className='text-[14px]'>Lignes par pages :</h1>
          <select
            value={pagination.pageSize}
            onChange={(e) => {
              setPagination({ ...pagination, pageSize: Number(e.target.value) });
            }}
            className="p-2 text-[12px] border bg-white rounded"
          >
            {[5, 7, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>

        {/* Current page range and total items */}
        <span className="text-sm">
          {startIndex}-{endIndex} of {dummyData.length}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </button>
        </div>

        {/* Total number of pages */}
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>
    </div>
  );
};

export default ContactTableManual;


























// import React from 'react';

// import {
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// import { SearchInputV2 } from '@/app/_components/form/SearchInput';
// import {
//   DeleteTableRowSvgIcon,
//   EditTableRowSvgIcon,
//   FilterSvgIcon,
//   SearchSvgIcon,
//   TitleListSvgIcon,
// } from '@/app/svg_components/SvgIcons';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Separator } from '@/components/ui/separator';
// import {
//   ColumnDef,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   useReactTable,
//   VisibilityState,
// } from '@tanstack/react-table';

// import {
//   ContactType,
//   dummyData,
//   dummyDataReal,
// } from './dummyData';

// // Define the columns
// const columns: ColumnDef<ContactType>[] = [
//   {
//     accessorKey: 'name',
//     header: 'Noms',
//     enableSorting: true, // Enable sorting for this column
//   },
//   {
//     accessorKey: 'city',
//     header: 'Ville',
//     enableSorting: true, // Enable sorting for this column
//   },
//   {
//     accessorKey: 'type',
//     header: 'Type',
//     enableSorting: true, // Enable sorting for this column
//   },
//   {
//     accessorKey: 'date',
//     header: 'Date',
//     enableSorting: true, // Enable sorting for this column
//   },
//   {
//     accessorKey: 'phone',
//     header: 'Téléphone',
//     enableSorting: true, // Enable sorting for this column
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     enableSorting: true,
//     cell: ({ row }) => {
//       const status = row.getValue('status') as string; // Get the status value
//       let statusColor = '';
  
//       // Assign colors based on the status
//       switch (status) {
//         case 'Correct':
//           statusColor = 'bg-borderGreen text-white';
//           break;
//         case 'Incorrect':
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
//     accessorKey: 'actions',
//     header: 'Actions',
//     cell: ({ row }) => (
//       <div className='flex gap-4 justify-between'>
//         <button 
//           className="text-gray-600 hover:text-gray-900"
//           onClick={() => handleAction(row.original)}>
//           <EditTableRowSvgIcon />
//         </button>
//         <button 
//           className="text-gray-600 hover:text-gray-900"
//           onClick={() => handleAction(row.original)}>
//           <DeleteTableRowSvgIcon />
//         </button>
//       </div>
//     ),
//     enableSorting: false, // Disable sorting for this column
//   },
// ];

// // Handle action button click
// const handleAction = (contact: ContactType) => {
//   console.log('Action clicked for:', contact);
// };

// const ContactTable = () => {
//   // Pagination state
//   const [pagination, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 7,
//   });

//   // Translation
//   const { t } = useTranslation ();

//   // Filter state
//   const [globalFilter, setGlobalFilter] = React.useState('');

//   // Sorting state
//   const [sorting, setSorting] = React.useState<SortingState>([]);

//   // Column visibility state
//   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

//   // Create the table instance
//   const table = useReactTable({
//     data: dummyDataReal,
//     columns,
//     state: {
//       pagination,
//       globalFilter,
//       sorting,
//       columnVisibility,
//     },
//     onPaginationChange: setPagination,
//     onGlobalFilterChange: setGlobalFilter,
//     onSortingChange: setSorting,
//     onColumnVisibilityChange: setColumnVisibility,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(), // Enable sorting
//     manualPagination: false, // Let the table handle pagination automatically
//   });

//   // Calculate the current range of items being displayed
//   const startIndex = pagination.pageIndex * pagination.pageSize + 1;
//   const endIndex = Math.min(
//     (pagination.pageIndex + 1) * pagination.pageSize,
//     dummyDataReal.length
//   );

//   const [searchQuery, setSearchQuery] = React.useState('');
    
//   // Filter countries based on the search query
//   const filteredOptions = table.getAllColumns().filter(option =>
//     typeof option.columnDef.header === 'string' &&
//     option.columnDef.header.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-4 border-primaryAppearance border rounded-[12px]">
//       {/* Filter input */}
//       <div className="mb-4 flex flex-row items-center justify-between">
//         {/* <input
//           type="text"
//           value={globalFilter}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//           placeholder="Search..."
//           className="p-2 border rounded"
//         /> */}
//         <div className='flex flex-row gap-4 items-center'>
//           <Button className='h-fit bg-transparent  p-4'>
//             <TitleListSvgIcon />
//           </Button>
//           <div>
//             <h1 className='text-[20px] font-bold'>Listes des Contact</h1>
//             <p className='text-[14px]'>Liste de toutes les catégories disponibles</p>
//           </div>
//         </div>
//         <div className='flex flex-row gap-4'>
//           <SearchInputV2 className='w-fit h-[50px]' onChange={ (e) => setGlobalFilter(e.target.value) } placeholder={t('register.searchLang')} leftIcon={<SearchSvgIcon />} />

//           <Button className='bg-black p-4 h-fit'>
//             <FilterSvgIcon />
//           </Button>

//         </div>
//       </div>

//       <Separator />

//       {/* Column visibility controls */}
//       <div className="mb-4">
//         {/* <label className=" text-[18px] font-medium text-gray-700 mb-2">Show Columns:</label> */}
//         <DropdownMenu>
//           <DropdownMenuTrigger className="p-2 border rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
//             <span>Colomnes du tableau</span>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-64 p-3 bg-white shadow-md rounded-lg">
//             <DropdownMenuLabel className="text-lg font-semibold text-gray-800">Select Columns</DropdownMenuLabel>
//             <DropdownMenuSeparator className="my-2" />

//             {/* Search Input */}
//             <div className="p-2 bg-white sticky top-0 z-10">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Scrollable Checkbox List */}
//             <div className="max-h-[200px] overflow-y-auto p-2">
//               {filteredOptions.map((option) => (
//                 <label key={option.id} className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={option.getIsVisible()}
//                     onChange={() => option.toggleVisibility()}
//                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="text-gray-800">{option.columnDef.header as string}</span>
//                 </label>
//               ))}
//             </div>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       <Separator />

//       {/* Table */}
//       <div className="rounded-lg border overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-primaryAppearanceLight text-white">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="p-2 text-left cursor-pointer"
//                     onClick={header.column.getToggleSortingHandler()} // Enable column sorting
//                   >
//                     {typeof header.column.columnDef.header === 'function'
//                       ? header.column.columnDef.header(header.getContext())
//                       : header.column.columnDef.header}
//                     {/* Sorting indicator */}
//                     {{
//                       asc: ' 🔼',
//                       desc: ' 🔽',
//                     }[header.column.getIsSorted() as string] ?? null}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="hover:bg-gray-100">
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="p-2 border-t">
//                     {cell.column.columnDef.cell
//                       ? typeof cell.column.columnDef.cell === 'function'
//                         ? cell.column.columnDef.cell(cell.getContext())
//                         : cell.getValue()
//                       : cell.getValue()}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       <div className="flex items-center justify-center gap-4 mt-4">
//         {/* Page size selector */}
//         <div className='flex flex-row items-center gap-2'>
//           <h1 className='text-[14px]'>Lignes par pages :</h1>
//           <select
//             value={pagination.pageSize}
//             onChange={(e) => {
//               setPagination({ ...pagination, pageSize: Number(e.target.value) });
//             }}
//             className="p-2 text-[12px] border bg-white rounded"
//           >
//             {[5, 7, 10, 20].map((size) => (
//               <option key={size} value={size}>
//                 Show {size}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Current page range and total items */}
//         <span className="text-sm">
//           {startIndex}-{endIndex} of {dummyData.length}
//         </span>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             // className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             <ChevronLeft />
//           </button>
//           <button
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             // className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             <ChevronRight />
//             {/* <ChevronsRightIcon /> */}
//           </button>
//         </div>

//         {/* Total number of pages */}
//         <span className="text-sm">
//           Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//         </span>

//       </div>
//     </div>
//   );
// };

// export default ContactTable;















// import React from 'react';

// import {
//   ColumnDef,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// import {
//   ContactType,
//   dummyData,
// } from './dummyData';

// // Define the columns
// const columns: ColumnDef<ContactType>[] = [
//   {
//     accessorKey: 'name',
//     header: 'Noms',
//   },
//   {
//     accessorKey: 'city',
//     header: 'Ville',
//   },
//   {
//     accessorKey: 'type',
//     header: 'Type',
//   },
//   {
//     accessorKey: 'date',
//     header: 'Date',
//   },
//   {
//     accessorKey: 'phone',
//     header: 'Téléphone',
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//   },
//   {
//     accessorKey: 'actions',
//     header: 'Actions',
//     cell: ({ row }) => (
//       <button onClick={() => handleAction(row.original)}>☒</button>
//     ),
//   },
// ];

// // Handle action button click
// const handleAction = (contact: ContactType) => {
//   console.log('Action clicked for:', contact);
// };

// const ContactTable = () => {
//   // Pagination state
//   const [pagination, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 7,
//   });

//   // Filter state
//   const [globalFilter, setGlobalFilter] = React.useState('');

//   // Create the table instance
//   const table = useReactTable({
//     data: dummyData,
//     columns,
//     state: {
//       pagination,
//       globalFilter,
//     },
//     onPaginationChange: setPagination,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     manualPagination: false, // Let the table handle pagination automatically
//   });

//   // Calculate the current range of items being displayed
//   const startIndex = pagination.pageIndex * pagination.pageSize + 1;
//   const endIndex = Math.min(
//     (pagination.pageIndex + 1) * pagination.pageSize,
//     dummyData.length
//   );

//   return (
//     <div className="p-4">
//       {/* Filter input */}
//       <div className="mb-4">
//         <input
//           type="text"
//           value={globalFilter}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//           placeholder="Search..."
//           className="p-2 border rounded"
//         />
//       </div>

//       {/* Table */}
//       <div className="rounded-lg border overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-blue-500 text-white">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id} className="p-2 text-left">
//                     {typeof header.column.columnDef.header === 'function'
//                       ? header.column.columnDef.header(header.getContext())
//                       : header.column.columnDef.header}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="hover:bg-gray-100">
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="p-2 border-t">
//                     {cell.column.columnDef.cell
//                       ? typeof cell.column.columnDef.cell === 'function'
//                         ? cell.column.columnDef.cell(cell.getContext())
//                         : cell.getValue()
//                       : cell.getValue()}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             Next
//           </button>
//         </div>

//         {/* Current page range and total items */}
//         <span className="text-sm">
//           {startIndex}-{endIndex} of {dummyData.length}
//         </span>

//         {/* Total number of pages */}
//         <span className="text-sm">
//           Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ContactTable;





















// import React from 'react';

// // import { DataTable } from '@/components/ui/data-table';
// import {
//   ColumnDef,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// import {
//   ContactType,
//   dummyData,
// } from './dummyData';

// // Define the columns
// const columns: ColumnDef<ContactType>[] = [
//   {
//     accessorKey: 'name',
//     header: 'Noms',
//   },
//   {
//     accessorKey: 'city',
//     header: 'Ville',
//   },
//   {
//     accessorKey: 'type',
//     header: 'Type',
//   },
//   {
//     accessorKey: 'date',
//     header: 'Date',
//   },
//   {
//     accessorKey: 'phone',
//     header: 'Téléphone',
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//   },
//   {
//     accessorKey: 'actions',
//     header: 'Actions',
//     cell: ({ row }) => (
//       <button onClick={() => handleAction(row.original)}>☒</button>
//     ),
//   },
// ];

// // Handle action button click
// const handleAction = (contact: ContactType) => {
//   console.log('Action clicked for:', contact);
// };

// const ContactTable = () => {
//   // Pagination state
//   const [pagination, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 7,
//   });

//   // Filter state
//   const [globalFilter, setGlobalFilter] = React.useState('');

//   // Create the table instance
//   const table = useReactTable({
//     data: dummyData,
//     columns,
//     state: {
//       pagination,
//       globalFilter,
//     },
//     onPaginationChange: setPagination,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     manualPagination: false, // Set to true if you're handling pagination server-side
//     pageCount: Math.ceil(dummyData.length / pagination.pageSize), // Total number of pages
//   });

//   return (
//     <div className="p-4">
//       {/* Filter input */}
//       <div className="mb-4">
//         <input
//           type="text"
//           value={globalFilter}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//           placeholder="Search..."
//           className="p-2 border rounded"
//         />
//       </div>

//       {/* Table */}
//       <div className="rounded-lg border overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-blue-500 text-white">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id} className="p-2 text-left">
//                     {typeof header.column.columnDef.header === 'function'
//                       ? header.column.columnDef.header(header.getContext())
//                       : header.column.columnDef.header}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="hover:bg-gray-100">
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="p-2 border-t">
//                     {cell.column.columnDef.cell
//                       ? typeof cell.column.columnDef.cell === 'function'
//                         ? cell.column.columnDef.cell(cell.getContext())
//                         : cell.getValue()
//                       : cell.getValue()}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             Next
//           </button>
//         </div>
//         <span className="text-sm">
//           Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ContactTable;













// import React from 'react';

// import { DataTable } from '@/components/ui/data-table';
// import {
//   ColumnDef,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// import {
//   ContactType,
//   dummyData,
// } from './dummyData';

// // Define the columns
// const columns: ColumnDef<ContactType>[] = [
//   {
//     accessorKey: 'name',
//     header: 'Noms',
//   },
//   {
//     accessorKey: 'city',
//     header: 'Ville',
//   },
//   {
//     accessorKey: 'type',
//     header: 'Type',
//   },
//   {
//     accessorKey: 'date',
//     header: 'Date',
//   },
//   {
//     accessorKey: 'phone',
//     header: 'Téléphone',
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//   },
//   {
//     accessorKey: 'actions',
//     header: 'Actions',
//     cell: ({ row }) => (
//       <button onClick={() => handleAction(row.original)}>☒</button>
//     ),
//   },
// ];

// // Handle action button click
// const handleAction = (contact: ContactType) => {
//   console.log('Action clicked for:', contact);
// };

// const ContactTable = () => {

//   // Pagination state
//   const [pagination, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 7,
//   });

//   // Create the table instance
//   const table = useReactTable({
//     data: dummyData,
//     columns,
//     state: {
//       pagination,
//     },
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     manualPagination: true, // Set to true if you're handling pagination server-side
//     pageCount: Math.ceil(dummyData.length / pagination.pageSize), // Total number of pages
//   });

//   return (
//     <>
//       <DataTable
//         columns={columns}
//         data={dummyData}
//       />
//       {/* Pagination controls */}
//       <div className="flex items-center gap-2">
//         <button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </button>
//         <button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </button>
//         <span>
//           Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//         </span>
//       </div>
//     </>
//   );
// }

// export default ContactTable