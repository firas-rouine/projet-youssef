
import { useState, useEffect } from "react";
import { favoriteService } from "@/services/favoriteService";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export function useCarFavorite(carId: string | undefined, initialState: boolean = false) {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(initialState);

  // Check if the car is in favorites on mount
  useEffect(() => {
    if (carId) {
      const favoriteStatus = favoriteService.isFavorite(carId);
      setIsFavorite(favoriteStatus);
    }
  }, [carId]);

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour ajouter des favoris.",
        variant: "default",
      });
      return;
    }
    
    if (!carId) return;

    const newFavoriteStatus = favoriteService.toggleFavorite(carId);
    setIsFavorite(newFavoriteStatus);
    
    toast({
      description: newFavoriteStatus
        ? "Véhicule ajouté aux favoris"
        : "Véhicule retiré des favoris",
    });
  };

  return {
    isFavorite,
    setIsFavorite,
    handleToggleFavorite
  };
}
