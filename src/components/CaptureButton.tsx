import React from "react";
import { Camera } from "lucide-react";

interface CaptureButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isCapturing?: boolean;
}

const CaptureButton: React.FC<CaptureButtonProps> = ({
  onClick,
  disabled = false,
  isCapturing = false,
}) => {
  return (
    <button
      className={`capture-button relative inline-flex items-center justify-center 
                w-14 h-14 md:w-16 md:h-16 rounded-full border-4 
                ${
                  isCapturing
                    ? "bg-coquette-600 border-coquette-300 animate-pulse"
                    : "bg-white border-coquette-500"
                } 
                ${
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-coquette-50 hover:border-coquette-600 active:scale-90"
                } 
                transition-all duration-300 ease-out focus:outline-none shadow-md`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Capture photo">
      <span className="sr-only">Capture photo</span>
      <Camera
        className={`h-6 w-6 ${
          isCapturing ? "text-white" : "text-coquette-500"
        }`}
      />
    </button>
  );
};

export default CaptureButton;
