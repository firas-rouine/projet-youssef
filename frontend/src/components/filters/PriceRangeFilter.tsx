
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  price: [number, number];
  priceRange: { min: number; max: number };
  onPriceChange: (value: [number, number]) => void;
}

export function PriceRangeFilter({ price, priceRange, onPriceChange }: PriceRangeFilterProps) {
  const formatPriceLabel = (value: number) => `${value} TND`;

  const handleValueChange = (value: number[]) => {
    // Ensure the value is always a tuple of two numbers
    const typedValue: [number, number] = [value[0], value[1]];
    onPriceChange(typedValue);
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <Label>Prix (TND/jour)</Label>
        <span className="text-sm text-gray-500">
          {formatPriceLabel(price[0])} - {formatPriceLabel(price[1])}
        </span>
      </div>
      <Slider
        value={price}
        min={priceRange.min}
        max={priceRange.max}
        step={10}
        onValueChange={handleValueChange}
        className="my-4"
      />
    </div>
  );
}
