import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { VehicleSpeedometer } from "./VehicleSpeedometer";
import { VehicleLocation } from "./VehicleLocation";
import { FuelGauge } from "./FuelGauge";
import { AlertsPanel } from "./AlertsPanel";
import { Gauge, MapPin, AlertTriangle, Power } from "lucide-react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

// Mock IoT vehicle data
interface VehicleIoTData {
  speed: number;
  fuelLevel: number;
  location: {
    latitude: number;
    longitude: number;
  };
  alerts: Array<{
    id: string;
    type: "info" | "warning" | "danger";
    message: string;
    timestamp: Date;
  }>;
  engineRunning: boolean;
}

interface IoTDemoProps {
  carId: string;
  carName: string;
}

export function IoTDemo({ carId, carName }: IoTDemoProps) {
  const [vehicleData, setVehicleData] = useState<VehicleIoTData>({
    speed: 0,
    fuelLevel: 75,
    location: {
      latitude: 36.8065,  // Tunis coordinates
      longitude: 10.1815,
    },
    alerts: [],
    engineRunning: true,
  });

  const [isSimulationRunning, setIsSimulationRunning] = useState(true);
  const [viewMode, setViewMode] = useState<"dashboard" | "map">("dashboard");

  useEffect(() => {
    if (!isSimulationRunning) return;

    // Simulate changing vehicle data
    const interval = setInterval(() => {
      setVehicleData(prevData => {
        // Only update if engine is running
        if (!prevData.engineRunning) return prevData;

        // Random speed fluctuations (0-120 km/h)
        const newSpeed = Math.max(0, Math.min(120, 
          prevData.speed + (Math.random() * 8 - 4)
        ));
        
        // Slowly decreasing fuel level
        const newFuelLevel = Math.max(0, prevData.fuelLevel - 0.1);
        
        // Slight location change to simulate movement
        const newLatitude = prevData.location.latitude + (Math.random() * 0.002 - 0.001);
        const newLongitude = prevData.location.longitude + (Math.random() * 0.002 - 0.001);
        
        // Generate alerts based on conditions
        const newAlerts = [...prevData.alerts];
        
        // Speed alert
        if (newSpeed > 90 && Math.random() > 0.7) {
          newAlerts.push({
            id: `alert-${Date.now()}`,
            type: "warning",
            message: "Vitesse excessive détectée",
            timestamp: new Date(),
          });
        }
        
        // Fuel alert
        if (newFuelLevel < 20 && Math.random() > 0.9) {
          newAlerts.push({
            id: `alert-${Date.now()}`,
            type: "danger",
            message: "Niveau de carburant bas",
            timestamp: new Date(),
          });
        }
        
        // Random info alert
        if (Math.random() > 0.95) {
          newAlerts.push({
            id: `alert-${Date.now()}`,
            type: "info",
            message: "Maintenance recommandée prochainement",
            timestamp: new Date(),
          });
        }
        
        // Keep only the latest 5 alerts
        const trimmedAlerts = newAlerts.slice(Math.max(0, newAlerts.length - 5));
        
        return {
          speed: newSpeed,
          fuelLevel: newFuelLevel,
          location: {
            latitude: newLatitude,
            longitude: newLongitude,
          },
          alerts: trimmedAlerts,
          engineRunning: prevData.engineRunning,
        };
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isSimulationRunning]);

  const handleToggleEngine = () => {
    setVehicleData(prev => {
      const engineRunning = !prev.engineRunning;
      
      // Show toast notification
      if (engineRunning) {
        toast({
          title: "Moteur démarré",
          description: `Le moteur de ${carName} a été démarré à distance.`,
        });
      } else {
        toast({
          title: "Moteur arrêté",
          description: `Le moteur de ${carName} a été arrêté à distance.`,
          variant: "destructive",
        });
      }
      
      return {
        ...prev,
        engineRunning,
        speed: engineRunning ? prev.speed : 0, // Set speed to 0 if engine stopped
      };
    });
  };

  const handleToggleSimulation = () => {
    setIsSimulationRunning(!isSimulationRunning);
    
    toast({
      title: isSimulationRunning ? "Simulation en pause" : "Simulation activée",
      description: isSimulationRunning 
        ? "La simulation IoT a été mise en pause" 
        : "La simulation IoT a été redémarrée",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Télématique Véhicule</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleToggleSimulation}
          >
            {isSimulationRunning ? "Pause simulation" : "Démarrer simulation"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList>
          <TabsTrigger value="dashboard" className="flex items-center">
            <Gauge className="h-4 w-4 mr-2" />
            <span>Tableau de bord</span>
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>Localisation</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>Alertes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VehicleSpeedometer speed={vehicleData.speed} engineRunning={vehicleData.engineRunning} />
            <FuelGauge fuelLevel={vehicleData.fuelLevel} />
            <div className="md:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Contrôle du moteur</h3>
                    <p className="text-sm text-gray-500">
                      {vehicleData.engineRunning 
                        ? "Le moteur tourne actuellement" 
                        : "Le moteur est arrêté"}
                    </p>
                  </div>
                  <Button 
                    variant={vehicleData.engineRunning ? "destructive" : "default"}
                    onClick={handleToggleEngine}
                    className="flex items-center"
                  >
                    <Power className="h-4 w-4 mr-2" />
                    {vehicleData.engineRunning ? "Arrêter le moteur" : "Démarrer le moteur"}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="map" className="pt-4">
          <VehicleLocation 
            latitude={vehicleData.location.latitude} 
            longitude={vehicleData.location.longitude} 
            isMoving={vehicleData.engineRunning && vehicleData.speed > 0}
          />
        </TabsContent>

        <TabsContent value="alerts" className="pt-4">
          <AlertsPanel alerts={vehicleData.alerts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
