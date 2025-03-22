
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { isMobileDevice, isTabletOrLarger } from '@/utils/photoUtils';

export const useCamera = () => {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [showMobileWarning, setShowMobileWarning] = useState<boolean>(false);

  // Check if on mobile device
  useEffect(() => {
    if (isMobileDevice() && !isTabletOrLarger()) {
      setShowMobileWarning(true);
    }
  }, []);

  // Handle video ref update
  const handleVideoRef = useCallback((video: HTMLVideoElement | null) => {
    setVideoRef(video);
  }, []);

  // Handle device change
  const handleCameraDeviceChange = useCallback((deviceId: string) => {
    setSelectedDeviceId(deviceId);
    toast.info('Camera switched successfully');
  }, []);

  // Handle devices loaded
  const handleDevicesLoaded = useCallback((devices: MediaDeviceInfo[]) => {
    setVideoDevices(devices);
    if (devices.length > 0 && !selectedDeviceId) {
      setSelectedDeviceId(devices[0].deviceId);
    }
  }, [selectedDeviceId]);

  return {
    videoRef,
    videoDevices,
    selectedDeviceId,
    showMobileWarning,
    setShowMobileWarning,
    handleVideoRef,
    handleCameraDeviceChange,
    handleDevicesLoaded
  };
};
