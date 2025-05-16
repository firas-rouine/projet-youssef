
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BrandFilterProps {
  selectedBrand: string;
  brands: string[];
  onBrandChange: (brand: string) => void;
}

export function BrandFilter({
  selectedBrand,
  brands,
  onBrandChange,
}: BrandFilterProps) {
  return (
    <div>
      <Label htmlFor="brand-select">Marque</Label>
      <Select value={selectedBrand || undefined} onValueChange={onBrandChange}>
        <SelectTrigger id="brand-select">
          <SelectValue placeholder="Toutes les marques" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les marques</SelectItem>
          {brands.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
