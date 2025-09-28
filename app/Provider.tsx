import SmoothScrollWrapper from "@/components/animation/SmoothScrollWrapper"
import { Darkmode } from "@/components/darkmode/darkmode"
import { ThemeProvider } from "@/components/darkmode/theme-provider"
import NavbarWrapper from "@/components/nav/NavbarWrapper"
import { Toaster } from "@/components/ui/sonner"

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <NavbarWrapper />
                <SmoothScrollWrapper>
                    {children}
                </SmoothScrollWrapper>
                <Toaster toastOptions={{
                    className: "kanitFont",
                }} />
                <Darkmode />
            </ThemeProvider>
        </>
    )
}
export default Providers