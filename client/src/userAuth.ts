const isLogged = 'token'

export const rememberLogin = (token: string) => localStorage.setItem(isLogged, token)

export const getAccessToken = () => localStorage.getItem(isLogged)

export const logoutUser = () => localStorage.removeItem(isLogged)

export const isLoggedIn = () => getAccessToken() ? true : false
