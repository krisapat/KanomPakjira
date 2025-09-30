import { PromotionProps } from "@/utils/type"
import PromotionCard from "./PromotionCard"
import FadeUpWhenVisible from "../animation/FadeUpWhenVisible"

const PromotionList = ({ promotions }: { promotions: PromotionProps[] }) => {
    return (
        <section className="flex flex-wrap gap-4 justify-center">
            {
                promotions.map((promotions) => {
                    return (
                        <FadeUpWhenVisible key={promotions.id}>
                            <PromotionCard  promotions={promotions} />
                        </FadeUpWhenVisible>
                    )
                })
            }
        </section>
    )
}
export default PromotionList