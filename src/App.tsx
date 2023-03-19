import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './layout/Layout'
import { AuthProvider } from './providers/api/AuthProvider'
import { ScrollToTop } from './providers/scrollRestoration/ScrollToTop'
import { routes, RoutesManager } from './routesManager'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 20,
    },
  },
})

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <ScrollToTop>
            <Routes>
              <Route path="*" element={<Navigate to={RoutesManager.home.root.getURL()} replace />} />
              {routes.map(({ component, path }) => (
                <Route path={path} element={component} key={path} />
              ))}
            </Routes>
          </ScrollToTop>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
)
