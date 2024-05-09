import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CameraIcon } from "lucide-react"
import { AppProvider } from "@/components/component/context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DermAID",
  description:
    "DermAID is a web application that uses machine learning to detect skin conditions from images.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <div className="flex flex-col h-screen">
          <main className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
            <AppProvider>{children}</AppProvider>
          </main>
        </div>
      </body>
    </html>
  )
}

function Nav() {
  return (
    <div className="fixed top-0 w-full">
      <header className="flex items-center h-14 border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <CameraIcon className="h-6 w-6" />
          <span className="">DermAID</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          {/* <Link
            className="font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Home
          </Link> */}
          <Link
            className="font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            History
          </Link>
          {/* <Link
            className="font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Profile
          </Link> */}
        </nav>
      </header>
    </div>
  )
}
