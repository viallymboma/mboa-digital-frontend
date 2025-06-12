import React from 'react';

import { Table } from '@tanstack/react-table';

interface GenericSelectAllCheckboxProps<T> {
    table: Table<T>;
    onSelectAll?: (selectedItems: T[]) => void;
    isAllSelected?: boolean;
}

const GenericSelectAllCheckbox = <T extends Record<string, unknown>>({ 
    table, 
    onSelectAll,
    isAllSelected
}: GenericSelectAllCheckboxProps<T>) => {
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Handle table selection
        table.getToggleAllRowsSelectedHandler()(e);
        
        // Get all visible rows after filtering/sorting
        const allVisibleRows = table.getFilteredRowModel().rows.map(row => row.original);
        
        // Call the callback if provided
        onSelectAll?.(allVisibleRows);
    };

    return (
        <input
            type="checkbox"
            checked={isAllSelected ?? table.getIsAllRowsSelected()}
            onChange={handleSelectAll}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
    );
};

export default GenericSelectAllCheckbox;