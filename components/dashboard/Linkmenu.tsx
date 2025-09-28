import { LinkIcon } from "lucide-react"
import Link from "next/link";
const menus = [
    { label: "สร้างหมวดหมู่สินค้า", href: "/dashboard/createCategories" },
    { label: "สร้างรายการสินค้า", href: "/dashboard/createProduct" },
    { label: "สร้างโปรโมชั่น", href: "/dashboard/createPromotion" },
];
const Linkmenu = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row md:justify-between 
                            w-full overflow-hidden bg-card shadow-md rounded-md mx-auto mt-4">
                {menus.map((menu) => (
                    <div key={menu.href} className="bg-primary text-white w-full border-2 flex items-center justify-center p-4
                                                    transition-colors hover:bg-primary-foreground duration-300">
                    <Link
                        key={menu.href}
                        href={menu.href}
                        className="font-bold text-xl flex items-center gap-1"
                    >
                        {menu.label}
                        <LinkIcon className="w-[1em] h-[1em]" />
                    </Link>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Linkmenu