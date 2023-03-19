import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

import { CancelableRequest } from './types'

export class ApiInstance {
  client: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    const client = axios.create(config)

    this.client = client
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): CancelableRequest<R> {
    return (signal?: AbortSignal) =>
      this.client.get(url, {
        ...config,
        signal,
      })
  }
}

export const createApi = (config?: AxiosRequestConfig) => new ApiInstance(config)
