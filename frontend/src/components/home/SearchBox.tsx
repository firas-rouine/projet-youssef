
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

export function SearchBox() {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (vehicleType) params.append("category", vehicleType);
    if (date) params.append("date", format(date, "yyyy-MM-dd"));
    navigate(`/cars?${params.toString()}`);
  };
  
  return (
    <section className="bg-white py-8 relative -mt-8 z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-autowise-navy">Trouvez votre véhicule idéal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Type de véhicule</label>
              <div className="relative">
                <select 
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-autowise-blue focus:border-autowise-blue outline-none transition-all"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="">Tous les types</option>
                  <option value="economy">Économique</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxe</option>
                  <option value="utility">Utilitaire</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Dates</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "w-full justify-start text-left font-normal border border-gray-200 p-3 h-auto",
                      !date && "text-gray-500"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd MMMM yyyy", { locale: fr }) : "Choisir une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={fr}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button 
              className="bg-autowise-blue hover:bg-autowise-navy flex items-center justify-center gap-2 h-auto py-3 mt-auto shadow-md transition-all"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
              <span>Rechercher</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
