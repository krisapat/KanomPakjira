import { fetchProduct } from "@/actions/actions";
import AllSearchWrapper from "@/components/product/AllSearchWrapper";
import LoadingProductList from "@/components/product/LoaddingProduct";
import ProductList from "@/components/product/ProductList";
import { ProductProps } from "@/utils/type";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "ขนมภัคจิรา | สินค้าทั้งหมด",
  description: "ขนมภัคจิรา รวมรายการสินค้ารวมโปรโมชั่นศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทยคัดสรรคุณภาพจากโรงงานโดยตรงในราคาส่งสุดคุ้มมีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการถูกจริงส่งไวพร้อมจัดส่งทั่วประเทศ",
};
const productList = async ({ searchParams }: { searchParams: Promise<{ search?: string, category?: string }> }) => {
  const { search, category } = await searchParams
  const products: ProductProps[] = await fetchProduct({ search, category });
  return (
    <main className="p-4 space-y-4 flex flex-col items-center" >
      <h1 className="text-3xl text-center font-bold capitalize">รายการสินค้า</h1>
      <AllSearchWrapper search={search} category={category} data-speed="0" />
      <Suspense fallback={<LoadingProductList />}>
        <ProductList products={products} />
      </Suspense>
    </main>
  )
}
export default productList