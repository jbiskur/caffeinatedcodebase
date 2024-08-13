import { Home, UsersRoundIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import ConferenceLogo from "../../public/images/conference_logo.png"
import { Nav } from "./nav"

interface SidebarProps {
  isSidebarOpen?: boolean
  setIsSidebarOpen?: (isOpen: boolean) => void
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  return (
    <aside className="w-42 flex h-screen flex-col bg-card p-4">
      <div className="mb-8 flex flex-col items-start">
        <Link
          href="/"
          className="flex flex-row"
          onClick={() => {
            if (isSidebarOpen && setIsSidebarOpen) {
              setIsSidebarOpen(false)
            }
          }}
        >
          <Image src={ConferenceLogo} alt="Conference App Logo" height={50} width={50} priority />
          <div className="flex h-full flex-col justify-center text-lg">Open Conference</div>
        </Link>
      </div>
      <Nav
        links={[
          {
            href: "/",
            title: "Home",
            label: "",
            superuserRequired: false,
            icon: Home,
          },
          {
            href: "/people",
            title: "People",
            label: "",
            superuserRequired: false,
            icon: UsersRoundIcon,
          },
        ]}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </aside>
  )
}

export default Sidebar
