
import { Calendar, Phone, Search, Star } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl font-bold text-center text-autowise-navy mb-12">Pourquoi choisir AutoWise</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-autowise-light-blue text-autowise-navy mb-4">
              <Star className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Qualité garantie</h3>
            <p className="text-gray-600">Des véhicules récents, bien entretenus et régulièrement inspectés.</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-autowise-light-blue text-autowise-navy mb-4">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Réservation simple</h3>
            <p className="text-gray-600">Processus de réservation rapide et facile, en quelques clics.</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-autowise-light-blue text-autowise-navy mb-4">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Support 24/7</h3>
            <p className="text-gray-600">Notre équipe est disponible à tout moment pour vous assister.</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-autowise-light-blue text-autowise-navy mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Prix transparents</h3>
            <p className="text-gray-600">Pas de frais cachés, des prix clairs et compétitifs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
