
import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import { Car } from "@/lib/types";

interface BookingRecapProps {
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

export function BookingRecap({ car, bookingData, formatPrice }: BookingRecapProps) {
  // Function to safely format dates
  const formatSafeDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (!isValid(date)) {
        return "Date invalide";
      }
      return format(date, 'dd MMM yyyy', { locale: fr });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date invalide";
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Récapitulatif de la réservation</h3>
      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span>Véhicule</span>
          <span className="font-medium">{car.brand} {car.model}</span>
        </div>
        
        <div className="flex justify-between border-b pb-2">
          <span>Période</span>
          <span>
            {formatSafeDate(bookingData.startDate)} - {formatSafeDate(bookingData.endDate)}
          </span>
        </div>
        
        <div className="flex justify-between border-b pb-2">
          <span>Durée</span>
          <span>{bookingData.totalDays} jour{bookingData.totalDays > 1 ? 's' : ''}</span>
        </div>
        
        <div className="flex justify-between border-b pb-2">
          <span>Prix de base</span>
          <span>{formatPrice(car.dailyPrice)} / jour</span>
        </div>
        
        {bookingData.driverIncluded && (
          <div className="flex justify-between border-b pb-2 text-autowise-blue">
            <span>Chauffeur</span>
            <span>+ 100 TND / jour</span>
          </div>
        )}
        
        {bookingData.carInsurance !== "standard" && (
          <div className="flex justify-between border-b pb-2 text-autowise-blue">
            <span>
              Assurance {bookingData.carInsurance === "full" ? "complète" : "premium"}
            </span>
            <span>
              + {bookingData.carInsurance === "full" ? "30" : "50"} TND / jour
            </span>
          </div>
        )}
        
        {bookingData.childSeat && (
          <div className="flex justify-between border-b pb-2 text-autowise-blue">
            <span>Siège enfant</span>
            <span>+ 20 TND / jour</span>
          </div>
        )}
        
        {bookingData.gps && (
          <div className="flex justify-between border-b pb-2 text-autowise-blue">
            <span>GPS</span>
            <span>+ 10 TND / jour</span>
          </div>
        )}
        
        {bookingData.additionalDriver && (
          <div className="flex justify-between border-b pb-2 text-autowise-blue">
            <span>Conducteur supplémentaire</span>
            <span>+ 30 TND / jour</span>
          </div>
        )}
        
        <div className="flex justify-between pt-2">
          <span className="font-bold">Total</span>
          <span className="font-bold">{formatPrice(bookingData.totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
