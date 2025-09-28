"use client"

import { deleteCategoriestAction } from "@/actions/actions"
import { usePathname } from "next/navigation"
import FormContainer from "../form/FormContainer"
import { CardDeleteButton } from "../form/SubmitButtons"

const DeleteCategoriesButton = ({ CategoriesId }: { CategoriesId: string }) => {
  const pathname = usePathname()

  return (
    <FormContainer
      action={deleteCategoriestAction}
      successMessage="Categories deleted"
      failureMessage="Failed to delete"
    >
      {/* hidden inputs เพื่อส่งค่าเข้า formData */}
      <input type="hidden" name="CategoriesId" value={CategoriesId} />
      <input type="hidden" name="pathname" value={pathname} />
      <CardDeleteButton />
    </FormContainer>
  )
}

export default DeleteCategoriesButton
