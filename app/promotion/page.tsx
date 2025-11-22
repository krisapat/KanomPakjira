import { fetchPromotion } from "@/actions/actions";
import LoadingPromotionList from "@/components/promotion/LoadingPromotion";
import PromotionList from "@/components/promotion/PromotionList";
import { PromotionProps } from "@/utils/type";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "ขนมภัคจิรา | โปรโมชั่น",
  description: "ขนมภัคจิรา รวมโปรโมชั่นศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทยคัดสรรคุณภาพจากโรงงานโดยตรงในราคาส่งสุดคุ้มมีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการถูกจริงส่งไวพร้อมจัดส่งทั่วประเทศ",
};
const promotionPage = async () => {
  const promotion: PromotionProps[] = await fetchPromotion();
  return (
    <main className="p-4 space-y-4 flex flex-col items-center" >
      <h1 className="text-3xl text-center">โปรโมชั่น</h1>
      <Suspense fallback={<LoadingPromotionList />}>
        <PromotionList promotions={promotion} />
      </Suspense>
    </main>
  )
}
export default promotionPage