import { PropsWithChildren, useEffect } from 'react'
import { useLocation } from 'react-router'

export const ScrollToTop = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <>{children}</>
}
