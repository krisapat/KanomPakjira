import Linkmenu from "@/components/dashboard/Linkmenu"
import FavoritesPage from "@/components/dashboard/SumFavorite"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Dashboard = async () => {
    const user = await currentUser()
    if (!user?.privateMetadata.admin) redirect("/")
    return (
        <section className="p-4 space-y-4">
            <h1 className="text-3xl text-center font-bold capitalize">
                Dashboard
            </h1>
            <Linkmenu />
            <FavoritesPage />
        </section>
    )
}
export default Dashboard