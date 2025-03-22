
import React, { useEffect, useState } from 'react';

interface TimerProps {
  seconds: number;
  isActive: boolean;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ seconds, isActive, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isActive && seconds > 0) {
      setTimeLeft(seconds);
      setVisible(true);
      
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            
            // Add a small delay before calling onComplete to allow for the animation
            setTimeout(() => {
              setVisible(false);
              onComplete();
            }, 500);
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setTimeLeft(null);
      setVisible(false);
    }
  }, [isActive, seconds, onComplete]);

  if (!visible || timeLeft === null) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
      <div className="flex items-center justify-center w-32 h-32 rounded-full bg-picapix-900/60 backdrop-blur-sm animate-countdown">
        <div className="countdown-number">{timeLeft}</div>
      </div>
    </div>
  );
};

export default Timer;
