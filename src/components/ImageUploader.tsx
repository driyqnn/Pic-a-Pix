
import React, { useState } from 'react';
import { createPhotoFromFile } from '@/utils/photoUtils';
import { Button } from '@/components/ui/button';
import { Upload, Camera, X } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageUploaded: (photo: HTMLCanvasElement, index: number) => void;
  onCancel: () => void;
  currentIndex: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, onCancel, currentIndex }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File is too large. Maximum size is 5MB');
      return;
    }

    setIsLoading(true);
    try {
      const photo = await createPhotoFromFile(file);
      onImageUploaded(photo, currentIndex);
      toast.success(`Image ${currentIndex + 1} uploaded successfully`);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to process image. Please try another one.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-soft">
      <div className="text-center mb-4">
        <h3 className="elegant-heading text-lg">Upload Image {currentIndex + 1}</h3>
        <p className="text-coquette-600 text-sm mt-1">
          Select an image from your device
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-coquette-300 rounded-lg bg-coquette-50/50 hover:bg-coquette-50 cursor-pointer transition-colors">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isLoading}
          />
          <div className="flex flex-col items-center justify-center">
            <Upload 
              className="w-8 h-8 text-coquette-400 mb-2" 
              strokeWidth={1.5} 
            />
            <span className="text-sm text-coquette-600">
              {isLoading ? 'Processing...' : 'Click to select image'}
            </span>
          </div>
        </label>

        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            className="flex-1 text-coquette-700 border-coquette-200 hover:bg-coquette-50"
            onClick={onCancel}
            disabled={isLoading}
          >
            <X className="mr-1 w-4 h-4" />
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-coquette-500 hover:bg-coquette-600 text-white" 
            onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
            disabled={isLoading}
          >
            <Camera className="mr-1 w-4 h-4" />
            Take Photo Instead
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
