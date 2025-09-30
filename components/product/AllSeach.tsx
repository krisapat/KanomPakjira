"use client"

import { useState, useEffect } from "react"
import CategoriesList from "./CategoriesList"
import Search from "./Search"

type Props = {
  search?: string
  category?: string
  categories: { name: string }[]
}

export default function AllSearch({ search, category, categories }: Props) {
  const [translate, setTranslate] = useState("translate-y-0") // เริ่มต้น top
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY === 0) {
        setTranslate("translate-y-0") // อยู่บนสุด
      } else if (currentScrollY > lastScrollY) {
        setTranslate("translate-y-0") // scroll ลง → เลื่อนขึ้นซ่อน
      } else {
        setTranslate("translate-y-12") // scroll ขึ้น → เลื่อนลงโชว์
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`flex w-full max-w-2xl space-x-1 items-center justify-center
                  bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md p-1 rounded-md allborder z-50
                  transition-transform duration-300 ${translate}`}
    >
      <Search />
      <CategoriesList search={search} category={category} categories={categories} />
    </div>
  )
}
