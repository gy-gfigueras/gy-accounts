/* eslint-disable @next/next/no-html-link-for-pages */
"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useState } from "react"
import { ThemeSwitch } from "./theme-switch"
import Image from "next/image"
import { lexendFont, valorantFont } from "../utils/fonts"
import { ProfileSkeleton } from "./profile-skeleton"
import { User, UserUpdateData } from "../types/user"
import { RoleChip } from "./role-chip"
import { Phone, Mail } from "lucide-react"
import { useGycodingUser } from "../hooks/useGycodingUser"
import { updateUser } from "../service/user"

const DEFAULT_AVATAR = "/default-avatar.png"

export function UserDashboard() {
  const { user, isLoading: auth0Loading } = useUser()
  const { data: gyUser, isLoading: gyUserLoading, error: userError } = useGycodingUser()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<UserUpdateData>({
    username: "",
    email: "",
    picture: "",
    phoneNumber: null
  })

  const handleEditClick = () => {
    setEditData({
      username: gyUser?.username || "",
      email: gyUser?.email || "",
      picture: gyUser?.picture || "",
      phoneNumber: gyUser?.phoneNumber || null
    })
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditData({
      username: "",
      email: "",
      picture: "",
      phoneNumber: null
    })
  }

  const handleSaveEdit = async () => {
    try{
      await updateUser(gyUser as User)
    } catch (error) {
      console.error("Error updating user data:", error)
    }
    setIsEditing(false)
  }

  if (auth0Loading || gyUserLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ProfileSkeleton />
      </div>
    )
  }

  if (!gyUser) {
    return (
      <div className="min-h-screen bg-background">
        <p className={`${lexendFont.className} text-lg`}>No user data available</p>
      </div>
    )
  }

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
          <div className="relative h-32 bg-gradient-to-r from-primary to-primary/60">
            <div className="absolute -bottom-16 left-8">
              <div className="relative h-32 w-32 rounded-full border-4 border-background overflow-hidden">
                <Image
                  src={isEditing ? editData.picture : (gyUser.picture || DEFAULT_AVATAR)}
                  alt={gyUser.username}
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
                    className={`${lexendFont.className} text-3xl font-bold bg-transparent border-b border-primary focus:outline-none focus:border-primary/90 w-full`}
                    placeholder="Enter username"
                  />
                ) : (
                  <h1 className={`${lexendFont.className} text-3xl font-bold text-foreground`}>
                    {gyUser.username}
                  </h1>
                )}
              </div>

              {/* Detalles de contacto */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className={lexendFont.className}>{gyUser.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phoneNumber || ""}
                      onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value || null })}
                      className={`${lexendFont.className} bg-transparent border-b border-primary focus:outline-none focus:border-primary/90 w-full`}
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <span className={lexendFont.className}>{gyUser.phoneNumber || "No phone number"}</span>
                  )}
                </div>
              </div>

              {/* Roles */}
              <div>
                <h2 className={`${lexendFont.className} text-lg font-semibold mb-2 text-foreground`}>Roles</h2>
                <div className="flex flex-wrap gap-2">
                  {gyUser.roles?.map((role) => (
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
