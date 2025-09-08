// src/context/auth.context.jsx
import { createContext, useEffect, useState } from 'react'
import api from '../services/api'

// 1) Create the Context object
export const AuthContext = createContext()

// 2) Provider component
export function AuthProviderWrapper({ children }) {
  // required state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  // store/remove token in localStorage
  const storeToken = (token) => localStorage.setItem('authToken', token)
  const removeToken = () => localStorage.removeItem('authToken')

  // verify token -> set user / login state
  const authenticateUser = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get('/auth/verify')
      setIsLoggedIn(true)
      setUser(data)            // current user object from the server
    } catch {
      setIsLoggedIn(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // log out = remove token and refresh auth state
  const logOutUser = () => {
    removeToken()
    authenticateUser()
  }

  // check auth on first render
  useEffect(() => {
    authenticateUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, removeToken, logOutUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
