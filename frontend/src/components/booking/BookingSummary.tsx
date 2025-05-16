
import { useEffect } from "react";
import { Car } from "@/lib/types";
import { DateRange } from "react-day-picker";
import { reservationService } from "@/services/reservationService";

interface BookingSummaryProps {
  car: Car;
  days: number;
  withDriver: boolean;
  withChildSeat: boolean;
  withGPS: boolean;
  isCalculating: boolean;
  setIsCalculating: React.Dispatch<React.SetStateAction<boolean>>;
  dateRange: DateRange | undefined;
  onPriceUpdate: (price: number) => void;
}

export function BookingSummary({ 
  car, 
  days, 
  withDriver, 
  withChildSeat, 
  withGPS, 
  isCalculating, 
  setIsCalculating,
  dateRange,
  onPriceUpdate
}: BookingSummaryProps) {
  // Calculate price whenever booking details change
  useEffect(() => {
    const calculatePrice = async () => {
      if (!car || !dateRange?.from || !dateRange?.to) return;
      
      setIsCalculating(true);
      try {
        const price = await reservationService.calculatePrice(
          car.id,
          dateRange.from.toISOString(),
          dateRange.to.toISOString(),
          withDriver,
          withChildSeat,
          withGPS
        );
        onPriceUpdate(price);
      } catch (error) {
        console.error("Error calculating price:", error);
      }
      setIsCalculating(false);
    };

    calculatePrice();
  }, [car, dateRange, withDriver, withChildSeat, withGPS, setIsCalculating, onPriceUpdate]);

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Résumé</h3>
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>
            Location ({days} jour{days > 1 ? "s" : ""})
          </span>
          <span>{car.dailyPrice * days} TND</span>
        </div>
        
        {withDriver && (
          <div className="flex justify-between text-sm">
            <span>Chauffeur</span>
            <span>+ {100 * days} TND</span>
          </div>
        )}
        
        {withChildSeat && (
          <div className="flex justify-between text-sm">
            <span>Siège enfant</span>
            <span>+ {10 * days} TND</span>
          </div>
        )}
        
        {withGPS && (
          <div className="flex justify-between text-sm">
            <span>GPS</span>
            <span>+ {15 * days} TND</span>
          </div>
        )}
        
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>
              {isCalculating ? "Calcul..." : `${((car.dailyPrice * days) + 
                (withDriver ? 100 * days : 0) + 
                (withChildSeat ? 10 * days : 0) + 
                (withGPS ? 15 * days : 0))} TND`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
