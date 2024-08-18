import "@/styles/globals.css"

import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
})

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

export const metadata = {
  manifest: "/manifest.json",
  title: "Caffeinatedcodebase",
  description: "The website for the caffeinated codebase blog site built with Flowcore IDD",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn("antialiased", fontHeading.variable, fontBody.variable)}>{children}</body>
    </html>
  )
}
