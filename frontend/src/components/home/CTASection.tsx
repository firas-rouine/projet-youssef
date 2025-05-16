
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-autowise-blue text-white">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à réserver votre véhicule ?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Explorez notre gamme complète de véhicules et trouvez la voiture parfaite pour votre prochain voyage.
        </p>
        <Button 
          size="lg" 
          className="bg-white text-autowise-blue hover:bg-autowise-navy hover:text-white"
          onClick={() => navigate("/cars")}
        >
          Voir nos véhicules
        </Button>
      </div>
    </section>
  );
}
