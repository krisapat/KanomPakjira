'use client'

import { useState } from "react"
import { FormState, toggleFavoriteAction } from "@/actions/actions"
import { usePathname } from "next/navigation"
import FormContainer from "../form/FormContainer"
import { CardSubmitButton } from "../form/SubmitButtons"

const FavoriteToggleForm = ({ isFavorite, productId }: { isFavorite: boolean, productId: string }) => {
  const pathname = usePathname()
  const [favoriteState, setFavoriteState] = useState(isFavorite)
  const [isLocked, setIsLocked] = useState(false)

  const toggleAction = async (prevState: FormState, _formData: FormData): Promise<FormState> => {
    if (isLocked) return prevState

    setIsLocked(true)
    setFavoriteState(prev => !prev) // Optimistic UI

    try {
      const result = await toggleFavoriteAction({ productId, pathname }, prevState, _formData)
      if (!result.success) setFavoriteState(prev => !prev) // rollback
      return result
    } catch {
      setFavoriteState(prev => !prev) // rollback
      return prevState
    } finally {
      setIsLocked(false)
    }
  }

  return (
    <FormContainer
      action={toggleAction}
      successMessage="ถูกใจสำเร็จ"
      failureMessage="ถูกใจไม่สำเร็จ"
    >
      <CardSubmitButton isFavorite={favoriteState} disabled={isLocked} />
    </FormContainer>
  )
}

export default FavoriteToggleForm