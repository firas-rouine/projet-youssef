
import { Clock, Calendar } from "lucide-react";
import { Car } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SelectedCarCardProps {
  car: Car;
  formatPrice: (price: number) => string;
}

export function SelectedCarCard({ car, formatPrice }: SelectedCarCardProps) {
  return (
    <Card className="mb-6">
      <div className="p-4 border-b bg-autowise-navy text-white">
        <h3 className="font-medium">Véhicule sélectionné</h3>
      </div>
      <div className="p-4">
        <div className="relative">
          <img 
            src={car.images[0]} 
            alt={`${car.brand} ${car.model}`} 
            className="w-full rounded-lg mb-4"
          />
          <Badge className="absolute top-2 right-2 bg-autowise-blue">
            {formatPrice(car.dailyPrice)}<span className="text-xs ml-1">/jour</span>
          </Badge>
        </div>
        
        <h3 className="font-bold text-lg mb-1">{car.brand} {car.model}</h3>
        <p className="text-gray-600 mb-2">{car.year} • {car.category}</p>
        
        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{car.seats} places</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
