
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileFilterToggleProps {
  isFiltersOpen: boolean;
  toggleFilters: () => void;
}

export function MobileFilterToggle({
  isFiltersOpen,
  toggleFilters,
}: MobileFilterToggleProps) {
  return (
    <Button
      onClick={toggleFilters}
      variant="outline"
      className="w-full md:hidden mb-4 flex items-center justify-between"
    >
      <span>Filtres</span>
      <FilterIcon className="h-4 w-4" />
    </Button>
  );
}
