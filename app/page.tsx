import { fetchFavoritesDashboard, fetchProductImage } from "@/actions/actions";
import FadeUpWhenVisible from "@/components/animation/FadeUpWhenVisible";
import LinkPro from "@/components/home/LinkPro";
import Reorder from "@/components/home/Reorder";
import Swiper_pro from "@/components/home/Swiper_pro";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { FaFacebookF } from "react-icons/fa";
import { SiLine } from "react-icons/si";
export const metadata: Metadata = {
  title: "ขนมภัคจิรา | หน้าหลัก",
  description: "ขนมภัคจิรา ศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทยคัดสรรคุณภาพจากโรงงานโดยตรงในราคาส่งสุดคุ้มมีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการถูกจริงส่งไวพร้อมจัดส่งทั่วประเทศ",
};
function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5)
}
const Home = async () => {
  const allProducts = await fetchProductImage()
  const mostProducts = (await fetchFavoritesDashboard()).slice(0, 5)
  const products = shuffle(allProducts).slice(0, 4)
  return (
    <section className="relative overflow-hidden">
      {/* hero section */}
      <FadeUpWhenVisible>
        <section className="relative w-full  min-h-screen flex flex-col justify-center items-center -mt-15 p-4 space-y-4">
          <div className=" inset-0 pointer-events-none -z-10">
            <div className="overflow-x-hidden w-80 h-80 absolute top-[-10rem] left-[-10rem] bg-linear-to-r from-[#FB2C36] to-[#FB6A36] rounded-full blur-3xl opacity-30" />
            <div className="overflow-x-hidden w-80 h-80 absolute bottom-[-10rem] right-[-10rem] bg-linear-to-r from-[#FB2C36] to-[#FB6A36] rounded-full blur-3xl opacity-30" />
          </div>
          <h1 className="text-5xl md:text-6xl text-center bg-linear-to-r from-[#FB2C36] to-[#FB6A36] bg-clip-text text-transparent font-bold ">
            ขนมภัคจิรา
          </h1>
          <p className="text-lg md:text-lg text-center text-gray-700 dark:text-gray-300 w-full max-w-2xl">
            ศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทย คัดสรรคุณภาพจากโรงงานโดยตรง ในราคาส่งสุดคุ้ม มีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการ ถูกจริง ส่งไว พร้อมจัดส่งทั่วประเทศ
          </p>
          <div className="flex gap-2">
            <LinkPro />
          </div>
          <Reorder images={products.map((p) => p.image)} />
        </section>
      </FadeUpWhenVisible>
      <section className="flex flex-col justify-center items-center">
        <h2 className="text-5xl md:text-6xl text-center bg-linear-to-r from-[#FB2C36] to-[#FB6A36] bg-clip-text text-transparent font-bold -mb-0">
          สินค้ายอดนิยม
        </h2>
        <Swiper_pro products={mostProducts} />
        <div className="flex gap-2 mt-5">
          <LinkPro />
        </div>
      </section>
      <section id="contact" className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
        <FadeUpWhenVisible>
          <div className="max-w-6xl mx-auto relative border">
            <div className="relative z-10 bg-white
        dark:bg-gray-800 rounded-md p-10 shadow-md">
              <h2 className="text-xl md:text-3xl text-center font-extrabold mb-10">
                สั่งเลยที่
              </h2>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                {/* Facebook Contact */}
                <Card className="w-full max-w-[320px] shadow-lg hover:shadow-xl transition-transform hover:scale-105">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <FaFacebookF className="w-10 h-10 text-blue-600" />
                    <CardTitle className="text-xl font-semibold">Facebook</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <p className="text-sm text-muted-foreground mb-4">
                      ขนมภัคจิรา - Kanom Pakjira
                    </p>

                    {/* ปุ่มชิดล่าง */}
                    <Button
                      asChild
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md mt-auto"
                    >
                      <a
                        href="https://www.facebook.com/kanompakjira4289"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ไปที่ Facebook
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Line Contact */}
                <Card className="w-full max-w-[320px] shadow-lg hover:shadow-xl transition-transform hover:scale-105">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <SiLine className="w-10 h-10 text-green-500" />
                    <CardTitle className="text-xl font-semibold">Line</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <p className="text-sm text-muted-foreground mb-4">
                      ขนมภัคจิรา_4289
                    </p>

                    {/* ปุ่มชิดล่าง */}
                    <Button
                      asChild
                      className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md mt-auto"
                    >
                      <a
                        href="https://line.me/ti/p/~0819949699"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        แชททาง Line
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <h2 className="text-xl md:text-2xl text-center font-medium mt-10">
                ขนมจัดส่งทุกวัน
              </h2>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-28 h-28 bg-primary rounded-full animate-pulse-scale blur-lg opacity-30"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary rounded-full animate-bounce-gentle blur-lg opacity-30"></div>
          </div>
        </FadeUpWhenVisible>
      </section>
    </section>
  )
}
export default Home