"use client"
import React from 'react';

import { useContactStore } from '@/stores/contacts.store';
import { Row } from '@tanstack/react-table';

import { TransformedContactType } from '../ContactTableElements';

type SelectionCellType = {
    row: Row<TransformedContactType>;
}

const SelectedTableRow: React.FC<SelectionCellType> = ({ row }) => {
    const { addSelectedContact, removeSelectedContact, selectedContactsData } = useContactStore(); 
    const handleSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) addSelectedContact(row.original);
        else removeSelectedContact(row.original.id);
    };

    return (
        <input
            type="checkbox"
            checked={row.getIsSelected() || selectedContactsData?.find((ro: TransformedContactType) => ro.id === row.original.id ) ? true : false}
            onChange={(e) => {
                row.getToggleSelectedHandler()(e);
                handleSelectionChange(e);
            }}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
    );
}

export default SelectedTableRow