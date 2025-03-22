import React from "react";
import { Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import ControlButtonGroup from "./controls/ControlButtonGroup";
import SettingsDrawer from "./controls/SettingsDrawer";
import TimerSelector from "./controls/TimerSelector";
import AutoCaptureToggle from "./controls/AutoCaptureToggle";

interface ControlPanelProps {
  onCapture: () => void;
  onRetake: () => void;
  onDownload: () => void;
  onChangeTimer: (seconds: number) => void;
  onChangeCameraDevice: (deviceId: string) => void;
  onToggleAutoCapture?: (enabled: boolean) => void;
  timerSeconds: number;
  videoDevices: MediaDeviceInfo[];
  selectedDeviceId: string;
  disabled?: boolean;
  isCapturing?: boolean;
  allPhotosCapture?: boolean;
  autoCapture?: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onCapture,
  onRetake,
  onDownload,
  onChangeTimer,
  onChangeCameraDevice,
  onToggleAutoCapture,
  timerSeconds,
  videoDevices,
  selectedDeviceId,
  disabled = false,
  isCapturing = false,
  allPhotosCapture = false,
  autoCapture = true,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="control-panel">
      {isMobile ? (
        <>
          <SettingsDrawer
            timerSeconds={timerSeconds}
            onChangeTimer={onChangeTimer}
            videoDevices={videoDevices}
            selectedDeviceId={selectedDeviceId}
            onChangeCameraDevice={onChangeCameraDevice}
            onToggleAutoCapture={onToggleAutoCapture}
            autoCapture={autoCapture}
            disabled={disabled}
            isCapturing={isCapturing}
          />
          <ControlButtonGroup
            onCapture={onCapture}
            onRetake={onRetake}
            onDownload={onDownload}
            disabled={disabled}
            isCapturing={isCapturing}
            allPhotosCapture={allPhotosCapture}
          />
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Select
              value={timerSeconds.toString()}
              onValueChange={(value) => onChangeTimer(parseInt(value, 10))}
              disabled={disabled || isCapturing}>
              <SelectTrigger className="w-[110px] bg-white/90 border-coquette-200">
                <Clock className="w-4 h-4 mr-2 text-coquette-500" />
                <SelectValue placeholder="Timer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 seconds</SelectItem>
                <SelectItem value="5">5 seconds</SelectItem>
                <SelectItem value="7">7 seconds</SelectItem>
                <SelectItem value="10">10 seconds</SelectItem>
              </SelectContent>
            </Select>

            {onToggleAutoCapture && (
              <div className="w-[180px] bg-white/90 border border-coquette-200 rounded-md py-1 px-2">
                <AutoCaptureToggle
                  autoCapture={autoCapture || false}
                  onToggleAutoCapture={onToggleAutoCapture}
                  disabled={disabled || isCapturing}
                />
              </div>
            )}
          </div>

          <ControlButtonGroup
            onCapture={onCapture}
            onRetake={onRetake}
            onDownload={onDownload}
            disabled={disabled}
            isCapturing={isCapturing}
            allPhotosCapture={allPhotosCapture}
          />
        </>
      )}
    </div>
  );
};

export default ControlPanel;
