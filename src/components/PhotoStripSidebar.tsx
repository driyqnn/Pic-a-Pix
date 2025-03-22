import React from "react";
import PhotoStrip from "./PhotoStrip";
import { useIsMobile } from "@/hooks/use-mobile";

interface PhotoStripSidebarProps {
  capturedPhotos: (HTMLCanvasElement | null)[];
  selectedBackground: string;
  onSelectBackground?: (backgroundPath: string) => void;
}

const PhotoStripSidebar: React.FC<PhotoStripSidebarProps> = ({
  capturedPhotos,
  selectedBackground,
}) => {
  const isMobile = useIsMobile();

  // Hide the sidebar entirely on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div className="w-auto max-w-[300px] xl:max-w-[350px] flex-shrink-0 flex flex-col gap-4 h-fit">
      {/* Photo strip preview */}
      <div className="elegant-card">
        <h2 className="elegant-heading text-lg mb-3 text-center">
          Your Photos
        </h2>
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <PhotoStrip
            photos={capturedPhotos}
            templateSrc={selectedBackground}
            previewMode={true}
          />
        </div>
        <div className="flex items-center justify-center mt-4">
          <a
            href="https://www.facebook.com/driyqnn/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-playfair text-[.65rem] text-coquette-500 hover:text-coquette-700 transition-colors">
            Developed with ❤️ by{" "}
            <span className="border-b border-coquette-500">@driyqnn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PhotoStripSidebar;
