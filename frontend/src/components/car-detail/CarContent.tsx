
import { Car } from "@/lib/types";
import { ImageGallery } from "@/components/ImageGallery";
import { CarDetailHeader } from "@/components/car-detail/CarDetailHeader";
import { CarSpecifications } from "@/components/car-detail/CarSpecifications";
import { CarConditionsTabs } from "@/components/car-detail/CarConditionsTabs";
import { CarDetailFeatures } from "@/components/car-detail/CarDetailFeatures";

interface CarContentProps {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  formatPrice: (price: number) => string;
  onDateSelect: (startDate: Date, endDate: Date) => void;
  bookedDates: Array<{ start: Date; end: Date }>;
}

export function CarContent({
  car,
  isFavorite,
  onToggleFavorite,
  formatPrice,
  onDateSelect,
  bookedDates
}: CarContentProps) {
  const features = CarDetailFeatures({ car });
  
  return (
    <>
      {/* Car Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative">
          {/* Image Gallery - Affichage amélioré de toutes les images */}
          <ImageGallery 
            images={car.images} 
            alt={`${car.brand} ${car.model}`} 
          />
        </div>
        
        <CarDetailHeader 
          car={car}
          isFavorite={isFavorite}
          formatPrice={formatPrice}
          onToggleFavorite={onToggleFavorite}
        />

        <div className="p-6 pt-0">
          {/* Description complète */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{car.description}</p>
          </div>

          {/* Caractéristiques techniques */}
          <CarSpecifications car={car} />

          <hr className="my-6" />

          {/* Conditions et options disponibles */}
          <CarConditionsTabs 
            car={car} 
            features={features} 
            description={car.description} 
          />
        </div>
      </div>
    </>
  );
}
