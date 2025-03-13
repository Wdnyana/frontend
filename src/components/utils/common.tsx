import { ButtonPropsLogout } from '@/types/general-type'

export type LoginMethod = 'EMAIL' | 'SMS' | 'SOCIAL' | 'FORM'

export const logout = async ({
  setToken,
  magic,
  navigate,
}: ButtonPropsLogout) => {
  try {
    if (magic && (await magic.user.isLoggedIn())) {
      await magic.user.logout()
    }
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setToken('')

    if (typeof navigate === 'function') {
      navigate('/authentication/login')
    }
  } catch (error) {
    console.error('Logout error:', error)
  }
}

export const saveUserInfo = (
  token: string,
  loginMethod: LoginMethod,
  userAddress: string,
) => {
  localStorage.setItem('token', token)
  localStorage.setItem('isAuthLoading', 'false')
  localStorage.setItem('loginMethod', loginMethod)
  localStorage.setItem('user', userAddress)
  localStorage.setItem('otpVerified', 'true')

  window.dispatchEvent(new Event('storage'))
}

export function getUserInfo() {
  const token = localStorage.getItem('token')

  return {
    token: token || '',
    user: localStorage.getItem('user') || '',
    loginMethod: localStorage.getItem('loginMethod') || '',
    otpVerified: localStorage.getItem('otpVerified') === 'true',
  }
}
