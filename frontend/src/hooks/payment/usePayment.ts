
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reservationService } from "@/services/reservationService";
import { carService } from "@/services/carService";
import { Car, Reservation } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { isValid } from "date-fns";

export function usePayment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "error">("pending");

  useEffect(() => {
    const fetchReservation = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const reservationData = await reservationService.getReservationById(id);
        
        if (!reservationData) {
          toast({
            title: "Erreur",
            description: "Réservation introuvable",
            variant: "destructive",
          });
          navigate("/profile");
          return;
        }
        
        // Ensure date strings are valid before setting the reservation
        const sanitizedReservation = {
          ...reservationData,
          startDate: validateDateString(reservationData.startDate),
          endDate: validateDateString(reservationData.endDate),
        };
        
        // Conversion explicite pour éviter les erreurs de type
        setReservation(sanitizedReservation as unknown as Reservation);
        
        // Récupérer les détails de la voiture
        const carData = await carService.getCarById(reservationData.carId);
        setCar(carData);

        // Simuler un traitement de paiement
        setTimeout(() => {
          const success = Math.random() > 0.1;
          setPaymentStatus(success ? "success" : "error");
          
          // Si le paiement réussit, rediriger vers la page de confirmation après un court délai
          if (success) {
            setTimeout(() => {
              navigate(`/booking-success/${id}`, { 
                state: { 
                  reservation: sanitizedReservation,
                  car: carData
                }
              });
            }, 1500);
          }
        }, 2000);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de la réservation",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchReservation();
  }, [id, navigate]);
  
  // Helper function to validate date strings
  const validateDateString = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return isValid(date) ? dateString : new Date().toISOString();
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return new Date().toISOString();
    }
  };

  return {
    reservation,
    car,
    loading,
    paymentStatus,
    setPaymentStatus,
    id,
    navigate
  };
}
