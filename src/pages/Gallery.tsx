
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadPhotoStrip } from '@/utils/photoUtils';
import { toast } from 'sonner';

// In a real app, this would be stored in a database
// For demo purposes, we'll use localStorage
const GALLERY_STORAGE_KEY = 'pic-a-pix-gallery';

const Gallery: React.FC = () => {
  const location = useLocation();
  const [photoStrips, setPhotoStrips] = useState<string[]>([]);
  
  useEffect(() => {
    // Load saved photo strips from localStorage
    const savedStrips = localStorage.getItem(GALLERY_STORAGE_KEY);
    const initialStrips = savedStrips ? JSON.parse(savedStrips) : [];
    setPhotoStrips(initialStrips);
    
    // Add new photo if provided in state
    if (location.state?.recentPhoto) {
      const newPhoto = location.state.recentPhoto;
      if (!initialStrips.includes(newPhoto)) {
        const updatedStrips = [newPhoto, ...initialStrips];
        setPhotoStrips(updatedStrips);
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedStrips));
      }
    }
  }, [location.state]);
  
  const handleDownload = (photoUrl: string, index: number) => {
    downloadPhotoStrip(photoUrl, `photo-strip-${index + 1}.png`);
    toast.success('Photo strip downloaded');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-coquette-50 to-coquette-100 dark:from-coquette-900 dark:to-coquette-800">
      <NavBar />
      
      <div className="container mx-auto p-4 pt-8">
        <Breadcrumbs className="mb-4" />
        
        <h1 className="text-3xl font-semibold text-coquette-900 dark:text-coquette-100 mb-8 text-center">
          Your Photo Gallery
        </h1>
        
        {photoStrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photoStrips.map((photoUrl, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-soft flex flex-col">
                <img 
                  src={photoUrl} 
                  alt={`Photo strip ${index + 1}`} 
                  className="w-full h-auto object-contain mb-3 rounded"
                />
                <Button 
                  onClick={() => handleDownload(photoUrl, index)}
                  className="bg-coquette-500 hover:bg-coquette-600 text-white mt-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 rounded-xl bg-white/70 backdrop-blur-sm shadow-soft border border-coquette-200">
            <p className="text-coquette-700 dark:text-coquette-300">
              Your gallery is empty. Capture some photos to see them here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
