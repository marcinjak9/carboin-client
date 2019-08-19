import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../../constants'

export function signInLoading() {
  return {
    type: LOGIN,
  }
}

export function signIn(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  }
}

export function signInError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}
