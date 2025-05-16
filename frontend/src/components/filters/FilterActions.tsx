
import { Button } from "@/components/ui/button";

interface FilterActionsProps {
  onApply: () => void;
  onReset: () => void;
}

export function FilterActions({ onApply, onReset }: FilterActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onApply}
        className="flex-1 bg-autowise-blue hover:bg-autowise-navy"
      >
        Appliquer
      </Button>
      <Button onClick={onReset} variant="outline" className="flex-1">
        Réinitialiser
      </Button>
    </div>
  );
}
