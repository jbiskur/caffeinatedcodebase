import { LoaderCircle } from "lucide-react"
import type { ReactNode } from "react"

export interface LoadingProps {
	title?: string | ReactNode
}

export default function Loading({ title }: LoadingProps) {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
			<div className={"flex flex-col items-center"}>
				<LoaderCircle className="animate-spin duration-200 text-6xl text-primary" />
				<p className="mt-2 text-lg text-secondary-foreground">
					{title ?? "Loading content"}
				</p>
			</div>
		</div>
	);
}
