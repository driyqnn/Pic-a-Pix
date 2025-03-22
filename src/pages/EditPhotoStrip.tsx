import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import BackgroundSelector from "@/components/BackgroundSelector";
import PhotoStrip from "@/components/PhotoStrip";
import { Button } from "@/components/ui/button";
import { Download, Save, ArrowLeft } from "lucide-react";
import { downloadPhotoStrip, createPhotoStrip } from "@/utils/photoUtils";
import { toast } from "sonner";

const EditPhotoStrip: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [capturedPhotos, setCapturedPhotos] = useState<
    (HTMLCanvasElement | null)[]
  >([null, null, null, null]);
  const [selectedBackground, setSelectedBackground] = useState<string>(
    "/backgrounds/white.jpg"
  );
  const [photoStripUrl, setPhotoStripUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Convert data URLs back to canvas elements
    if (location.state?.photoDataUrls) {
      const photoDataUrls = location.state.photoDataUrls;

      // Convert data URLs to canvas elements
      const canvasElements = photoDataUrls.map((dataUrl: string | null) => {
        if (!dataUrl) return null;

        const canvas = document.createElement("canvas");
        const img = new Image();

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
        };

        img.src = dataUrl;
        return canvas;
      });

      setCapturedPhotos(canvasElements);
      setLoading(false);
    } else if (location.state?.capturedPhotos) {
      setCapturedPhotos(location.state.capturedPhotos);
      setLoading(false);
    } else {
      // If there's no photo data, redirect to home
      navigate("/");
      toast.error("No photos found. Please take photos first.");
    }
  }, [location.state, navigate]);

  // Generate photo strip when background changes
  useEffect(() => {
    const generatePhotoStrip = async () => {
      try {
        if (capturedPhotos.some((photo) => photo === null)) return;

        setLoading(true);
        // Load template image
        const template = new Image();

        template.onload = async () => {
          try {
            const newPhotoStripUrl = await createPhotoStrip(
              template,
              capturedPhotos,
              [
                { x: 24, y: 24, width: 420, height: 236 },
                { x: 24, y: 284, width: 420, height: 236 },
                { x: 24, y: 544, width: 420, height: 236 },
                { x: 24, y: 804, width: 420, height: 236 },
              ]
            );

            setPhotoStripUrl(newPhotoStripUrl);
            setLoading(false);
          } catch (err) {
            console.error("Error creating photo strip:", err);
            toast.error("Failed to create photo strip. Please try again.");
            setLoading(false);
          }
        };

        template.onerror = (err) => {
          console.error("Error loading template:", err);
          toast.error(
            "Failed to load template. Please try another background."
          );
          setLoading(false);
        };

        // Add a cache buster to prevent caching issues
        const cacheBuster = new Date().getTime();
        template.src = `${selectedBackground}?v=${cacheBuster}`;
      } catch (error) {
        console.error("Error creating photo strip:", error);
        toast.error("Failed to create photo strip. Please try again.");
        setLoading(false);
      }
    };

    generatePhotoStrip();
  }, [capturedPhotos, selectedBackground]);

  const handleBackgroundChange = (backgroundPath: string) => {
    setSelectedBackground(backgroundPath);
    toast.info(
      `Background changed to ${
        backgroundPath.split("/").pop()?.split(".")[0] || "default"
      }`
    );
  };

  const handleDownload = () => {
    if (photoStripUrl) {
      downloadPhotoStrip(photoStripUrl);
      toast.success("Photo strip downloaded successfully!");
    } else {
      toast.error("No photo strip available to download.");
    }
  };

  const GALLERY_STORAGE_KEY = "recentPhotos";

  const handleSaveToGallery = () => {
    // For a real implementation, this would save to a database
    // For now, we'll just simulate saving and navigate to gallery
    if (photoStripUrl) {
      // In a real app, you would save the photo to a database or localStorage here
      const recentPhotos = JSON.parse(
        localStorage.getItem(GALLERY_STORAGE_KEY) || "[]"
      );
      recentPhotos.unshift(photoStripUrl);
      localStorage.setItem(
        GALLERY_STORAGE_KEY,
        JSON.stringify(recentPhotos.slice(0, MAX_RECENT_PHOTOS))
      );
      toast.success("Photo strip saved to gallery!");

      // Navigate to gallery page
      navigate("/gallery", { state: { recentPhoto: photoStripUrl } });
    } else {
      toast.error("No photo strip available to save.");
    }
  };

  const MAX_RECENT_PHOTOS = 10;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-coquette-50 to-coquette-100 dark:from-coquette-900 dark:to-coquette-800">
      <NavBar />

      <div className="container mx-auto flex-1 pt-4 pb-8 px-4">
        <Breadcrumbs className="mb-4" />

        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Camera
        </Button>

        <div className="flex flex-col lg:flex-row gap-8 h-full">
          {/* Preview */}
          <div className="flex-1 max-h-[75vh]">
            <div className="elegant-card h-fit w-full max-w-xs mx-auto">
              <h2 className="elegant-heading text-xl mb-4 text-center">
                Photo Strip Preview
              </h2>
              <div className="overflow-hidden w-full h-fit flex justify-center">
                {loading ? (
                  <div className="w-full py-6 flex items-center justify-center">
                    <div className="text-coquette-500 animate-pulse">
                      Loading photo strip...
                    </div>
                  </div>
                ) : (
                  <PhotoStrip
                    photos={capturedPhotos}
                    templateSrc={selectedBackground}
                  />
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 justify-center">
              <Button
                onClick={handleDownload}
                disabled={!photoStripUrl || loading}
                className="bg-coquette-500 hover:bg-coquette-600 text-white">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>

              <Button
                onClick={handleSaveToGallery}
                disabled={!photoStripUrl || loading}
                className="bg-coquette-600 hover:bg-coquette-700 text-white">
                <Save className="mr-2 h-4 w-4" />
                Save to Gallery
              </Button>
            </div>
          </div>

          {/* Customization Options */}
          <div className="lg:w-1/3 h-fit space-y-6">
            <div className="elegant-card h-fit">
              <h2 className="elegant-heading text-xl mb-4 text-center">
                Background Options
              </h2>
              <BackgroundSelector
                selectedBackground={selectedBackground}
                onSelectBackground={handleBackgroundChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPhotoStrip;
