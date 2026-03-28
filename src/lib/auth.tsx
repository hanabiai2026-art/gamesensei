'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isSignedIn: boolean
  signIn: (email: string, password: string) => boolean
  signUp: (name: string, email: string, password: string) => boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const signIn = (email: string, password: string) => {
    if (email && password.length >= 8) {
      setUser({ id: crypto.randomUUID(), name: email.split('@')[0], email, createdAt: new Date().toISOString() })
      return true
    }
    return false
  }

  const signUp = (name: string, email: string, password: string) => {
    if (name && email && password.length >= 8) {
      setUser({ id: crypto.randomUUID(), name, email, createdAt: new Date().toISOString() })
      return true
    }
    return false
  }

  const signOut = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, isSignedIn: !!user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
