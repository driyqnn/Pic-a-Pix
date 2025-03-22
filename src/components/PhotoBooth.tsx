import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import Timer from "./Timer";
import ControlPanel from "./ControlPanel";
import MobileWarning from "./MobileWarning";
import CameraSection from "./CameraSection";
import PhotoStripSidebar from "./PhotoStripSidebar";
import { toast } from "sonner";
import { useCamera } from "@/hooks/useCamera";
import { usePhotoCapture } from "@/hooks/usePhotoCapture";
import { useImageUpload } from "@/hooks/useImageUpload";

const PhotoBooth: React.FC = () => {
  const navigate = useNavigate();

  // State for settings
  const [timerSeconds, setTimerSeconds] = useState<number>(3);
  const [autoCapture, setAutoCapture] = useState<boolean>(true);
  const [selectedBackground, setSelectedBackground] = useState<string>(
    "/backgrounds/white.jpg"
  );

  // Initialize hooks
  const camera = useCamera();

  const photoCapture = usePhotoCapture({
    videoRef: camera.videoRef,
    autoCapture,
    timerSeconds,
    selectedBackground,
    onAllPhotosCapture: (photos) => {
      // Convert canvas elements to data URLs to avoid cloning issues
      const photoDataUrls = photos.map((photo) => {
        if (!photo) return null;
        return photo.toDataURL("image/png");
      });

      // Navigate to the edit page when all photos are captured
      navigate("/edit", { state: { photoDataUrls } });
    },
  });

  const imageUpload = useImageUpload(
    photoCapture.setCapturedPhotos,
    photoCapture.setCurrentPhotoIndex,
    photoCapture.currentPhotoIndex
  );

  // Handle timer change
  const handleTimerChange = useCallback((seconds: number) => {
    setTimerSeconds(seconds);
    toast.info(`Timer set to ${seconds} seconds`);
  }, []);

  // Handle auto-capture toggle
  const handleAutoCapture = useCallback((value: boolean) => {
    setAutoCapture(value);
    toast.info(value ? "Auto-capture enabled" : "Auto-capture disabled");
  }, []);

  // Handle background change
  const handleBackgroundChange = useCallback((backgroundPath: string) => {
    setSelectedBackground(backgroundPath);
    toast.info(
      `Background changed to ${
        backgroundPath.split("/").pop()?.split(".")[0] || "default"
      }`
    );
  }, []);

  // Toggle between camera and upload mode
  const handleToggleMode = useCallback(() => {
    imageUpload.toggleMode(photoCapture.isCapturing);
  }, [imageUpload, photoCapture.isCapturing]);

  return (
    <>
      {camera.showMobileWarning && (
        <MobileWarning onContinue={() => camera.setShowMobileWarning(false)} />
      )}

      <div className="min-h-screen flex flex-col items-start justify-start p-4 lg:p-8 gap-4 pt-8">
        <Breadcrumbs className="w-full mb-2" />

        <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-8">
          {/* Camera preview or image uploader section */}
          <CameraSection
            uploadMode={imageUpload.uploadMode}
            showUploader={imageUpload.showUploader}
            currentPhotoIndex={photoCapture.currentPhotoIndex}
            isCapturing={photoCapture.isCapturing}
            capturedPhotos={photoCapture.capturedPhotos}
            videoRef={camera.videoRef}
            selectedDeviceId={camera.selectedDeviceId}
            onVideoRef={camera.handleVideoRef}
            onDevicesLoaded={camera.handleDevicesLoaded}
            onImageUploaded={imageUpload.handleImageUploaded}
            onCancelUpload={() => imageUpload.setShowUploader(true)}
            onToggleMode={handleToggleMode}
            onRetake={photoCapture.handleRetake}
          />

          {/* Right sidebar with photo strip preview */}
          <PhotoStripSidebar
            capturedPhotos={photoCapture.capturedPhotos}
            selectedBackground={selectedBackground}
            onSelectBackground={handleBackgroundChange}
          />
        </div>
      </div>

      {/* Timer overlay */}
      <Timer
        seconds={timerSeconds}
        isActive={photoCapture.isCapturing}
        onComplete={photoCapture.handleCaptureComplete}
      />

      {/* Control panel */}
      <ControlPanel
        onCapture={photoCapture.handleCapture}
        onRetake={photoCapture.handleRetake}
        onDownload={() => {
          if (photoCapture.capturedPhotos.some((photo) => photo === null)) {
            toast.error("Please capture all 4 photos before downloading");
            return;
          }

          // Convert canvas elements to data URLs to avoid cloning issues
          const photoDataUrls = photoCapture.capturedPhotos.map((photo) => {
            if (!photo) return null;
            return photo.toDataURL("image/png");
          });

          navigate("/edit", { state: { photoDataUrls } });
        }}
        onChangeTimer={handleTimerChange}
        onChangeCameraDevice={camera.handleCameraDeviceChange}
        onToggleAutoCapture={handleAutoCapture}
        timerSeconds={timerSeconds}
        videoDevices={camera.videoDevices}
        selectedDeviceId={camera.selectedDeviceId}
        disabled={camera.showMobileWarning || imageUpload.uploadMode}
        isCapturing={photoCapture.isCapturing}
        allPhotosCapture={photoCapture.allPhotosCapture}
        autoCapture={autoCapture}
      />

      {/* Flash effect */}
      {photoCapture.showFlash && <div className="flash-overlay" />}
    </>
  );
};

export default PhotoBooth;
