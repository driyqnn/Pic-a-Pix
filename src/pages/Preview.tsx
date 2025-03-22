
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import BackgroundSelector from '@/components/BackgroundSelector';
import { Download } from 'lucide-react';
import { downloadPhotoStrip } from '@/utils/photoUtils';
import { toast } from 'sonner';

const Preview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [photoStripUrl, setPhotoStripUrl] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<string>('/photo-strip-template.png');
  
  useEffect(() => {
    // Check if we have photo data from the state
    if (location.state?.photoStripUrl) {
      setPhotoStripUrl(location.state.photoStripUrl);
    } else {
      // If there's no photo data, redirect to home
      navigate('/');
      toast.error('No photo session data found. Please take photos first.');
    }
  }, [location.state, navigate]);
  
  const handleBackgroundChange = (backgroundPath: string) => {
    setSelectedBackground(backgroundPath);
    toast.info(`Background changed to ${backgroundPath.split('/').pop()?.split('.')[0] || 'custom'}`);
    // In a real app, we would regenerate the photo strip with the new background here
  };
  
  const handleDownload = () => {
    if (photoStripUrl) {
      downloadPhotoStrip(photoStripUrl);
      toast.success('Photo strip downloaded successfully!');
    } else {
      toast.error('No photo strip available to download.');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-coquette-50 to-coquette-100 dark:from-coquette-900 dark:to-coquette-800">
      <NavBar />
      
      <div className="container mx-auto flex-1 p-8 flex flex-col md:flex-row gap-8">
        {/* Photo strip preview */}
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-coquette-900 dark:text-coquette-100 mb-4">Your Photo Strip</h2>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-soft max-h-[70vh] overflow-y-auto">
            {photoStripUrl ? (
              <img 
                src={photoStripUrl} 
                alt="Your photo strip" 
                className="max-w-full h-auto object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-96 text-coquette-500">
                Loading your photo strip...
              </div>
            )}
          </div>
          
          <button
            onClick={handleDownload}
            disabled={!photoStripUrl}
            className="mt-6 flex items-center gap-2 bg-coquette-500 hover:bg-coquette-600 disabled:bg-coquette-300 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Photo Strip
          </button>
        </div>
        
        {/* Background selector */}
        <div className="md:w-1/3 flex flex-col">
          <h2 className="text-2xl font-semibold text-coquette-900 dark:text-coquette-100 mb-4">Customize</h2>
          <BackgroundSelector 
            selectedBackground={selectedBackground}
            onSelectBackground={handleBackgroundChange}
          />
          
          <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft">
            <h3 className="text-lg font-medium text-coquette-900 mb-2">Options</h3>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-coquette-100 hover:bg-coquette-200 text-coquette-800 font-medium px-4 py-2 rounded-lg transition-colors mb-2"
            >
              Take New Photos
            </button>
            
            <button
              onClick={() => navigate('/gallery')}
              className="w-full bg-coquette-100 hover:bg-coquette-200 text-coquette-800 font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Go to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
