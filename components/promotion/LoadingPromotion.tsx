import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const LoadingPromotion = () => {
    return (
        <Card className="h-auto max-h-[500px] w-[90vw] max-w-[500px] aspect-square rounded-md overflow-hidden border p-0 flex flex-col justify-between">
            {/* ด้านบนจะเป็นที่ว่าง */}
            <div />

            {/* เนื้อหาลงมาล่าง */}
            <CardContent className="p-4 flex flex-col space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
            </CardContent>
        </Card>
    )
}

const LoadingPromotionList = () => {
    return (
        <section className="flex flex-wrap gap-4 justify-center">
            {Array.from({ length: 1 }).map((_, i) => (
                <LoadingPromotion key={i} />
            ))}
        </section>
    )
}

export default LoadingPromotionList
