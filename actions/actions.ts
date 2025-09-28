"use server"

import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation"
import { cache } from "react"
import db from "@/utils/db"
import { categoriesSchema, imageSchema, imageSchemaPromotion, ProductSchema, profileSchema, PromotionSchema, validateWithZod } from '@/utils/schema'
import { revalidatePath } from 'next/cache'
import { deleteProductImage, deletePromotionImage, uploadFile, uploadPromotion } from '@/utils/supabase'
// helper function to get authenticated user
const getAuthUser = cache(async () => {
  const user = await currentUser()
  if (!user) throw new Error("User not authenticated")
  if (!user.privateMetadata.hasProfile) redirect("/createProfile")
  return user
})

// validation schema
export type FormState = { message: string, success?: boolean }
const renderError = (error: unknown): FormState => {
  return {
    message: error instanceof Error ? error.message : "An unknown error occurred",
    success: false,
  }
}

// profile
export const createProfileAction = async (
  _prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const user = await currentUser()
    if (!user) throw new Error("User not authenticated")
    const rawData = Object.fromEntries(formData.entries())
    const validatedData = validateWithZod(profileSchema, rawData)

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        profileImage: user.imageUrl || "",
        ...validatedData,
      }
    })

    const client = await clerkClient()
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: { hasProfile: true }
    })
  } catch (errors) {
    return renderError(errors)
  }
  redirect("/")
}

// Categories
export const createCategoriesAction = async (
  _prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const user = await currentUser()
    if (!user) throw new Error("User not authenticated")
    const rawData = Object.fromEntries(formData.entries())
    const validatedData = validateWithZod(categoriesSchema, rawData)
    const pathname = formData.get("pathname") as string
    await db.categories.create({
      data: {
        ...validatedData,
        profileId: user.id
      }
    })
    revalidatePath(pathname)
    return { message: "Categories created successfully", success: true }
  } catch (errors) {
    return renderError(errors)
  }
}

export const fetchCategoriest= cache(async () => {
  const Asset = await db.categories.findMany({
    select:{
      id:true,
      name:true,
    },
    orderBy: { createdAt: "asc" },
  })
  return Asset
})

export const deleteCategoriestAction = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const user = await getAuthUser()
    if (!user.privateMetadata.admin) {
      return { message: "Unauthorized", success: false }
    }

    const CategoriesId = formData.get("CategoriesId") as string
    const pathname = formData.get("pathname") as string

    if (!CategoriesId) {
      return { message: "CategoriestId is required", success: false }
    }

    await db.categories.delete({
      where: { id: CategoriesId },
    })
    revalidatePath(pathname)
    return { message: "Categoriest deleted", success: true }
  } catch (error) {
    return renderError(error)
  }
}

//Product
export const createProductAction = async (
  _prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const user = await getAuthUser()
    const rawData = Object.fromEntries(formData.entries())
    const file = formData.get("image") as File | null
    const validatedFile = validateWithZod(imageSchema, { image: file })
    const validatedData = validateWithZod(ProductSchema, rawData)
    const fullPath = await uploadFile(validatedFile.image)
    await db.product.create({
      data: {
        ...validatedData,
        image: fullPath,
        profileId: user.id
      }
    })
    return { message: "สร้างสินค้าสำเร็จ!", success: true }
  } catch (errors) {
    return renderError(errors)
  }
}
export const fetchProduct = cache(async ({ search = "", category }: { search?: string, category?: string }) => {
  const product = await db.product.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ]
    },
    orderBy: { createdAt: "asc" },
  })
  return product
})
export const fetchIsFavorite = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser()
  const favorite = await db.favorite.findFirst({
    where: { productId, profileId: user.id },
    select: { id: true }
  })

  return !!favorite
}
export const toggleFavoriteAction = async (
  { productId, pathname }: { productId: string; pathname: string },
  _prevState: FormState,
  _formData: FormData
): Promise<FormState> => {
  try {
    const user = await getAuthUser()

    const existingFavorite = await db.favorite.findUnique({
      where: { profileId_productId: { profileId: user.id, productId } }
    })

    if (existingFavorite) {
      await db.favorite.delete({ where: { id: existingFavorite.id } })
      revalidatePath(pathname)
      return { message: "เลิกถูกใจ", success: true }
    }

    await db.favorite.create({ data: { profileId: user.id, productId } })
    revalidatePath(pathname)
    return { message: "ถูกใจ", success: true }

  } catch (error) {
    return renderError(error)
  }
}
export const deleteProductAction = async ( 
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const user = await getAuthUser()
    if (!user.privateMetadata.admin) {
      return { message: "Unauthorized", success: false }
    }

    const productId = formData.get("productId") as string
    const pathname = formData.get("pathname") as string

    if (!productId) {
      return { message: "productId is required", success: false }
    }

    // 1) ดึง product record มาก่อนเพื่อลบรูป
    const product = await db.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return { message: "Product not found", success: false }
    }

    // 2) ถ้ามี image → ลบออกจาก Supabase
    if (product.image) {
      await deleteProductImage(product.image)
    }

    // 3) ลบ record จาก DB
    await db.product.delete({
      where: { id: productId },
    })

    revalidatePath(pathname || "/symbols")
    return { message: "Product deleted successfully", success: true }
  } catch (error) {
    return renderError(error)
  }
}
//fetchFavorites 
export const fetchFavorites = async () => {
  const user = await getAuthUser()
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id
    },
    select: {
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          category: true,
          retail:true,
          wholesale:true,
          perPieceCrate:true
        }
      }
    }
  })
  return favorites.map((favorite) => favorite.products)
}
//Product id
export const fetchProductDetail = cache(async ({ id }: { id: string }) => {
  return db.product.findFirst({
    where: { id },
    include: { profile: true },
  })
})
//Promotion
export const createPromotionAction = async (
  _prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const user = await getAuthUser()
    const rawData = Object.fromEntries(formData.entries())
    const file = formData.get("image") as File | null
    const validatedFile = validateWithZod(imageSchemaPromotion, { image: file })
    const validatedData = validateWithZod(PromotionSchema, rawData)
    const fullPath = await uploadPromotion(validatedFile.image)
    await db.promotion.create({
      data: {
        ...validatedData,
        image: fullPath,
        profileId: user.id
      }
    })
    return { message: "สร้างโปรโมชั่นสำเร็จ!", success: true }
  } catch (errors) {
    return renderError(errors)
  }
}
export const fetchPromotion = cache(async () => {
  const product = await db.promotion.findMany({
    orderBy: { createdAt: "asc" },
  })
  return product
})
export const deletePromotionAction = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const user = await getAuthUser()
    if (!user.privateMetadata.admin) {
      return { message: "Unauthorized", success: false }
    }

    const promotionId = formData.get("promotionId") as string
    const pathname = formData.get("pathname") as string

    if (!promotionId) {
      return { message: "promotionId is required", success: false }
    }

    // 1) ดึง promotion record
    const promotion = await db.promotion.findUnique({
      where: { id: promotionId },
    })

    if (!promotion) {
      return { message: "Promotion not found", success: false }
    }

    // 2) ลบรูปจาก Supabase
    if (promotion.image) {
      await deletePromotionImage(promotion.image)
    }

    // 3) ลบข้อมูลจาก DB
    await db.promotion.delete({
      where: { id: promotionId },
    })

    revalidatePath(pathname)
    return { message: "Promotion deleted", success: true }
  } catch (error) {
    return renderError(error)
  }
}
//Dashboard
export const fetchFavoritesDashboard = async () => {
  const favoritesCount = await db.favorite.groupBy({
    by: ["productId"],
    _count: {
      productId: true,
    },
  })
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
    },
  })
  return products.map((product) => {
    const count = favoritesCount.find((fav) => fav.productId === product.id)?._count.productId ?? 0
    return {
      ...product,
      favoritesCount: count,
    }
  })
}
