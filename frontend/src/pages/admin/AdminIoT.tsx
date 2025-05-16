
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { IoTDemo } from "@/components/iot/IoTDemo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car } from "@/lib/types";
import { carService } from "@/services/carService";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Activity, Car as CarIcon, AlertTriangle, Truck, Database } from "lucide-react";

export default function AdminIoT() {
  const [selectedCarId, setSelectedCarId] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carsData = await carService.getAllCars();
        setCars(carsData);
        
        // Sélectionner la première voiture par défaut
        if (carsData.length > 0) {
          setSelectedCarId(carsData[0].id);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des véhicules:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la liste des véhicules",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);

  const selectedCar = cars.find(car => car.id === selectedCarId);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Télématique IoT</h1>
            <p className="text-gray-500">
              Suivi en temps réel des véhicules équipés de dispositifs IoT
            </p>
          </div>
          <Button variant="outline">Exporter les données</Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Véhicules connectés</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Véhicules actifs</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Alertes actives</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Données collectées</p>
                  <p className="text-2xl font-bold">4.2 TB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Suivi des véhicules</CardTitle>
                <CardDescription>
                  Sélectionnez un véhicule pour voir ses données en temps réel
                </CardDescription>
              </div>
              <div className="w-72">
                <Select
                  value={selectedCarId}
                  onValueChange={setSelectedCarId}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un véhicule" />
                  </SelectTrigger>
                  <SelectContent>
                    {cars.map((car) => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.brand} {car.model} ({car.year})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            ) : selectedCar ? (
              <IoTDemo carId={selectedCar.id} carName={`${selectedCar.brand} ${selectedCar.model}`} />
            ) : (
              <div className="text-center py-12">
                <Truck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Aucun véhicule sélectionné ou disponible pour le suivi IoT
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rapports et analyses</CardTitle>
            <CardDescription>
              Consultez les rapports et analyses des données IoT
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily">
              <TabsList className="mb-4">
                <TabsTrigger value="daily">Journalier</TabsTrigger>
                <TabsTrigger value="weekly">Hebdomadaire</TabsTrigger>
                <TabsTrigger value="monthly">Mensuel</TabsTrigger>
                <TabsTrigger value="custom">Personnalisé</TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Distance totale parcourue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,248 km</div>
                      <p className="text-xs text-green-500">+12% vs hier</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Consommation moyenne</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">7.2 L/100km</div>
                      <p className="text-xs text-red-500">-3% vs hier</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Temps de conduite</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">182 heures</div>
                      <p className="text-xs text-green-500">+8% vs hier</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Vue d'ensemble des alertes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              i === 0 ? "bg-red-500" : i === 1 ? "bg-yellow-500" : "bg-green-500"
                            }`}></div>
                            <span>
                              {i === 0 
                                ? "Maintenance urgente requise - BMW X5" 
                                : i === 1 
                                ? "Niveau de carburant bas - Mercedes C200" 
                                : "Pneu sous-gonflé - Audi A4"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">Il y a {i + 1} heure{i > 0 ? "s" : ""}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weekly">
                <div className="h-72 flex items-center justify-center border rounded-lg">
                  <p className="text-center text-gray-500">Données hebdomadaires en cours de chargement...</p>
                </div>
              </TabsContent>

              <TabsContent value="monthly">
                <div className="h-72 flex items-center justify-center border rounded-lg">
                  <p className="text-center text-gray-500">Données mensuelles en cours de chargement...</p>
                </div>
              </TabsContent>

              <TabsContent value="custom">
                <div className="h-72 flex items-center justify-center border rounded-lg">
                  <p className="text-center text-gray-500">Sélectionnez une plage de dates personnalisée</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
