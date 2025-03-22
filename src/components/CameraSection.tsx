
import React from 'react';
import CameraPreview from './CameraPreview';
import ImageUploader from './ImageUploader';
import { Button } from './ui/button';
import { Upload, Camera, RefreshCw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CameraSectionProps {
  uploadMode: boolean;
  showUploader: boolean;
  currentPhotoIndex: number;
  isCapturing: boolean;
  capturedPhotos: (HTMLCanvasElement | null)[];
  videoRef: HTMLVideoElement | null;
  selectedDeviceId: string;
  onVideoRef: (video: HTMLVideoElement | null) => void;
  onDevicesLoaded: (devices: MediaDeviceInfo[]) => void;
  onImageUploaded: (photo: HTMLCanvasElement, index: number) => void;
  onCancelUpload: () => void;
  onToggleMode: () => void;
  onRetake: () => void;
}

const CameraSection: React.FC<CameraSectionProps> = ({
  uploadMode,
  showUploader,
  currentPhotoIndex,
  isCapturing,
  capturedPhotos,
  videoRef,
  selectedDeviceId,
  onVideoRef,
  onDevicesLoaded,
  onImageUploaded,
  onCancelUpload,
  onToggleMode,
  onRetake
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`w-full ${isMobile ? '' : 'lg:w-2/3 xl:w-1/2'} flex flex-col items-center`}>
      <div className="w-full max-w-2xl aspect-[4/3] rounded-xl overflow-hidden shadow-soft">
        {uploadMode ? (
          showUploader ? (
            <ImageUploader 
              onImageUploaded={onImageUploaded} 
              onCancel={onCancelUpload} 
              currentIndex={currentPhotoIndex}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-coquette-50/50 p-6">
              <p className="text-coquette-700 mb-4 text-center">
                Upload your photos instead of taking them with a camera
              </p>
              <Button 
                onClick={onCancelUpload}
                className="bg-coquette-500 hover:bg-coquette-600 text-white"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo {currentPhotoIndex + 1}
              </Button>
            </div>
          )
        ) : (
          <CameraPreview
            deviceId={selectedDeviceId}
            onVideoRef={onVideoRef}
            onDevicesLoaded={onDevicesLoaded}
          />
        )}
      </div>
      
      <div className="mt-3 text-center">
        <p className="text-coquette-600 text-sm">
          {currentPhotoIndex < 4
            ? `${uploadMode ? 'Upload' : 'Capture'} photo ${currentPhotoIndex + 1} of 4`
            : 'All photos captured! View your photo strip.'}
        </p>
      </div>
      
      <div className={`mt-3 flex ${isMobile ? 'flex-col gap-2' : 'gap-4'}`}>
        <Button
          variant="outline"
          onClick={onToggleMode}
          disabled={isCapturing}
          className="bg-white border-coquette-200 text-coquette-800 hover:bg-coquette-50"
          size={isMobile ? "sm" : "default"}
        >
          {uploadMode ? (
            <>
              <Camera className="mr-2 h-4 w-4" />
              Switch to Camera
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Switch to Upload
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={onRetake}
          disabled={isCapturing || capturedPhotos.every(photo => photo === null)}
          className="bg-white border-coquette-200 text-coquette-800 hover:bg-coquette-50"
          size={isMobile ? "sm" : "default"}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset All Photos
        </Button>
      </div>
    </div>
  );
};

export default CameraSection;
