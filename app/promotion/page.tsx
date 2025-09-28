import { fetchPromotion } from "@/actions/actions";
import PromotionList from "@/components/promotion/PromotionList";
import { PromotionProps } from "@/utils/type";

const promotionPage = async () => {
  const promotion: PromotionProps[] = await fetchPromotion();
  return (
    <main className="p-4 space-y-4 flex flex-col items-center" >
      <PromotionList promotions={promotion} />
    </main>
  )
}
export default promotionPage