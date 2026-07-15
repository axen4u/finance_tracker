import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { Wallet, Loader2, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn, signUp, error, clearError } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    clearError()
    const ok = isRegister ? await signUp(email, password) : await signIn(email, password)
    setSubmitting(false)
    if (ok && isRegister) alert("Cek email kamu untuk konfirmasi, lalu login!")
  }

  return (
    <div className="min-h-dvh bg-midnight-900 text-white flex flex-col items-center justify-center px-6 relative">
      <button 
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-midnight-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Kembali
      </button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-8"
      >
        <Wallet className="w-8 h-8 text-moss-400" />
        <span className="font-bold text-2xl">Catat.Duit</span>
      </motion.div>


      <motion.form
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="rounded-2xl bg-midnight-800 border border-midnight-700 p-8 w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-1">{isRegister ? "Buat Akun" : "Masuk"}</h1>
        <p className="text-midnight-400 text-sm mb-6">
          {isRegister ? "Daftar untuk mulai mencatat keuangan" : "Masuk untuk lanjut"}
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 mb-4"
          >
            {error}
          </motion.div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-midnight-300 font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl bg-midnight-700 border border-midnight-600 px-4 py-2.5 text-white placeholder:text-midnight-400 outline-none focus:border-moss-500 transition-colors"
              placeholder="nama@email.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-midnight-300 font-medium">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl bg-midnight-700 border border-midnight-600 px-4 py-2.5 text-white placeholder:text-midnight-400 outline-none focus:border-moss-500 transition-colors"
              placeholder="Minimal 6 karakter"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 flex items-center justify-center gap-2 rounded-xl bg-moss-500 hover:bg-moss-600 disabled:bg-moss-500/50 text-white font-semibold px-5 py-3 transition-all"
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isRegister ? "Daftar" : "Masuk"}
        </motion.button>

        <p className="text-center text-sm text-midnight-400 mt-4">
          {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); clearError() }}
            className="text-moss-400 hover:text-moss-300 transition-colors font-medium"
          >
            {isRegister ? "Masuk" : "Daftar"}
          </button>
        </p>
      </motion.form>
    </div>
  )
}
