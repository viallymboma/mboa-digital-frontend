"use client"
import React from 'react';

import { Row } from '@tanstack/react-table';

interface GenericSelectedTableRowProps<T> {
    row: Row<T>;
    onSelectionChange?: (item: T, selected: boolean) => void;
    isSelected?: boolean;
}

const GenericSelectedTableRow = <T extends Record<string, unknown>>({ 
    row, 
    onSelectionChange,
    isSelected
}: GenericSelectedTableRowProps<T>) => {
    const handleSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        row.getToggleSelectedHandler()(e);
        onSelectionChange?.(row.original, e.target.checked);
    };

    return (
        <input
            type="checkbox"
            checked={isSelected ?? row.getIsSelected()}
            onChange={handleSelectionChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
    );
}

export default GenericSelectedTableRow;