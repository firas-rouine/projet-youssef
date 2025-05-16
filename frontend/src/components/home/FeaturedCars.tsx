
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/CarCard";
import { Car } from "@/lib/types";
import { carService } from "@/services/carService";
import { ArrowRight } from "lucide-react";

export function FeaturedCars() {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const allCars = await carService.getAllCars();
        // Get 3 random cars
        const shuffled = [...allCars].sort(() => 0.5 - Math.random());
        setFeaturedCars(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-autowise-navy">Véhicules populaires</h2>
          <Button 
            variant="ghost" 
            className="text-autowise-blue hover:text-autowise-navy flex items-center gap-1"
            onClick={() => navigate("/cars")}
          >
            Voir tout
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
