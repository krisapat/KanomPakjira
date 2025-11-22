import { fetchProductDetail } from "@/actions/actions"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductProps } from "@/utils/type"
import FavoriteToggleButton from "@/components/product/FavoriteToggleButton"
import { Button } from "@/components/ui/button"
import { SiLine } from "react-icons/si"
import { FaFacebookF } from "react-icons/fa"
import { Metadata } from "next"
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = await fetchProductDetail({ id })
    const { name } = project as ProductProps
    if (!project) {
        return {
            title: "ไม่พบสินค้า",
            description: "This project does not exist.",
        }
    }

    return {
        title: `ขนมภัคจิรา | ${name}`,
        description: "ขนมภัคจิรา ศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทยคัดสรรคุณภาพจากโรงงานโดยตรงในราคาส่งสุดคุ้มมีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการถูกจริงส่งไวพร้อมจัดส่งทั่วประเทศ",
    }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await fetchProductDetail({ id })
    if (!product) redirect("/")
    const { category, image, name, description, retail, wholesale, perPieceCrate } = product as ProductProps

    return (
        <section className="p-4">
            <Card className="max-w-md md:max-w-5xl w-full mx-auto rounded-md shadow-lg border overflow-hidden p-0">
                <div className="grid md:grid-cols-2">
                    {/* Image Section */}
                    <div className="relative w-full h-full min-h-[300px] aspect-square group overflow-hidden">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    </div>

                    {/* Detail Section */}
                    <CardContent className="flex flex-col p-6 space-y-6">

                        {/* Header Section */}
                        <CardHeader className="p-0 mb-6 flex justify-between items-start">
                            <CardTitle className="text-3xl font-bold">
                                {name}
                            </CardTitle>
                            <FavoriteToggleButton productId={id} />
                        </CardHeader>

                        {/* Category Badge */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <Badge className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border-none">
                                {category}
                            </Badge>
                        </div>

                        {/* 🔥 Contact Buttons moved up */}
                        <div className="flex flex-col lg:flex-row gap-4">
                            <Button asChild className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-md py-4 md:py-6 text-lg font-semibold shadow-md hover:shadow-lg transition">
                                <a href="https://line.me/ti/p/~0819949699" target="_blank" rel="noopener noreferrer">
                                    <SiLine className="w-6 h-6 mr-2" /> สั่งซื้อทาง Line
                                </a>
                            </Button>
                            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-4 md:py-6 text-lg font-semibold shadow-md hover:shadow-lg transition">
                                <a href="https://www.facebook.com/kanompakjira4289" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF className="w-6 h-6 mr-2" /> สั่งซื้อทาง Facebook
                                </a>
                            </Button>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600">
                            {description}
                        </p>

                        {/* Price Info Section */}
                        <div className="space-y-4 pt-4 border-t">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4 hover:shadow-md transition">
                                    <p className="text-sm text-gray-500">ราคาขายปลีก</p>
                                    <p className="text-xl font-semibold text-primary">
                                        {retail ? `฿${retail.toLocaleString()}` : "-"}
                                    </p>
                                </div>
                                <div className="rounded-xl border p-4 hover:shadow-md transition">
                                    <p className="text-sm text-gray-500">ราคาขายส่ง</p>
                                    <p className="text-xl font-semibold text-primary">
                                        {wholesale ? `฿${wholesale.toLocaleString()}` : "-"}
                                    </p>
                                </div>
                                <div className="rounded-xl border p-4 hover:shadow-md transition col-span-2">
                                    <p className="text-sm text-gray-500">จำนวนต่อ 1 ลัง</p>
                                    <p className="text-xl font-semibold text-primary">
                                        {perPieceCrate ? `${perPieceCrate} ชิ้น` : "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                </div>
            </Card>
        </section>
    )
}
