import { useState, useEffect, useCallback } from "react"
import { supabase } from "../lib/supabase"

export interface Transaction {
  id: string
  amount: number
  type: "income" | "expense"
  note: string | null
  category: string
  date: string
}

export function useTransactions(userId: string | undefined) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (!userId) return
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(100)
    if (data) setTransactions(data as Transaction[])
    setLoading(false)
  }, [userId])

  useEffect(() => { fetch() }, [fetch])

  const add = async (t: Omit<Transaction, "id" | "date">) => {
    const { data } = await supabase
      .from("transactions")
      .insert({ ...t, user_id: userId, date: new Date().toISOString() })
      .select()
      .single()
    if (data) setTransactions(prev => [data as Transaction, ...prev])
  }

  const remove = async (id: string) => {
    await supabase.from("transactions").delete().eq("id", id)
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return { transactions, loading, add, remove }
}
