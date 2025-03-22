
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const useImageUpload = (
  setCapturedPhotos: React.Dispatch<React.SetStateAction<(HTMLCanvasElement | null)[]>>,
  setCurrentPhotoIndex: React.Dispatch<React.SetStateAction<number>>,
  currentPhotoIndex: number
) => {
  const [showUploader, setShowUploader] = useState<boolean>(false);
  const [uploadMode, setUploadMode] = useState<boolean>(false);

  // Handle uploaded image
  const handleImageUploaded = useCallback((photo: HTMLCanvasElement, index: number) => {
    setCapturedPhotos(prev => {
      const newPhotos = [...prev];
      newPhotos[index] = photo;
      return newPhotos;
    });
    
    // Move to next photo
    if (index < 3) {
      setCurrentPhotoIndex(prev => prev + 1);
    } else {
      toast.success('All photos uploaded! Generating preview...');
    }
    
    setShowUploader(false);
  }, [setCapturedPhotos, setCurrentPhotoIndex]);

  // Toggle between camera and upload mode
  const toggleMode = useCallback((isCapturing: boolean) => {
    if (isCapturing) return;
    
    setUploadMode(!uploadMode);
    if (!uploadMode) {
      setShowUploader(true);
    } else {
      setShowUploader(false);
    }
    
    toast.info(uploadMode ? 'Switched to camera mode' : 'Switched to upload mode');
  }, [uploadMode]);

  return {
    showUploader,
    uploadMode,
    setShowUploader,
    setUploadMode,
    handleImageUploaded,
    toggleMode
  };
};
