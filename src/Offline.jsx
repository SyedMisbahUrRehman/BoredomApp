import React from 'react';
import offlineImage from './assets/13766137_5356678.svg';

const Offline = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-1/2 max-w-md">
        <img src={offlineImage} alt="Offline" />
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">You are offline</h2>
      <p className="mt-2 text-gray-600">Go back online to use this app</p>
    </div>
  );
};

export default Offline;
