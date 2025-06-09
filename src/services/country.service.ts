import {
  CountryType,
  PaginatedCountryResponseType,
} from '@/types/country';

import { ApiService } from './data.service';

export class CountryService {
    private static instance: CountryService;
    private apiService: ApiService;

    private constructor() {
        this.apiService = ApiService.getInstance();
    }

    public static getInstance(): CountryService {
        if (!CountryService.instance) {
            CountryService.instance = new CountryService();
        }
        return CountryService.instance;
    }

    async getCountriesPaginated(pageNumber: number = 0, pageSize: number = 200): Promise<PaginatedCountryResponseType> {
        console.log('Fetching countries with pagination:', { pageNumber, pageSize });
        return this.apiService.get<PaginatedCountryResponseType>(
            `/api/v1/pays?page=${pageNumber}&size=${pageSize}`
        );
    }

    async getCountries(): Promise<CountryType[]> {
        return this.apiService.get<CountryType[]>(
            `api/v1/pays`
        );
    }

    async getCountryByCode(code: string): Promise<CountryType> {
        return this.apiService.get<CountryType>(`/api/v1/pays/${code}`);
    }
}