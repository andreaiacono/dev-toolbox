import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import Button from '../components/Button';

const UnixTimeConverter = () => {
  const [timestamp, setTimestamp] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const updateCurrentTime = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
  };

  const getTimeInfo = (unix) => {
    try {
      const date = new Date(unix * 1000);
      return {
        local: date.toLocaleString(),
        utc: date.toUTCString(),
        relative: getRelativeTime(unix * 1000),
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

  return (
    <ToolLayout title="Unix Time Converter">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="Enter Unix timestamp..."
              className="flex-1 bg-gray-800 text-gray-300 p-2 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            <Button onClick={updateCurrentTime}>Now</Button>
          </div>
          
          <p className="text-sm text-gray-400">
            Mathematical operators +, -, *, / are supported
          </p>
        </div>

        {timeInfo && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Local</label>
              <div className="p-2 bg-gray-800 rounded">{timeInfo.local}</div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Day of Year</label>
              <div className="p-2 bg-gray-800 rounded">{timeInfo.dayOfYear}</div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">UTC (ISO 8601)</label>
              <div className="p-2 bg-gray-800 rounded">{timeInfo.utc}</div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Week of Year</label>
              <div className="p-2 bg-gray-800 rounded">{timeInfo.weekOfYear}</div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Relative</label>
              <div className="p-2 bg-gray-800 rounded">{timeInfo.relative}</div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Is Leap Year</label>
              <div className="p-2 bg-gray-800 rounded">
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
