
import React from 'react';
import { Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimerSelectorProps {
  timerSeconds: number;
  onChangeTimer: (seconds: number) => void;
  disabled?: boolean;
}

const TimerSelector: React.FC<TimerSelectorProps> = ({
  timerSeconds,
  onChangeTimer,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor="timer-select" className="text-sm font-medium text-coquette-700 flex items-center gap-2">
        <Clock className="w-4 h-4 text-coquette-500" />
        Timer
      </label>
      <Select
        value={timerSeconds.toString()}
        onValueChange={(value) => onChangeTimer(parseInt(value, 10))}
        disabled={disabled}
      >
        <SelectTrigger id="timer-select" className="w-[120px] bg-white/90 border-coquette-200">
          <SelectValue placeholder="Timer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3">3 seconds</SelectItem>
          <SelectItem value="5">5 seconds</SelectItem>
          <SelectItem value="7">7 seconds</SelectItem>
          <SelectItem value="10">10 seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimerSelector;
