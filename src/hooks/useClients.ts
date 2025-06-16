import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { notify } from '@/components/utilities/helper';
import { ClientService } from '@/services/client.service';
import { useClientStore } from '@/stores/clients.store';
import {
  ClientResponseType,
  CreateClientUserRequest,
  UpdateClientRequestType,
} from '@/types/client';

import useGetLocalStorage from './useGetLocalStorage';

export function useClients() {
    const {
        setClients,
        // setSelectedClient,
        // setIsLoading,
        // setError,
        addClient,
        updateClient
    } = useClientStore();

    const { getLocalStorage } = useGetLocalStorage();
    // Get user role from localStorage
    // const userRole = getLocalStorage("user")?.role;
    // const enterpriseId = getLocalStorage("user")?.enterprise?.id;

    // Fetch all clients
    const { data, error, isLoading, mutate } = useSWR<ClientResponseType[]>(
        'clients',
        async () => {
            const service = ClientService.getInstance();
            // const response = await service.getClients();
            const response = await service.getClientsEnterprise(getLocalStorage("user")?.enterprise?.id);
            console.log('Fetched clients:', response);
            setClients(response);
            return response;
        }
        // async () => {
        //     const service = ClientService.getInstance();
        //     let response: ClientResponseType[];

        //     if (userRole === 'ADMIN') {
        //         response = await service.getClients();
        //     } else {
        //         if (!enterpriseId) {
        //             throw new Error('Enterprise ID not found');
        //         }
        //         response = await service.getClientsEnterprise(enterpriseId);
        //     }

        //     console.log('Fetched clients:', response);
        //     setClients(response);
        //     return response;
        // }
    );

    // Create client mutation
    const { trigger: createClientTrigger, isMutating: isCreating } = useSWRMutation(
        `/api/v1/enterprise/adduser-enterprise/${getLocalStorage("user")?.enterprise?.id}`,
        async (url, { arg }: { arg: CreateClientUserRequest }) => {
            const service = ClientService.getInstance();
            return service.createClientUser(getLocalStorage("user")?.enterprise?.id, arg);
        },
        {
            onSuccess: (data) => {
                notify.success('Client created successfully');
                addClient(data);
                mutate();
            },
            onError: (error: unknown) => {
                const err = error as { response?: { data?: { message?: string } } };
                notify.error(err?.response?.data?.message || 'Failed to create client');
            }
        }
    );

    // Update client mutation
    const { trigger: updateClientTrigger, isMutating: isUpdating } = useSWRMutation(
        '/api/v1/auth/update-user',
        async (url, { arg }: { arg: { id: string; data: UpdateClientRequestType } }) => {
            const service = ClientService.getInstance();
            return service.updateClient(arg.id, arg.data);
        },
        {
            onSuccess: (data) => {
                notify.success('Client updated successfully');
                updateClient(data);
                mutate();
            },
            onError: (error: unknown) => {
                const err = error as { response?: { data?: { message?: string } } };
                notify.error(err?.response?.data?.message || 'Failed to update client');
            }
        }
    );

    const createClient = async (data: CreateClientUserRequest) => {
        return createClientTrigger(data);
    };

    const updateClientFunc = async (id: string, data: UpdateClientRequestType) => {
        return updateClientTrigger({ id, data });
    };

    return {
        clients: data || [],
        error,
        isLoading: isLoading || isCreating || isUpdating,
        createClient,
        updateClientFunc,
        refetchClients: mutate
    };
}