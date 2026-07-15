import type { ReactNode } from "react"

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-midnight-800 border border-midnight-700 p-4 ${className}`}>
      {children}
    </div>
  )
}
