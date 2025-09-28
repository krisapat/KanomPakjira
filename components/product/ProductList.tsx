import { ProductProps } from "@/utils/type"
import ProductCard from "./ProductCard"

const ProductList = ({ products }: { products: ProductProps[] }) => {
    return (
        <section className="
        flex flex-wrap gap-4 justify-center
        ">
            {
                products.map((products) => {
                    return <ProductCard key={products.id} products={products} />
                })
            }
        </section>
    )
}
export default ProductList