import { useMemo } from "react"
import { motion } from "framer-motion"
import { Lightbulb, Coffee, ShoppingBag, Gamepad, PiggyBank } from "lucide-react"
import type { Transaction } from "../../hooks/useTransactions"

interface Props {
  transactions: Transaction[]
}

export default function SmartTips({ transactions }: Props) {
  const tips = useMemo(() => {
    const result: { icon: React.ReactNode; text: string; type: "info" | "warning" | "success" }[] = []

    const expenses = transactions.filter((t) => t.type === "expense")
    if (expenses.length === 0) {
      result.push({ icon: <PiggyBank className="w-4 h-4" />, text: "Mulai catat pengeluaran untuk dapat tips hemat!", type: "info" })
      return result
    }

    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0)
    const kategoriTotal: Record<string, number> = {}
    expenses.forEach((t) => {
      kategoriTotal[t.category] = (kategoriTotal[t.category] || 0) + t.amount
    })

    const topCategory = Object.entries(kategoriTotal).sort((a, b) => b[1] - a[1])[0]

    if (topCategory?.[0] === "Makanan" && topCategory[1] > totalExpense * 0.4) {
      result.push({ icon: <Coffee className="w-4 h-4" />, text: "Pengeluaran makanan sangat tinggi! Coba masak di rumah 3x seminggu untuk hemat hingga 40%.", type: "warning" })
    }
    if (topCategory?.[0] === "Transport" && topCategory[1] > totalExpense * 0.3) {
      result.push({ icon: <ShoppingBag className="w-4 h-4" />, text: "Ongkos transport cukup besar. Pertimbangkan naik transport umum atau carpool.", type: "warning" })
    }
    if (topCategory?.[0] === "Hiburan" && topCategory[1] > totalExpense * 0.25) {
      result.push({ icon: <Gamepad className="w-4 h-4" />, text: "Pengeluaran hiburan sudah 25%+! Coba alokasi maksimal 15% dari pengeluaran.", type: "warning" })
    }

    const cashflow = transactions.length > 0
    if (cashflow) {
      const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0)
      const savingRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0
      if (savingRate < 10) {
        result.push({ icon: <Lightbulb className="w-4 h-4" />, text: `Kamu hanya menabung ~${Math.round(savingRate)}% dari pemasukan. Aturan 50/30/20: 50% kebutuhan, 30% keinginan, 20% tabungan!`, type: "info" })
      } else if (savingRate >= 20) {
        result.push({ icon: <PiggyBank className="w-4 h-4" />, text: `Keren! Kamu menabung ~${Math.round(savingRate)}% dari pemasukan. Pertahankan! 🎯`, type: "success" })
      }
    }

    return result
  }, [transactions])

  return (
    <div className="flex flex-col gap-3">
      {tips.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`rounded-xl border p-4 flex items-start gap-3 text-sm ${
            t.type === "warning"
              ? "bg-amber-500/10 border-amber-500/20 text-amber-300"
              : t.type === "success"
              ? "bg-moss-500/10 border-moss-500/20 text-moss-300"
              : "bg-blue-500/10 border-blue-500/20 text-blue-300"
          }`}
        >
          <div className="mt-0.5 shrink-0">{t.icon}</div>
          <p>{t.text}</p>
        </motion.div>
      ))}
    </div>
  )
}
