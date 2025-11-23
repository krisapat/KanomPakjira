import Link from "next/link"
import { Button } from "../ui/button"

const LinkPro = () => {
    return (
        <>
            <Button asChild className="text-white shadow-md transition-all
                                        hover:scale-105 hover:shadow-lg duration-300">
                <Link href={"/product"}>
                    ดูสินค้าทั้งหมด
                </Link>
            </Button>
            <Button asChild className="text-white shadow-md transition-all
                                        hover:scale-105 hover:shadow-lg duration-300">
                <Link href={"/promotion"}>
                    ดูโปรโมชั่น
                </Link>
            </Button>
        </>
    )
}
export default LinkPro