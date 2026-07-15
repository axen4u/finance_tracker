import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase env vars. Set VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY in .env")
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder"
)

export type Tables = {
  transactions: {
    id: string
    amount: number
    type: "income" | "expense"
    note: string | null
    category: string
    date: string
    user_id: string
    created_at: string
  }
  saving_targets: {
    id: string
    name: string
    target_amt: number
    current_amt: number
    deadline: string | null
    user_id: string
  }
}
