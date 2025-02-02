import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"

import { MainProvider } from "@/providers/MainProvider"

import "@/assets/styles/globals.scss"

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"]
})

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app"
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={jetbrainsMono.className}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
