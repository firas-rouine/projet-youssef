
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { images } from "@/assets/images";

export function CarCategories() {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl font-bold text-center text-autowise-navy mb-12">
          Nos catégories de véhicules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden">
              <img 
                src={images.cars.economy} 
                alt="Véhicule économique" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Économique</h3>
              <p className="text-gray-600 mb-4">
                Véhicules compacts et économes en carburant, parfaits pour les déplacements urbains.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/cars?category=economy")}
              >
                Voir les véhicules
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden">
              <img 
                src={images.cars.standard} 
                alt="Véhicule standard" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Standard</h3>
              <p className="text-gray-600 mb-4">
                Confort et praticité pour vos voyages quotidiens avec plus d'espace.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/cars?category=standard")}
              >
                Voir les véhicules
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden">
              <img 
                src={images.cars.luxury} 
                alt="Véhicule de luxe" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Luxe</h3>
              <p className="text-gray-600 mb-4">
                Expérience haut de gamme avec nos véhicules les plus raffinés et équipés.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/cars?category=luxury")}
              >
                Voir les véhicules
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
