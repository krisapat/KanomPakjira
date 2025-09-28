import { auth } from '@clerk/nextjs/server'
import { fetchIsFavorite } from "@/actions/actions"
import FavoriteToggleForm from "./FavoriteToggleForm"
import { SignInCardButton } from '../form/SubmitButtons'

const FavoriteToggleButton = async ({ productId }: { productId: string }) => {
  const { userId } = await auth()
  if (!userId) return <SignInCardButton />

  const isFavorite = await fetchIsFavorite({ productId })

  return (
    <FavoriteToggleForm
      isFavorite={isFavorite}
      productId={productId}
    />
  )
}
export default FavoriteToggleButton