// src/components/InternetSpeedTest.jsx
import React, { useState, useEffect } from 'react';

const InternetSpeedTest = () => {
  const [speed, setSpeed] = useState(null);

  useEffect(() => {
    const image = new Image();
    const startTime = new Date().getTime();
    image.src = 'https://via.placeholder.com/1000x1000';
    image.onload = () => {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = 1000 * 1000 * 8;
      const speedBps = bitsLoaded / duration;
      const speedKbps = speedBps / 1024;
      const speedMbps = speedKbps / 1024;
      setSpeed(speedMbps.toFixed(2));
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Internet Speed Test</h1>
      {speed !== null ? (
        <p className="text-2xl">Your internet speed is {speed} Mbps</p>
      ) : (
        <p className="text-2xl">Testing...</p>
      )}
    </div>
  );
};

export default InternetSpeedTest;
