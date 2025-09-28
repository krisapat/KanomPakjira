import { Label } from "../ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { fetchCategoriest } from "@/actions/actions"
const CategoryInput = async ({ defaultValue }: { defaultValue?: string }) => {
    const name = "category"
    const categories = await fetchCategoriest()
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={name} className="capitalize">{name}</Label>
            <Select
                name={name}
                required
                defaultValue={defaultValue || categories[0].name}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                            <span className="capitalize">{category.name}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
export default CategoryInput