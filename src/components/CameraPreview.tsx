
import React, { useEffect, useRef, useState } from 'react';
import { getVideoDevices, getUserMedia } from '@/utils/photoUtils';
import { toast } from 'sonner';

interface CameraPreviewProps {
  deviceId?: string;
  onVideoRef: (videoRef: HTMLVideoElement | null) => void;
  onDevicesLoaded: (devices: MediaDeviceInfo[]) => void;
}

const CameraPreview: React.FC<CameraPreviewProps> = ({ deviceId, onVideoRef, onDevicesLoaded }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to initialize camera
    const initCamera = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get available video devices
        const devices = await getVideoDevices();
        onDevicesLoaded(devices);

        // Stop any existing stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }

        // Set up constraints based on deviceId
        const constraints: MediaStreamConstraints = {
          video: deviceId 
            ? { 
                deviceId: { exact: deviceId },
                width: { ideal: 1280 },
                height: { ideal: 720 }
              } 
            : {
                width: { ideal: 1280 },
                height: { ideal: 720 }
              },
          audio: false,
        };

        // Get user media
        const stream = await getUserMedia(constraints);
        streamRef.current = stream;

        // Set stream to video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          onVideoRef(videoRef.current);
        }
      } catch (err) {
        console.error('Camera initialization error:', err);
        setError('Could not access camera. Please check permissions and try again.');
        toast.error('Camera access failed. Please check permissions.');
      } finally {
        setLoading(false);
      }
    };

    initCamera();

    // Clean up function
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [deviceId, onVideoRef, onDevicesLoaded]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-black/5 shadow-soft">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm animate-pulse">
          <div className="text-white font-medium">Initializing camera...</div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="text-white font-medium p-6 max-w-md text-center">
            <div className="text-red-400 mb-2">Camera Error</div>
            {error}
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover transform scale-x-[-1]"
      />
    </div>
  );
};

export default CameraPreview;
