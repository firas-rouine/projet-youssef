
import React from "react";
import { Button } from "@/components/ui/button";
import { BookingSteps } from "./BookingSteps";
import { NavigateFunction } from "react-router-dom";

interface BookingProcessLayoutProps {
  step: number;
  navigate: NavigateFunction;
  children: React.ReactNode;
}

export function BookingProcessLayout({ step, navigate, children }: BookingProcessLayoutProps) {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-autowise-navy">Réservation de véhicule</h1>
          <Button variant="outline" onClick={() => navigate(-1)}>Retour</Button>
        </div>
        
        <BookingSteps step={step} />
      </div>
      
      {children}
    </div>
  );
}
