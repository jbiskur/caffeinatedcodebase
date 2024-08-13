"use client";


import {
	HomeIcon,
	Menu,
	Package,
	UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";
import { SessionProvider, signOut } from "next-auth/react";
import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Translated } from "@/components/ui/translation/translated";

import FlowcoreSVG from "../../public/images/flowcore-logo.svg";

const NestedPage = ({
	children,
	session,
}: { children: React.ReactNode; session: Session }) => {
	return (
		<>
			<SessionProvider session={session}>
				<div className="flex h-screen flex-row">
					<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
						<div className="hidden border-r bg-muted/40 md:block">
							<div className="flex h-full max-h-screen flex-col gap-2">
								<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
									<Link
										href="/"
										className="flex items-center gap-2 font-semibold"
									>
										<Image
											src={FlowcoreSVG as string}
											alt={"torshavn logo"}
											className="h-6 w-6"
										/>
										<span className="">
											<Translated path={"page.title"} />
										</span>
									</Link>
									{/* Notification bell */}
									{/*<Button variant="outline" size="icon" className="ml-auto h-8 w-8">*/}
									{/*  <Bell className="h-4 w-4"/>*/}
									{/*  <span className="sr-only">Toggle notifications</span>*/}
									{/*</Button>*/}
								</div>
								<div className="flex-1">
									<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
										<Link
											href={"/"}
											className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
										>
											<HomeIcon className="h-4 w-4" />
											<Translated path={"page.sidebar.dashboard"} />
										</Link>
									
                    <Link
                      href={"/blog-posts"}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Package className="h-4 w-4" />
                      <Translated path={"page.sidebar.blog-posts"} />
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
						<div className="flex flex-col">
							<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<Sheet>
									<SheetTrigger asChild>
										<Button
											variant="outline"
											size="icon"
											className="shrink-0 md:hidden"
										>
											<Menu className="h-5 w-5" />
											<span className="sr-only">Toggle navigation menu</span>
										</Button>
									</SheetTrigger>
									<SheetContent side="left" className="flex flex-col">
										<nav className="grid gap-2 text-lg font-medium">
											<div className="flex flex-col">
												<Link href="/" className="flex items-center gap-2 font-semibold">
													<Image src={FlowcoreSVG} alt={"torshavn logo"} className="h-6 w-6" />
													<span className="">
														<Translated path={"page.title"} />
													</span>
												</Link>
												<Link
													href={"/"}
													className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
												>
													<HomeIcon className="h-4 w-4" />
													<Translated path={"page.sidebar.dashboard"} />
												</Link>

												<Link
													href={"/blogPosts"}
													className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
												>
													<UsersIcon className="h-4 w-4" />
													<Translated path={"page.sidebar.blogPosts"} />
												</Link>
											</div>
										</nav>

									</SheetContent>
								</Sheet>
								<div className="w-full flex-1" />
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="secondary"
											size="icon"
											className="rounded-full"
										>
											<Avatar className={"h-5 w-5"}>
												{session?.user.image && (
													<AvatarImage src={session?.user.image} />
												)}
												<AvatarFallback>
													{session?.user.firstName && session?.user.lastName
														? `${session?.user.firstName[0]?.toUpperCase()}${session?.user.lastName[0]?.toUpperCase()}`
														: session?.user.name?.[0]}
												</AvatarFallback>
											</Avatar>
											<span className="sr-only">Toggle user menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>My Account</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={() => {
												window.location.href = `${session.issuer}/account`;
											}}
										>
											Settings
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={() =>
												signOut({
													redirect: false,
												}).then(() => {
													window.location.href = `${
														session?.issuer
													}/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(
														window.location.href,
													)}&id_token_hint=${session?.idToken}`;
												})
											}
										>
											<Translated path={"logout.button"} />
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</header>
							<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
								{children}
							</main>
							<Toaster richColors />
						</div>
					</div>
				</div>
			</SessionProvider>
		</>
	);
};

export default NestedPage;
