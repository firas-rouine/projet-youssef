
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface CarGalleryControlsProps {
  onPrevious: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
  onFullScreen: () => void;
  currentIndex: number;
  totalImages: number;
}

export function CarGalleryControls({
  onPrevious,
  onNext,
  onFullScreen,
  currentIndex,
  totalImages,
}: CarGalleryControlsProps) {
  return (
    <>
      {/* Navigation buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 text-gray-800 hover:bg-white"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Image précédente</span>
        </Button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 text-gray-800 hover:bg-white"
          onClick={onNext}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Image suivante</span>
        </Button>
      </div>

      {/* Fullscreen button */}
      <div className="absolute top-2 right-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 text-gray-800 hover:bg-white"
          onClick={onFullScreen}
        >
          <Maximize2 className="h-4 w-4" />
          <span className="sr-only">Plein écran</span>
        </Button>
      </div>

      {/* Image counter */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs">
          {currentIndex + 1} / {totalImages}
        </div>
      </div>
    </>
  );
}
