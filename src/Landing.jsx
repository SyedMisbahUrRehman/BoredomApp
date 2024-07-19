import React, { useEffect, useState } from 'react';
import offlineImage from './assets/offline.svg';
import ClockImage from './assets/clock.svg';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState(null);
  const [is24HourFormat, setIs24HourFormat] = useState(true); // Default to 24-hour format
  const [offlineImgSrc, setOfflineImgSrc] = useState(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Store offline image as base64 in local storage (unchanged)
    const storeOfflineImage = async () => {
      const response = await fetch(offlineImage);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('offlineImage', reader.result);
        setOfflineImgSrc(reader.result);
      };
      reader.readAsDataURL(blob);
    };

    if (!localStorage.getItem('offlineImage')) {
      storeOfflineImage();
    } else {
      setOfflineImgSrc(localStorage.getItem('offlineImage'));
    }

    // Battery status API (unchanged)
    navigator.getBattery().then(battery => {
      setBattery(battery.level * 100);

      battery.addEventListener('levelchange', () => {
        setBattery(battery.level * 100);
      });
    });

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: !is24HourFormat,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const toggleFormat = () => {
    setIs24HourFormat(prevFormat => !prevFormat);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-gray-700">
      <img
        src={ClockImage}
        className="absolute inset-0 object-contain w-full h-full opacity-20"
        alt="Clock background"
      />

      <div className="relative max-w-screen-sm mx-auto p-4 text-center">
        <div className="text-5xl md:text-7xl lg:text-9xl font-mono whitespace-nowrap flex items-center justify-center">
          {formatTime(time)}
        </div>
        <div className="text-xl md:text-3xl lg:text-5xl mt-4">
          {formatDate(time)}
        </div>
        {battery !== null && (
          <div className="text-lg md:text-2xl lg:text-3xl mt-4">
            Battery: {battery.toFixed(0)}%
          </div>
        )}
        <button
          className="mt-4 bg-transparent hover:bg-gray-700 text-gray-700 hover:text-white font-bold py-2 px-4 border border-gray-700 rounded"
          onClick={toggleFormat}
        >
          Toggle Time Format
        </button>
      </div>
    </div>
  );
};

export default Clock;
