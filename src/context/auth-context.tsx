"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock authentication - set a default user for demo
    const mockUser: User = {
      id: "user_1",
      email: "demo@example.com",
      name: "Demo User",
      avatar: "/placeholder.svg?height=150&width=150",
    }

    setUser(mockUser)
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Mock sign in
      const mockUser: User = {
        id: "user_1",
        email,
        name: "Demo User",
        avatar: "/placeholder.svg?height=150&width=150",
      }
      setUser(mockUser)
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      // Mock sign up
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        avatar: "/placeholder.svg?height=150&width=150",
      }
      setUser(mockUser)
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
    signUp,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
