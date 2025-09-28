import { fetchProductDetail } from "@/actions/actions"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductProps } from "@/utils/type"
import FavoriteToggleButton from "@/components/product/FavoriteToggleButton"
import { Button } from "@/components/ui/button"
import { Facebook, MessageCircle } from "lucide-react"

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

                        <CardHeader className="p-0 mb-6 flex justify-between items-start">
                            <CardTitle className="text-3xl font-bold">
                                {name}
                            </CardTitle>
                            <FavoriteToggleButton productId={id} />
                        </CardHeader>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <Badge className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border-none">
                                {category}
                            </Badge>
                        </div>

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

                        {/* Contact Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                            <Button asChild className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl">
                                <a href="https://line.me/ti/p/your-line-id" target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="w-5 h-5 mr-2" /> ติดต่อทาง Line
                                </a>
                            </Button>
                            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                                <a href="https://facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer">
                                    <Facebook className="w-5 h-5 mr-2" /> ติดต่อทาง Facebook
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </section>
    )
}
