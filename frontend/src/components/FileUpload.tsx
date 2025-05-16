
import React, { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { UploadIcon, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  label?: string;
  initialPreview?: string;
  acceptedFileTypes?: string;
  className?: string;
  maxSizeInMB?: number;
}

export default function FileUpload({
  onFileSelect,
  label = "Télécharger une image",
  initialPreview,
  acceptedFileTypes = "image/*",
  className = "",
  maxSizeInMB = 5
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(initialPreview);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (!file) return;
    
    // File size validation
    if (file.size > maxSizeInMB * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: `La taille du fichier ne doit pas dépasser ${maxSizeInMB}MB`,
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      onFileSelect(file);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const resetFile = () => {
    setPreview(undefined);
    onFileSelect(null);
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Aperçu du fichier"
            className="w-32 h-32 object-cover rounded-full"
          />
          <button
            onClick={resetFile}
            className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
            type="button"
            aria-label="Supprimer l'image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50">
          <UploadIcon className="text-gray-400" size={32} />
        </div>
      )}
      
      <div className="flex flex-col items-center">
        <label htmlFor="file-upload" className="cursor-pointer">
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            className="text-sm"
          >
            {isUploading ? "Téléchargement..." : label}
          </Button>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={acceptedFileTypes}
            disabled={isUploading}
          />
        </label>
        <p className="text-xs text-muted-foreground mt-1">
          Format: JPG, PNG. Max: {maxSizeInMB}MB
        </p>
      </div>
    </div>
  );
}
