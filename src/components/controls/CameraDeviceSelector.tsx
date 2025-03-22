import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CameraDeviceSelectorProps {
  videoDevices: MediaDeviceInfo[];
  selectedDeviceId: string;
  onChangeCameraDevice: (deviceId: string) => void;
  disabled?: boolean;
}

const CameraDeviceSelector: React.FC<CameraDeviceSelectorProps> = ({
  videoDevices,
  selectedDeviceId,
  onChangeCameraDevice,
  disabled = false,
}) => {
  if (videoDevices.length <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <label
        htmlFor="camera-select"
        className="text-sm font-medium text-coquette-700">
        Camera
      </label>
      <Select
        value={selectedDeviceId}
        onValueChange={onChangeCameraDevice}
        disabled={disabled}>
        <SelectTrigger
          id="camera-select"
          className="w-[180px] bg-white/90 border-coquette-200">
          <SelectValue placeholder="Select Camera" />%
        </SelectTrigger>
        <SelectContent>
          {videoDevices.map((device) => (
            <SelectItem key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CameraDeviceSelector;
