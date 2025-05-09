import useSWR, {
  SWRConfiguration,
  SWRResponse,
} from 'swr';

import {
  FetcherConfig,
  swrFetcher,
} from './swrFetcher';

// import { swrFetcher, FetcherConfig } from './fetcher';

export function useRequest<T, D = unknown>(
    url: string | null,
    config: FetcherConfig<D> = {},
    swrConfig: SWRConfiguration = {}
): SWRResponse<T, Error> {
    return useSWR<T, Error>(
        url ? [url, config] : null,
        ([url, config]: [string, FetcherConfig<D>]) => swrFetcher<T, D>(url, config),
        {
            revalidateOnFocus: false,
            ...swrConfig,
        }
    );
}