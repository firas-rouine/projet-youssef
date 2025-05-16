
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ChevronRight, Download, Calendar, Clock } from "lucide-react";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  
  // Les données de réservation seraient normalement récupérées d'un état global ou d'une API
  const mockBookingData = {
    bookingId: "RE-23456789",
    carName: "BMW Série 5",
    startDate: "2023-06-15",
    endDate: "2023-06-18",
    pickupLocation: "Agence AutoWise Tunis Centre",
    pickupTime: "10:00",
    returnLocation: "Agence AutoWise Tunis Centre",
    returnTime: "18:00",
    totalPrice: 950,
    customerName: "Ahmed Ben Salah",
    customerEmail: "ahmed.bensalah@example.com",
    paymentMethod: "Carte de crédit",
    paymentStatus: "Payé",
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 mb-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Réservation confirmée !</h1>
              <p className="text-gray-600">
                Votre véhicule est réservé. Vous recevrez un e-mail de confirmation dans quelques minutes.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-medium">Référence de réservation</h2>
                <span className="font-mono font-bold">{mockBookingData.bookingId}</span>
              </div>
            </div>
            
            <div className="border-b pb-4 mb-4">
              <h2 className="font-medium mb-3">Détails du véhicule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-autowise-blue mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium text-sm">Période de location</h3>
                      <p>{formatDate(mockBookingData.startDate)} - {formatDate(mockBookingData.endDate)}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-autowise-blue mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium text-sm">Véhicule</h3>
                      <p>{mockBookingData.carName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-b pb-4 mb-4">
              <h2 className="font-medium mb-3">Prise en charge et retour</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-sm mb-1">Prise en charge</h3>
                  <p className="mb-1">{formatDate(mockBookingData.startDate)} à {mockBookingData.pickupTime}</p>
                  <p>{mockBookingData.pickupLocation}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-sm mb-1">Retour</h3>
                  <p className="mb-1">{formatDate(mockBookingData.endDate)} à {mockBookingData.returnTime}</p>
                  <p>{mockBookingData.returnLocation}</p>
                </div>
              </div>
            </div>
            
            <div className="border-b pb-4 mb-4">
              <h2 className="font-medium mb-3">Paiement</h2>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm mb-1">Méthode de paiement</p>
                  <p className="font-medium">{mockBookingData.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm mb-1">Montant total</p>
                  <p className="font-bold text-xl">{mockBookingData.totalPrice} TND</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm">Statut: <span className="text-green-600 font-medium">{mockBookingData.paymentStatus}</span></p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
              <Button variant="outline" className="flex items-center justify-center">
                <Download className="mr-2 h-4 w-4" />
                Télécharger le reçu
              </Button>
              
              <Button onClick={() => navigate("/")} className="bg-autowise-blue hover:bg-autowise-navy">
                Retour à l'accueil
              </Button>
            </div>
          </Card>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-3 text-blue-800">Ce que vous devez savoir</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Veuillez vous présenter à l'agence avec votre permis de conduire et une pièce d'identité valide.</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Une caution sera demandée lors de la prise du véhicule (généralement par pré-autorisation sur carte bancaire).</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Le véhicule sera fourni avec le plein de carburant et devra être rendu dans le même état.</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-3">Besoin d'aide ?</h2>
              <p className="mb-4">Notre équipe de support client est disponible pour vous aider.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" asChild className="flex items-center justify-center">
                  <a href="/contact">Nous contacter</a>
                </Button>
                <Button variant="outline" asChild className="flex items-center justify-center">
                  <a href="/faq">Questions fréquentes</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
