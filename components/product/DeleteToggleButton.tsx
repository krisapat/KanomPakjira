"use client"

import { deleteProductAction } from "@/actions/actions"
import { usePathname } from "next/navigation"
import FormContainer from "../form/FormContainer"
import { CardDeleteButton } from "../form/SubmitButtons"

const DeleteToggleButton = ({ productId }: { productId: string }) => {
  const pathname = usePathname()

  return (
    <FormContainer
      action={deleteProductAction}
      successMessage="Product deleted"
      failureMessage="Failed to delete"
    >
      {/* hidden inputs เพื่อส่งค่าเข้า formData */}
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="pathname" value={pathname} />
      <CardDeleteButton />
    </FormContainer>
  )
}

export default DeleteToggleButton