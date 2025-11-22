import Link from "next/link"
import Profile from "./nav_com/Profile"
import Menu from "./nav_com/Menu"
import { currentUser } from "@clerk/nextjs/server"

const Navbar = async () => {
  const user = await currentUser()
  const isAdmin = (user?.privateMetadata as { admin?: boolean })?.admin ?? false
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/90 dark:bg-black/80 border-b-2
        transition-transform duration-300`}
    >
      <div className="w-full flex items-center justify-between px-4 md:px-20 h-15 kanitFont">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="font-extrabold text-xl md:text-3xl bg-linear-to-r from-[#FB2C36] to-[#FB6A36] bg-clip-text text-transparent">
            ขนมภัคจิรา
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="flex space-x-2 ">
          <Menu isAdmin={isAdmin} />
          <Profile isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
