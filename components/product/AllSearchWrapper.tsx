// AllSearchWrapper.tsx
import { fetchCategoriest } from "@/actions/actions"
import AllSearch from "./AllSeach"


type Props = {
  search?: string
  category?: string
}

const AllSearchWrapper = async ({ search, category }: Props) => {
  const categories = await fetchCategoriest() // SSR, fetch ข้อมูลจาก DB
  return (
    <AllSearch search={search} category={category} categories={categories} />
  )
}

export default AllSearchWrapper
