
import React from 'react';
import PhotoBooth from '@/components/PhotoBooth';
import { Toaster } from 'sonner';
import NavBar from '@/components/NavBar';
import { useIsMobile } from '@/hooks/use-mobile';

const Index: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-coquette-50 to-coquette-100 dark:from-coquette-900 dark:to-coquette-800">
      <NavBar />
      
      <main className={`flex-1 flex flex-col ${isMobile ? 'pt-2' : 'pt-4'}`}>
        <PhotoBooth />
      </main>
      
      <Toaster 
        position={isMobile ? "bottom-center" : "top-right"}
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 107, 133, 0.2)',
          },
        }}
      />
    </div>
  );
};

export default Index;
