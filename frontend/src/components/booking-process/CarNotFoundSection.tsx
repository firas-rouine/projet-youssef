
import { Button } from "@/components/ui/button";

export function CarNotFoundSection() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold mb-2">Véhicule non trouvé</h2>
      <p className="text-gray-600 mb-6">
        Nous n'avons pas pu trouver le véhicule demandé.
      </p>
      <Button asChild>
        <a href="/cars">Voir tous les véhicules</a>
      </Button>
    </div>
  );
}
