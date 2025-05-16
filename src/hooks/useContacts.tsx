import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { ContactService } from '@/services/contact.serivce';
import { ApiService } from '@/services/data.service';
import { useContactStore } from '@/stores/contacts.store';
import {
  CreateContactRequestType,
  EnterpriseContactResponseType,
  PaginatedEnterpriseContactsResponseType,
} from '@/types/contact';

// import { useUser } from './useAuth.hook';
import useGetLocalStorage from './useGetLocalStorage';

async function loginFetcher(url: string, { arg }: { arg: CreateContactRequestType }) {
    const apiService = ApiService.getInstance();
    return apiService.post<PaginatedEnterpriseContactsResponseType, CreateContactRequestType>(url, arg);
}

export function useContacts() {

    const { getLocalStorage } = useGetLocalStorage();
    const { setContacts, addContact } = useContactStore();
    // const setContacts = useContactStore((state) => state.setContacts);

    // console.log('useContacts localStorage:', getLocalStorage("user")?.enterprise?.id);
    
    const { data, error, isLoading, mutate } = useSWR<EnterpriseContactResponseType[]>(
        'contacts',
        async () => {
            const service = ContactService.getInstance();
            const contacts = await service.getContactsByCompanyPaginated(getLocalStorage("user")?.enterprise?.id);
            console.log('Fetched contacts:', contacts);
            setContacts(contacts);
            return contacts;
        }
    );

    console.log('useContacts data:', data);

    const { trigger, isMutating, error: createContactError } = useSWRMutation(
        '/api/v1/contact',
        loginFetcher,
        {
            onSuccess: (data: PaginatedEnterpriseContactsResponseType) => {
                // Add the new contact to the Zustand store
                if (data.content?.[0]) {
                    addContact(data.content[0]);
                }
                
                // Update localStorage if needed
                const user = getLocalStorage("user");
                if (user) {
                    localStorage.setItem('user', JSON.stringify({
                        ...user,
                        enterprise: data.content[0].enterprise
                    }));
                }
            },
        }
    );

    const createContact = async (data: CreateContactRequestType) => {
        try {
            await trigger(data);
        } catch (err) {
            console.error('Login failed:', err);
            throw err;
        }
    };

    const refetchEnterpriseContactsInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        contacts: data,
        isLoading,
        error, 
        createContactError, 
        isMutating, 
        createContact,
        mutate, 
        refetchEnterpriseContactsInStore,
    };
}