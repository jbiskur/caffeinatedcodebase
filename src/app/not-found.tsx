"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type React from "react";




const NestedPage = ({ session }: { children: React.ReactNode; session: Session }) => {
  return (
    <>
      <SessionProvider session={session}>
        <div className="flex h-screen flex-row">
          <div className="flex-1">
            <h1>Not found</h1>
          </div>
        </div>
      </SessionProvider>
    </>
  )
}

export default NestedPage