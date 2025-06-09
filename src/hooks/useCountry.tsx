import useSWR from 'swr';

import { CountryService } from '@/services/country.service';
import { useCountryStore } from '@/stores/countries.store';
import { PaginatedCountryResponseType } from '@/types/country';

export function useCountries() {
    const { pagination, setCountries } = useCountryStore();
    const { pageNumber, pageSize } = pagination;

    const { data: dataPaginated, error: errorPaginated, isLoading: isLoadingPaginated } = useSWR<PaginatedCountryResponseType>(
        [`/api/v1/pays`, pageNumber, pageSize],
        async () => {
            const service = CountryService.getInstance();
            const response = await service.getCountriesPaginated(pageNumber, pageSize);
            setCountries(response);
            return response;
        }
    );

    const { data, error, isLoading, mutate } = useSWR<PaginatedCountryResponseType>(
        [`/api/v1/pays`],
        async () => {
            const service = CountryService.getInstance();
            const response = await service.getCountriesPaginated();
            // console.log('Countries fetched initially:', response);
            setCountries(response);
            return response;
        }
    );

    const refetchCountriesInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    // console.log('Countries fetched:', data);

    return {
        countries: data?.content || [], 
        countriesPaginated: dataPaginated?.content || [], 
        errorPaginated, 
        isLoadingPaginated, 
        pagination: {
            currentPage: dataPaginated?.number || 0,
            totalPages: dataPaginated?.totalPages || 0,
            totalElements: dataPaginated?.totalElements || 0
        },
        isLoading,
        error,
        mutate,
        refetchCountriesInStore,
    };
}