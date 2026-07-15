import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2 } from "lucide-react"
import type { Transaction } from "../../hooks/useTransactions"

const CATEGORY_EMOJI: Record<string, string> = {
  Makanan: "🍽️", Transport: "🚗", Hiburan: "🎬", Belanja: "🛍️",
  Tagihan: "📄", Kesehatan: "💊", Pendidikan: "📚", Gaji: "💰",
  Freelance: "💻", Lainnya: "📌",
}

interface Props {
  transactions: Transaction[]
  onRemove: (id: string) => void
}

export default function TransactionList({ transactions, onRemove }: Props) {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")

  const filtered = filter === "all" ? transactions : transactions.filter((t) => t.type === filter)

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(["all", "expense", "income"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filter === f ? "bg-moss-500/20 text-moss-400 border border-moss-500/30" : "bg-midnight-700 text-midnight-300 border border-midnight-600"}`}
          >
            {f === "all" ? "Semua" : f === "expense" ? "Pengeluaran" : "Pemasukan"}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-midnight-500 text-sm py-8 text-center">Belum ada transaksi</p>
      ) : (
        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
          <AnimatePresence initial={false}>
            {filtered.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between bg-midnight-800/50 rounded-xl px-4 py-3 border border-midnight-700/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{CATEGORY_EMOJI[t.category] || "📌"}</span>
                  <div>
                    <p className="text-sm font-medium">{t.category}{t.note ? ` - ${t.note}` : ""}</p>
                    <p className="text-xs text-midnight-400">{new Date(t.date).toLocaleDateString("id-ID")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-semibold text-sm ${t.type === "income" ? "text-moss-400" : "text-red-400"}`}>
                    {t.type === "income" ? "+" : "-"}Rp{t.amount.toLocaleString("id-ID")}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => onRemove(t.id)}
                    className="text-midnight-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
