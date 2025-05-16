
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { MapPin, Loader2, Save } from "lucide-react";

interface LocationPreferencesData {
  pickupLocation: string;
  dropoffLocation: string;
  sameReturnLocation: boolean;
}

export function LocationPreferences() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState<LocationPreferencesData>({
    pickupLocation: "",
    dropoffLocation: "",
    sameReturnLocation: true,
  });

  useEffect(() => {
    // Charger les préférences de l'utilisateur lors du montage du composant
    if (user && user.locationPreferences) {
      setLocationData({
        pickupLocation: user.locationPreferences.pickupLocation || "",
        dropoffLocation: user.locationPreferences.dropoffLocation || "",
        sameReturnLocation: user.locationPreferences.sameReturnLocation || true,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSameLocationChange = (checked: boolean) => {
    setLocationData((prev) => {
      const newData = { ...prev, sameReturnLocation: checked };
      
      if (checked) {
        // Si la case est cochée, copier l'adresse de prise en charge dans l'adresse de retour
        newData.dropoffLocation = newData.pickupLocation;
      }
      
      return newData;
    });
  };

  // Gérer les changements d'adresse de prise en charge
  const handlePickupLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPickupLocation = e.target.value;
    
    setLocationData(prev => {
      const newData = { ...prev, pickupLocation: newPickupLocation };
      
      // Si "même lieu pour le retour" est coché, mettre à jour l'adresse de retour aussi
      if (prev.sameReturnLocation) {
        newData.dropoffLocation = newPickupLocation;
      }
      
      return newData;
    });
  };

  const saveLocationPreferences = async () => {
    setLoading(true);
    try {
      // Dans une application réelle, appel à l'API pour sauvegarder les préférences
      // await updateUserLocationPreferences(locationData);
      
      // Simulation d'un délai pour l'enregistrement
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Lieux préférés enregistrés",
        description: "Vos lieux préférés ont été enregistrés avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des lieux préférés:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement de vos lieux préférés.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lieux préférés pour vos réservations</CardTitle>
        <CardDescription>
          Enregistrez vos adresses préférées pour accélérer le processus de réservation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pickupLocation" className="font-medium">Lieu de prise en charge</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="pickupLocation"
                name="pickupLocation"
                className="pl-10"
                placeholder="Adresse de prise en charge"
                value={locationData.pickupLocation}
                onChange={handlePickupLocationChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="dropoffLocation" className="font-medium">Lieu de retour</Label>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sameReturnLocation" 
                  checked={locationData.sameReturnLocation} 
                  onCheckedChange={(checked) => handleSameLocationChange(checked === true)}
                />
                <Label htmlFor="sameReturnLocation" className="text-sm font-normal cursor-pointer">
                  Même lieu pour le retour
                </Label>
              </div>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="dropoffLocation"
                name="dropoffLocation"
                className="pl-10"
                placeholder="Adresse de retour"
                value={locationData.dropoffLocation}
                onChange={handleInputChange}
                disabled={locationData.sameReturnLocation}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={saveLocationPreferences} 
          disabled={loading}
          className="bg-autowise-blue hover:bg-autowise-navy"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les lieux préférés
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
