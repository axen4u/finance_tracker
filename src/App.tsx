import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "./hooks/useAuth"
import LandingPage from "./components/sections/LandingPage"
import LoginPage from "./components/sections/LoginPage"
import PricingPage from "./components/sections/PricingPage"
import DashboardPage from "./components/sections/DashboardPage"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex h-dvh items-center justify-center bg-midnight-900 text-white">Loading...</div>
  if (!user) return <Navigate to="/login" />
  return <>{children}</>
}

export default function App() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="flex h-dvh items-center justify-center bg-midnight-900 text-white">Loading...</div>

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}
