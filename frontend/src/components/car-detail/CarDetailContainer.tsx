
import { useParams } from "react-router-dom";
import { useCarDetail } from "@/hooks/useCarDetail";
import { useCarFavorite } from "@/hooks/useCarFavorite";
import { useCarBooking } from "@/hooks/useCarBooking";
import { getMockBookedDates } from "@/utils/mockBookedDates";
import { CarDetailSkeleton } from "@/components/car-detail/CarDetailSkeleton";
import { CarNotFound } from "@/components/car-detail/CarNotFound";

interface CarDetailContainerProps {
  children: (props: {
    car: any;
    isFavorite: boolean;
    selectedDates: {
      startDate: Date | null;
      endDate: Date | null;
    };
    handleToggleFavorite: () => void;
    handleDateSelect: (startDate: Date, endDate: Date) => void;
    handleBookNow: () => void;
    formatPrice: (price: number) => string;
    calculateTotalPrice: () => number;
    bookedDates: Array<{ start: Date; end: Date }>;
  }) => React.ReactNode;
}

export function CarDetailContainer({ children }: CarDetailContainerProps) {
  const { id } = useParams<{ id: string }>();
  const { car, loading, error, notFound, selectedDates, setSelectedDates } = useCarDetail(id || "");
  const { isFavorite, handleToggleFavorite } = useCarFavorite(id, false);
  const { formatPrice, calculateTotalPrice, handleDateSelect, handleBookNow } = useCarBooking();

  // Mock booked dates for demo
  const bookedDates = getMockBookedDates();

  if (loading) {
    return <CarDetailSkeleton />;
  }

  if (!car) {
    return <CarNotFound />;
  }

  return (
    <>
      {children({
        car,
        isFavorite,
        selectedDates,
        handleToggleFavorite,
        handleDateSelect: (startDate: Date, endDate: Date) => 
          handleDateSelect(startDate, endDate, setSelectedDates),
        handleBookNow: () => handleBookNow(id, selectedDates.startDate, selectedDates.endDate),
        formatPrice,
        calculateTotalPrice: () => calculateTotalPrice(
          car.dailyPrice, 
          selectedDates.startDate, 
          selectedDates.endDate
        ),
        bookedDates,
      })}
    </>
  );
}
