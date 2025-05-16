
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function CarNotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Véhicule non trouvé</h2>
            <p className="text-gray-600 mb-6">
              Le véhicule que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button asChild>
              <a href="/cars">Voir tous les véhicules</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
