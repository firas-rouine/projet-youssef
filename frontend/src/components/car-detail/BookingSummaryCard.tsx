
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { ReservationButton } from "@/components/car-detail/ReservationButton";

interface BookingSummaryCardProps {
  carBrand: string;
  carModel: string;
  carId: string;
  dailyPrice: number;
  selectedDates: {
    startDate: Date | null;
    endDate: Date | null;
  };
  totalPrice: number;
  onBookNow: () => void;
  formatPrice: (price: number) => string;
}

export function BookingSummaryCard({
  carBrand,
  carModel,
  carId,
  dailyPrice,
  selectedDates,
  totalPrice,
  onBookNow,
  formatPrice
}: BookingSummaryCardProps) {
  const hasSelectedDates = selectedDates.startDate && selectedDates.endDate;

  return (
    <Card className="sticky top-6 mb-6">
      <CardHeader className="bg-autowise-navy text-white">
        <CardTitle className="text-xl">Réserver cette voiture</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <h3 className="font-bold text-lg mb-2">{carBrand} {carModel}</h3>
        
        <div className="flex justify-between items-center mb-4 py-2 border-b">
          <span className="text-gray-600">Prix par jour</span>
          <span className="font-bold">{formatPrice(dailyPrice)}</span>
        </div>
        
        {hasSelectedDates ? (
          <>
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Dates sélectionnées</p>
              <div className="flex items-center gap-2 text-sm border rounded-md p-2">
                <CalendarIcon className="h-4 w-4 opacity-70" />
                <span>
                  {format(selectedDates.startDate, "d MMMM", { locale: fr })} - {format(selectedDates.endDate, "d MMMM yyyy", { locale: fr })}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2 border-t">
              <span className="font-medium">Prix total</span>
              <span className="font-bold text-lg text-autowise-blue">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </>
        ) : (
          <div className="mb-4 text-sm text-gray-600">
            <p>Sélectionnez vos dates dans le calendrier ci-dessous pour voir le prix total.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <ReservationButton carId={carId} />
      </CardFooter>
    </Card>
  );
}
