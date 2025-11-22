import { createProductAction } from "@/actions/actions"
import FadeUpWhenVisible from "@/components/animation/FadeUpWhenVisible"
import CategoryInput from "@/components/form/CategoryInput"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import ImageInput from "@/components/form/ImageInput"
import SubmitButtons from "@/components/form/SubmitButtons"
import TextAreaInput from "@/components/form/TextAreaInput"
import { currentUser } from "@clerk/nextjs/server"
import { Metadata } from "next"
import { redirect } from "next/navigation"
export const metadata: Metadata = {
  title: "ขนมภัคจิรา | สร้างรายการสินค้า",
  description: "ขนมภัคจิรา ศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทยคัดสรรคุณภาพจากโรงงานโดยตรงในราคาส่งสุดคุ้มมีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการถูกจริงส่งไวพร้อมจัดส่งทั่วประเทศ",
};
const CreateProduct = async () => {
  const user = await currentUser()
  if (!user?.privateMetadata?.admin) redirect("/")
  return (
    <FadeUpWhenVisible>
      <section className="w-full p-4 flex justify-center items-center">
        <div className="border p-4 w-full max-w-2xl rounded-md shadow-md">
          <h1 className="text-3xl text-center font-bold mb-4 capitalize">
            สร้างสินค้า
          </h1>
          <div className="border p-4 rounded-md shadow-md">
            <FormContainer
              action={createProductAction}
              className="flex flex-col max-w-xl mx-auto"
              successMessage="สร้างสินค้าสำเร็จ"
              failureMessage="สร้างสินค้าไม่สำเร็จ"
            >
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <FormInput
                  name="name"
                  label="ชื่อสินค้า"
                  type="text"
                  placeholder="ใส่ชื่อสินค้า"
                  className="space-y-2 w-full"
                />
                {/* Category Input */}
                <CategoryInput />

              </div>
              {/* Description Input */}
              <TextAreaInput
                name="description"
                Labeltext="คำอธิบายสินค้า"
                defaultValue="ใส่คำอธิบายสินค้า"
              />
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <FormInput
                  name="retail"
                  label="ราคาขายปลีก"
                  type="number"
                  placeholder="ใส่ราคาปลีกสินค้า"
                  className="space-y-2 w-full"
                />
                <FormInput
                  name="wholesale"
                  label="ราคาขายส่ง"
                  type="number"
                  placeholder="ใส่ราคาขายส่ง"
                  className="space-y-2 w-full"
                />
                <FormInput
                  name="perPieceCrate"
                  label="จำชิ้นต่อ 1 ลัง"
                  type="number"
                  placeholder="ใส่จำชิ้นต่อ 1 ลัง"
                  className="space-y-2 w-full"
                />
                <ImageInput className="space-y-2 w-full" />
              </div>

              <SubmitButtons
                type="submit"
                size="lg"
                text="สร้างรายการสินค้า"
                className="shadow-md text-white hover:scale-102 transition-transform duration-300"
              />
            </FormContainer>
          </div>
        </div>
      </section>
    </FadeUpWhenVisible>
  )
}
export default CreateProduct