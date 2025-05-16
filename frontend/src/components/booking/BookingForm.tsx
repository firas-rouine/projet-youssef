
import { useState, useEffect } from "react";
import { BookingDates } from "./BookingDates";
import { BookingOptions } from "./BookingOptions";
import { BookingSummary } from "./BookingSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin } from "lucide-react";
import { Car } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { reservationService } from "@/services/reservationService";
import { toast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

interface BookingFormProps {
  car: Car;
  onComplete: (reservationId: string) => void;
}

export function BookingForm({ car, onComplete }: BookingFormProps) {
  const { user, isAuthenticated } = useAuth();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [withDriver, setWithDriver] = useState(false);
  const [withChildSeat, setWithChildSeat] = useState(false);
  const [withGPS, setWithGPS] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [sameLocation, setSameLocation] = useState(true);

  // Load user location preferences
  useEffect(() => {
    if (user && user.locationPreferences) {
      setPickupLocation(user.locationPreferences.pickupLocation || "");
      setDropoffLocation(user.locationPreferences.dropoffLocation || "");
      setSameLocation(user.locationPreferences.sameReturnLocation || true);
    }
  }, [user]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleOptionsChange = (option: string, checked: boolean) => {
    switch (option) {
      case "driver":
        setWithDriver(checked);
        break;
      case "childSeat":
        setWithChildSeat(checked);
        break;
      case "gps":
        setWithGPS(checked);
        break;
    }
  };

  const handlePriceUpdate = (price: number) => {
    setTotalPrice(price);
  };

  const handlePickupLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    setPickupLocation(newLocation);
    
    if (sameLocation) {
      setDropoffLocation(newLocation);
    }
  };

  const handleSameLocationChange = (checked: boolean) => {
    setSameLocation(checked);
    
    if (checked) {
      setDropoffLocation(pickupLocation);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour effectuer une réservation",
        variant: "destructive",
      });
      return;
    }
    
    if (!dateRange?.from || !dateRange?.to || !user?.id) return;
    
    if (!pickupLocation || !dropoffLocation) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez indiquer les lieux de prise en charge et de retour",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Check availability
      const availabilityCheck = await reservationService.checkAvailability(
        car.id,
        dateRange.from.toISOString(),
        dateRange.to.toISOString()
      );
      
      if (!availabilityCheck.available) {
        toast({
          title: "Non disponible",
          description: "Ce véhicule n'est pas disponible pour les dates sélectionnées",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Create reservation
      const reservation = await reservationService.createReservation({
        userId: user.id,
        carId: car.id,
        startDate: dateRange.from.toISOString(),
        endDate: dateRange.to.toISOString(),
        totalPrice,
        withDriver,
        withChildSeat,
        withGPS,
        pickupLocation,
        dropoffLocation,
      });
      
      toast({
        title: "Réservation créée",
        description: "Votre demande de réservation a été envoyée",
      });
      
      onComplete(reservation.id);
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la réservation",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  // Calculate number of days
  const calculateDays = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const days = calculateDays();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Détails de la réservation</h3>

        {/* Date Selection */}
        <BookingDates 
          dateRange={dateRange} 
          onDateChange={handleDateRangeChange} 
          days={days}
        />

        {/* Location Selection */}
        <div className="space-y-4">
          <h4 className="text-base font-medium">Lieux de prise en charge et de retour</h4>
          
          <div className="space-y-2">
            <Label htmlFor="pickup-location">Lieu de prise en charge</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="pickup-location"
                className="pl-10"
                placeholder="Adresse de prise en charge"
                value={pickupLocation}
                onChange={handlePickupLocationChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="dropoff-location">Lieu de retour</Label>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="same-location" 
                  checked={sameLocation} 
                  onCheckedChange={(checked) => handleSameLocationChange(checked === true)}
                />
                <Label htmlFor="same-location" className="text-sm font-normal cursor-pointer">
                  Même lieu pour le retour
                </Label>
              </div>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="dropoff-location"
                className="pl-10"
                placeholder="Adresse de retour"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                disabled={sameLocation}
              />
            </div>
          </div>
        </div>

        {/* Options */}
        <BookingOptions
          car={car}
          withDriver={withDriver}
          withChildSeat={withChildSeat}
          withGPS={withGPS}
          onOptionChange={handleOptionsChange}
        />
      </div>

      {/* Price Summary */}
      <BookingSummary
        car={car}
        days={days}
        withDriver={withDriver}
        withChildSeat={withChildSeat}
        withGPS={withGPS}
        isCalculating={isCalculating}
        setIsCalculating={setIsCalculating}
        dateRange={dateRange}
        onPriceUpdate={handlePriceUpdate}
      />

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full bg-autowise-blue hover:bg-autowise-navy"
        disabled={
          !dateRange?.from || !dateRange?.to || isCalculating || isSubmitting || !isAuthenticated ||
          !pickupLocation || !dropoffLocation
        }
      >
        {isSubmitting ? "Traitement en cours..." : "Réserver maintenant"}
      </Button>
      
      {!isAuthenticated && (
        <p className="text-sm text-center text-red-500">
          Veuillez vous connecter pour effectuer une réservation
        </p>
      )}
    </form>
  );
}
