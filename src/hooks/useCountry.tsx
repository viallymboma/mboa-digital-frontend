import useSWR from 'swr';

import { CountryService } from '@/services/country.service';
import { useCountryStore } from '@/stores/countries.store';
import { PaginatedCountryResponseType } from '@/types/country';

export function useCountries() {
    const { pagination, setCountries } = useCountryStore();
    const { pageNumber, pageSize } = pagination;

    const { data, error, isLoading, mutate } = useSWR<PaginatedCountryResponseType>(
        [`countries`, pageNumber, pageSize],
        async () => {
            const service = CountryService.getInstance();
            const response = await service.getCountries(pageNumber, pageSize);
            setCountries(response);
            return response;
        }
    );

    const refetchCountriesInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        countries: data?.content || [],
        pagination: {
            currentPage: data?.number || 0,
            totalPages: data?.totalPages || 0,
            totalElements: data?.totalElements || 0
        },
        isLoading,
        error,
        mutate,
        refetchCountriesInStore,
    };
}