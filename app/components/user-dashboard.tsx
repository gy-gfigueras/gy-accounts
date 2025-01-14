/* eslint-disable @next/next/no-html-link-for-pages */
"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useState, useMemo, useEffect } from "react"
import { ThemeSwitch } from "./theme-switch"
import Image from "next/image"
import { lexendFont, valorantFont } from "../utils/fonts"
import { ProfileSkeleton } from "./profile-skeleton"
import { UserUpdateData } from "../types/user"
import { RoleChip } from "./role-chip"
import { getUser, GyCodingUser } from "../service/user"
import { Phone, Mail } from "lucide-react"

const DEFAULT_AVATAR = "/default-avatar.png"

export function UserDashboard() {
  const { user: auth0User, error: auth0Error, isLoading: auth0Loading } = useUser()
  const [gyCodingUser, setGyCodingUser] = useState<GyCodingUser | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<UserUpdateData>({
    username: "",
    email: "",
    phoneNumber: null,
    picture: DEFAULT_AVATAR,
  })

  useEffect(() => {
    async function fetchGyCodingUser() {
      try {
        if (auth0User) {
          const userData = await getUser()
          if (userData) {
            setGyCodingUser(userData.gyCodingUser)
            setEditData({
              username: userData.gyCodingUser.username || "",
              email: userData.gyCodingUser.email || "",
              phoneNumber: userData.gyCodingUser.phoneNumber,
              picture: userData.gyCodingUser.picture || DEFAULT_AVATAR,
            })
          }
        }
      } catch (err) {
        console.error('Error fetching GyCoding user:', err)
        setError('Error loading user data')
      }
    }

    fetchGyCodingUser()
  }, [auth0User])

  useMemo(() => {
    setMounted(true)
  }, [])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    // Restaurar datos originales
    if (gyCodingUser) {
      setEditData({
        username: gyCodingUser.username || "",
        email: gyCodingUser.email || "",
        phoneNumber: gyCodingUser.phoneNumber,
        picture: gyCodingUser.picture || DEFAULT_AVATAR,
      })
    }
  }

  const handleSaveEdit = async () => {
    try {
      // TODO: Implementar la llamada a la API para guardar cambios
      setIsEditing(false)
    } catch (err) {
      console.error('Error saving changes:', err)
      setError('Error saving changes')
    }
  }

  // Mostrar esqueleto mientras se carga la página o los datos
  if (!mounted || auth0Loading || (!gyCodingUser && auth0User)) {
    return <ProfileSkeleton />
  }

  if (auth0Error) {
    return <div>Error: {auth0Error.message}</div>
  }

  if (!auth0User) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <a
          href="/api/auth/login"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Login to GyCoding
        </a>
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-background">
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
              <h1 className={`${valorantFont.className} text-xl font-bold`}>Gy Accounts</h1>
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          {/* Header con foto de perfil y nombre */}
          <div className="relative h-32 bg-gradient-to-r from-primary to-primary/60">
            <div className="absolute -bottom-16 left-8">
              <div className="relative h-32 w-32 rounded-full border-4 border-background overflow-hidden">
                <Image
                  src={isEditing ? editData.picture : (gyCodingUser?.picture || DEFAULT_AVATAR)}
                  alt={gyCodingUser?.username || "Profile"}
                  fill
                  sizes="(max-width: 128px) 100vw, 128px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            {/* Información del usuario */}
            <div className="space-y-6">
              {/* Nombre y username */}
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    className="text-3xl font-bold bg-transparent border-b border-primary focus:outline-none focus:border-primary/90"
                    placeholder="Enter username"
                  />
                ) : (
                  <h1 className={`${lexendFont.className} text-3xl font-bold text-foreground`}>
                    {gyCodingUser?.username || "Username not set"}
                  </h1>
                )}
              </div>

              {/* Detalles de contacto */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{gyCodingUser?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phoneNumber || ""}
                      onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value || null })}
                      className="bg-transparent border-b border-primary focus:outline-none focus:border-primary/90"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <span>{gyCodingUser?.phoneNumber || "No phone number"}</span>
                  )}
                </div>
              </div>

              {/* Roles */}
              <div>
                <h2 className="text-lg font-semibold mb-2 text-foreground">Roles</h2>
                <div className="flex flex-wrap gap-2">
                  {gyCodingUser?.roles.map((role) => (
                    <RoleChip key={role} role={role} />
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t">
                {isEditing ? (
                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
                <a
                  href="/api/auth/logout"
                  className="px-4 py-2 text-destructive hover:text-destructive/90 transition-colors"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
