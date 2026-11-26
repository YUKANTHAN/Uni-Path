import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false)
  const [authError, setAuthError] = useState(null)

  const navigateToLogin = useCallback(() => {
    console.log('Navigate to login')
  }, [])

  useEffect(() => {
    setIsLoadingAuth(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        navigateToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}