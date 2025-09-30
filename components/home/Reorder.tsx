'use client'

import * as motion from 'motion/react-client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Transition } from 'motion'

type ReorderingProps = {
  images: string[]
}

export default function Reorder({ images }: ReorderingProps) {
  const [order, setOrder] = useState<string[]>(images)

  useEffect(() => {
    const timeout = setTimeout(() => setOrder(shuffle(order)), 2000)
    return () => clearTimeout(timeout)
  }, [order])

  return (
    <ul className="grid w-full max-w-5xl grid-cols-2 gap-4 px-4 mx-auto sm:grid-cols-4 pointer-events-none">
  {order.map((imageUrl) => (
    <motion.li
      key={imageUrl}
      layout
      transition={spring}
      className="relative aspect-square max-h-[220px] overflow-hidden rounded-md shadow-md transition-shadow duration-300 hover:shadow-lg"
    >
      <Image
        src={imageUrl}
        alt="snack"
        fill
        sizes="(max-width: 640px) 50vw, 25vw"
        className="object-cover object-center rounded-md"
        priority={false}
      />
    </motion.li>
  ))}
</ul>

  )
}

function shuffle([...array]: string[]): string[] {
  return array.sort(() => Math.random() - 0.5)
}

const spring: Transition = {
  type: 'spring',
  damping: 30,
  stiffness: 200,
}
