import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Plus, X } from "lucide-react"

const CATEGORIES = [
  "Makanan", "Transport", "Hiburan", "Belanja", "Tagihan",
  "Kesehatan", "Pendidikan", "Gaji", "Freelance", "Lainnya",
]

interface Props {
  onAdd: (t: { amount: number; type: "income" | "expense"; category: string; note: string }) => void
}

export default function TransactionForm({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<"expense" | "income">("expense")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Makanan")
  const [note, setNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) return
    onAdd({ amount: Number(amount), type, category, note })
    setAmount("")
    setNote("")
    setCategory("Makanan")
    setOpen(false)
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-moss-500 hover:bg-moss-600 text-white px-5 py-3 shadow-lg transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="font-semibold">Tambah</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full sm:max-w-md bg-midnight-800 rounded-t-3xl sm:rounded-3xl p-6 border border-midnight-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold">Catat Transaksi</h2>
                <button onClick={() => setOpen(false)}><X className="w-5 h-5 text-midnight-400" /></button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setType("expense")}
                    className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ${type === "expense" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-midnight-700 text-midnight-300 border border-midnight-600"}`}
                  >
                    Pengeluaran
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setType("income")}
                    className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ${type === "income" ? "bg-moss-500/20 text-moss-400 border border-moss-500/30" : "bg-midnight-700 text-midnight-300 border border-midnight-600"}`}
                  >
                    Pemasukan
                  </motion.button>
                </div>

                <Input label="Nominal (Rp)" type="number" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-midnight-300 font-medium">Kategori</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((c) => (
                      <motion.button
                        key={c}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCategory(c)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${category === c ? "bg-moss-500/20 text-moss-400 border border-moss-500/30" : "bg-midnight-700 text-midnight-300 border border-midnight-600"}`}
                      >
                        {c}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <Input label="Catatan (opsional)" placeholder="Mis: Nasi goreng" value={note} onChange={(e) => setNote(e.target.value)} />

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full mt-2">Simpan</Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
