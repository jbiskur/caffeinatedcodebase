import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { Button } from "../components/ui/button";

export default async function Home() {
  return (
    <main className="mx-auto w-full">
      <SignedIn>
        <div className="text-center text-secondary-foreground">
          <SignOutButton>
            <Button>Sign Out</Button>
          </SignOutButton>
        </div>
      </SignedIn>
      <div className="text-center text-secondary-foreground">Welcome to Caffeinatedcodebase</div>
    </main>
  )
}
