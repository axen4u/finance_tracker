import { motion } from "framer-motion"
import { useAuth } from "../../hooks/useAuth"
import { useTransactions } from "../../hooks/useTransactions"
import { useSavingTargets } from "../../hooks/useSavingTargets"
import { LogOut, Wallet, Crown } from "lucide-react"
import { Link } from "react-router-dom"
import TransactionForm from "./TransactionForm"
import TransactionList from "./TransactionList"
import SpendingChart from "./SpendingChart"
import SavingTargetSection from "./SavingTarget"
import SmartTips from "./SmartTips"
import { Card } from "../ui/Card"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const { transactions, add, remove } = useTransactions(user?.id)
  const { targets, add: addTarget } = useSavingTargets(user?.id)

  const balance = transactions.reduce((s, t) => s + (t.type === "income" ? t.amount : -t.amount), 0)

  return (
    <div className="min-h-dvh bg-midnight-900 text-white pb-24">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between px-6 py-4 border-b border-midnight-800"
      >
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-moss-400" />
          <span className="font-bold">Catat.Duit</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={signOut}
          className="text-midnight-400 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </motion.button>
      </motion.header>

      <motion.main
        className="p-6 max-w-4xl mx-auto space-y-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item}>
          <Card className="bg-gradient-to-r from-amber-500/10 to-moss-500/10 border-amber-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-midnight-300 text-sm mb-1">Total Saldo</p>
                <h1 className="text-3xl font-bold">Rp{balance.toLocaleString("id-ID")}</h1>
              </div>
              <Link to="/pricing" className="flex items-center gap-2 bg-amber-500 text-midnight-900 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-amber-400 transition-colors shrink-0">
                <Crown className="w-3 h-3" /> Premium
              </Link>
            </div>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <motion.div variants={item}>
              <Card>
                <h3 className="font-semibold mb-4">Pengeluaran Bulan Ini</h3>
                <SpendingChart transactions={transactions} />
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <SavingTargetSection targets={targets} onAdd={addTarget} isPremium={false} />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div variants={item}>
              <Card>
                <h3 className="font-semibold mb-4">Transaksi</h3>
                <TransactionList transactions={transactions} onRemove={remove} />
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card>
                <h3 className="font-semibold mb-4">Smart Tips</h3>
                <SmartTips transactions={transactions} />
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.main>

      <TransactionForm onAdd={add} />
    </div>
  )
}
