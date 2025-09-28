import { z } from "zod"

// Define a schema for user profile data
export const profileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  userName: z.string().min(1, { message: "Username is required" }),
  age: z.coerce.number().int().min(0, { message: "Age must be a positive number" }),
})

export const validateWithZod = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> => {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.issues.map((err) => err.message).join(", ")
    throw new Error(errors)
  }
  return result.data
}

export const categoriesSchema = z.object({
  name: z.string().min(1, { message: "First name is required" }),
})
// schema product
const validateImage = z
  .instanceof(File)
  .refine((file) => file.size <= 2 * 1024 * 1024, {
    message: "File size should be less than 2MB"
  })

export const imageSchema = z.object({
  image: validateImage,
})
export const ProductSchema = z.object({
  name: z.string().min(1, { message: "โปรดใส่ชื่อสินค้า" }),
  description: z.string().min(1, { message: "โปรดใส่คำอธิบายสินค้า" }),
  category: z.string(),
  retail: z.coerce.number().int().min(0, { message: "โปรดใส่ราคาขายปลีกเป็นจำนวนเต็มบวก" }),
  wholesale: z.coerce.number().int().min(0, { message: "โปรดใส่ราคาขายส่งเป็นจำนวนเต็มบวก" }),
  perPieceCrate: z.coerce.number().int().min(0, { message: "โปรดใส่จำนวนสินค้าต่อ 1 ลัง" }),
})
// schema promotion
const validateImagePromotion = z
  .instanceof(File)
  .refine((file) => file.size <= 2 * 1024 * 1024, {
    message: "File size should be less than 2MB"
  })

export const imageSchemaPromotion = z.object({
  image: validateImagePromotion,
})
export const PromotionSchema = z.object({
  name: z.string().min(1, { message: "โปรดใส่ชื่อสินค้า" }),
  description: z.string().min(1, { message: "โปรดใส่คำอธิบายสินค้า" }),
})