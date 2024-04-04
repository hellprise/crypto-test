import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { COIN_CURRENCIES } from "@/shared/constants/coin.constants"
import { ICoinResponse, TCoinCode } from "@/shared/types/coin.types"

interface ICoinState {
	bpi: ICoinResponse["bpi"] | null
	previousBpi: ICoinResponse["bpi"] | null
	actions: {
		[key in keyof typeof COIN_CURRENCIES]: {
			action: "+" | "-" | null
			value: string | null
		}
	}
}

const initialState: ICoinState = {
	bpi: null,
	previousBpi: null,
	actions: {
		// EUR: null,
		// GBP: null,
		// USD: null
		EUR: { action: null, value: null },
		GBP: { action: null, value: null },
		USD: { action: null, value: null }
	}
}

export const coinSlice = createSlice({
	name: "coin",
	initialState,
	reducers: {
		setCoin: (state, { payload }: PayloadAction<ICoinResponse["bpi"]>) => {
			const previousState = { ...state }

			state.previousBpi = previousState.bpi
			state.bpi = payload
		},
		setActions: (state, { payload }: PayloadAction<TCoinCode>) => {
			if (state.bpi && state.previousBpi) {
				if (
					state.bpi[payload].rate_float > state.previousBpi[payload].rate_float
				) {
					state.actions[payload].action = "+"

					state.actions[payload].value = (
						state.bpi[payload].rate_float -
						state.previousBpi[payload].rate_float
					).toFixed(4)
				} else if (
					state.bpi[payload].rate_float < state.previousBpi[payload].rate_float
				) {
					state.actions[payload].action = "-"

					state.actions[payload].value = (
						state.previousBpi[payload].rate_float -
						state.bpi[payload].rate_float
					).toFixed(4)

					// state.actions[payload].value =
					// 	(-state.previousBpi[payload].rate_float +
					// 	state.bpi[payload].rate_float).toFixed(4)
				} else {
					state.actions[payload].action = null
					state.actions[payload].value = null
				}
			}
		}
	}
})
