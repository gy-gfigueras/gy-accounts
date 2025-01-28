"use client"

import { cn } from "../lib/utils"

interface RoleChipProps {
  role: keyof typeof roleStyles | string
  className?: string
}

const roleStyles = {
  ADMIN: "bg-green-400 text-green-400 border-green-400",
  COMMON: "bg-purple-700 text-purple-700 border-purple-700",
} as const

export function RoleChip({ role, className }: RoleChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium bg-opacity-20 border-2",
        roleStyles[role as keyof typeof roleStyles],
        className
      )}
    >
      <span className={cn(
        "h-2.5 w-2.5 rounded-full",
        role === "ADMIN" ? "bg-green-400" : "bg-primary"
      )} />
      {role}
    </span>
  )
}
