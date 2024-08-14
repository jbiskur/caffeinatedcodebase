import "@/styles/globals.css"

import { env } from "@/env"
import { TRPCReactProvider } from "@/trpc/react"
import { ClerkProvider } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  const { userId, orgId} = await auth()

  if (userId && orgId !== env.CLERK_ORGANIZATION_ID) {
    return <div>You are not authorized to access this page</div>
  }

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`min-h-screen ${inter.variable} font-inter`}>
        <ClerkProvider>
          <ThemeProvider attribute={"class"} defaultTheme={"light"} disableTransitionOnChange enableSystem>
            <TRPCReactProvider cookies={cookies().toString()}>
                {children}
            </TRPCReactProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
