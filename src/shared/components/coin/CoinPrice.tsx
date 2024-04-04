import clsx from "clsx"
import { memo, useEffect, useRef, useState } from "react"

import { useActions } from "../../hooks/useActions"
import { useMounted } from "../../hooks/useMounted"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { TCoinCode } from "../../types/coin.types"

import st from "./CoinPrice.module.scss"

function FuncShowPrice({
	code,
	isUpdated
}: {
	code: TCoinCode
	isUpdated: boolean
}) {
	const { bpi, actions } = useTypedSelector(state => state.coin)

	const { setActions } = useActions()

	const mounted = useMounted()

	const [isVisible, setIsVisible] = useState(false)

	const cardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const checkVisibility = () => {
			if (cardRef.current === null) return

			const top = cardRef.current.getBoundingClientRect().top
			const windowHeight = window.innerHeight

			if (top + 100 < windowHeight) setIsVisible(true)
			else setIsVisible(false)
		}

		window.addEventListener("scroll", checkVisibility)
		checkVisibility()

		return () => window.removeEventListener("scroll", checkVisibility)
	}, [])

	useEffect(() => {
		if (!mounted) return

		setActions(code)
	}, [bpi, isUpdated, mounted])

	return (
		<section
			className={clsx(st.wrapper, {
				[st.wrapper__visible]: !isUpdated
			})}
		>
			<p
				className={st.currency}
				dangerouslySetInnerHTML={{ __html: String(bpi?.[code].symbol) }}
			/>

			<div className={st.content}>
				{/* {actions[code].value ?? ( */}
				<p
					className={clsx(st.action, {
						[st.action__up]: actions[code].action === "+",
						[st.action__down]: actions[code].action === "-"
					})}
				>
					<span>{actions[code].action}</span> {actions[code].value}
				</p>
				{/* )} */}

				<p className={st.price}>{bpi?.[code].rate_float}</p>
			</div>
		</section>
	)
}

export const ShowPrice = memo(FuncShowPrice)
