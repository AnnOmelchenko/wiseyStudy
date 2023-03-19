import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useMemo } from 'react'

import { FetcherParameters, FetcherResponse, QueryFetcher } from './types'

export function createUseQuery<Fetcher extends QueryFetcher, SelectorData>({
  queryKey,
  fetcher,
  selector,
}: {
  queryKey: string
  fetcher: Fetcher
  selector: (response?: FetcherResponse<Fetcher>) => SelectorData
}) {
  return function useCustomQuery(
    options: { params?: FetcherParameters<Fetcher> } & Omit<
      UseQueryOptions<
        FetcherResponse<Fetcher>,
        unknown,
        FetcherResponse<Fetcher>,
        [string, FetcherParameters<Fetcher>]
      >,
      'queryKey' | 'queryFn' | 'queryHash' | 'queryKeyHashFn' | 'select'
    > = {},
  ) {
    const { params = {}, ...queryOptions } = options
    const { data, isLoading, ...rest } = useQuery(
      [queryKey, params],
      ({ signal }) => fetcher(params)(signal),
      queryOptions,
    )

    return {
      ...rest,
      data: useMemo(() => selector(data), [data]),
      response: data,
      isLoading: options.enabled ? isLoading : rest.isFetching,
    }
  }
}
