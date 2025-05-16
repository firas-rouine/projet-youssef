
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFilterProps {
  category: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  category,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div>
      <Label htmlFor="category-select">Catégorie</Label>
      <Select value={category || undefined} onValueChange={onCategoryChange}>
        <SelectTrigger id="category-select">
          <SelectValue placeholder="Toutes les catégories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          <SelectItem value="économique">Économique</SelectItem>
          <SelectItem value="standard">Standard</SelectItem>
          <SelectItem value="premium">Premium</SelectItem>
          <SelectItem value="luxe">Luxe</SelectItem>
          <SelectItem value="utilitaire">Utilitaire</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
