
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { addDays, format, isBefore, isAfter, startOfDay, endOfDay } from "date-fns";
import { fr } from "date-fns/locale";

interface AvailabilityCalendarProps {
  onDateSelect: (startDate: Date, endDate: Date) => void;
  bookedDates?: { start: Date; end: Date }[];
}

export function AvailabilityCalendar({ 
  onDateSelect, 
  bookedDates = [] 
}: AvailabilityCalendarProps) {
  const today = startOfDay(new Date());
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Function to check if a date is disabled (booked or in the past)
  const isDateDisabled = (date: Date) => {
    // Disable dates in the past
    if (isBefore(date, today)) {
      return true;
    }
    
    // Disable booked dates
    return bookedDates.some(({ start, end }) => {
      return (
        !isBefore(date, startOfDay(start)) && 
        !isAfter(date, endOfDay(end))
      );
    });
  };

  // Handle date selection
  const handleDateChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setSelectedRange(range);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (selectedRange.from && selectedRange.to) {
      onDateSelect(selectedRange.from, selectedRange.to);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <Label className="text-lg font-medium">Sélectionnez vos dates</Label>
          <p className="text-sm text-gray-500 mt-1">
            Les dates indisponibles sont grisées
          </p>
        </div>
        
        <div className="mb-4">
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={handleDateChange}
            disabled={isDateDisabled}
            locale={fr}
            numberOfMonths={2}
            className="rounded border"
          />
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4">
          {selectedRange.from && (
            <div>
              <Label className="text-sm font-medium">Date de début</Label>
              <p className="text-gray-800">
                {format(selectedRange.from, "d MMMM yyyy", { locale: fr })}
              </p>
            </div>
          )}
          
          {selectedRange.to && (
            <div>
              <Label className="text-sm font-medium">Date de fin</Label>
              <p className="text-gray-800">
                {format(selectedRange.to, "d MMMM yyyy", { locale: fr })}
              </p>
            </div>
          )}
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={!selectedRange.from || !selectedRange.to}
          className="w-full mt-4 bg-autowise-blue hover:bg-autowise-navy"
        >
          Confirmer les dates
        </Button>
      </CardContent>
    </Card>
  );
}
