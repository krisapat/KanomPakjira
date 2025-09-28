type NavLink = {
  name: string
  path: string
  requireAdmin?: boolean
}

export const profileLinks: NavLink[] = [
  { path: "/favorite", name: "สินค้าที่ถูกใจ" },
  { path: "/dashboard", name: "แดชบอร์ด", requireAdmin: true },
]

export const menuLink: NavLink[] = [
  { path: "/", name: "หน้าหลัก" },
  { path: "/productList", name: "สินค้าทั้งหมด" },
  { path: "/promotion", name: "โปรโมชั่น" },
]