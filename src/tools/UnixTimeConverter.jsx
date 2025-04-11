import React, { useState, useEffect } from 'react';
import ToolLayout from '../components/ToolLayout';
import Button from '../components/Button';

const UnixTimeConverter = () => {
  const [timestamp, setTimestamp] = useState('');
  const [adjustmentValue, setAdjustmentValue] = useState('1');
  const [isMilliseconds, setIsMilliseconds] = useState(false);
  
  // Detect if the timestamp is likely in milliseconds
  useEffect(() => {
    if (timestamp && !isNaN(parseInt(timestamp))) {
      const ts = parseInt(timestamp);
      setIsMilliseconds(ts > 500000000000);
    } else {
      setIsMilliseconds(false);
    }
  }, [timestamp]);

  const updateCurrentTime = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
  };

  const adjustTime = (unit, isAddition) => {
    if (!timestamp || isNaN(parseInt(timestamp))) {
      updateCurrentTime();
      return;
    }

    const amount = parseInt(adjustmentValue) * (isAddition ? 1 : -1);
    const ts = isMilliseconds ? parseInt(timestamp) : parseInt(timestamp) * 1000;
    const date = new Date(ts);
    
    switch(unit) {
      case 'minute':
        date.setMinutes(date.getMinutes() + amount);
        break;
      case 'hour':
        date.setHours(date.getHours() + amount);
        break;
      case 'day':
        date.setDate(date.getDate() + amount);
        break;
      case 'week':
        date.setDate(date.getDate() + (amount * 7));
        break;
      case 'month':
        date.setMonth(date.getMonth() + amount);
        break;
      case 'year':
        date.setFullYear(date.getFullYear() + amount);
        break;
      default:
        return;
    }
    
    // Set timestamp maintaining the same format (seconds or milliseconds)
    const newTimestamp = Math.floor(date.getTime() / (isMilliseconds ? 1 : 1000)).toString();
    setTimestamp(newTimestamp);
  };

  const getTimeInfo = (unix) => {
    try {
      // If it's milliseconds, use as-is, otherwise multiply by 1000
      const timeMs = isMilliseconds ? unix : unix * 1000;
      const date = new Date(timeMs);
      
      return {
        local: date.toLocaleString(),
        utc: date.toUTCString(),
        relative: getRelativeTime(timeMs),
        iso: date.toISOString(),
        dayOfYear: getDayOfYear(date),
        weekOfYear: getWeekOfYear(date),
        isLeapYear: isLeapYear(date.getFullYear())
      };
    } catch (err) {
      return null;
    }
  };

  const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const getWeekOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.ceil(diff / oneWeek);
  };

  const isLeapYear = (year) => {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  };

  const getRelativeTime = (timestamp) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diff = timestamp - Date.now();
    const diffSeconds = Math.round(diff / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (Math.abs(diffSeconds) < 60) return rtf.format(diffSeconds, 'second');
    if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, 'minute');
    if (Math.abs(diffHours) < 24) return rtf.format(diffHours, 'hour');
    return rtf.format(diffDays, 'day');
  };

  const timeInfo = timestamp ? getTimeInfo(parseInt(timestamp)) : null;

  const TimeUnitAdjuster = ({ unit, label }) => (
    <div className="flex items-center">
      <span className="text-gray-600 dark:text-gray-400 w-16">{label}</span>
      <div className="flex space-x-1 ml-2">
        <Button onClick={() => adjustTime(unit, false)} className="px-3 py-1 text-sm">-</Button>
        <Button onClick={() => adjustTime(unit, true)} className="px-3 py-1 text-sm">+</Button>
      </div>
    </div>
  );

  return (
    <ToolLayout title="Unix Time Converter">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex space-x-2">
              <input
                type="text"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                placeholder="Enter Unix timestamp..."
                className="flex-1 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 p-2 rounded border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
              />
              <Button onClick={updateCurrentTime}>Now</Button>
            </div>
            
            {/* Milliseconds indicator */}
            {timestamp && !isNaN(parseInt(timestamp)) && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {isMilliseconds 
                  ? "Detected timestamp in milliseconds"
                  : "Detected timestamp in seconds"}
              </div>
            )}
          </div>
          
          {/* Time adjustment controls */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="mb-3 flex items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">Adjust by:</span>
              <input
                type="number"
                className="w-16 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 p-1 text-center rounded border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
                value={adjustmentValue}
                onChange={(e) => setAdjustmentValue(e.target.value)}
                min="1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <TimeUnitAdjuster unit="minute" label="Minutes" />
              <TimeUnitAdjuster unit="hour" label="Hours" />
              <TimeUnitAdjuster unit="day" label="Days" />
              <TimeUnitAdjuster unit="week" label="Weeks" />
              <TimeUnitAdjuster unit="month" label="Months" />
              <TimeUnitAdjuster unit="year" label="Years" />
            </div>
          </div>
        </div>

        {timeInfo && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Local</label>
              <div className="p-2 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 transition-colors">
                {timeInfo.local}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Day of Year</label>
              <div className="p-2 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 transition-colors">
                {timeInfo.dayOfYear}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">UTC (ISO 8601)</label>
              <div className="p-2 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 transition-colors">
                {timeInfo.utc}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Week of Year</label>
              <div className="p-2 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 transition-colors">
                {timeInfo.weekOfYear}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Relative</label>
              <div className="p-2 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 transition-colors">
                {timeInfo.relative}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Is Leap Year</label>
              <div className="p-2 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 transition-colors">
                {timeInfo.isLeapYear ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default UnixTimeConverter;