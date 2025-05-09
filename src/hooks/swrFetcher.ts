import { ApiService } from '@/services/data.service';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface FetcherConfig<D = unknown> {
    method?: HttpMethod;
    params?: Record<string, unknown>;
    data?: D;
}

export const swrFetcher = <T, D = unknown>(
    url: string,
    config: FetcherConfig<D> = {}
) => {
    const apiService = ApiService.getInstance();
    const { method = 'GET', params, data } = config;

    switch (method) {
        case 'GET':
            return apiService.get<T>(url, params);
        case 'POST':
            return apiService.post<T, D>(url, data);
        case 'PUT':
            return apiService.put<T, D>(url, data);
        case 'DELETE':
            return apiService.delete<T>(url);
        default:
            return apiService.get<T>(url, params);
    }
};