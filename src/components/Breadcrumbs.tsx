
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className }) => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(path => path);
  
  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }
  
  // Create prettier page titles from paths
  const formatPathName = (path: string): string => {
    // Handle special cases
    if (path === '') return 'Home';
    
    // Convert kebab-case or camelCase to Title Case with spaces
    return path
      .replace(/-/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Breadcrumb className={`${className}`}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {paths.map((path, index) => {
          const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;
          
          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatPathName(path)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={routeTo}>{formatPathName(path)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
