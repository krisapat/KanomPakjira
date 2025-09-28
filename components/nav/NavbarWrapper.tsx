// NavbarWrapper.tsx (Server Component)
import { currentUser } from "@clerk/nextjs/server"
import Navbar from "./Navbar"

const NavbarWrapper = async () => {
  const user = await currentUser()
  const isAdmin = (user?.privateMetadata as { admin?: boolean })?.admin ?? false

  return <Navbar isAdmin={isAdmin} />
}

export default NavbarWrapper
