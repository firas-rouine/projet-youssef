import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { reservationService } from "@/services/reservationService";
import { useAuth } from "@/contexts/AuthContext";  // Assuming you need user info here
import { useSearchParams } from "react-router-dom";
export function useBookingNavigation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();  // <-- move here

  const handleNextStep = (currentStep: number, setStep: (step: number) => void) => {
    setStep(currentStep + 1);
  };

  const handlePreviousStep = (currentStep: number, setStep: (step: number) => void) => {
    setStep(currentStep - 1);
  };

  const handleSubmitBooking = async (bookingData: any) => {
    const carIdFromUrl = searchParams.get("carId") || "";

    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour effectuer une réservation",
        variant: "destructive",
      });
      return;
    }

    try {
      const reservation = await reservationService.createReservation({
        userId: user.id,
        carId: carIdFromUrl,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        totalPrice: bookingData.totalPrice,
        withDriver: bookingData.withDriver,
        withChildSeat: bookingData.withChildSeat,
        withGPS: bookingData.withGPS,
      });

      const reservationId = reservation.id;

      navigate("/payment/" + reservationId);

      toast({
        title: "Réservation confirmée!",
        description: "Un email de confirmation vous a été envoyé.",
      });
    } catch (error) {
      console.error("Failed to submit booking:", error);
      toast({
        title: "Erreur",
        description: "La réservation a échoué. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return {
    handleNextStep,
    handlePreviousStep,
    handleSubmitBooking,
    navigate,
  };
}
