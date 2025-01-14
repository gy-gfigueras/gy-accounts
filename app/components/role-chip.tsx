"use client"

import { cn } from "../lib/utils"

interface RoleChipProps {
  role: keyof typeof roleStyles | string
  className?: string
}

const roleStyles = {
  ADMIN: "bg-red-100 text-red-700 border-red-200",
  COMMON: "bg-primary/10 text-primary border-primary/20",
} as const

export function RoleChip({ role, className }: RoleChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium",
        roleStyles[role as keyof typeof roleStyles],
        className
      )}
    >
      <span className={cn(
        "h-2.5 w-2.5 rounded-full",
        role === "ADMIN" ? "bg-red-500" : "bg-primary"
      )} />
      {role}
    </span>
  )
}
