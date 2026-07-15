import { useCallback, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, loginUser } from '../services/api'
import AuthContext from './auth-context'

const USER_KEY = 'localquest-user'
const TOKEN_KEY = 'localquest-token'

const getSavedUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem(TOKEN_KEY) ? getSavedUser() : null,
  )
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [authLoading, setAuthLoading] = useState(Boolean(token))

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
    setToken(null)
    setAuthLoading(false)
  }, [])

  useEffect(() => {
    if (!token) {
      setAuthLoading(false)
      return undefined
    }

    let ignore = false

    getCurrentUser(token)
      .then((currentUser) => {
        if (!ignore) {
          const savedUser = {
            id: currentUser.id,
            username: currentUser.username,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            image: currentUser.image,
          }

          localStorage.setItem(USER_KEY, JSON.stringify(savedUser))
          setUser(savedUser)
        }
      })
      .catch(() => {
        if (!ignore) logout()
      })
      .finally(() => {
        if (!ignore) setAuthLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [logout, token])

  const login = useCallback(async (credentials) => {
    const data = await loginUser(credentials)
    const loggedInUser = {
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      image: data.image,
    }

    localStorage.setItem(USER_KEY, JSON.stringify(loggedInUser))
    localStorage.setItem(TOKEN_KEY, data.accessToken)
    setUser(loggedInUser)
    setToken(data.accessToken)

    return loggedInUser
  }, [])

  const value = useMemo(
    () => ({ user, token, authLoading, login, logout }),
    [authLoading, login, logout, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
