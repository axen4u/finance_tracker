import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import type { Transaction } from "../../hooks/useTransactions"

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#84cc16"]

interface Props {
  transactions: Transaction[]
}

export default function SpendingChart({ transactions }: Props) {
  const data = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense")
    const grouped: Record<string, number> = {}
    expenses.forEach((t) => {
      grouped[t.category] = (grouped[t.category] || 0) + t.amount
    })
    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [transactions])

  if (data.length === 0) {
    return <p className="text-midnight-500 text-sm py-8 text-center">Belum ada data pengeluaran</p>
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" strokeWidth={0}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "12px",
              fontSize: "13px",
            }}
            formatter={(value: any) => [`Rp${Number(value).toLocaleString("id-ID")}`, "Total"]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs text-midnight-300">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            {d.name}
          </div>
        ))}
      </div>
    </div>
  )
}
