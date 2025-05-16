
import { Link } from "react-router-dom";
import { Car } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Fuel, Users, Gauge, Heart } from "lucide-react";
import { useCarFavorite } from "@/hooks/useCarFavorite";

interface CarCardProps {
  car: Car;
  className?: string;
}

export function CarCard({ car, className = "" }: CarCardProps) {
  const { isFavorite, handleToggleFavorite } = useCarFavorite(car.id);

  // Format price with TND
  const formatPrice = (price: number) => {
    return `${price} TND`;
  };

  // Map fuel type to French
  const getFuelTypeText = (fuelType: string) => {
    const types: Record<string, string> = {
      essence: "Essence",
      diesel: "Diesel",
      électrique: "Électrique",
      hybride: "Hybride",
    };
    return types[fuelType] || fuelType;
  };

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative ${className}`}
    >
      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-2 right-2 z-10 rounded-full bg-white/70 hover:bg-white ${
          isFavorite ? "text-red-500" : "text-gray-400"
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleToggleFavorite();
        }}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        <span className="sr-only">
          {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        </span>
      </Button>

      {/* Car Image */}
      <div className="relative h-48 overflow-hidden">
        <Link to={`/cars/${car.id}`}>
          <img
            src={car.images[0] || "/placeholder.svg"}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge className="absolute top-2 left-2 bg-autowise-navy">
            {car.category.toUpperCase()}
          </Badge>
        </Link>
      </div>

      {/* Car Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-autowise-navy">
            {car.brand} {car.model}
          </h3>
          <Badge className="bg-autowise-blue text-white">
            {formatPrice(car.dailyPrice)}<span className="text-xs">/jour</span>
          </Badge>
        </div>

        {/* Year */}
        <p className="text-sm text-gray-500 mb-3">{car.year}</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-1" />
            {car.seats} places
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Fuel size={16} className="mr-1" />
            {getFuelTypeText(car.fuelType)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-1" />
            {car.transmission}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Gauge size={16} className="mr-1" />
            {car.hasAC ? "A/C" : "Sans A/C"}
          </div>
        </div>

        {/* CTA - Only Details button now */}
        <div className="flex justify-center">
          <Button asChild className="w-full bg-autowise-blue hover:bg-autowise-navy">
            <Link to={`/cars/${car.id}`}>Détails</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
