import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { format, isValid, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, Car, Calendar, Home, User } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { carService } from "@/services/carService";
import { reservationService } from "@/services/reservationService";
import { Car as CarType, Reservation } from "@/lib/types";

export default function BookingSuccessPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Extract data from location state if available (for direct navigation from payment)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        let reservationData = null;
        let carData = null;
        
        // Check if we have data in location state (from redirect)
        if (location.state?.reservation && location.state?.car) {
          reservationData = location.state.reservation;
          carData = location.state.car;
        } 
        // Otherwise fetch data using ID from URL
        else if (id) {
          reservationData = await reservationService.getReservationById(id);
          if (reservationData) {
            carData = await carService.getCarById(reservationData.carId);
          }
        }
        
        setReservation(reservationData);
        setCar(carData);
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, location.state]);

  // Helper function to safely format dates
  const formatSafeDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'dd/MM/yyyy', { locale: fr }) : "Date invalide";
    } catch (error) {
      return "Date invalide";
    }
  };
  
  // Calculate number of days
  const calculateDays = (startDate: string, endDate: string) => {
    try {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      if (!isValid(start) || !isValid(end)) return 0;
      
      const diffTime = end.getTime() - start.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    } catch (error) {
      return 0;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-autowise-blue border-t-transparent rounded-full"></div>
          <span className="ml-3">Chargement de votre confirmation...</span>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state - no reservation found
  if (!reservation || !car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h1 className="text-2xl font-bold mb-4">Réservation introuvable</h1>
              <p className="mb-6 text-gray-600">
                Nous n'avons pas pu trouver les détails de votre réservation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={() => navigate("/")}>
                  <Home className="mr-2 h-4 w-4" />
                  Retour à l'accueil
                </Button>
                <Button onClick={() => navigate("/profile")} variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Mon profil
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const days = calculateDays(reservation.startDate, reservation.endDate);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Section de confirmation */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b bg-green-50 flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-600">Réservation confirmée !</h1>
                <p className="text-gray-600">Un email de confirmation a été envoyé à votre adresse.</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Détails de la réservation</h2>
                <div className="space-y-2 text-gray-700">
                  <div><span className="font-medium">Référence:</span> #{reservation.id.substring(0, 8).toUpperCase()}</div>
                  <div className="flex items-center">
                    <Car className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium mr-2">Véhicule:</span> {car.brand} {car.model} ({car.year})
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium mr-2">Dates:</span> {formatSafeDate(reservation.startDate)} - {formatSafeDate(reservation.endDate)} ({days} jour{days > 1 ? 's' : ''})
                  </div>
                </div>
              </div>

              {/* Options sélectionnées */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Options sélectionnées</h3>
                <ul className="space-y-1">
                  {reservation.withDriver && (
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Avec chauffeur
                    </li>
                  )}
                  {reservation.withGPS && (
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      GPS
                    </li>
                  )}
                  {reservation.withChildSeat && (
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Siège enfant
                    </li>
                  )}
                </ul>
              </div>

              {/* Récapitulatif des prix */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Récapitulatif</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Prix de base</span>
                    <span>{car.dailyPrice} TND × {days} jours</span>
                  </div>
                  {reservation.withDriver && (
                    <div className="flex justify-between text-gray-600">
                      <span>Chauffeur</span>
                      <span>80 TND × {days} jours</span>
                    </div>
                  )}
                  {reservation.withGPS && (
                    <div className="flex justify-between text-gray-600">
                      <span>GPS</span>
                      <span>5 TND × {days} jours</span>
                    </div>
                  )}
                  {reservation.withChildSeat && (
                    <div className="flex justify-between text-gray-600">
                      <span>Siège enfant</span>
                      <span>8 TND × {days} jours</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{reservation.totalPrice} TND</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => navigate("/profile")}
                  className="bg-autowise-blue hover:bg-autowise-navy"
                >
                  <User className="mr-2 h-4 w-4" />
                  Voir mes réservations
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Retour à l'accueil
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
