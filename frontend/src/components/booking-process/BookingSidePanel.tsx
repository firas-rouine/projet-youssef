
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Car } from "@/lib/types";
import { SelectedCarCard } from "./SelectedCarCard";
import { BookingRecap } from "./BookingRecap";

interface BookingSidePanelProps {
  car: Car;
  bookingData: {
    startDate: string;
    endDate: string;
    totalDays: number;
    driverIncluded: boolean;
    carInsurance: string;
    childSeat: boolean;
    gps: boolean;
    additionalDriver: boolean;
    totalPrice: number;
  };
  formatPrice: (price: number) => string;
}

export function BookingSidePanel({ car, bookingData, formatPrice }: BookingSidePanelProps) {
  return (
    <div className="md:col-span-1">
      <SelectedCarCard car={car} formatPrice={formatPrice} />
      
      <Card>
        <BookingRecap car={car} bookingData={bookingData} formatPrice={formatPrice} />
      </Card>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        <h4 className="font-medium mb-3 flex items-center">
          <Check className="h-4 w-4 mr-2 text-green-500" />
          Garanties
        </h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Annulation gratuite jusqu'à 48h avant</li>
          <li>• Kilométrage illimité</li>
          <li>• Assistance 24/7</li>
          <li>• Véhicule de remplacement en cas de panne</li>
        </ul>
      </div>
    </div>
  );
}
