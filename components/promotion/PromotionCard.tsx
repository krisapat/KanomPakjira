import { PromotionProps } from "@/utils/type"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import DeleteToggleButton from "../product/DeleteToggleButton"
import DeletePromotionButton from "./DeleteToggleButton"

const PromotionCard = async ({ promotions }: { promotions: PromotionProps }) => {
    const { name, image, id, description } = promotions
    const user = await currentUser()
    const isAdmin = (user?.privateMetadata as { admin?: boolean })?.admin ?? false

    return (
        <article className="group relative w-[90vw] max-w-[500px] rounded-md overflow-hidden border bg-background shadow-md hover:shadow-xl transition duration-300">
            {/* Image Section */}
            <div className="relative h-auto max-h-[500px] w-full aspect-square overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h2 className="text-lg md:text-xl font-bold mb-1 truncate">{name}</h2>
                    <p className="text-sm md:text-base text-gray-200 line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
                <div className="absolute top-2 right-2">
                    <DeletePromotionButton promotionId={id} />
                </div>
            )}
        </article>
    )
}

export default PromotionCard
