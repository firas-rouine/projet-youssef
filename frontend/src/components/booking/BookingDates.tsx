
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BookingDatesProps {
  dateRange: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
  days: number;
}

export function BookingDates({ dateRange, onDateChange, days }: BookingDatesProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="date-range">Dates de location</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date-range"
            variant="outline"
            className="w-full justify-start text-left"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "P", { locale: fr })} -{" "}
                  {format(dateRange.to, "P", { locale: fr })}
                </>
              ) : (
                format(dateRange.from, "P", { locale: fr })
              )
            ) : (
              <span>Sélectionner les dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateChange}
            numberOfMonths={1}
            disabled={(date) => date < new Date()}
            locale={fr}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      <p className="text-sm text-gray-500">
        Durée: {days} jour{days > 1 ? "s" : ""}
      </p>
    </div>
  );
}
