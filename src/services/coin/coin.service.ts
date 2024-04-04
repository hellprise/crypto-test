import { axiosClassic } from "@/api"
import { ICoinResponse } from "@/shared/types/coin.types"

export const CoinService = {
	getCurrentPrice: async () => {
		const response = await axiosClassic.get<ICoinResponse>("")

		return response.data
	}
}
