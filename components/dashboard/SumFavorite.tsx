import { fetchFavoritesDashboard } from "@/actions/actions"
import FavoritesTable from "./FavoritesTable"

export default async function FavoritesPage() {
  const products = await fetchFavoritesDashboard()
  return <FavoritesTable products={products} />
}
