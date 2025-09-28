import { fetchFavorites } from "@/actions/actions";
import ProductList from "@/components/product/ProductList";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const favorite = async () => {
  const user = await currentUser()
    if (!user?.privateMetadata.hasProfile) redirect("/")
  const favorites = await fetchFavorites()
  return (
    <main className="p-4 space-y-4 flex flex-col items-center" >
      <h1 className="text-3xl text-center font-bold capitalize">สินค้าที่ถูกใจ</h1>
      <ProductList products={favorites} />
    </main>
  )
}
export default favorite