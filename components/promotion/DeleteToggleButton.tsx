"use client"

import { deletePromotionAction } from "@/actions/actions"
import { usePathname } from "next/navigation"
import FormContainer from "../form/FormContainer"
import { CardDeleteButton } from "../form/SubmitButtons"

const DeletePromotionButton = ({ promotionId }: { promotionId: string }) => {
  const pathname = usePathname()

  return (
    <FormContainer
      action={deletePromotionAction}
      successMessage="Promotion deleted"
      failureMessage="Failed to delete"
    >
      {/* hidden inputs เพื่อส่งค่าเข้า formData */}
      <input type="hidden" name="promotionId" value={promotionId} />
      <input type="hidden" name="pathname" value={pathname} />
      <CardDeleteButton />
    </FormContainer>
  )
}

export default DeletePromotionButton