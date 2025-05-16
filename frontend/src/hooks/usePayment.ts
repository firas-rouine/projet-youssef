
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reservationService } from "@/services/reservationService";
import { carService } from "@/services/carService";
import { Car, Reservation } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

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
        
        // Conversion explicite pour éviter les erreurs de type
        setReservation(reservationData as unknown as Reservation);
        
        // Récupérer les détails de la voiture
        const carData = await carService.getCarById(reservationData.carId);
        setCar(carData);

        // Simuler un traitement de paiement
        setTimeout(() => {
          setPaymentStatus(Math.random() > 0.1 ? "success" : "error");
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
