import { useState, useEffect, useCallback } from "react"
import { supabase } from "../lib/supabase"

export interface SavingTarget {
  id: string
  name: string
  target_amt: number
  current_amt: number
  deadline: string | null
}

export function useSavingTargets(userId: string | undefined) {
  const [targets, setTargets] = useState<SavingTarget[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (!userId) return
    const { data } = await supabase
      .from("saving_targets")
      .select("*")
      .eq("user_id", userId)
    if (data) setTargets(data as SavingTarget[])
    setLoading(false)
  }, [userId])

  useEffect(() => { fetch() }, [fetch])

  const add = async (t: Omit<SavingTarget, "id" | "current_amt">) => {
    const { data } = await supabase
      .from("saving_targets")
      .insert({ ...t, user_id: userId, current_amt: 0 })
      .select()
      .single()
    if (data) setTargets(prev => [...prev, data as SavingTarget])
  }

  const updateAmt = async (id: string, current_amt: number) => {
    await supabase.from("saving_targets").update({ current_amt }).eq("id", id)
    setTargets(prev => prev.map(t => t.id === id ? { ...t, current_amt } : t))
  }

  return { targets, loading, add, updateAmt }
}
