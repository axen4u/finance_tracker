import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Wallet, Check, Crown, ArrowLeft, Sparkles, MessageCircle } from "lucide-react"

const plans = [
  {
    name: "Gratis",
    price: "Rp0",
    period: "selamanya",
    icon: Wallet,
    features: [
      "Catat 50 transaksi/bulan",
      "1 target tabungan",
      "Grafik pengeluaran dasar",
      "Tips hemat standar",
    ],
    cta: "Mulai Gratis",
    to: "/login",
    featured: false,
  },
  {
    name: "Premium",
    price: "Rp35.000",
    period: "/bulan",
    icon: Crown,
    features: [
      "Transaksi tak terbatas",
      "Target tabungan tak terbatas",
      "Export CSV/PDF",
      "Budget planning",
      "Tips hemat advanced",
      "Pengingat tagihan",
    ],
    cta: "Upgrade Sekarang",
    to: `https://wa.me/62895329851723?text=Halo%2C%20saya%20mau%20upgrade%20Premium%20Catat.Duit`,
    featured: true,
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function PricingPage() {
  return (
    <div className="min-h-dvh bg-midnight-900 text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-moss-400" />
          <span className="font-bold text-lg">Catat.Duit</span>
        </Link>
        <Link to="/login" className="text-sm text-midnight-300 hover:text-white transition-colors">Masuk</Link>
      </header>

      <section className="px-6 pt-16 pb-20 text-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 text-sm text-amber-400 mb-6">
            <Sparkles className="w-4 h-4" /> Upgrade & Buka Semua Fitur
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Pilih Paketmu
          </h1>
          <p className="text-midnight-300 text-lg mb-12 max-w-lg mx-auto">
            Mulai gratis, upgrade kapan saja kalau butuh lebih banyak fitur.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto items-start"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardItem}
              className={`rounded-2xl border p-8 text-left relative ${
                plan.featured
                  ? "bg-moss-500/10 border-moss-500/30"
                  : "bg-midnight-800 border-midnight-700"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-6 bg-moss-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULER
                </div>
              )}

              <plan.icon className={`w-8 h-8 mb-4 ${plan.featured ? "text-amber-400" : "text-moss-400"}`} />
              <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-midnight-400">{plan.period}</span>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-sm text-midnight-200">
                    <Check className="w-4 h-4 text-moss-400 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {plan.featured ? (
                <a
                  href={plan.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-moss-500 hover:bg-moss-600 text-white font-semibold px-5 py-3 transition-all active:scale-[0.97]"
                >
                  <MessageCircle className="w-4 h-4" />
                  {plan.cta}
                </a>
              ) : (
                <Link
                  to={plan.to}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-midnight-700 hover:bg-midnight-600 text-white font-semibold px-5 py-3 transition-all active:scale-[0.97]"
                >
                  {plan.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        <p className="text-xs text-midnight-500 mt-8">
          Pembayaran via QRIS / GoPay / Transfer Bank. Hubungi admin setelah transfer untuk aktivasi.
        </p>

        <Link to="/" className="inline-flex items-center gap-2 text-midnight-400 hover:text-white transition-colors mt-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>
      </section>
    </div>
  )
}
