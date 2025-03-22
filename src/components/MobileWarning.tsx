
import React from 'react';
import { toast } from 'sonner';

interface MobileWarningProps {
  onContinue: () => void;
}

const MobileWarning: React.FC<MobileWarningProps> = ({ onContinue }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in bg-coquette-900/80 backdrop-blur-md">
      <div className="glass-morphism rounded-2xl p-8 max-w-md w-full space-y-4 border-coquette-200 bg-white/90">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-coquette-900">Desktop Only</h2>
          <p className="text-coquette-700 leading-relaxed">
            Pic-a-Pix is designed exclusively for tablets and desktop devices. 
            Please access this website from a larger screen for the full experience.
          </p>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-coquette-300 to-coquette-500 rounded-full my-4"></div>
          <p className="text-coquette-600 text-sm">
            Our photobooth experience requires a larger screen for optimal functionality.
          </p>
        </div>
        
        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              onContinue();
              toast.info('Using Pic-a-Pix in restricted mode');
            }}
            className="bg-coquette-500 hover:bg-coquette-600 text-white font-medium py-2 px-6 rounded-lg 
                      transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-coquette-400 focus:ring-offset-2"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;
