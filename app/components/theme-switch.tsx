"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-lg p-2 hover:bg-accent hover:text-accent-foreground relative"
    >
      <Sun className={`h-5 w-5 transition-all ${theme === "dark" ? "opacity-100" : "opacity-0"}`} />
      <Moon className={`absolute h-5 w-5 transition-all ${theme === "dark" ? "opacity-0" : "opacity-100"} top-2 left-2`} />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}