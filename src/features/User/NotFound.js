import React from 'react';

export default function NotFound () {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold text-gray-700 mb-4">Page Not Found</h1>
          <p className="text-gray-600 text-lg">The requested page could not be found.</p>
        </div>
      );
}

