import { fetchFavorites } from "@/actions/actions";
import LoadingProductList from "@/components/product/LoaddingProduct";
import ProductList from "@/components/product/ProductList";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "ขนมภัคจิรา | สินค้าที่ถูกใจ",
  description: "ขนมภัคจิรา ศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทยคัดสรรคุณภาพจากโรงงานโดยตรงในราคาส่งสุดคุ้มมีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการถูกจริงส่งไวพร้อมจัดส่งทั่วประเทศ",
};
const favorite = async () => {
  const user = await currentUser()
    if (!user?.privateMetadata.hasProfile) redirect("/")
  const favorites = await fetchFavorites()
  return (
    <main className="p-4 space-y-4 flex flex-col items-center" >
      <h1 className="text-3xl text-center font-bold capitalize">สินค้าที่ถูกใจ</h1>
      <Suspense fallback={<LoadingProductList />}>
      <ProductList products={favorites} />
      </Suspense>
    </main>
  )
}
export default favorite