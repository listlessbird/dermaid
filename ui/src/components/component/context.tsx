"use client"
import { createContext, useContext, useMemo, useState } from "react"

const AppContext = createContext<{
  image: string | null
  setImage: (image: string | null) => void
  imageFile: File | null
  setImageFile: (image: File | null) => void
} | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [image, setImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const value = useMemo(
    () => ({
      image,
      setImage,
      imageFile,
      setImageFile,
    }),
    [image, setImage, imageFile, setImageFile]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider")
  }
  return context
}
