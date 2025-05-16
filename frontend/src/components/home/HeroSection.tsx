
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { images } from "@/assets/images";

export function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="bg-gradient-to-br from-autowise-navy to-autowise-navy/90 text-white py-16 lg:py-24 relative overflow-hidden">
      {/* Élément décoratif d'arrière-plan */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-autowise-blue blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-autowise-light-blue blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Location de voitures fiable et abordable en Tunisie
              </h1>
              <p className="text-lg text-gray-200 max-w-lg">
                Découvrez notre flotte diverse de véhicules pour tous vos besoins, des vacances en famille aux voyages d'affaires.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-autowise-blue hover:bg-autowise-blue/80 text-white px-6 py-3 h-auto shadow-lg transition-all"
                onClick={() => navigate("/cars")}
              >
                Voir nos véhicules
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-autowise-navy px-6 py-3 h-auto shadow-lg transition-all"
                onClick={() => navigate("/services")}
              >
                En savoir plus
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src={images.hero} 
              alt="Location de voiture" 
              className="w-full h-auto rounded-lg shadow-xl object-cover transform hover:scale-105 transition-transform duration-300 max-h-[400px]"
              style={{ maxHeight: "400px", zIndex: "0" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
