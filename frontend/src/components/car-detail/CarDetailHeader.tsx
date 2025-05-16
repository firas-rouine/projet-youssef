
import { Badge } from "@/components/ui/badge";
import { Car } from "@/lib/types";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarDetailHeaderProps {
  car: Car;
  isFavorite: boolean;
  formatPrice: (price: number) => string;
  onToggleFavorite: () => void;
}

export function CarDetailHeader({ 
  car, 
  isFavorite, 
  formatPrice, 
  onToggleFavorite 
}: CarDetailHeaderProps) {
  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold text-autowise-navy">
          {car.brand} {car.model}
        </h1>
        <div className="flex items-center">
          <Badge className="bg-autowise-blue mr-2">{car.category}</Badge>
          <span className="text-2xl font-bold text-autowise-navy">
            {formatPrice(car.dailyPrice)}
            <span className="text-sm text-gray-500 font-normal">/jour</span>
          </span>
        </div>
      </div>

      {/* Favoris button */}
      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-4 right-4 z-10 rounded-full bg-white/80 hover:bg-white ${
          isFavorite ? "text-red-500" : "text-gray-500"
        }`}
        onClick={onToggleFavorite}
      >
        <Heart className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`} />
        <span className="sr-only">
          {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        </span>
      </Button>
    </div>
  );
}
