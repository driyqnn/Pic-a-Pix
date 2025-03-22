import React, { useEffect, useState } from "react";
import { createPhotoStrip } from "@/utils/photoUtils";
import { toast } from "sonner";

interface PhotoStripProps {
  photos: (HTMLCanvasElement | null)[];
  templateSrc: string;
  previewMode?: boolean;
}

const PhotoStrip: React.FC<PhotoStripProps> = ({
  photos,
  templateSrc,
  previewMode = false,
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Photo positions on the template (x, y, width, height) with 16:9 aspect ratio
  const photoPositions = [
    { x: 24, y: 24, width: 420, height: 236 },
    { x: 24, y: 284, width: 420, height: 236 },
    { x: 24, y: 544, width: 420, height: 236 },
    { x: 24, y: 804, width: 420, height: 236 },
  ];

  // Generate simple preview of captured photos without template
  const generatePreview = () => {
    if (photos.every((photo) => photo === null)) return null;

    const canvas = document.createElement("canvas");
    // Set canvas size to fit all photos in a vertical strip with 16:9 aspect ratio
    const photoWidth = 200;
    const photoHeight = 112; // 16:9 aspect ratio
    const padding = 5;

    canvas.width = photoWidth;
    canvas.height = (photoHeight + padding) * 4;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    photos.forEach((photo, index) => {
      if (!photo) return;

      const y = index * (photoHeight + padding);
      ctx.drawImage(photo, 0, y, photoWidth, photoHeight);
    });

    return canvas.toDataURL("image/jpeg");
  };

  // Load template image (only needed in non-preview mode)
  useEffect(() => {
    if (previewMode) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const img = new Image();

    img.onload = () => {
      setTemplate(img);
      setLoading(false);
      setError(null);
    };

    img.onerror = (e) => {
      console.error("Failed to load template image", e);
      setError("Failed to load template image. Please try another background.");
      setLoading(false);
      toast.error("Background image could not be loaded");
    };

    // Add a cache buster to prevent caching issues
    const cacheBuster = new Date().getTime();
    img.src = `${templateSrc}?v=${cacheBuster}`;
  }, [templateSrc, previewMode]);

  // Generate photo strip when photos or template changes
  useEffect(() => {
    if (previewMode) {
      const previewUrl = generatePreview();
      setDataUrl(previewUrl);
      return;
    }

    const generatePhotoStrip = async () => {
      if (!template) return;

      try {
        const dataUrl = await createPhotoStrip(
          template,
          photos,
          photoPositions
        );
        setDataUrl(dataUrl);
      } catch (error) {
        console.error("Error generating photo strip:", error);
        setError("Error generating photo strip. Please try again.");
        toast.error("Could not generate photo strip");
      }
    };

    if (template) {
      generatePhotoStrip();
    }
  }, [photos, template, previewMode]);

  return (
    <div className="photostrip-container h-fit w-full">
      {loading && !previewMode ? (
        <div className="w-full h-full flex items-center justify-center py-4">
          <div className="text-coquette-500 animate-pulse">
            Loading template...
          </div>
        </div>
      ) : error ? (
        <div className="w-full h-full flex items-center justify-center py-4">
          <div className="text-red-500">{error}</div>
        </div>
      ) : dataUrl ? (
        <img
          src={dataUrl}
          alt="Photo Strip"
          className="w-full h-auto object-contain max-h-[60vh]"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center py-4">
          <div className="text-coquette-500">
            Take photos to see your strip!
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoStrip;
