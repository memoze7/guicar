'use client'

import { type ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Provider ({ children }: { children: ReactNode }) {
  const [reactClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={reactClient}>
      <ReactQueryDevtools initialIsOpen={false}/>

        {children}

    </QueryClientProvider>
  )
}
