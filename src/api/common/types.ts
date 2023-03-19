export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T

export type CancelableRequest<T> = (signal?: AbortSignal) => Promise<T>
export type QueryFetcher<TParams extends Record<string, any> = any> = (params: TParams) => CancelableRequest<any>

export type FetcherParameters<Fetcher extends QueryFetcher> = Parameters<Fetcher>[0]
export type FetcherResponse<Fetcher extends QueryFetcher> = Unpacked<ReturnType<ReturnType<Fetcher>>>
