"use client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import FlowcoreSVG from "../../public/images/flowcore-logo.svg";

export const PublicPage = () => {
	const searchParams = useSearchParams();

	return (
		<div className={"w-full flex-auto justify-items-center"}>
			<header className="flex items-center justify-center min-h-12">
				<Image
					src={FlowcoreSVG as string}
					alt="Flowcore Logo"
					priority
					className="m-8"
				/>
			</header>
			<div className="text-center text-secondary-foreground">
				Welcome to Flowcore
			</div>
			{searchParams.get("error") === "session_expired" && (
				<div className="w-full inline-flex justify-center items-center m-4">
					<Alert variant="destructive" className={"w-1/2"}>
						<ExclamationTriangleIcon className="h-4 w-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>
							Your offline session has expired, please login again
						</AlertDescription>
					</Alert>
				</div>
			)}
			<div className={"w-full inline-flex justify-center items-center"}>
				<Button
					onClick={() => {
						void signIn("keycloak");
					}}
				>
					Login
				</Button>
			</div>
		</div>
	);
};
