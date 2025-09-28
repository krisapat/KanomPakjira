import { createClient } from '@supabase/supabase-js'

const bucket_name = "product-bucket"
const bucket_name_promotion = "promotion-bucket"
const url = process.env.SUPABASE_URL as string
const key = process.env.SUPABASE_KEY as string
// Create Supabase client
const supabase = createClient(url, key)

//product
export async function uploadFile(images: File) {
    const timeStamp = Date.now()
    const newName = `${timeStamp}-${images.name}`
    const { data, error } = await supabase.storage.from(bucket_name).upload(newName, images, { cacheControl: "3600" })
    if (!data) throw new Error('อัปโหลดรูปไม่สำเร็จ')
    return supabase.storage.from(bucket_name).getPublicUrl(newName).data.publicUrl
}
export async function deleteProductImage(publicUrl: string) {
  try {
    if (!publicUrl) return
    const parts = publicUrl.split(`${bucket_name}/`)
    if (parts.length < 2) return

    const filePath = parts[1] // เช่น "12345-test.png"
    const { error } = await supabase.storage.from(bucket_name).remove([filePath])
    if (error) throw error
  } catch (err) {
    console.error("ลบรูปจาก Supabase Storage ไม่สำเร็จ:", err)
  }
}

//promotion
export async function uploadPromotion(images: File) {
    const timeStamp = Date.now()
    const newName = `${timeStamp}-${images.name}`
    const { data, error } = await supabase.storage.from(bucket_name_promotion).upload(newName, images, { cacheControl: "3600" })
    if (!data) throw new Error('อัปโหลดรูปไม่สำเร็จ')
    return supabase.storage.from(bucket_name_promotion).getPublicUrl(newName).data.publicUrl
}
export async function deletePromotionImage(publicUrl: string) {
  try {
    if (!publicUrl) return
    const parts = publicUrl.split(`${bucket_name_promotion}/`)
    if (parts.length < 2) return

    const filePath = parts[1] // เช่น "12345-test.png"
    const { error } = await supabase.storage.from(bucket_name_promotion).remove([filePath])
    if (error) throw error
  } catch (err) {
    console.error("ลบรูปจาก Supabase Storage ไม่สำเร็จ:", err)
  }
}