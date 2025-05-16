
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export function useCarBooking() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Format price
  const formatPrice = (price: number) => {
    return `${price} TND`;
  };

  // Calculate total price
  const calculateTotalPrice = (dailyPrice: number, startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) {
      return dailyPrice; // Return base price if no dates selected
    }

    const days =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    
    return dailyPrice * days;
  };

  // Handle date selection
  const handleDateSelect = (
    startDate: Date, 
    endDate: Date, 
    setSelectedDates: React.Dispatch<React.SetStateAction<{
      startDate: Date | null;
      endDate: Date | null;
    }>>
  ) => {
    setSelectedDates({
      startDate,
      endDate,
    });
    
    toast({
      title: "Dates sélectionnées",
      description: "Vos dates ont été prises en compte.",
    });
  };

  // Handle booking button click
  const handleBookNow = (carId: string | undefined, startDate: Date | null, endDate: Date | null) => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour réserver ce véhicule.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Dates manquantes",
        description: "Veuillez sélectionner les dates de location.",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking
    toast({
      title: "Réservation initiée",
      description: "Votre demande de réservation a été prise en compte.",
    });
    
    // Navigate to booking page with carId
    navigate(`/booking?carId=${carId}`);
    
    // In a real app, we would navigate to a checkout page or confirmation page
    console.log("Booking car", carId, "from", startDate, "to", endDate);
  };

  return {
    formatPrice,
    calculateTotalPrice,
    handleDateSelect,
    handleBookNow
  };
}
