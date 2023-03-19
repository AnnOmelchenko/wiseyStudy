import { PropsWithChildren } from 'react'

import { Header } from './header/Header'

export const Layout = ({ children }: PropsWithChildren<{}>) => (
  <>
    <Header />
    {children}
  </>
)
