import Cookies from 'js-cookie'
import { TokensEnum } from '@/common/enums/tokens-enum'

export const getAccessToken = () => {
	const accessToken = Cookies.get(TokensEnum.ACCESS_TOKEN)
	return accessToken || null
}

export const setAccessToken = (accessToken: string) => {
	Cookies.set(TokensEnum.ACCESS_TOKEN, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: new Date(Date.now() + 15 * 60 * 1000)
	})
}

export const removeAccessToken = () => {
	Cookies.remove(TokensEnum.ACCESS_TOKEN)
}
