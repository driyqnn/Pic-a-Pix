
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { capturePhoto, createPhotoStrip } from '@/utils/photoUtils';

export interface PhotoCaptureProps {
  videoRef: HTMLVideoElement | null;
  autoCapture: boolean;
  timerSeconds: number;
  selectedBackground: string;
  onAllPhotosCapture?: (photos: (HTMLCanvasElement | null)[]) => void;
}

export const usePhotoCapture = ({ 
  videoRef, 
  autoCapture, 
  timerSeconds,
  selectedBackground,
  onAllPhotosCapture
}: PhotoCaptureProps) => {
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [capturedPhotos, setCapturedPhotos] = useState<(HTMLCanvasElement | null)[]>([null, null, null, null]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [photoStripUrl, setPhotoStripUrl] = useState<string | null>(null);
  const [showFlash, setShowFlash] = useState<boolean>(false);

  // Handle capture completion for a single photo
  const handleCaptureComplete = useCallback(() => {
    if (!videoRef) return;

    // Create flash effect
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 600);

    // Capture photo
    const capturedPhoto = capturePhoto(videoRef);
    
    // Update captured photos array
    const newPhotos = [...capturedPhotos];
    newPhotos[currentPhotoIndex] = capturedPhoto;
    setCapturedPhotos(newPhotos);

    // Move to next photo slot
    if (currentPhotoIndex < 3) {
      setCurrentPhotoIndex(prev => prev + 1);
      toast.success(`Photo ${currentPhotoIndex + 1} captured!`);
      
      // If auto-capture is enabled and not the last photo, set up capture for next photo
      if (autoCapture && currentPhotoIndex < 3) {
        setTimeout(() => {
          setIsCapturing(true);
        }, 1500); // Short delay before starting the next capture
      } else {
        setIsCapturing(false);
      }
    } else {
      toast.success('All photos captured! Redirecting to editing...');
      setIsCapturing(false);
      
      // Callback when all photos are captured
      if (onAllPhotosCapture) {
        // Convert canvas elements to data URLs to avoid cloning issues during navigation
        const photoDataUrls = newPhotos.map(photo => {
          if (!photo) return null;
          return photo.toDataURL('image/png');
        });
        
        onAllPhotosCapture(newPhotos);
      }
    }
  }, [videoRef, currentPhotoIndex, autoCapture, capturedPhotos, onAllPhotosCapture]);

  // Create photo strip
  const createPhotoStripAndNavigate = useCallback(async () => {
    try {
      // Load template image
      const template = new Image();
      template.src = selectedBackground;
      
      await new Promise((resolve, reject) => {
        template.onload = resolve;
        template.onerror = reject;
      });
      
      const photoStripUrl = await createPhotoStrip(template, capturedPhotos, [
        { x: 24, y: 24, width: 420, height: 315 },
        { x: 24, y: 363, width: 420, height: 315 },
        { x: 24, y: 702, width: 420, height: 315 },
        { x: 24, y: 1041, width: 420, height: 315 },
      ]);
      
      setPhotoStripUrl(photoStripUrl);
      return photoStripUrl;
    } catch (error) {
      console.error('Error creating photo strip:', error);
      toast.error('Failed to create photo strip. Please try again.');
      return null;
    }
  }, [capturedPhotos, selectedBackground]);

  // Start capture process
  const handleCapture = useCallback(() => {
    if (isCapturing || !videoRef) return;
    
    // If all photos are already captured, reset first
    if (currentPhotoIndex >= 4) {
      handleRetake();
      return;
    }
    
    setIsCapturing(true);
    toast.info(`Taking photo in ${timerSeconds} seconds...`);
  }, [isCapturing, videoRef, currentPhotoIndex, timerSeconds]);

  // Reset photos
  const handleRetake = useCallback(() => {
    setCapturedPhotos([null, null, null, null]);
    setCurrentPhotoIndex(0);
    setPhotoStripUrl(null);
    toast.info('Photos reset. Ready to capture new photos.');
  }, []);

  // Determine if all photos are captured
  const allPhotosCapture = capturedPhotos.every(photo => photo !== null);

  return {
    isCapturing,
    capturedPhotos,
    currentPhotoIndex,
    photoStripUrl,
    showFlash,
    allPhotosCapture,
    handleCaptureComplete,
    handleCapture,
    handleRetake,
    createPhotoStripAndNavigate,
    setCapturedPhotos,
    setCurrentPhotoIndex,
    setPhotoStripUrl,
    setIsCapturing
  };
};
