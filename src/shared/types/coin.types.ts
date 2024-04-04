export interface ICoinResponse {
	time: Time
	disclaimer: string
	chartName: string
	bpi: Bpi
}

interface Bpi {
	USD: Currency
	GBP: Currency
	EUR: Currency
}

interface Currency {
	code: string
	symbol: string
	rate: string
	description: string
	rate_float: number
}

interface Time {
	updated: string
	updatedISO: string
	updateduk: string
}

export type TCoinCode = "USD" | "EUR" | "GBP"
