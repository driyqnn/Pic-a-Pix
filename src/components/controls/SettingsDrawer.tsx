
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import TimerSelector from './TimerSelector';
import CameraDeviceSelector from './CameraDeviceSelector';
import AutoCaptureToggle from './AutoCaptureToggle';

interface SettingsDrawerProps {
  timerSeconds: number;
  onChangeTimer: (seconds: number) => void;
  videoDevices: MediaDeviceInfo[];
  selectedDeviceId: string;
  onChangeCameraDevice: (deviceId: string) => void;
  onToggleAutoCapture?: (enabled: boolean) => void;
  autoCapture?: boolean;
  disabled?: boolean;
  isCapturing?: boolean;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  timerSeconds,
  onChangeTimer,
  videoDevices,
  selectedDeviceId,
  onChangeCameraDevice,
  onToggleAutoCapture,
  autoCapture = true,
  disabled = false,
  isCapturing = false,
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 border-coquette-200 hover:bg-coquette-50"
          disabled={disabled || isCapturing}
        >
          <Settings className="h-4 w-4 text-coquette-700" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white/95 backdrop-blur-lg">
        <DrawerHeader>
          <DrawerTitle className="text-coquette-900">Camera Settings</DrawerTitle>
          <DrawerDescription className="text-coquette-600">
            Adjust your photo session settings
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 p-4">
          <TimerSelector 
            timerSeconds={timerSeconds}
            onChangeTimer={onChangeTimer}
            disabled={disabled || isCapturing}
          />
          
          {videoDevices.length > 1 && (
            <CameraDeviceSelector
              videoDevices={videoDevices}
              selectedDeviceId={selectedDeviceId}
              onChangeCameraDevice={onChangeCameraDevice}
              disabled={disabled || isCapturing}
            />
          )}
          
          {onToggleAutoCapture && (
            <AutoCaptureToggle
              autoCapture={autoCapture}
              onToggleAutoCapture={onToggleAutoCapture}
              disabled={disabled || isCapturing}
            />
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="border-coquette-200 text-coquette-800">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDrawer;
