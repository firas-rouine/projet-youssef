
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface VehicleLocationProps {
  latitude: number;
  longitude: number;
  isMoving: boolean;
}

export function VehicleLocation({ latitude, longitude, isMoving }: VehicleLocationProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  
  useEffect(() => {
    // Check if map already initialized
    if (mapRef.current) return;
    
    // Simulate map initialization with a placeholder
    const initMap = () => {
      if (!mapContainer.current) return;
      
      // Create placeholder map div
      const mapElement = document.createElement("div");
      mapElement.classList.add("bg-gray-200", "w-full", "h-full", "rounded");
      mapElement.style.backgroundImage = "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/10.1815,36.8065,12,0/600x400?access_token=pk.dummy')";
      mapElement.style.backgroundSize = "cover";
      mapElement.style.backgroundPosition = "center";
      mapContainer.current.appendChild(mapElement);
      
      // Create car marker
      const marker = document.createElement("div");
      marker.classList.add("absolute", "w-4", "h-4", "bg-red-500", "rounded-full", "transform", "-translate-x-1/2", "-translate-y-1/2");
      marker.style.boxShadow = "0 0 0 2px white";
      marker.style.left = "50%";
      marker.style.top = "50%";
      
      // Pulsating effect
      const pulse = document.createElement("div");
      pulse.classList.add("absolute", "w-4", "h-4", "bg-red-500", "rounded-full", "opacity-70", "animate-ping");
      marker.appendChild(pulse);
      
      mapElement.appendChild(marker);
      markerRef.current = marker;
      mapRef.current = mapElement;
    };
    
    initMap();
  }, []);
  
  useEffect(() => {
    // Update car marker position (simple simulation)
    if (markerRef.current) {
      // In a real implementation, we would convert lat/lng to pixel coordinates
      // Here we just move the marker randomly a bit to simulate movement
      if (isMoving) {
        const left = 50 + (Math.random() * 6 - 3);
        const top = 50 + (Math.random() * 6 - 3);
        markerRef.current.style.left = `${left}%`;
        markerRef.current.style.top = `${top}%`;
      }
    }
  }, [latitude, longitude, isMoving]);
  
  return (
    <Card className="p-6">
      <h3 className="font-medium mb-2">Localisation du véhicule</h3>
      
      <div className="mb-4">
        <div className="text-sm text-gray-500 flex justify-between">
          <span>Latitude: {latitude.toFixed(4)}</span>
          <span>Longitude: {longitude.toFixed(4)}</span>
        </div>
      </div>
      
      <div 
        ref={mapContainer} 
        className="relative w-full h-[400px] rounded overflow-hidden border border-gray-300"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-center p-4">
          <div>
            <p className="text-gray-500 mb-2">
              Carte interactive simulée
            </p>
            <p className="text-sm text-gray-400">
              Cette carte est une simulation. Dans une version future, une carte interactive
              afficherait la position exacte du véhicule en temps réel.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>
          {isMoving 
            ? "Le véhicule est actuellement en mouvement" 
            : "Le véhicule est actuellement à l'arrêt"}
        </p>
      </div>
    </Card>
  );
}
