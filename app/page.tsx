import { Button } from "@/components/ui/button"
import Link from "next/link"

const Home = () => {
  return (
    <>
      {/* hero section */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center -mt-15 p-4">
        {/*CircleBackground*/}
        <div className="inset-0 pointer-events-none -z-10">
          <div className="w-80 h-80 absolute top-[-10rem] left-[-10rem] bg-primary rounded-full blur-3xl opacity-30" />
          <div className="w-80 h-80 absolute bottom-[-10rem] right-[-10rem] bg-primary rounded-full blur-3xl opacity-30" />
        </div>
        <h1 className="text-5xl md:text-6xl text-center text-primary font-bold">
          ขนมภัคจิรา
        </h1>
        <p className="text-lg md:text-xl text-center font-semiboldbold mb-2">
          ศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทย คัดสรรคุณภาพจากโรงงานโดยตรง ในราคาส่งสุดคุ้ม มีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการ ถูกจริง ส่งไว พร้อมจัดส่งทั่วประเทศ มั่นใจได้ทั้งเรื่องรสชาติและบริการ
        </p>
        <div className="flex gap-2">
          <Button asChild className="text-white shadow-md transition-all
                                    hover:scale-105 hover:shadow-lg duration-300">
            <Link href={"/productList"}>
              ดูสินค้าทั้งหมด
            </Link>
          </Button>
          <Button asChild className="text-white shadow-md transition-all
                                    hover:scale-105 hover:shadow-lg duration-300">
            <Link href={"/promotion"}>
              ดูโปรโมชั่น
            </Link>
          </Button>
        </div>
      </section>
      <section className="w-full min-h-screen">

      </section>
    </>
  )
}
export default Home