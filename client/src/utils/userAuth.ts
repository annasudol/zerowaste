const IS_LOGGED_IN = 'isLoggedIn'

export const getAccessToken = () => localStorage.getItem(IS_LOGGED_IN)

export const logoutUser = () => localStorage.removeItem(IS_LOGGED_IN)
