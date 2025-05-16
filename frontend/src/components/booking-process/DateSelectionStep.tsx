
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateSelectionStepProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  handleNextStep: () => void;
}

export function DateSelectionStep({ date, setDate, handleNextStep }: DateSelectionStepProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-medium mb-4">Sélection des dates</h2>
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Veuillez sélectionner les dates de début et de fin de votre location
        </p>
        
        <div className="flex flex-col space-y-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "PPP", { locale: fr })} -{" "}
                      {format(date.to, "PPP", { locale: fr })}
                    </>
                  ) : (
                    format(date.from, "PPP", { locale: fr })
                  )
                ) : (
                  <span>Sélectionnez les dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
                locale={fr}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <Button onClick={handleNextStep} className="bg-autowise-blue hover:bg-autowise-navy">
          Continuer
        </Button>
      </div>
    </Card>
  );
}
