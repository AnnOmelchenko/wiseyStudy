import { PropsWithChildren } from 'react'

import { ApiProvider } from './ApiProvider'
import { useToken } from '../../api/token/queries/useToken'
import { Loader } from '../../ui-base/loader/Loader'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: accessToken, isLoading } = useToken()

  if (isLoading) {
    return <Loader />
  }
  
  return <ApiProvider accessToken={accessToken.token as string}>{children}</ApiProvider>
}
