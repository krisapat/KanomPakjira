"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
} from "@clerk/nextjs"
import SignOutLinks from "./SignOutLinks"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { profileLinks } from "@/utils/links"
import UserProfile from "./UserProfile"

interface ProfileProps {
    isAdmin: boolean
}

const Profile = ({ isAdmin }: ProfileProps) => {
    const pathname = usePathname()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button variant="outline" className="p-0 overflow-hidden">
                    <UserProfile />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent >
                <DropdownMenuLabel>My Profile</DropdownMenuLabel>

                {/* SignedOut */}
                <SignedOut>
                    <div className="flex flex-col gap-1">
                        <SignInButton mode="modal">
                            <Button className="w-full text-foreground !border-primary border-2" variant="outline">
                                Login
                            </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button className="w-full text-foreground" variant="default">
                                Register
                            </Button>
                        </SignUpButton>
                    </div>
                </SignedOut>

                {/* SignedIn */}
                <SignedIn>
                    <DropdownMenuSeparator />
                    {profileLinks
                        .filter((item) => !item.requireAdmin || isAdmin)
                        .map((item) => {
                            const isActive =
                                item.path === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.path)

                            return (
                                <DropdownMenuItem key={item.path} asChild>
                                    <Link
                                        href={item.path}
                                        className={cn(
                                            "px-4 py-2 rounded-md transition-color duration-300 hover:!bg-primary-foreground hover:!text-white kanitFont",
                                            isActive ? "text-white font-semibold transition-color bg-primary hover:!bg-primary" : ""
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </DropdownMenuItem>
                            )
                        })}
                    <DropdownMenuSeparator />
                    <SignOutLinks />
                </SignedIn>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile
