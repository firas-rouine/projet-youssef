
import { Car, Reservation } from "@/lib/types";
import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";

interface ReservationDetailsProps {
  car: Car;
  reservation: Reservation;
}

export function ReservationDetails({ car, reservation }: ReservationDetailsProps) {
  // Safely format dates, handling potential invalid dates
  const formatSafeDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return isValid(date) ? format(date, "dd/MM/yyyy", { locale: fr }) : "Date invalide";
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date invalide";
    }
  };

  return (
    <div className="space-y-2 text-gray-700">
      <div>
        <span className="font-medium">Véhicule:</span> {car.brand} {car.model}
      </div>
      <div>
        <span className="font-medium">Dates:</span> {formatSafeDate(reservation.startDate)} - {formatSafeDate(reservation.endDate)}
      </div>
    </div>
  );
}
