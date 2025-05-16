
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin } from "lucide-react";

interface LocationSelectionStepProps {
  pickupLocation: string;
  dropoffLocation: string;
  sameLocation: boolean;
  onPickupChange: (location: string) => void;
  onDropoffChange: (location: string) => void;
  onSameLocationChange: (same: boolean) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export function LocationSelectionStep({
  pickupLocation,
  dropoffLocation,
  sameLocation,
  onPickupChange,
  onDropoffChange,
  onSameLocationChange,
  handleNextStep,
  handlePreviousStep
}: LocationSelectionStepProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-medium mb-4">Lieu de prise en charge et de retour</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pickup-location">Lieu de prise en charge</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="pickup-location"
              className="pl-10"
              placeholder="Adresse de prise en charge"
              value={pickupLocation}
              onChange={(e) => onPickupChange(e.target.value)}
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
                onCheckedChange={(checked) => onSameLocationChange(checked === true)}
              />
              <Label htmlFor="same-location" className="text-sm font-normal">
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
              onChange={(e) => onDropoffChange(e.target.value)}
              disabled={sameLocation}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handlePreviousStep}>
          Retour
        </Button>
        <Button 
          onClick={handleNextStep} 
          className="bg-autowise-blue hover:bg-autowise-navy"
          disabled={!pickupLocation || !dropoffLocation}
        >
          Continuer
        </Button>
      </div>
    </Card>
  );
}
