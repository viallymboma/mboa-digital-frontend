"use client";
import React from 'react';

import {
  Archive,
  Edit,
  MoreVertical,
  Trash,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TransformedClientType } from '@/types/client';

// import { TransformedClientType } from './ClientTableElements';

// import { useClients } from '@/hooks/useClients';

type ClientActionUIProps = {
    rowData: TransformedClientType;
};

const ClientActionUI: React.FC<ClientActionUIProps> = ({ rowData }) => {
    // const { updateClient } = useClients();

    // const handleArchive = async () => {
    //     try {
    //         await updateClient(rowData.id, {
    //             ...rowData,
    //             archived: !rowData.archived
    //         });
    //     } catch (error) {
    //         console.error('Failed to archive client:', error);
    //     }
    // };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={
                        () => {
                            // Uncomment the line below to enable archiving functionality
                            // handleArchive();
                        }
                        // handleArchive
                    }
                >
                    <Archive className="mr-2 h-4 w-4" />
                    {rowData.archived ? 'Unarchive' : 'Archive'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                    className="cursor-pointer text-red-600"
                >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ClientActionUI;