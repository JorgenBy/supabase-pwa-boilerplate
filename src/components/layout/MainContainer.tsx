import React from 'react';
import logo from '../../assets/images/logo.png';

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContainer({
  children,
  className = '',
}: MainContainerProps) {
  return (
    <div className="mainContainer relative flex min-h-screen items-start justify-center pt-20 px-4 sm:px-6 lg:px-8">
      <div
        className={`relative w-full max-w-md bg-white rounded-lg shadow-lg pt-16 pb-8 px-6 space-y-6 ${className}`}
      >
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center">
            <img src={logo} alt="Logo" className="max-w max-hobject-cover" />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
