"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type Product = {
  id: string
  name: string
  favoritesCount: number
}

export default function FavoritesTable({ products }: { products: Product[] }) {
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")

  // ✅ เรียงข้อมูลตาม favoritesCount
  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === "desc"
      ? b.favoritesCount - a.favoritesCount
      : a.favoritesCount - b.favoritesCount
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="!bg-primary text-white hover:!bg-primary-foreground hover:!text-white"
        >
          Sort: {sortOrder === "desc" ? "มาก → น้อย" : "น้อย → มาก"}
        </Button>
      </div>

      <div className="rounded-md overflow-hidden shadow-md border border-gray-300">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="text-white text-center border-r">
                ชื่อสินค้า
              </TableHead>
              <TableHead className="text-white text-center">
                จำนวนการกดถูกใจสินค้า
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <AnimatePresence>
              {sortedProducts.map((product, i) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-300 text-center"
                >
                  <TableCell className="border-r">{product.name}</TableCell>
                  <TableCell>{product.favoritesCount}</TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
