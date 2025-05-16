
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Clock, Calendar, User, MapPin, Gift, Car, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-autowise-navy py-16 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Nos Services</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Découvrez notre gamme complète de services de mobilité personnalisés pour répondre à tous vos besoins.
            </p>
          </div>
        </div>

        {/* Services principaux */}
        <div className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Services principaux</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Location standard */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-2">
                  <Car className="w-12 h-12 mx-auto text-autowise-blue mb-4" />
                  <CardTitle>Location Standard</CardTitle>
                  <CardDescription>Pour tous vos déplacements quotidiens</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Large sélection de véhicules</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Kilométrage illimité</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Assurance de base incluse</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Assistance 24/7</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-autowise-blue hover:bg-autowise-navy" asChild>
                    <Link to="/cars">Voir les véhicules</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Service chauffeur */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-2">
                  <User className="w-12 h-12 mx-auto text-autowise-blue mb-4" />
                  <CardTitle>Service Chauffeur</CardTitle>
                  <CardDescription>Voyagez en tout confort</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Chauffeurs professionnels</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Service ponctuel et fiable</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Véhicules premium disponibles</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Idéal pour événements spéciaux</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-autowise-blue hover:bg-autowise-navy" asChild>
                    <Link to="/services/driver">En savoir plus</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Location longue durée */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-2">
                  <Calendar className="w-12 h-12 mx-auto text-autowise-blue mb-4" />
                  <CardTitle>Location Longue Durée</CardTitle>
                  <CardDescription>Solutions pour entreprises et particuliers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tarifs dégressifs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Entretien inclus</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Flexibilité contractuelle</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Véhicule de remplacement</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-autowise-blue hover:bg-autowise-navy" asChild>
                    <Link to="/services/long-term">En savoir plus</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Options additionnelles */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Options complémentaires</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Personnalisez votre expérience avec nos options additionnelles pour un voyage sur mesure.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="py-4 text-center">
                  <Shield className="w-8 h-8 mx-auto text-autowise-blue mb-3" />
                  <CardTitle className="text-lg">Assurance Premium</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-gray-600 text-sm">Protection complète pour une tranquillité d'esprit absolue.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-4 text-center">
                  <MapPin className="w-8 h-8 mx-auto text-autowise-blue mb-3" />
                  <CardTitle className="text-lg">GPS</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-gray-600 text-sm">Navigation précise pour vous guider partout en Tunisie.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-4 text-center">
                  <Gift className="w-8 h-8 mx-auto text-autowise-blue mb-3" />
                  <CardTitle className="text-lg">Siège Enfant</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-gray-600 text-sm">Sécurité maximale pour vos enfants pendant vos trajets.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-4 text-center">
                  <User className="w-8 h-8 mx-auto text-autowise-blue mb-3" />
                  <CardTitle className="text-lg">Conducteur Additionnel</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-gray-600 text-sm">Partagez la conduite lors de vos longs trajets.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Service d'assistance */}
        <div className="py-16 px-4 bg-autowise-blue">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Service d'assistance 24/7</h2>
                <p className="text-blue-100 mb-6">
                  Notre équipe d'assistance est disponible 24h/24 et 7j/7 pour vous aider en cas de besoin, où que vous soyez en Tunisie.
                </p>
                <ul className="space-y-3 text-white mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Dépannage rapide en cas de panne</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Support téléphonique multilingue</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Véhicule de remplacement en cas de problème</span>
                  </li>
                </ul>
                <Button className="bg-white text-autowise-blue hover:bg-gray-100" asChild>
                  <a href="/contact">Contactez-nous</a>
                </Button>
              </div>
              <div className="flex justify-center">
                <Clock className="w-48 h-48 text-white opacity-30" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Avantages */}
        <div className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Pourquoi choisir AutoWise ?</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Nous nous engageons à vous offrir une expérience de location exceptionnelle avec un service de qualité supérieure.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-autowise-blue" />
                </div>
                <h3 className="font-semibold mb-2">Rapidité</h3>
                <p className="text-gray-600 text-sm">Processus de réservation rapide et prise en charge express</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-autowise-blue" />
                </div>
                <h3 className="font-semibold mb-2">Sécurité</h3>
                <p className="text-gray-600 text-sm">Flotte régulièrement entretenue et vérifiée</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-autowise-blue" />
                </div>
                <h3 className="font-semibold mb-2">Qualité</h3>
                <p className="text-gray-600 text-sm">Véhicules récents et parfaitement entretenus</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-autowise-blue" />
                </div>
                <h3 className="font-semibold mb-2">Avantages</h3>
                <p className="text-gray-600 text-sm">Programme de fidélité et offres spéciales régulières</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Appel à l'action */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à réserver votre véhicule ?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Explorez notre flotte de véhicules et trouvez celui qui correspond parfaitement à vos besoins.
            </p>
            <div className="flex justify-center gap-4 flex-col sm:flex-row">
              <Button className="bg-autowise-blue hover:bg-autowise-navy" size="lg" asChild>
                <Link to="/cars">Voir nos véhicules</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
