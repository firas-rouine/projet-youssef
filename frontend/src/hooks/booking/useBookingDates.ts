
import { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { format, isValid } from "date-fns";
import { BookingData } from "./useBookingState";
import { calculateTotalPrice } from "./useBookingState";

export function useBookingDates(
  carDailyPrice: number | undefined,
  date: DateRange | undefined,
  calculateDaysDifference: (start: Date, end: Date) => number,
  bookingData: BookingData,
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>
) {
  // Update dates and recalculate price
  useEffect(() => {
    if (!carDailyPrice || !date?.from || !date?.to) return;
    
    // Validate dates before using them
    if (!isValid(date.from) || !isValid(date.to)) {
      console.error("Invalid date detected", { from: date.from, to: date.to });
      return;
    }
    
    try {
      const startDate = format(date.from, 'yyyy-MM-dd');
      const endDate = format(date.to, 'yyyy-MM-dd');
      const days = calculateDaysDifference(date.from, date.to);
      
      setBookingData(prev => {
        const newPrice = calculateTotalPrice(
          carDailyPrice,
          days,
          prev.driverIncluded,
          prev.carInsurance,
          prev.childSeat,
          prev.gps,
          prev.additionalDriver,
          prev.wifiHotspot
        );
        
        return {
          ...prev,
          startDate,
          endDate,
          totalDays: days,
          totalPrice: newPrice
        };
      });
    } catch (error) {
      console.error("Error in useBookingDates:", error);
    }
  }, [date, carDailyPrice, setBookingData, calculateDaysDifference]);

  const handleDateChange = (range: DateRange | undefined) => {
    if (range?.from && isValid(range.from)) {
      // Ensure to is also valid if present
      if (range.to && !isValid(range.to)) {
        return { from: range.from, to: undefined };
      }
      return range;
    }
    return date;
  };

  return { handleDateChange };
}
