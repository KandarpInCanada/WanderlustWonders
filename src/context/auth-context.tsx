"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { User } from "@supabase/auth-helpers-nextjs"
import { config } from "@/lib/config"

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  profileUrl: string | null
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          console.error("Error getting user:", userError)
          setError("Failed to get user information")
        } else {
          setUser(user)
        }
      } catch (err) {
        console.error("Unexpected error getting user:", err)
        setError("An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        setUser(session?.user ?? null)
        setError(null)

        if (event === "SIGNED_IN" && session?.user) {
          console.log("User signed in:", session.user.id)
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out")
        }
      } catch (err) {
        console.error("Error in auth state change:", err)
        setError("Authentication state error")
      } finally {
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      setError(null)

      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${config.app.url}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (signInError) {
        console.error("Error signing in with Google:", signInError)

        // Handle specific error types
        switch (signInError.message) {
          case "popup_blocked":
            setError("Popup was blocked. Please allow popups and try again.")
            break
          case "access_denied":
            setError("Access was denied. Please try again.")
            break
          default:
            setError("Failed to sign in with Google. Please try again.")
        }
        throw signInError
      }
    } catch (error) {
      console.error("Unexpected error during Google sign in:", error)
      if (!error || typeof error !== "object" || !("message" in error)) {
        setError("An unexpected error occurred during sign in")
      }
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)

      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) {
        console.error("Error signing out:", signOutError)
        setError("Failed to sign out. Please try again.")
        throw signOutError
      }

      setUser(null)
    } catch (error) {
      console.error("Unexpected error during sign out:", error)
      setError("An unexpected error occurred during sign out")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const profileUrl = user?.user_metadata?.avatar_url || null

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    profileUrl,
    error,
    clearError,
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
