import React from "react";
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface BackgroundOption {
  id: string;
  name: string;
  path: string;
}

interface BackgroundSelectorProps {
  selectedBackground: string;
  onSelectBackground: (backgroundPath: string) => void;
}

const backgrounds: BackgroundOption[] = [
  { id: "white", name: "White", path: "/backgrounds/white.jpg" },
  { id: "butterfly", name: "Butterfly", path: "/backgrounds/butterfly.jpg" },
  { id: "coquette", name: "Coquette", path: "/backgrounds/coquette.jpg" },
  { id: "cherry", name: "Cherry", path: "/backgrounds/cherry.jpg" },
  { id: "bear", name: "Bear", path: "/backgrounds/bear.jpg" },
  { id: "sunflower", name: "Sunflower", path: "/backgrounds/sunflower.jpg" },
  { id: "sky", name: "Sky", path: "/backgrounds/sky.jpg" },
  { id: "neko", name: "Neko", path: "/backgrounds/neko.jpg" },
  { id: "catto", name: "Catto", path: "/backgrounds/catto.jpg" },
  { id: "doggo", name: "Doggo", path: "/backgrounds/doggo.jpg" },
  { id: "floofy", name: "Floofy", path: "/backgrounds/floofy.jpg" },
];

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  selectedBackground,
  onSelectBackground,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-soft">
      <h3 className="text-coquette-900 text-lg font-medium mb-3 text-center">
        Choose Background
      </h3>

      <div className={`grid ${isMobile ? "grid-cols-4" : "grid-cols-5"} gap-3`}>
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            className={`relative rounded-full overflow-hidden aspect-square transition-all duration-200 
                      ${
                        selectedBackground === bg.path
                          ? "ring-2 ring-coquette-500 scale-110 shadow-lg z-10"
                          : "hover:scale-105 hover:shadow-md"
                      }`}
            onClick={() => onSelectBackground(bg.path)}
            aria-label={`Select ${bg.name} background`}
            title={bg.name}>
            <img
              src={bg.path}
              alt={bg.name}
              className="w-full h-full object-cover"
            />

            {selectedBackground === bg.path && (
              <div className="absolute bottom-0 right-0 bg-coquette-500 text-white rounded-full p-1 shadow-md">
                <Check className="h-3 w-3" />
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedBackground && (
        <div className="mt-3 text-center text-xs text-coquette-600">
          {backgrounds.find((bg) => bg.path === selectedBackground)?.name ||
            "Custom background"}
        </div>
      )}
    </div>
  );
};

export default BackgroundSelector;
