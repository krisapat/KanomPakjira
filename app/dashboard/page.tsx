import Linkmenu from "@/components/dashboard/Linkmenu"
import FavoritesPage from "@/components/dashboard/SumFavorite"
import { currentUser } from "@clerk/nextjs/server"
import { Metadata } from "next";
import { redirect } from "next/navigation"
export const metadata: Metadata = {
  title: "ขนมภัคจิรา | แดชบอร์ด",
  description: "ขนมภัคจิรา ศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทยคัดสรรคุณภาพจากโรงงานโดยตรงในราคาส่งสุดคุ้มมีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการถูกจริงส่งไวพร้อมจัดส่งทั่วประเทศ",
};
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