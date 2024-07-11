'use client'

import { ReactNode, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface ReactQueryClientProvidersProps {
    children: ReactNode
}

export default function ReactQueryClientProviders({
    children,
}: ReactQueryClientProvidersProps) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
