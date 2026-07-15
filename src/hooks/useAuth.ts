import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import type { User } from "@supabase/supabase-js"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    return !error
  }

  const signUp = async (email: string, password: string) => {
    setError(null)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    return !error
  }

  const signOut = () => supabase.auth.signOut()

  const clearError = () => setError(null)

  return { user, loading, error, clearError, signIn, signUp, signOut }
}
