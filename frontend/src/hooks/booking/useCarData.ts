
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Car } from "@/lib/types";
import { carService } from "@/services/carService";

export function useCarData(carId: string | null) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!carId) {
      navigate("/cars");
      return;
    }
    
    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const data = await carService.getCarById(carId);
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du véhicule",
          variant: "destructive",
        });
        navigate("/cars");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCarDetails();
  }, [carId, navigate, toast]);

  return { car, loading };
}
