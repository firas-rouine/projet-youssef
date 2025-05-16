
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxFiltersProps {
  hasAC: boolean | undefined;
  driverAvailable: boolean | undefined;
  onACChange: (checked: boolean | undefined) => void;
  onDriverChange: (checked: boolean | undefined) => void;
}

export function CheckboxFilters({
  hasAC,
  driverAvailable,
  onACChange,
  onDriverChange,
}: CheckboxFiltersProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="ac"
          checked={hasAC === true}
          onCheckedChange={(checked) => {
            onACChange(checked === "indeterminate" ? undefined : checked);
          }}
        />
        <Label htmlFor="ac" className="text-sm font-normal">
          Climatisation
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="driver"
          checked={driverAvailable === true}
          onCheckedChange={(checked) => {
            onDriverChange(checked === "indeterminate" ? undefined : checked);
          }}
        />
        <Label htmlFor="driver" className="text-sm font-normal">
          Avec chauffeur
        </Label>
      </div>
    </div>
  );
}
