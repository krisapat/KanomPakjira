import { fetchCategoriest } from "@/actions/actions"
import DeleteCategoriesButton from "./DeleteCategoriesButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const FetchCategories = async () => {
  const categories = await fetchCategoriest()
  if (!categories || categories.length === 0) {
    return (
        <Card className="mx-auto mt-6 p-6 text-center">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">หมวดหมู่</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">ยังไม่มีหมวดหมู่ที่สร้าง</p>
          </CardContent>
        </Card>
    )
  }
  return (
      <Card className="mx-auto rounded-md shadow-md mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">หมวดหมู่ที่สร้างแล้ว</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category, idx) => (
              <div key={category.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{idx + 1}</Badge>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <DeleteCategoriesButton CategoriesId={category.id} />
                </div>
                {idx < categories.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
  )
}

export default FetchCategories
