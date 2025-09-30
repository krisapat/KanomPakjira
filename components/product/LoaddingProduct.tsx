import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const LoadingProduct = () => {
  return (
    <Card className="w-33 sm:w-45 rounded-md overflow-hidden shadow-md p-0">
      {/* Image Skeleton */}
      <div className="relative h-33 sm:h-45 w-full">
        <Skeleton className="w-full h-full" />
      </div>

      <CardContent className="p-4 flex flex-col space-y-3">
        {/* Title Skeleton */}
        <Skeleton className="h-4 w-3/4" />
        {/* Category Skeleton */}
        <Skeleton className="h-3 w-1/3" />
        {/* Price Skeleton */}
        <Skeleton className="h-5 w-1/2" />
      </CardContent>
    </Card>
  )
}

const LoadingProductList = () => {
  return (
    <section className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2 md:gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <LoadingProduct key={i} />
      ))}
    </section>
  )
}

export default LoadingProductList
