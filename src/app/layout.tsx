import "@/styles/globals.css"

import { Inter } from "next/font/google"
import { signOut } from "next-auth/react"
import { getServerAuthSession } from "@/server/auth"
import NestedPage from "@/app/nested-page"
import { PublicPage } from "@/app/public-page"
import { TranslationProvider } from "@/components/ui/translation/translation-provider"
import { TRPCReactProvider } from "@/trpc/react"
import { ThemeProvider } from "next-themes"
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
	children: React.ReactNode;
}) {
	const session = await getServerAuthSession();

	if (session?.error) {
		await signOut({
			callbackUrl: "/?error=session_expired",
		});
	}

	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={`min-h-screen ${inter.variable} font-inter`}>
				<ThemeProvider
					attribute={"class"}
					defaultTheme={"light"}
					disableTransitionOnChange
					enableSystem
				>
					<TRPCReactProvider cookies={cookies().toString()}>
						<TranslationProvider language={"en"}>
							{!session ? (
								<>
									<PublicPage />
								</>
							) : (
								<>
									<NestedPage session={session}>{children}</NestedPage>
								</>
							)}
						</TranslationProvider>
					</TRPCReactProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
