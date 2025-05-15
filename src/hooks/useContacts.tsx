import useSWR from 'swr';

import { ContactService } from '@/services/contact.serivce';
import { useContactStore } from '@/stores/contacts.store';
import { PaginatedEnterpriseContactsResponseType } from '@/types/contact';

// import { useUser } from './useAuth.hook';
import useGetLocalStorage from './useGetLocalStorage';

export function useContacts() {

    const { getLocalStorage } = useGetLocalStorage();
    const setContacts = useContactStore((state) => state.setContacts);

    console.log('useContacts localStorage:', getLocalStorage("user")?.enterprise?.id);
    
    const { data, error, isLoading, mutate } = useSWR<PaginatedEnterpriseContactsResponseType>(
        'contacts',
        async () => {
            const service = ContactService.getInstance();
            const contacts = await service.getContactsByCompanyPaginated(getLocalStorage("user")?.enterprise?.id);
            setContacts(contacts?.content);
            return contacts;
        }
    );

    const refetchEnterpriseContactsInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        contacts: data,
        isLoading,
        error,
        mutate, 
        refetchEnterpriseContactsInStore,
    };
}