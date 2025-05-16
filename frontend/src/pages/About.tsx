
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Map, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-autowise-navy py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">À propos d'AutoWise</h1>
            <p className="text-gray-300 max-w-3xl mx-auto text-center">
              Découvrez notre histoire, notre mission et notre engagement envers un service de location de voitures exceptionnel en Tunisie.
            </p>
          </div>
        </div>
        
        {/* Notre histoire */}
        <div className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-autowise-navy mb-6">Notre Histoire</h2>
                <p className="text-gray-700 mb-4">
                  Fondée en 2015, AutoWise est née d'une vision simple : transformer l'expérience de location de voitures en Tunisie. Face à un marché caractérisé par des services incohérents et des pratiques commerciales douteuses, nous avons décidé de créer une alternative fiable et transparente.
                </p>
                <p className="text-gray-700">
                  Notre fondateur, après avoir connu plusieurs expériences décevantes lors de la location de véhicules pour ses voyages d'affaires, a identifié un besoin crucial d'un service de location de voitures qui priorise la qualité, la transparence et la satisfaction client. C'est ainsi qu'AutoWise a été créée avec la promesse d'offrir une expérience de location sans tracas.
                </p>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-autowise-navy">Nos chiffres clés</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-autowise-blue mb-2">8+</p>
                    <p className="text-gray-600">Années d'expérience</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-autowise-blue mb-2">150+</p>
                    <p className="text-gray-600">Véhicules</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-autowise-blue mb-2">12</p>
                    <p className="text-gray-600">Agences</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-autowise-blue mb-2">20k+</p>
                    <p className="text-gray-600">Clients satisfaits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notre mission */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Notre Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Shield className="w-12 h-12 text-autowise-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fiabilité</h3>
                <p className="text-gray-600">
                  Nous nous engageons à fournir des véhicules parfaitement entretenus et des services sur lesquels vous pouvez compter.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Award className="w-12 h-12 text-autowise-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Qualité</h3>
                <p className="text-gray-600">
                  Nous maintenons les standards les plus élevés dans tous les aspects de nos opérations, de la sélection de nos véhicules à notre service client.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Map className="w-12 h-12 text-autowise-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Accessibilité</h3>
                <p className="text-gray-600">
                  Nous rendons l'expérience de location de voiture simple, transparente et accessible à tous les budgets.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notre équipe */}
        <div className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Notre Équipe</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Nous sommes fiers de notre équipe de professionnels passionnés qui s'engagent à vous offrir un service exceptionnel à chaque étape de votre parcours avec AutoWise.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <h3 className="font-semibold">Nom du membre</h3>
                  <p className="text-sm text-gray-500">Poste</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-autowise-blue text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à découvrir notre service?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de clients satisfaits et découvrez pourquoi AutoWise est le choix privilégié pour la location de voitures en Tunisie.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-autowise-blue hover:bg-gray-100" asChild>
                <Link to="/cars">Voir nos véhicules</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-autowise-blue" asChild>
                <Link to="/contact">Contactez-nous</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
