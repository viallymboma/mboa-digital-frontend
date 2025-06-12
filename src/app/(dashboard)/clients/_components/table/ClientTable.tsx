"use client";
import React from 'react';

import GenericTable from '@/app/_components/tables/GenericTable';
import { TransformedClientType } from '@/types/client';

import { clientColumns } from './ClientTableElements';
import { ClientTableModuleProps } from './ClientTableModule';

const ClientTable: React.FC<ClientTableModuleProps> = ({ clients }) => {
    const transformedData = React.useMemo(() => 
        clients?.map((client) => ({
            id: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            phoneNumber: client.phoneNumber,
            country: client.country,
            city: client.city,
            enterpriseId: client.enterpriseId,
            createdAt: client.createdAt,
            role: client.role,
            status: client.archived ? 'Inactive' : 'Active',
            archived: client.archived,
            gender: client.gender
        })), [clients]
    );

    const [data, setData] = React.useState(transformedData || []);

    React.useEffect(() => {
        setData(transformedData || []);
    }, [transformedData]);

    const handleReorder = (reorderedData: typeof data) => {
        setData(reorderedData);
    };

    return (
        <GenericTable
            data={data}
            columns={clientColumns as TransformedClientType []}
            title="Liste des Utilisateurs"
            description="Liste de tous les utilisateurs disponibles"
            defaultPageSize={7}
            onReorder={handleReorder}
        />
    );
};

export default ClientTable;