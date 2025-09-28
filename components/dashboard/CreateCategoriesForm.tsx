"use client"

import { createCategoriesAction } from "@/actions/actions"
import FormContainer from "../form/FormContainer"
import FormInput from "../form/FormInput"
import SubmitButtons from "../form/SubmitButtons"
import { usePathname } from "next/navigation"

const CreateCategoriesForm = () => {
    const pathname = usePathname()
    return (
        <FormContainer
            action={createCategoriesAction}
            className="flex flex-col max-w-lg mx-auto"
            successMessage="Create Categories Successfully"
            failureMessage="Create Categories Failed"
        >
            <div className="flex flex-col gap-2 mb-2">
                <FormInput
                    name="name"
                    label="ชื่อหมวดหมู่สินค้า"
                    type="text"
                    placeholder="Enter your first name"
                    className="space-y-2 w-full"
                />
                <input type="hidden" name="pathname" value={pathname} />
            </div>
            <SubmitButtons
                type="submit"
                size="lg"
                text="สร้างหมวดหมู่สินค้า"
                className="my-4 text-white shadow-md hover:scale-102 transition-transform duration-300"
            />
        </FormContainer>
    )
}
export default CreateCategoriesForm