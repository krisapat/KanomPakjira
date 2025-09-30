'use client'

import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import 'swiper/css'
import 'swiper/css/navigation'
import Image from 'next/image'
import type { Swiper as SwiperType } from 'swiper'

type Product = {
    id: string
    name: string
    image: string
    retail: number
    favoritesCount: number
}

export default function Swiper_pro({ products }: { products: Product[] }) {
    const prevRef = useRef<HTMLButtonElement>(null)
    const nextRef = useRef<HTMLButtonElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)

    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    )

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (
            swiperInstance &&
            prevRef.current &&
            nextRef.current &&
            typeof swiperInstance.params.navigation !== 'boolean' &&
            swiperInstance.params.navigation
        ) {
            swiperInstance.params.navigation.prevEl = prevRef.current
            swiperInstance.params.navigation.nextEl = nextRef.current
            if (swiperInstance.navigation) {
                swiperInstance.navigation.destroy()
                swiperInstance.navigation.init()
                swiperInstance.navigation.update()
            }
        }
    }, [swiperInstance])

    return (
        <div className="w-[90vw] mx-auto relative overflow-visible">
            {/* Navigation Buttons */}
            <Button
                ref={prevRef}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 w-12 md:w-14 h-12 md:h-14 rounded-full bg-white flex items-center justify-center text-black shadow-lg
                    transition-colors duration-300 hover:bg-primary hover:text-white focus:outline-none focus:ring-4 focus:ring-black/30 cursor-pointer"
                aria-label="Previous Slide"
            >
                <ChevronLeft size={28} />
            </Button>

            <Button
                ref={nextRef}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20 w-12 md:w-14 h-12 md:h-14 rounded-full bg-white flex items-center justify-center text-black shadow-lg
                    transition-colors duration-300 hover:bg-primary hover:text-white focus:outline-none focus:ring-4 focus:ring-black/30 cursor-pointer"
                aria-label="Next Slide"
            >
                <ChevronRight size={28} />
            </Button>

            {/* Swiper */}
            <Swiper
                key={windowWidth}
                modules={[Autoplay, Navigation]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                spaceBetween={20}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {products.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="max-w-[320px] w-[90%] rounded-md bg-background shadow-lg 
                        flex flex-col justify-between items-center my-8 mx-auto p-4 allborder
                        transform transition-transform duration-300 hover:scale-103">
                            {/* ชื่อสินค้า */}
                            <h3 className="text-2xl font-semibold mb-2 text-center">
                                {item.name}
                            </h3>

                            {/* รูปภาพ */}
                            <div className="relative w-full aspect-square mb-4">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>

                            {/* ราคา */}
                            <p className="text-primary font-bold text-xl">
                                ราคา {item.retail} บาท
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-2">
                {products.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-primary' : 'w-2.5 bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
