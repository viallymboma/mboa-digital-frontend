import React from 'react';

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

export const useTable = <TData,>({data, columns, defaultPageSize = 7, }: {
    data: TData[];
    columns: ColumnDef<TData>[];
    defaultPageSize?: number;
}) => {
    // Pagination state
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: defaultPageSize,
    });

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
        data,
        columns,
        state: {
            pagination,
            globalFilter,
            sorting,
            columnVisibility,
            rowSelection,
        },
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: false,
    });

    return {
        table,
        globalFilter,
        setGlobalFilter,
        startIndex: pagination.pageIndex * pagination.pageSize + 1,
        endIndex: Math.min(
            (pagination.pageIndex + 1) * pagination.pageSize,
            data.length
        ),
    };
};