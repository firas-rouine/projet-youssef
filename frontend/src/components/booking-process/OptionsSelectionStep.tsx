
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface OptionsSelectionStepProps {
  bookingData: {
    driverIncluded: boolean;
    carInsurance: string;
    childSeat: boolean;
    gps: boolean;
    additionalDriver: boolean;
    wifiHotspot: boolean;
  };
  handleCheckboxChange: (option: string) => void;
  handleInsuranceChange: (value: string) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export function OptionsSelectionStep({
  bookingData,
  handleCheckboxChange,
  handleInsuranceChange,
  handleNextStep,
  handlePreviousStep
}: OptionsSelectionStepProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-medium mb-4">Options supplémentaires</h2>
      
      <div className="space-y-4">
        {/* Driver */}
        <div className="flex items-center justify-between border p-3 rounded-md">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="driverIncluded" 
              checked={bookingData.driverIncluded} 
              onCheckedChange={() => handleCheckboxChange("driver")}
            />
            <div>
              <Label htmlFor="driverIncluded" className="font-medium">Avec chauffeur</Label>
              <p className="text-sm text-gray-600">Chauffeur professionnel inclus</p>
            </div>
          </div>
          <span className="font-medium text-autowise-blue">+80 TND / jour</span>
        </div>
        
        {/* GPS */}
        <div className="flex items-center justify-between border p-3 rounded-md">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="gps" 
              checked={bookingData.gps} 
              onCheckedChange={() => handleCheckboxChange("gps")}
            />
            <Label htmlFor="gps" className="font-medium">GPS</Label>
          </div>
          <span className="font-medium text-autowise-blue">+5 TND / jour</span>
        </div>
        
        {/* Child seat */}
        <div className="flex items-center justify-between border p-3 rounded-md">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="childSeat" 
              checked={bookingData.childSeat} 
              onCheckedChange={() => handleCheckboxChange("childSeat")}
            />
            <Label htmlFor="childSeat" className="font-medium">Siège enfant</Label>
          </div>
          <span className="font-medium text-autowise-blue">+8 TND / jour</span>
        </div>
        
        {/* Premium insurance */}
        <div className="flex items-center justify-between border p-3 rounded-md">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="premium-insurance" 
              checked={bookingData.carInsurance === "premium"} 
              onCheckedChange={(checked) => {
                if (checked) handleInsuranceChange("premium");
                else handleInsuranceChange("standard");
              }}
            />
            <Label htmlFor="premium-insurance" className="font-medium">Assurance premium</Label>
          </div>
          <span className="font-medium text-autowise-blue">+12 TND / jour</span>
        </div>
        
        {/* WiFi Hotspot */}
        <div className="flex items-center justify-between border p-3 rounded-md">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="wifiHotspot" 
              checked={bookingData.wifiHotspot} 
              onCheckedChange={() => handleCheckboxChange("wifiHotspot")}
            />
            <Label htmlFor="wifiHotspot" className="font-medium">Hotspot WiFi</Label>
          </div>
          <span className="font-medium text-autowise-blue">+6 TND / jour</span>
        </div>
        
        {/* Additional Driver */}
        <div className="flex items-center justify-between border p-3 rounded-md">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="additionalDriver" 
              checked={bookingData.additionalDriver} 
              onCheckedChange={() => handleCheckboxChange("additionalDriver")}
            />
            <Label htmlFor="additionalDriver" className="font-medium">Conducteur supplémentaire</Label>
          </div>
          <span className="font-medium text-autowise-blue">+30 TND / jour</span>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md text-sm">
        <p className="flex items-center text-amber-800">
          <span className="mr-2">ℹ️</span>
          Une pièce d'identité valide et un permis de conduire seront demandés lors de la prise en charge du véhicule.
        </p>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handlePreviousStep}>
          Retour
        </Button>
        <Button onClick={handleNextStep} className="bg-autowise-blue hover:bg-autowise-navy">
          Continuer
        </Button>
      </div>
    </Card>
  );
}
