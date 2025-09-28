"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CategoriesSelectProps {
  search?: string
  category?: string
  categories: { name: string }[] 
}

const CategoriesList = ({ search, category, categories }: CategoriesSelectProps) => {
  const router = useRouter()
  const searchTerm = search ? `&search=${search}` : ""

  const handleChange = (value: string) => {
    if (value === "all") {
      router.push(`/productList/?${searchTerm}`)
    } else {
      router.push(`/productList/?category=${value}${searchTerm}`)
    }
  }

  return (
    <div className="w-full max-w-30 bg-background dark:bg-background allborder rounded-md h-10">
      <Select
        onValueChange={handleChange}
        defaultValue={category || "all"}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="เลือกหมวดหมู่" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="kanitFont">สินค้าทั้งหมด</SelectItem>
          {categories.map((item) => (
            <SelectItem key={item.name} value={item.name} className="kanitFont">
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CategoriesList
