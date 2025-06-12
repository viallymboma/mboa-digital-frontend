"use client";
import React from 'react';

import GenericSelectAllCheckbox
  from '@/app/_components/tables/GenericSelectAllCheckbox';
import GenericSelectedTableRow
  from '@/app/_components/tables/GenericSelectedTableRow';
import { useClientStore } from '@/stores/clients.store';
import {
  ClientResponseType,
  TransformedClientType,
} from '@/types/client';
import {
  Row,
  Table,
} from '@tanstack/react-table';

type TableHeaderClientSelectAllProps = {
    table: Table<TransformedClientType>;
};

export const TableHeaderClientSelectAll: React.FC<TableHeaderClientSelectAllProps> = ({ table }) => {
    const { toggleAllClients, clients, selectedClientsData } = useClientStore();
            
    return (
        <GenericSelectAllCheckbox<TransformedClientType>
            table={table}
            onSelectAll={(selectedItems: TransformedClientType[]) => toggleAllClients(selectedItems as ClientResponseType[])}
            isAllSelected={selectedClientsData?.length === clients.length}
        />
    );
};

type TableHeaderClientProps = {
    row: Row<TransformedClientType>;
};

export const TableHeaderClientSelectRow: React.FC<TableHeaderClientProps> = ({ row }) => {
    const { addSelectedClient, removeSelectedClient, selectedClientsData } = useClientStore();
            
    return (
        <GenericSelectedTableRow<TransformedClientType>
            row={row}
            onSelectionChange={(item, selected) => {
                if (selected) {
                    addSelectedClient({
                        ...item,
                        statusCode: 200, // or appropriate default
                        error: null,     // or appropriate default
                        message: '',     // or appropriate default
                        updatedAt: '',   // or appropriate default
                        version: 1       // or appropriate default
                    });
                } else {
                    removeSelectedClient(item.id);
                }
            }}
            isSelected={selectedClientsData?.some(client => client.id === row.original.id)}
        />
    );
};











// "use client";
// import GenericSelectAllCheckbox from '@/app/_components/tables/GenericSelectAllCheckbox';
// import React from 'react'
// import { TransformedClientType } from '../ClientTableElements';
// import { useClientStore } from '@/stores/clients.store';
// import GenericSelectedTableRow from '@/app/_components/tables/GenericSelectedTableRow';

// type TableHeaderClientSelectAllProps = {
//     // Define any props if needed
//     table: TransformedClientType, 
//     items: TransformedClientType[]
// };

// export const TableHeaderClientSelectAll: React.FC<TableHeaderClientSelectAllProps> = ({ table }) => {
//     const { toggleAllClients, clients, selectedClientsData } = useClientStore();
            
//     return (
//         <GenericSelectAllCheckbox<TransformedClientType>
//             table={table}
//             onSelectAll={(items) => toggleAllClients(items)}
//             isAllSelected={selectedClientsData?.length === clients.length}
//         />
//     );
// }

// type TableHeaderClientProps = {
//     // Define any props if needed
//     row: TransformedClientType, 
//     items: TransformedClientType[]
// };


// export const TableHeaderClientSelectRow: React.FC<TableHeaderClientProps> = ({ row }) => {
//     const { addSelectedClient, removeSelectedClient, selectedClientsData } = useClientStore();
            
//     return (
//         <GenericSelectedTableRow<TransformedClientType>
//             row={row}
//             onSelectionChange={(item, selected) => {
//                 if (selected) {
//                     addSelectedClient(item);
//                 } else {
//                     removeSelectedClient(item.id);
//                 }
//             }}
//             isSelected={selectedClientsData?.some(client => client.id === row.original.id)}
//         />
//     );
// }
