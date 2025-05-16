
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Car } from "@/lib/types";

interface BookingOptionsProps {
  car: Car;
  withDriver: boolean;
  withChildSeat: boolean;
  withGPS: boolean;
  onOptionChange: (option: string, checked: boolean) => void;
}

export function BookingOptions({ 
  car, 
  withDriver, 
  withChildSeat, 
  withGPS, 
  onOptionChange 
}: BookingOptionsProps) {
  return (
    <div className="space-y-2">
      <Label>Options supplémentaires</Label>

      <div className="space-y-2 mt-2">
        {car.driverAvailable && (
          <div className="flex items-center justify-between border p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="with-driver"
                checked={withDriver}
                onCheckedChange={(checked) => {
                  onOptionChange("driver", checked === true);
                }}
              />
              <Label htmlFor="with-driver" className="font-normal">
                Avec chauffeur
              </Label>
            </div>
            <span className="text-sm font-medium">+ 100 TND/jour</span>
          </div>
        )}

        {car.childSeatAvailable && (
          <div className="flex items-center justify-between border p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="with-child-seat"
                checked={withChildSeat}
                onCheckedChange={(checked) => {
                  onOptionChange("childSeat", checked === true);
                }}
              />
              <Label htmlFor="with-child-seat" className="font-normal">
                Siège enfant
              </Label>
            </div>
            <span className="text-sm font-medium">+ 10 TND/jour</span>
          </div>
        )}

        {car.hasGPS && (
          <div className="flex items-center justify-between border p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="with-gps"
                checked={withGPS}
                onCheckedChange={(checked) => {
                  onOptionChange("gps", checked === true);
                }}
              />
              <Label htmlFor="with-gps" className="font-normal">
                Navigation GPS
              </Label>
            </div>
            <span className="text-sm font-medium">+ 15 TND/jour</span>
          </div>
        )}
      </div>
    </div>
  );
}
