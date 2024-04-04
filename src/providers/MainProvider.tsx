"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren, useState } from "react"
import { Provider } from "react-redux"
import { Toaster } from "sonner"

import { store } from "@/store"

export function MainProvider({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client}>
			<Provider store={store}>
				{children}
				<Toaster
					closeButton
					duration={2000}
					position="bottom-right"
				/>
			</Provider>
		</QueryClientProvider>
	)
}
