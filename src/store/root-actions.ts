import { coinSlice } from "./coin/coin.slice"

export const rootActions = {
	...coinSlice.actions
}
