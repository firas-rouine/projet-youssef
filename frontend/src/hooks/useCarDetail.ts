
import { useState, useEffect } from "react";
import { carService } from "@/services/carService";
import { Car } from "@/lib/types";
import { favoriteService } from "@/services/favoriteService";

export function useCarDetail(id: string) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const carDetails = await carService.getCarById(id);
        
        if (!carDetails) {
          setNotFound(true);
          return;
        }
        
        setCar(carDetails);
        
        // Ajouter cette voiture à l'historique de consultation
        favoriteService.addToHistory(id);
        
        setNotFound(false);
        setError(false);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarDetails();
    }
  }, [id]);
  
  return {
    car,
    loading,
    error,
    notFound,
    selectedDates,
    setSelectedDates
  };
}
