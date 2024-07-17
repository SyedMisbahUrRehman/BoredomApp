import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState(null);
  const [is24HourFormat, setIs24HourFormat] = useState(true); // Default to 24-hour format

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Battery status API
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
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
      <div className="text-5xl md:text-7xl lg:text-9xl font-mono">
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
        className="mt-4 bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
        onClick={toggleFormat}
      >
        Toggle Time Format
      </button>
    </div>
  );
};

export default Clock;
