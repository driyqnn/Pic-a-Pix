
import React from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CaptureButton from '../CaptureButton';

interface ControlButtonGroupProps {
  onCapture: () => void;
  onRetake: () => void;
  onDownload: () => void;
  disabled?: boolean;
  isCapturing?: boolean;
  allPhotosCapture?: boolean;
}

const ControlButtonGroup: React.FC<ControlButtonGroupProps> = ({
  onCapture,
  onRetake,
  onDownload,
  disabled = false,
  isCapturing = false,
  allPhotosCapture = false,
}) => {
  return (
    <div className="flex items-center gap-3">
      <CaptureButton
        onClick={onCapture}
        disabled={disabled || isCapturing}
        isCapturing={isCapturing}
      />

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onRetake}
          disabled={disabled || isCapturing}
          className="bg-white/90 border-coquette-200 hover:bg-coquette-50"
        >
          <RefreshCw className="h-4 w-4 text-coquette-700" />
          <span className="sr-only">Retake Photos</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onDownload}
          disabled={disabled || !allPhotosCapture || isCapturing}
          className={`bg-white/90 border-coquette-200 ${
            allPhotosCapture ? 'hover:bg-coquette-50' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <Download className="h-4 w-4 text-coquette-700" />
          <span className="sr-only">Download Photo Strip</span>
        </Button>
      </div>
    </div>
  );
};

export default ControlButtonGroup;
