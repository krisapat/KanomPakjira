import { PromotionProps } from "@/utils/type"
import PromotionCard from "./PromotionCard"

const PromotionList = ({ promotions }: { promotions: PromotionProps[] }) => {
    return (
        <section className="flex flex-col space-y-4 justify-center">
            <h1 className="text-3xl text-center">โปรโมชั่น</h1>
            <div className="flex flex-wrap gap-4 justify-center">
            {
                promotions.map((promotions) => {
                    return <PromotionCard key={promotions.id} promotions={promotions} />
                })
            }
            </div>
        </section>
    )
}
export default PromotionList