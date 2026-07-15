import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Wallet, TrendingUp, Target, Sparkles, Crown } from "lucide-react"
import { listContainer, listItem } from "../../lib/animations"

const features = [
  { icon: Wallet, title: "Catat Pemasukan & Pengeluaran", desc: "Pantau uang masuk dan keluar dalam hitungan detik" },
  { icon: TrendingUp, title: "Grafik Pengeluaran", desc: "Lihat pola belanjamu dengan chart interaktif" },
  { icon: Target, title: "Target Nabung", desc: "Set goal tabungan, pantau progres real-time" },
  { icon: Sparkles, title: "Tips Hemat Cerdas", desc: "Dapatkan saran berdasarkan kebiasaan belanjamu" },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-midnight-900 text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-moss-400" />
          <span className="font-bold text-lg">Catat.Duit</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/pricing" className="flex items-center gap-1.5 text-sm text-midnight-300 hover:text-amber-400 transition-colors">
            <Crown className="w-4 h-4" /> Premium
          </Link>
          <Link to="/login" className="text-sm text-midnight-300 hover:text-white transition-colors">Masuk</Link>
        </nav>
      </header>

      <motion.section
        className="px-6 pt-20 pb-16 text-center max-w-3xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-1.5 rounded-full bg-moss-500/10 border border-moss-500/20 px-4 py-1.5 text-sm text-moss-400 mb-6">
          <Sparkles className="w-4 h-4" /> Untuk Gen Z Indonesia
        </motion.div>
        <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
          Kendalikan Uangmu,{" "}
          <span className="text-moss-400">Gen Z</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-midnight-300 text-lg mb-8 max-w-lg mx-auto">
          Catat pemasukan & pengeluaran, lihat grafik belanja, dan raih target tabunganmu — semua gratis.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-moss-500 hover:bg-moss-600 text-white font-semibold rounded-xl px-8 py-3.5 text-lg transition-all active:scale-[0.97]"
          >
            Mulai Gratis
            <TrendingUp className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.section>

      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={listItem}
              className="rounded-2xl bg-midnight-800 border border-midnight-700 p-5 text-left"
            >
              <f.icon className="w-8 h-8 text-moss-400 mb-3" />
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-midnight-400">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer className="text-center text-midnight-500 text-sm pb-8">
        &copy; 2026 Catat.Duit
      </footer>
    </div>
  )
}
