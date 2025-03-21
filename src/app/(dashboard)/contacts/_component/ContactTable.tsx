import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

import {
  ContactType,
  dummyData,
} from './dummyData';

// Define the columns
const columns: ColumnDef<ContactType>[] = [
  {
    accessorKey: 'name',
    header: 'Noms',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'city',
    header: 'Ville',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'type',
    header: 'Type',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'date',
    header: 'Date',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'phone',
    header: 'Téléphone',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <button onClick={() => handleAction(row.original)}>☒</button>
    ),
    enableSorting: false, // Disable sorting for this column
  },
];

// Handle action button click
const handleAction = (contact: ContactType) => {
  console.log('Action clicked for:', contact);
};

const ContactTable = () => {
  // Pagination state
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 7,
  });

  // Filter state
  const [globalFilter, setGlobalFilter] = React.useState('');

  // Sorting state
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  // Create the table instance
  const table = useReactTable({
    data: dummyData,
    columns,
    state: {
      pagination,
      globalFilter,
      sorting,
      columnVisibility,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(), // Enable sorting
    manualPagination: false, // Let the table handle pagination automatically
  });

  // Calculate the current range of items being displayed
  const startIndex = pagination.pageIndex * pagination.pageSize + 1;
  const endIndex = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    dummyData.length
  );

  const [searchQuery, setSearchQuery] = React.useState('');
    
  // Filter countries based on the search query
  const filteredOptions = table.getAllColumns().filter(option =>
    typeof option.columnDef.header === 'string' &&
    option.columnDef.header.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Filter input */}
      <div className="mb-4">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="p-2 border rounded"
        />
      </div>

      {/* Column visibility controls */}
      <div className="mb-4">
        <label className="mr-2">Show Columns:</label>
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 border rounded-lg cursor-pointer">
            <span>Select columns</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2 bg-white sticky top-0 z-10">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Scrollable options */}
            <div className="max-h-[200px] overflow-y-auto">
              {filteredOptions.map((option) => (
                <label key={option.id} className="mr-2">
                  <input
                    type="checkbox"
                    checked={option.getIsVisible()}
                    onChange={() => option.toggleVisibility()}
                    className="mr-1"
                  />
                  {option.columnDef.header as string}
                </label>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-500 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 text-left cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()} // Enable column sorting
                  >
                    {typeof header.column.columnDef.header === 'function'
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
                    {/* Sorting indicator */}
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
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>

        {/* Current page range and total items */}
        <span className="text-sm">
          {startIndex}-{endIndex} of {dummyData.length}
        </span>

        {/* Page size selector */}
        <select
          value={pagination.pageSize}
          onChange={(e) => {
            setPagination({ ...pagination, pageSize: Number(e.target.value) });
          }}
          className="p-2 border rounded"
        >
          {[5, 7, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>

        {/* Total number of pages */}
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>
    </div>
  );
};

export default ContactTable;















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