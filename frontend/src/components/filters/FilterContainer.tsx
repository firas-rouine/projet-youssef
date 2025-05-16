
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { carService } from "@/services/carService";
import { BrandFilter } from "./BrandFilter";
import { CategoryFilter } from "./CategoryFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { DateRangeFilter } from "./DateRangeFilter";
import { CheckboxFilters } from "./CheckboxFilters";
import { FilterActions } from "./FilterActions";

interface FilterContainerProps {
  onApplyFilters: (filters: {
    brand?: string;
    hasAC?: boolean;
    driverAvailable?: boolean;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    dateRange?: {
      startDate: string;
      endDate: string;
    };
  }) => void;
}

export function FilterContainer({ onApplyFilters }: FilterContainerProps) {
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [hasAC, setHasAC] = useState<boolean | undefined>(undefined);
  const [driverAvailable, setDriverAvailable] = useState<boolean | undefined>(
    undefined
  );
  const [price, setPrice] = useState<[number, number]>([0, 1000]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  // Load brands and price range on component mount
  useEffect(() => {
    const loadFilterData = async () => {
      try {
        const brandsData = await carService.getBrands();
        setBrands(brandsData);

        const priceRangeData = await carService.getPriceRange();
        setPriceRange(priceRangeData);
        setPrice([priceRangeData.min, priceRangeData.max]);
      } catch (error) {
        console.error("Error loading filter data:", error);
      }
    };

    loadFilterData();
  }, []);

  // Handle filter application
  const applyFilters = () => {
    onApplyFilters({
      brand: selectedBrand || undefined,
      hasAC: hasAC,
      driverAvailable: driverAvailable,
      minPrice: price[0],
      maxPrice: price[1],
      category: category || undefined,
      dateRange: date
        ? {
            startDate: date.from?.toISOString() || "",
            endDate: date.to?.toISOString() || "",
          }
        : undefined,
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedBrand("");
    setHasAC(undefined);
    setDriverAvailable(undefined);
    setPrice([priceRange.min, priceRange.max]);
    setCategory("");
    setDate(undefined);
    
    onApplyFilters({});
  };

  // Create a handler function that correctly manages the type conversion for price
  const handlePriceChange = (value: number[]) => {
    setPrice([value[0], value[1]] as [number, number]);
  };

  return (
    <div className="space-y-6">
      <BrandFilter 
        selectedBrand={selectedBrand}
        brands={brands}
        onBrandChange={setSelectedBrand}
      />

      <CategoryFilter 
        category={category}
        onCategoryChange={setCategory}
      />

      <PriceRangeFilter 
        price={price}
        priceRange={priceRange}
        onPriceChange={handlePriceChange}
      />

      <DateRangeFilter 
        date={date}
        onDateChange={setDate}
      />

      <CheckboxFilters 
        hasAC={hasAC}
        driverAvailable={driverAvailable}
        onACChange={setHasAC}
        onDriverChange={setDriverAvailable}
      />

      <FilterActions 
        onApply={applyFilters}
        onReset={resetFilters}
      />
    </div>
  );
}
