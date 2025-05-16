
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Si aucune image n'est fournie, afficher une image par défaut
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-72 bg-gray-100 flex items-center justify-center rounded-lg">
        <span className="text-gray-400">Aucune image disponible</span>
      </div>
    );
  }

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      {/* Version normal */}
      <div className="relative w-full">
        <div className="w-full h-72 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
            loading="lazy"
          />
        </div>

        {/* Boutons de navigation */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/80 text-gray-800 hover:bg-white"
            onClick={handlePrevious}
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
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Image suivante</span>
          </Button>
        </div>

        {/* Plein écran */}
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 text-gray-800 hover:bg-white"
            onClick={toggleFullScreen}
          >
            <Maximize2 className="h-4 w-4" />
            <span className="sr-only">Plein écran</span>
          </Button>
        </div>

        {/* Indicateur d'image */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Miniatures */}
        <div className="flex mt-2 overflow-x-auto space-x-2 pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all
                ${currentIndex === index ? "border-autowise-blue" : "border-transparent"}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={image}
                alt={`${alt} - Miniature ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Version plein écran */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={toggleFullScreen}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Fermer</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
            <span className="sr-only">Image précédente</span>
          </Button>

          <img
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
            <span className="sr-only">Image suivante</span>
          </Button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/20 text-white px-3 py-2 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
