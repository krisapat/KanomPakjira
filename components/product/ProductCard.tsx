import { ProductProps } from "@/utils/type"
import FavoriteToggleButton from "./FavoriteToggleButton"
import DeleteToggleButton from "./DeleteToggleButton"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"

const ProductCard = async ({ products }: { products: ProductProps }) => {
    const { name, image, id, retail, category } = products
    const user = await currentUser()
    const isAdmin = (user?.privateMetadata as { admin?: boolean })?.admin ?? false
    console.log(image)
    return (
        <article className="group relative w-33 sm:w-45 rounded-md overflow-hidden border bg-background dark:bg-background shadow-md 
        hover:shadow-xl transition-shadow duration-300 allborder">
            <Link href={`/product/${id}`}>
                {/* Image Section */}
                <div className="relative h-33 sm:h-45 w-full overflow-hidden">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col space-y-2">
                    <h2 className="text-md md:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {name}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">{category}</p>

                    <div className="flex items-center justify-between">
                        <span className="text-md md:text-xl font-bold text-primary">
                            ราคา {retail} บาท
                        </span>
                    </div>
                </div>
            </Link>
            <div className="absolute top-1 right-1 flex flex-col space-y-2">
                <FavoriteToggleButton productId={id} />
                {isAdmin && <DeleteToggleButton productId={id} />}             
            </div>
        </article>
    )
}

export default ProductCard
