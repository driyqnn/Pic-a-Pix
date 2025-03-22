
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Image, FileText, Mail, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavBarProps {
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const NavLinks = () => (
    <ul className={`flex ${isMobile ? 'flex-col items-start space-y-6 pt-6' : 'items-center space-x-8'}`}>
      <li>
        <Link to="/" className="flex items-center text-coquette-700 hover:text-coquette-900 dark:text-coquette-300 dark:hover:text-coquette-100">
          <Home className="w-5 h-5 mr-2" />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link to="/gallery" className="flex items-center text-coquette-700 hover:text-coquette-900 dark:text-coquette-300 dark:hover:text-coquette-100">
          <Image className="w-5 h-5 mr-2" />
          <span>Gallery</span>
        </Link>
      </li>
      <li>
        <Link to="/privacy" className="flex items-center text-coquette-700 hover:text-coquette-900 dark:text-coquette-300 dark:hover:text-coquette-100">
          <FileText className="w-5 h-5 mr-2" />
          <span>Privacy Policy</span>
        </Link>
      </li>
      <li>
        <Link to="/contact" className="flex items-center text-coquette-700 hover:text-coquette-900 dark:text-coquette-300 dark:hover:text-coquette-100">
          <Mail className="w-5 h-5 mr-2" />
          <span>Contact</span>
        </Link>
      </li>
      <li>
        <button 
          onClick={toggleTheme}
          className="flex items-center text-coquette-700 hover:text-coquette-900 dark:text-coquette-300 dark:hover:text-coquette-100 mobile-touch-target"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          {isMobile && <span className="ml-2">Toggle Theme</span>}
        </button>
      </li>
    </ul>
  );
  
  return (
    <nav className={`w-full py-4 px-6 flex items-center justify-between ${className}`}>
      <div className="flex items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold text-coquette-900 dark:text-coquette-100">
          Pic-a-Pix
        </Link>
      </div>
      
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <button 
              className="p-2 text-coquette-700 hover:text-coquette-900 dark:text-coquette-300 dark:hover:text-coquette-100 mobile-touch-target" 
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <NavLinks />
          </SheetContent>
        </Sheet>
      ) : (
        <NavLinks />
      )}
    </nav>
  );
};

export default NavBar;
