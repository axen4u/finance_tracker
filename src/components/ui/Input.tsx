import type { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm text-midnight-300 font-medium">{label}</label>}
      <input
        className={`rounded-xl bg-midnight-700 border border-midnight-600 px-4 py-2.5 text-white placeholder:text-midnight-400 outline-none focus:border-moss-500 transition-colors ${className}`}
        {...props}
      />
    </div>
  )
}
