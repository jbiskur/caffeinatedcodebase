import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import { TRPCReactProvider } from "@/trpc/react"
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import Link from "next/link"

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
  // const { userId, orgId} = await auth()

  // if (userId && orgId !== env.CLERK_ORGANIZATION_ID) {
  //   return <div>You are not authorized to access this page</div>
  // }

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn("antialiased", fontHeading.variable, fontBody.variable)}>
        <ClerkProvider>
          <ThemeProvider attribute={"class"} defaultTheme={"light"} disableTransitionOnChange enableSystem>
            <TRPCReactProvider cookies={cookies().toString()}>
              <div className="flex flex-col min-h-screen">
                <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    prefetch={false}
                  >
                    <MountainIcon className="w-6 h-6" />
                    <span className="text-lg font-semibold">The Caffeinated Codebase</span>
                  </Link>
                  <nav className="hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ml-auto">
                    <Link href="/" className="font-bold" prefetch={false}>
                      Home
                    </Link>
                    <Link href="/about" className="text-muted-foreground" prefetch={false}>
                      About
                    </Link>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </nav>
                </header>
                <main className="flex-grow">{children}</main>
                <footer className="bg-muted py-6 px-4 md:px-6 shrink-0">
                  <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
                    <nav className="flex items-center gap-4 text-sm">
                      <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                        Terms of Service
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                        Privacy Policy
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                        Contact
                      </Link>
                    </nav>
                  </div>
                </footer>
              </div>
            </TRPCReactProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}
