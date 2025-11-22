import { createPromotionAction } from "@/actions/actions"
import FadeUpWhenVisible from "@/components/animation/FadeUpWhenVisible"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import ImageInput from "@/components/form/ImageInput"
import SubmitButtons from "@/components/form/SubmitButtons"
import TextAreaInput from "@/components/form/TextAreaInput"
import { currentUser } from "@clerk/nextjs/server"
import { Metadata } from "next"
import { redirect } from "next/navigation"
export const metadata: Metadata = {
  title: "ขนมภัคจิรา | สร้างโปรโมชั่น",
  description: "ขนมภัคจิรา ศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทยคัดสรรคุณภาพจากโรงงานโดยตรงในราคาส่งสุดคุ้มมีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการถูกจริงส่งไวพร้อมจัดส่งทั่วประเทศ",
};
const CreatePromotion = async () => {
  const user = await currentUser()
  if (!user?.privateMetadata?.admin) redirect("/")
  return (
    <FadeUpWhenVisible>
      <section className="w-full p-4 flex justify-center items-center">
        <div className="border p-4 w-full max-w-2xl rounded-md shadow-md">
          <h1 className="text-3xl text-center font-bold mb-4 capitalize">
            สร้างโปรโมชั่น
          </h1>
          <div className="border p-4 rounded-md shadow-md">
            <FormContainer
              action={createPromotionAction}
              className="flex flex-col max-w-xl mx-auto"
              successMessage="สร้างโปรโมชั่นสำเร็จ"
              failureMessage="สร้างโปรโมชั่นไม่สำเร็จ"
            >
              <div className="w-full mb-2">
                <FormInput
                  name="name"
                  label="ชื่อโปรโมชั่น"
                  type="text"
                  placeholder="ใส่ชื่อโปรโมชั่น"
                  className="space-y-2 w-full"
                />
              </div>
              {/* Description Input */}
              <TextAreaInput
                name="description"
                Labeltext="คำอธิบายโปรโมชั่น"
                defaultValue="ใส่คำอธิบายโปรโมชั่น"
              />
              <div className="w-full mb-2">
                <ImageInput className="space-y-2 w-full" />
              </div>

              <SubmitButtons
                type="submit"
                size="lg"
                text="สร้างโปรโมชั่น"
                className="shadow-md text-white hover:scale-102 transition-transform duration-300"
              />
            </FormContainer>
          </div>
        </div>
      </section>
    </FadeUpWhenVisible>
  )
}
export default CreatePromotion