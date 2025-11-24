import { createProfileAction } from "@/actions/actions"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import SubmitButtons from "@/components/form/SubmitButtons"
import { currentUser } from "@clerk/nextjs/server"
import { Metadata } from "next"
import { redirect } from "next/navigation"
export const metadata: Metadata = {
  title: "ขนมภัคจิรา | สร้างโปรไฟล์",
  description: "ขนมภัคจิรา รวมรายการสินค้ารวมโปรโมชั่นศูนย์รวมขนมทานเล่นและผลไม้แปรรูปจากทั่วไทยคัดสรรคุณภาพจากโรงงานโดยตรงในราคาส่งสุดคุ้มมีบริการขายสินค้าราคาส่งสำหรับร้านค้าและผู้ประกอบการถูกจริงส่งไวพร้อมจัดส่งทั่วประเทศ",
};
const Create = async () => {
  const user = await currentUser()
  if (user?.privateMetadata.hasProfile) redirect("/")
  return (
    <section className="w-full h-[80vh] flex justify-center items-center">
      <div className="border p-4 w-[95vw] max-w-2xl rounded-md shadow-md">
        <FormContainer
          action={createProfileAction}
          className="flex flex-col max-w-lg mx-auto"
          successMessage="Create Profile Successfully"
          failureMessage="Create Profile Failed"
        >
          <h1 className="text-2xl text-center font-bold my-4 capitalize">
            Create Profile
          </h1>
          <div className="flex flex-col gap-2 mb-2">
            <FormInput
              name="firstName"
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              className="space-y-2 w-full"
            />
            <FormInput
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              className="space-y-2 w-full"
            />
            <FormInput
              name="userName"
              label="Username"
              type="text"
              placeholder="Enter your username"
              className="space-y-2 w-full"
            />
            <FormInput
              name="age"
              label="Age"
              type="text"
              placeholder="Enter your Age"
              className="space-y-2 w-full"
            />
          </div>
          <SubmitButtons
            type="submit"
            size="lg"
            text="Create Profile"
            className="my-4 shadow-md text-white hover:scale-102 transition-transform duration-300"
          />
          <p><span className="font-bold">*หมายเหตุ</span> : ข้อมูลที่กรอกจะถูกใช้เพื่อวิเคราะห์การใช้งานและปรับปรุงฟีเจอร์ภายในระบบเท่านั้น</p>
        </FormContainer>
      </div>
    </section>
  )
}
export default Create