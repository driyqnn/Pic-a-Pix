import React from "react";
import { Zap, ZapOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface AutoCaptureToggleProps {
  autoCapture: boolean;
  onToggleAutoCapture: (enabled: boolean) => void;
  disabled?: boolean;
}

const AutoCaptureToggle: React.FC<AutoCaptureToggleProps> = ({
  autoCapture,
  onToggleAutoCapture,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-between">
      <label
        htmlFor="auto-capture"
        className="text-sm font-medium text-coquette-700 flex items-center gap-2 cursor-pointer">
        {autoCapture ? (
          <Zap className="w-4 h-4 text-coquette-500" />
        ) : (
          <ZapOff className="w-4 h-4 text-coquette-400" />
        )}
        Auto-capture
      </label>
      <Switch
        id="auto-capture"
        checked={autoCapture}
        onCheckedChange={onToggleAutoCapture}
        disabled={disabled}
        className="data-[state=checked]:bg-coquette-500"
      />
    </div>
  );
};

export default AutoCaptureToggle;
