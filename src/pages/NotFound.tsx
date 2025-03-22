
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-coquette-50 to-coquette-100 dark:from-coquette-900 dark:to-coquette-800">
      <NavBar />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-9xl font-bold text-coquette-300">404</h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-coquette-300 to-coquette-500 rounded-full my-6"></div>
          <h2 className="text-2xl font-semibold text-coquette-700 mb-4">Page Not Found</h2>
          <p className="text-coquette-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-coquette-500 hover:bg-coquette-600 text-white rounded-lg px-6 py-3 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
