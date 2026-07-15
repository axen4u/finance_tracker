import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Target } from "lucide-react"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import type { SavingTarget as ST } from "../../hooks/useSavingTargets"

interface Props {
  targets: ST[]
  onAdd: (t: { name: string; target_amt: number; deadline: string | null }) => void
  isPremium: boolean
}

export default function SavingTargetSection({ targets, onAdd, isPremium }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [amt, setAmt] = useState("")
  const [deadline, setDeadline] = useState("")

  const canAdd = isPremium || targets.length < 1

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !amt) return
    onAdd({ name, target_amt: Number(amt), deadline: deadline || null })
    setName("")
    setAmt("")
    setDeadline("")
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Target Tabungan</h3>
        {canAdd && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowForm(true)}
            className="text-moss-400 hover:text-moss-300 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        )}
        {!canAdd && (
          <p className="text-xs text-midnight-400">Upgrade ke Premium untuk target tak terbatas</p>
        )}
      </div>

      {targets.length === 0 ? (
        <Card>
          <div className="flex flex-col items-center py-6 text-midnight-500">
            <Target className="w-8 h-8 mb-2" />
            <p className="text-sm">Belum ada target tabungan</p>
            {canAdd && (
              <Button variant="ghost" className="mt-3 text-xs" onClick={() => setShowForm(true)}>
                Buat Target
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {targets.map((t) => {
              const pct = Math.min(100, Math.round((t.current_amt / t.target_amt) * 100))
              return (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-xs text-midnight-400">
                          Rp{t.current_amt.toLocaleString("id-ID")} / Rp{t.target_amt.toLocaleString("id-ID")}
                          {t.deadline && ` • ${new Date(t.deadline).toLocaleDateString("id-ID")}`}
                        </p>
                      </div>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-moss-400 font-bold text-lg"
                      >
                        {pct}%
                      </motion.span>
                    </div>
                    <div className="h-2 rounded-full bg-midnight-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-moss-500"
                      />
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full sm:max-w-md bg-midnight-800 rounded-t-3xl sm:rounded-3xl p-6 border border-midnight-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold mb-5">Target Baru</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="Nama Target" placeholder="Contoh: HP Baru" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="Target Nominal (Rp)" type="number" placeholder="0" value={amt} onChange={(e) => setAmt(e.target.value)} />
                <Input label="Deadline (opsional)" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                <Button type="submit" className="w-full">Simpan Target</Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
