// Navbar.tsx (Client Component)
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Profile from "./nav_com/Profile"
import Menu from "./nav_com/Menu"

type NavbarProps = {
  isAdmin: boolean
}

const Navbar = ({ isAdmin }: NavbarProps) => {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false) // scroll ลง → ซ่อน
      } else {
        setShow(true) // scroll ขึ้น → โชว์
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/90 dark:bg-black/80 border-b-2
        transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="w-full flex items-center justify-between px-4 md:px-20 h-15 kanitFont">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="font-extrabold text-3xl text-primary kanitFont">
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
