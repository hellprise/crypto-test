"use client"

import { useQuery } from "@tanstack/react-query"
import { notFound } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

import st from "./Home.module.scss"
import { CoinService } from "@/services/coin/coin.service"
import { ShowPrice } from "@/shared/components/coin/CoinPrice"
import { useActions } from "@/shared/hooks/useActions"
import { TCoinCode } from "@/shared/types/coin.types"

const REVALIDATE_TIME = 30000 // 30 seconds

export function HomeScreen() {
	const { data, isError, isSuccess, isFetching } = useQuery({
		queryKey: ["getCurrentPrice"],
		queryFn: () => CoinService.getCurrentPrice(),
		refetchInterval: REVALIDATE_TIME
	})

	const { setCoin } = useActions()

	useEffect(() => {
		let toastId: string | number = ""

		if (isSuccess) {
			setCoin(data.bpi)

			toastId = toast.success("Data successfully received", {
				id: toastId
			})
		}

		return () => {
			toast.dismiss(toastId)
		}
	}, [isSuccess, isFetching])

	useEffect(() => {
		let toastId: string | number = ""

		if (isError)
			toastId = toast.error("Error", {
				id: toastId
			})

		return () => {
			toast.dismiss(toastId)
		}
	}, [isError, isFetching])

	if (isFetching) return <div>Loading...</div>

	if (!data) return notFound()

	return (
		<main className={st.wrapper}>
			<h1 className={st.heading}>{data.chartName}</h1>

			<p className={st.description}>{data.disclaimer}</p>

			<div className={st.container}>
				{Object.entries(data.bpi).map(([key]) => (
					<ShowPrice
						isUpdated={isFetching}
						key={key}
						code={key as TCoinCode}
					/>
				))}
			</div>
		</main>
	)
}
