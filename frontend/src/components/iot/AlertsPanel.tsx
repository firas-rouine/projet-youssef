
import { Card } from "@/components/ui/card";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface Alert {
  id: string;
  type: "info" | "warning" | "danger";
  message: string;
  timestamp: Date;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  // Function to render the appropriate icon based on alert type
  const renderAlertIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "danger":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  // Function to get background color based on alert type
  const getAlertBackgroundColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-50";
      case "warning":
        return "bg-yellow-50";
      case "danger":
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-medium mb-4">Notifications et alertes</h3>
      
      {alerts.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <Info className="h-6 w-6 mx-auto mb-2 text-gray-400" />
          <p>Aucune alerte actuellement</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-md flex items-start ${getAlertBackgroundColor(alert.type)}`}
            >
              <div className="mr-3 pt-0.5">
                {renderAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <p className="font-medium">{alert.message}</p>
                <p className="text-xs text-gray-500">
                  {format(alert.timestamp, "dd/MM/yyyy HH:mm:ss")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
