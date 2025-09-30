import { fetchPromotion } from "@/actions/actions";
import LoadingPromotionList from "@/components/promotion/LoadingPromotion";
import PromotionList from "@/components/promotion/PromotionList";
import { PromotionProps } from "@/utils/type";
import { Suspense } from "react";

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