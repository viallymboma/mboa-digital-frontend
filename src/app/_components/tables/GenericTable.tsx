import React from 'react';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

import { SearchInputV2 } from '@/app/_components/form/SearchInput';
import {
  FilterSvgIcon,
  SearchSvgIcon,
  TitleListSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useTable } from '@/hooks/useTable';
import { ColumnDef } from '@tanstack/react-table';

interface GenericTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  title: string;
  description?: string;
  defaultPageSize?: number;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  onReorder?: (reorderedData: TData[]) => void;
}

const GenericTable = <TData extends { id?: string }>({
  data,
  columns,
  title,
  description,
  defaultPageSize = 7,
  onEdit,
  onDelete,
  onReorder,
}: GenericTableProps<TData>) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [localData, setLocalData] = React.useState(data);

  console.log(onEdit, onDelete)

  const { table, setGlobalFilter, startIndex, endIndex } = useTable({ data: localData, columns, defaultPageSize });

  // Handle drag-and-drop reordering
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return; // Dropped outside the list

    const items = Array.from(localData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLocalData(items); // Update local data
    onReorder?.(items); // Notify parent component of reorder
  };

  // Sync localData with parent data
  React.useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Filter columns based on the search query
  const filteredOptions = table.getAllColumns().filter(option =>
    typeof option.columnDef.header === 'string' &&
    option.columnDef.header.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col gap-4 border-primaryAppearance border rounded-[12px]">
      {/* Filter input */}
      <div className="flex flex-row items-center justify-between">
        <div className='flex flex-row gap-4 items-center'>
          <Button className='h-fit bg-transparent p-4'>
            <TitleListSvgIcon />
          </Button>
          <div>
            <h1 className='text-[20px] font-bold'>{title}</h1>
            <p className='text-[14px]'>{description}</p>
          </div>
        </div>
        <div className='flex flex-row gap-4'>
          <SearchInputV2
            className='w-fit h-[50px]'
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={t('register.searchLang')}
            leftIcon={<SearchSvgIcon />}
          />
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

      {/* Table */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="table-body">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="rounded-lg border overflow-hidden"
            >
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
                  {table.getRowModel().rows.map((row, index) => (
                    <Draggable key={row.original.id || `draggable-${index}`} draggableId={row.original.id || `draggable-${index}`} index={index}>
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="hover:bg-gray-100"
                        >
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {/* Page size selector */}
        <div className='flex flex-row items-center gap-2'>
          <h1 className='text-[14px]'>Lignes par pages :</h1>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
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
          {startIndex}-{endIndex} of {localData.length}
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

export default GenericTable;




















// import React from 'react';

// import {
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import {
//   DragDropContext,
//   Draggable,
//   Droppable,
//   DropResult,
// } from 'react-beautiful-dnd';
// import { useTranslation } from 'react-i18next';

// import { ContactType } from '@/app/(dashboard)/contacts/_component/dummyData';
// import { SearchInputV2 } from '@/app/_components/form/SearchInput';
// import {
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
// import { useTable } from '@/hooks/useTable';
// import { ColumnDef } from '@tanstack/react-table';

// interface GenericTableProps<TData extends ContactType> {
//   data: TData[];
//   columns: ColumnDef<TData>[];
//   title: string;
//   description?: string;
//   defaultPageSize?: number;
//   onEdit?: (row: TData) => void;
//   onDelete?: (row: TData) => void;
//   onReorder?: (reorderedData: TData[]) => void;
// }

// const GenericTable = <TData extends ContactType>({
//   data,
//   columns,
//   title,
//   description,
//   defaultPageSize = 7,
//   onEdit,
//   onDelete,
//   onReorder,
// }: GenericTableProps<TData>) => {
//   const { t } = useTranslation();
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const [localData, setLocalData] = React.useState(data);

//   console.log(onEdit, onDelete);

//   const { table, setGlobalFilter, startIndex, endIndex } = useTable({ data: localData, columns, defaultPageSize });

//   // Handle drag-and-drop reordering
//   const handleDragEnd = (result: DropResult) => {
//     if (!result.destination) return; // Dropped outside the list

//     const items = Array.from(localData);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setLocalData(items); // Update local data
//     onReorder?.(items); // Notify parent component of reorder
//   };

//   // Sync localData with parent data
//   React.useEffect(() => {
//     setLocalData(data);
//   }, [data]);

//   // Filter columns based on the search query
//   const filteredOptions = table.getAllColumns().filter(option =>
//     typeof option.columnDef.header === 'string' &&
//     option.columnDef.header.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-4 flex flex-col gap-4 border-primaryAppearance border rounded-[12px]">
//       {/* Filter input */}
//       <div className="flex flex-row items-center justify-between">
//         <div className='flex flex-row gap-4 items-center'>
//           <Button className='h-fit bg-transparent p-4'>
//             <TitleListSvgIcon />
//           </Button>
//           <div>
//             <h1 className='text-[20px] font-bold'>{title}</h1>
//             <p className='text-[14px]'>{description}</p>
//           </div>
//         </div>
//         <div className='flex flex-row gap-4'>
//           <SearchInputV2
//             className='w-fit h-[50px]'
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             placeholder={t('register.searchLang')}
//             leftIcon={<SearchSvgIcon />}
//           />
//           <Button className='bg-black p-4 h-fit'>
//             <FilterSvgIcon />
//           </Button>
//         </div>
//       </div>

//       <Separator />

//       {/* Column visibility controls */}
//       <div className="w-full flex flex-row items-center justify-end">
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

//       {/* Table */}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="table-body">
//           {(provided) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="rounded-lg border overflow-hidden"
//             >
//               <table className="w-full">
//                 <thead className="bg-primaryAppearanceLight text-white">
//                   {table.getHeaderGroups().map((headerGroup) => (
//                     <tr key={headerGroup.id}>
//                       {headerGroup.headers.map((header) => (
//                         <th
//                           key={header.id}
//                           className="p-2 text-left cursor-pointer"
//                           onClick={header.column.getToggleSortingHandler()}
//                         >
//                           {typeof header.column.columnDef.header === 'function'
//                             ? header.column.columnDef.header(header.getContext())
//                             : header.column.columnDef.header}
//                           {{
//                             asc: ' 🔼',
//                             desc: ' 🔽',
//                           }[header.column.getIsSorted() as string] ?? null}
//                         </th>
//                       ))}
//                     </tr>
//                   ))}
//                 </thead>
//                 <tbody>
//                   {table.getRowModel().rows.map((row, index) => (
//                     <Draggable key={row.original.id || `draggable-${index}`} draggableId={row.original.id || `draggable-${index}`} index={index}>
//                       {(provided) => (
//                         <tr
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="hover:bg-gray-100"
//                         >
//                           {row.getVisibleCells().map((cell) => (
//                             <td key={cell.id} className="p-2 border-t">
//                               {cell.column.columnDef.cell
//                                 ? typeof cell.column.columnDef.cell === 'function'
//                                   ? cell.column.columnDef.cell(cell.getContext())
//                                   : cell.getValue()
//                                 : cell.getValue()}
//                             </td>
//                           ))}
//                         </tr>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {/* Pagination controls */}
//       <div className="flex items-center justify-center gap-4 mt-4">
//         {/* Page size selector */}
//         <div className='flex flex-row items-center gap-2'>
//           <h1 className='text-[14px]'>Lignes par pages :</h1>
//           <select
//             value={table.getState().pagination.pageSize}
//             onChange={(e) => {
//               table.setPageSize(Number(e.target.value));
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
//           {startIndex}-{endIndex} of {localData.length}
//         </span>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             <ChevronLeft />
//           </button>
//           <button
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             <ChevronRight />
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

// export default GenericTable;






















// import React from 'react';

// import {
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import {
//   DragDropContext,
//   Draggable,
//   Droppable,
//   DropResult,
// } from 'react-beautiful-dnd';
// import { useTranslation } from 'react-i18next';

// import { ContactType } from '@/app/(dashboard)/contacts/_component/dummyData';
// import { SearchInputV2 } from '@/app/_components/form/SearchInput';
// import {
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
// import { useTable } from '@/hooks/useTable';
// import { ColumnDef } from '@tanstack/react-table';

// interface GenericTableProps<TData> {
//   data: TData[];
//   columns: ColumnDef<TData>[];
//   title: string;
//   description?: string;
//   defaultPageSize?: number;
//   onEdit?: (row: TData) => void;
//   onDelete?: (row: TData) => void;
//   onReorder?: (reorderedData: TData[]) => void; // Add onReorder prop
// }

// const GenericTable = <TData extends ContactType>({
//   data,
//   columns,
//   title,
//   description,
//   defaultPageSize = 7,
//   onEdit,
//   onDelete,
//   onReorder,
// }: GenericTableProps<TData>) => {
//   const { t } = useTranslation();
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const [localData, setLocalData] = React.useState(data); // Local state for reordering

//   const { table, setGlobalFilter, startIndex, endIndex } = useTable({ data: localData, columns, defaultPageSize });

//   console.log(onEdit, onDelete);

//   // Handle drag-and-drop reordering
//   const handleDragEnd = (result: DropResult) => {
//     if (!result.destination) return; // Dropped outside the list

//     const items = Array.from(localData);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setLocalData(items); // Update local data
//     onReorder?.(items); // Notify parent component of reorder
//   };

//   // Filter columns based on the search query
//   const filteredOptions = table.getAllColumns().filter(option =>
//     typeof option.columnDef.header === 'string' &&
//     option.columnDef.header.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-4 flex flex-col gap-4 border-primaryAppearance border rounded-[12px]">
//       {/* Filter input */}
//       <div className="flex flex-row items-center justify-between">
//         <div className='flex flex-row gap-4 items-center'>
//           <Button className='h-fit bg-transparent p-4'>
//             <TitleListSvgIcon />
//           </Button>
//           <div>
//             <h1 className='text-[20px] font-bold'>{title}</h1>
//             <p className='text-[14px]'>{description}</p>
//           </div>
//         </div>
//         <div className='flex flex-row gap-4'>
//           <SearchInputV2
//             className='w-fit h-[50px]'
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             placeholder={t('register.searchLang')}
//             leftIcon={<SearchSvgIcon />}
//           />
//           <Button className='bg-black p-4 h-fit'>
//             <FilterSvgIcon />
//           </Button>
//         </div>
//       </div>

//       <Separator />

//       {/* Column visibility controls */}
//       <div className="w-full flex flex-row items-center justify-end">
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

//       {/* Table */}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="table-body">
//           {(provided) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="rounded-lg border overflow-hidden"
//             >
//               <table className="w-full">
//                 <thead className="bg-primaryAppearanceLight text-white">
//                   {table.getHeaderGroups().map((headerGroup) => (
//                     <tr key={headerGroup.id}>
//                       {headerGroup.headers.map((header) => (
//                         <th
//                           key={header.id}
//                           className="p-2 text-left cursor-pointer"
//                           onClick={header.column.getToggleSortingHandler()}
//                         >
//                           {typeof header.column.columnDef.header === 'function'
//                             ? header.column.columnDef.header(header.getContext())
//                             : header.column.columnDef.header}
//                           {{
//                             asc: ' 🔼',
//                             desc: ' 🔽',
//                           }[header.column.getIsSorted() as string] ?? null}
//                         </th>
//                       ))}
//                     </tr>
//                   ))}
//                 </thead>
//                 <tbody>
//                   {table.getRowModel().rows.map((row, index) => (
//                     <Draggable key={row.original.id} draggableId={row.original.id || `draggable-${index}`} index={index}>
//                       {(provided) => (
//                         <tr
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="hover:bg-gray-100"
//                         >
//                           {row.getVisibleCells().map((cell) => (
//                             <td key={cell.id} className="p-2 border-t">
//                               {cell.column.columnDef.cell
//                                 ? typeof cell.column.columnDef.cell === 'function'
//                                   ? cell.column.columnDef.cell(cell.getContext())
//                                   : cell.getValue()
//                                 : cell.getValue()}
//                             </td>
//                           ))}
//                         </tr>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {/* Pagination controls */}
//       <div className="flex items-center justify-center gap-4 mt-4">
//         {/* Page size selector */}
//         <div className='flex flex-row items-center gap-2'>
//           <h1 className='text-[14px]'>Lignes par pages :</h1>
//           <select
//             value={table.getState().pagination.pageSize}
//             onChange={(e) => {
//               table.setPageSize(Number(e.target.value));
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
//           {startIndex}-{endIndex} of {localData.length}
//         </span>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             <ChevronLeft />
//           </button>
//           <button
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             <ChevronRight />
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

// export default GenericTable;











// import React from 'react';

// import {
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// import { SearchInputV2 } from '@/app/_components/form/SearchInput';
// import {
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
// import { useTable } from '@/hooks/useTable';
// import { ColumnDef } from '@tanstack/react-table';

// // import { useTable } from './useTable'; // Import the custom hook

// interface GenericTableProps<TData> {
//   data: TData[];
//   columns: ColumnDef<TData>[];
//   title: string;
//   description?: string;
//   defaultPageSize?: number;
//   onEdit?: (row: TData) => void;
//   onDelete?: (row: TData) => void;
// }

// const GenericTable = <TData,>({
//   data,
//   columns,
//   title,
//   description,
//   defaultPageSize = 7,
//   onEdit,
//   onDelete,
// }: GenericTableProps<TData>) => {
//     const { t } = useTranslation();
//     const [searchQuery, setSearchQuery] = React.useState('');

//     console.log(onEdit, onDelete)

//     const { table, setGlobalFilter, startIndex, endIndex, } = useTable({ data, columns, defaultPageSize, });

//     // Filter columns based on the search query
//     const filteredOptions = table.getAllColumns().filter(option =>
//         typeof option.columnDef.header === 'string' &&
//         option.columnDef.header.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className="p-4 flex flex-col gap-4 border-primaryAppearance border rounded-[12px]">
//             {/* Filter input */}
//             <div className="flex flex-row items-center justify-between">
//                 <div className='flex flex-row gap-4 items-center'>
//                     <Button className='h-fit bg-transparent p-4'>
//                         <TitleListSvgIcon />
//                     </Button>
//                     <div>
//                         <h1 className='text-[20px] font-bold'>{title}</h1>
//                         <p className='text-[14px]'>{description}</p>
//                     </div>
//                 </div>
//                 <div className='flex flex-row gap-4'>
//                     <SearchInputV2
//                         className='w-fit h-[50px]'
//                         onChange={(e) => setGlobalFilter(e.target.value)}
//                         placeholder={t('register.searchLang')}
//                         leftIcon={<SearchSvgIcon />}
//                     />
//                     <Button className='bg-black p-4 h-fit'>
//                         <FilterSvgIcon />
//                     </Button>
//                 </div>
//             </div>

//             <Separator />

//             {/* Column visibility controls */}
//             <div className="w-full flex flex-row items-center justify-end">
//                 <DropdownMenu>
//                     <DropdownMenuTrigger className="p-2 border rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
//                         <span>Colomnes du tableau</span>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent className="w-64 p-3 bg-white shadow-md rounded-lg">
//                         <DropdownMenuLabel className="text-lg font-semibold text-gray-800">Select Columns</DropdownMenuLabel>
//                         <DropdownMenuSeparator className="my-2" />

//                         {/* Search Input */}
//                         <div className="p-2 bg-white sticky top-0 z-10">
//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Scrollable Checkbox List */}
//                         <div className="max-h-[200px] overflow-y-auto p-2">
//                             {filteredOptions.map((option) => (
//                                 <label key={option.id} className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer">
//                                     <input
//                                         type="checkbox"
//                                         checked={option.getIsVisible()}
//                                         onChange={() => option.toggleVisibility()}
//                                         className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                                     />
//                                     <span className="text-gray-800">{option.columnDef.header as string}</span>
//                                 </label>
//                             ))}
//                         </div>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div>

//             {/* Table */}
//             <div className="rounded-lg border overflow-hidden">
//                 <table className="w-full">
//                     <thead className="bg-primaryAppearanceLight text-white">
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <tr key={headerGroup.id}>
//                                 {headerGroup.headers.map((header) => (
//                                 <th
//                                     key={header.id}
//                                     className="p-2 text-left cursor-pointer"
//                                     onClick={header.column.getToggleSortingHandler()}
//                                 >
//                                     {typeof header.column.columnDef.header === 'function'
//                                     ? header.column.columnDef.header(header.getContext())
//                                     : header.column.columnDef.header}
//                                     {{
//                                     asc: ' 🔼',
//                                     desc: ' 🔽',
//                                     }[header.column.getIsSorted() as string] ?? null}
//                                 </th>
//                                 ))}
//                             </tr>
//                         ))}
//                     </thead>
//                     <tbody>
//                         {table.getRowModel().rows.map((row) => (
//                             <tr key={row.id} className="hover:bg-gray-100">
//                                 {row.getVisibleCells().map((cell) => (
//                                 <td key={cell.id} className="p-2 border-t">
//                                     {cell.column.columnDef.cell
//                                     ? typeof cell.column.columnDef.cell === 'function'
//                                         ? cell.column.columnDef.cell(cell.getContext())
//                                         : cell.getValue()
//                                     : cell.getValue()}
//                                 </td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination controls */}
//             <div className="flex items-center justify-center gap-4 mt-4">
//                 {/* Page size selector */}
//                 <div className='flex flex-row items-center gap-2'>
//                     <h1 className='text-[14px]'>Lignes par pages :</h1>
//                     <select
//                         value={table.getState().pagination.pageSize}
//                         onChange={(e) => {
//                         table.setPageSize(Number(e.target.value));
//                         }}
//                         className="p-2 text-[12px] border bg-white rounded"
//                     >
//                         {[5, 7, 10, 20].map((size) => (
//                         <option key={size} value={size}>
//                             Show {size}
//                         </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Current page range and total items */}
//                 <span className="text-sm">
//                     {startIndex}-{endIndex} of {data.length}
//                 </span>

//                 <div className="flex items-center gap-2">
//                     <button
//                         onClick={() => table.previousPage()}
//                         disabled={!table.getCanPreviousPage()}
//                     >
//                         <ChevronLeft />
//                     </button>
//                     <button
//                         onClick={() => table.nextPage()}
//                         disabled={!table.getCanNextPage()}
//                     >
//                         <ChevronRight />
//                     </button>
//                 </div>

//                 {/* Total number of pages */}
//                 <span className="text-sm">
//                     Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default GenericTable;