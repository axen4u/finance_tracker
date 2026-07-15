import type { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger"
  children: ReactNode
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
  const variants = {
    primary: "bg-moss-500 text-white hover:bg-moss-600 active:scale-[0.97]",
    ghost: "bg-midnight-700 text-midnight-200 hover:bg-midnight-600",
    danger: "bg-red-500/20 text-red-400 hover:bg-red-500/30",
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
