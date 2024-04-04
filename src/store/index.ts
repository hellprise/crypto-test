import { configureStore } from "@reduxjs/toolkit"

import { coinSlice } from "./coin/coin.slice"

export const store = configureStore({
	reducer: {
		coin: coinSlice.reducer
	}
})

export type TRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
