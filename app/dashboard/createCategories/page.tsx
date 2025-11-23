import FadeUpWhenVisible from "@/components/animation/FadeUpWhenVisible"
import CreateCategoriesForm from "@/components/dashboard/CreateCategoriesForm"
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb"
import FetchCategories from "@/components/dashboard/FetchCategories"
import { currentUser } from "@clerk/nextjs/server"
import { Metadata } from "next"

import { redirect } from "next/navigation"
export const metadata: Metadata = {
  title: "ขนมภัคจิรา | สร้างประเภทสินค้า",
  description: "ขนมภัคจิรา ศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทยคัดสรรคุณภาพจากโรงงานโดยตรงในราคาส่งสุดคุ้มมีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการถูกจริงส่งไวพร้อมจัดส่งทั่วประเทศ",
};
const createCategories = async () => {
  const namePage = "สร้างหมวดหมู่สินค้า" as string
  const user = await currentUser()
  if (!user?.privateMetadata.admin) redirect("/")
  return (
    <main className="p-4 space-y-4">
      <DashboardBreadcrumb namePage={namePage}/>
      <FadeUpWhenVisible>
      <section className="w-full p-4 flex justify-center items-center">
        <div className="border p-4 w-full max-w-2xl rounded-md shadow-md">
          <h1 className="text-3xl text-center font-bold my-4 capitalize">
            สร้างหมวดหมู่สินค้า
          </h1>
          <div className="border p-4 rounded-md shadow-md">
            <CreateCategoriesForm />
          </div>
          <FetchCategories />
        </div>
      </section>
    </FadeUpWhenVisible>
    </main>
    
  )
}
export default createCategories