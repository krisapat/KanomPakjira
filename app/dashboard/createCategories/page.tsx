import FadeUpWhenVisible from "@/components/animation/FadeUpWhenVisible"
import CreateCategoriesForm from "@/components/dashboard/CreateCategoriesForm"
import FetchCategories from "@/components/dashboard/FetchCategories"
import { currentUser } from "@clerk/nextjs/server"

import { redirect } from "next/navigation"

const createCategories = async () => {
  const user = await currentUser()
  if (!user?.privateMetadata.admin) redirect("/")
  return (
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
  )
}
export default createCategories