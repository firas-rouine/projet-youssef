
import { useState, useEffect } from "react";
import { FilterContainer } from "./filters/FilterContainer";
import { MobileFilterToggle } from "./filters/MobileFilterToggle";
import { useMediaQuery } from "@/hooks/use-media-query";

interface CarFilterProps {
  onFilter: (filters: {
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

export function CarFilter({ onFilter }: CarFilterProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleApplyFilters = (filters: any) => {
    onFilter(filters);
    
    // On mobile, close the filters panel after applying
    if (!isDesktop) {
      setIsFiltersOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <MobileFilterToggle 
        isFiltersOpen={isFiltersOpen} 
        toggleFilters={toggleFilters} 
      />

      <div className={`${isFiltersOpen || isDesktop ? "block" : "hidden"} md:block`}>
        <h3 className="text-lg font-semibold mb-4">Filtrer les véhicules</h3>

        <FilterContainer onApplyFilters={handleApplyFilters} />
      </div>
    </div>
  );
}
