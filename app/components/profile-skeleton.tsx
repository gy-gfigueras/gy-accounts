"use client"

import { ThemeSwitch } from "./theme-switch"
import Image from "next/image"
import { lexendFont, valorantFont } from "../utils/fonts"

export function ProfileSkeleton() {
  return (
    <div className={`min-h-screen bg-background ${lexendFont.className}`}>
      {/* Header con logo */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/gycoding.svg"
                alt="GY Accounts"
                width={32}
                height={32}
                priority
              />
              <h1 className={`${valorantFont.className} text-xl font-bold`}>Gy ACCOUNTS</h1>
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          {/* Header con foto de perfil y nombre */}
          <div className="relative h-32 bg-gradient-to-r from-primary to-primary/60 animate-pulse">
            <div className="absolute -bottom-16 left-8">
              <div className="relative h-32 w-32 rounded-full border-4 border-background overflow-hidden bg-muted animate-pulse" />
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            {/* Información del usuario */}
            <div className="space-y-6">
              {/* Nombre y username */}
              <div>
                <div className="h-10 w-48 bg-muted rounded animate-pulse" />
              </div>

              {/* Detalles de contacto */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                </div>
              </div>

              {/* Roles */}
              <div>
                <div className="h-6 w-24 bg-muted rounded mb-2 animate-pulse" />
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-6 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-6 w-16 bg-muted rounded animate-pulse" />
                </div>
              </div>

              {/* Acciones */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t">
                <div className="h-10 w-32 bg-muted rounded animate-pulse" />
                <div className="h-10 w-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
