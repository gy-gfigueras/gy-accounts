"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { ThemeProvider } from "./theme-provider"
import { UserProvider } from "@auth0/nextjs-auth0/client"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity, // La data nunca se considera obsoleta
        cacheTime: 1000 * 60 * 60 * 24, // Cache por 24 horas
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}
