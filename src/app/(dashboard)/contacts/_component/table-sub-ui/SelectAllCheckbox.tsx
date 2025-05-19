import React from 'react';

import { useContactStore } from '@/stores/contacts.store';
import { Table } from '@tanstack/react-table';

import { TransformedContactType } from '../ContactTableElements';

interface SelectAllCheckboxProps {
    table: Table<TransformedContactType>;
}

const SelectAllCheckbox: React.FC<SelectAllCheckboxProps> = ({ table }) => {
    const { toggleAllContacts, contacts, selectedContactsData } = useContactStore();

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Handle table selection
        table.getToggleAllRowsSelectedHandler()(e);
        
        // Get all visible rows after filtering/sorting
        const allVisibleRows = table.getFilteredRowModel().rows.map(row => row.original);
        
        // Update store
        toggleAllContacts(allVisibleRows);
    };

    return (
        <input
            type="checkbox"
            checked={table.getIsAllRowsSelected() || selectedContactsData?.length === contacts.length ? true : false }
            onChange={handleSelectAll}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
    );
};

export default SelectAllCheckbox;