
import { ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarFeaturesList } from "./CarFeaturesList";
import { Car } from "@/lib/types";

interface CarConditionsTabsProps {
  car: Car;
  features: Array<{
    name: string;
    available: boolean;
  }>;
  description?: string;
}

export function CarConditionsTabs({ car, features, description }: CarConditionsTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="features">Équipements</TabsTrigger>
        <TabsTrigger value="conditions">Conditions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="pt-2">
        <p className="text-gray-700 mb-4">
          {description || `La ${car.brand} ${car.model} ${car.year} est un véhicule de catégorie ${car.category} offrant confort et fiabilité. Idéale pour vos trajets en ville comme sur l'autoroute.`}
        </p>
        <p className="text-gray-700">
          Ce véhicule dispose de {car.seats} places, d'une boîte de vitesse {car.transmission}, et fonctionne au {car.fuelType}. 
          {car.hasAC ? " Elle est équipée d'une climatisation pour votre confort." : ""}
        </p>
      </TabsContent>
      
      <TabsContent value="features" className="pt-2">
        <CarFeaturesList features={features} />
      </TabsContent>
      
      <TabsContent value="conditions" className="pt-2">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-autowise-blue" />
              Conditions de location
            </h4>
            <ul className="ml-7 mt-2 list-disc text-gray-700 text-sm space-y-1">
              <li>Age minimum : 21 ans</li>
              <li>Permis de conduire valide depuis au moins 2 ans</li>
              <li>Carte d'identité ou passeport</li>
              <li>Caution : 1000 TND (pré-autorisation CB)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-autowise-blue" />
              Assurance incluse
            </h4>
            <ul className="ml-7 mt-2 list-disc text-gray-700 text-sm space-y-1">
              <li>Assurance responsabilité civile</li>
              <li>Assurance collision (avec franchise)</li>
              <li>Assistance routière 24/7</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-autowise-blue" />
              Kilométrage
            </h4>
            <p className="ml-7 mt-2 text-gray-700 text-sm">
              Kilométrage illimité inclus dans le prix
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
