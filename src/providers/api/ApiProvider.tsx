import { PropsWithChildren, useState } from 'react'

import { apiInstances } from '../../api'

interface Props {
  accessToken: string
}

export const ApiProvider = ({ children, accessToken }: PropsWithChildren<Props>) => {
  useState(() =>
    apiInstances.forEach(instance => {
      instance.client.interceptors.request.use(
        config => {
          const token = accessToken

          if (token) {
            config!.headers!.Authorization = `Bearer ${token}`
          }

          return config
        },
        error => Promise.reject(error),
      )

      instance.client.interceptors.response.use(
        response => response,
        error => Promise.reject(error),
      )
    }),
  )

  return <>{children}</>
}
