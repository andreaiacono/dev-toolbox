import React, { useState, useEffect } from 'react';
import ToolLayout from '../components/ToolLayout';
import Button from '../components/Button';
import CopyButton from "../components/CopyButton";

const UnixTimeConverter = () => {
  const [timestamp, setTimestamp] = useState('');
  const [adjustmentValue, setAdjustmentValue] = useState('1');
  const [isMilliseconds, setIsMilliseconds] = useState(false);
  const [customFormat, setCustomFormat] = useState('dd-MM-yyyy, HH:mm');
  const [formattedDate, setFormattedDate] = useState('');
  const [showFormatPatterns, setShowFormatPatterns] = useState(false);

  // Detect if the timestamp is likely in milliseconds
  useEffect(() => {
    if (timestamp && !isNaN(parseInt(timestamp))) {
      const ts = parseInt(timestamp);
      setIsMilliseconds(ts > 500000000000);
      updateFormattedDate(ts);
    } else {
      setIsMilliseconds(false);
      setFormattedDate('');
    }
  }, [timestamp, customFormat]);

  const updateFormattedDate = (ts) => {
    try {
      const timeMs = isMilliseconds ? ts : ts * 1000;
      const date = new Date(timeMs);
      setFormattedDate(formatDate(date, customFormat));
    } catch (err) {
      setFormattedDate('Invalid format or timestamp');
    }
  };

  const formatDate = (date, format) => {
    const tokens = {
      yyyy: date.getFullYear(),
      MM: String(date.getMonth() + 1).padStart(2, '0'),
      dd: String(date.getDate()).padStart(2, '0'),
      HH: String(date.getHours()).padStart(2, '0'),
      mm: String(date.getMinutes()).padStart(2, '0'),
      ss: String(date.getSeconds()).padStart(2, '0'),
      SSS: String(date.getMilliseconds()).padStart(3, '0'),
      XXX: formatTimezoneOffset(date)
    };

    let result = format;
    for (const [token, value] of Object.entries(tokens)) {
      result = result.replace(token, value);
    }

    return result;
  };

  const formatTimezoneOffset = (date) => {
    const tzOffset = date.getTimezoneOffset();
    const absOffset = Math.abs(tzOffset);
    const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
    const minutes = String(absOffset % 60).padStart(2, '0');
    return `${tzOffset <= 0 ? '+' : '-'}${hours}:${minutes}`;
  };

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

    switch (unit) {
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
        iso: date.toISOString(),
        dayOfYear: getDayOfYear(date),
        weekOfYear: getWeekOfYear(date),
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

  // Format examples for quick selection
  const formatExamples = [
    { label: 'Custom', format: 'dd-MM-yyyy, HH:mm' },
    { label: 'ISO-8601', format: 'yyyy-MM-ddTHH:mm:ss.SSSXXX' },
    { label: 'US Short Date', format: 'MM/dd/yyyy' },
    { label: 'EU Short Date', format: 'dd/MM/yyyy' },
    { label: 'JP Short Date', format: 'yyyy/MM/dd' },
  ];

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

            {timestamp && !isNaN(parseInt(timestamp)) && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {isMilliseconds
                  ? "Detected timestamp in milliseconds"
                  : "Detected timestamp in seconds"}
              </div>
            )}
          </div>

          {timeInfo && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm text-gray-600 dark:text-gray-400">Local</label>
                <div className="p-2 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 transition-colors">
                  {timeInfo.local}<CopyButton text={timeInfo.local} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-600 dark:text-gray-400">Day of Year</label>
                <div className="p-2 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 transition-colors">
                  {timeInfo.dayOfYear}<CopyButton text={timeInfo.dayOfYear} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-600 dark:text-gray-400">UTC</label>
                <div className="p-2 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 transition-colors">
                  {timeInfo.utc}<CopyButton text={timeInfo.utc} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-600 dark:text-gray-400">Week of Year</label>
                <div className="p-2 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 transition-colors">
                  {timeInfo.weekOfYear}<CopyButton text={timeInfo.weekOfYear} />
                </div>
              </div>
            </div>
          )}

          {timestamp && !isNaN(parseInt(timestamp)) && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Custom Format</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={customFormat}
                    onChange={(e) => setCustomFormat(e.target.value)}
                    className="flex-1 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 p-2 rounded border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
                    placeholder="Format pattern..."
                  />
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {formatExamples.map((example, index) => (
                    <Button
                      key={index}
                      onClick={() => setCustomFormat(example.format)}
                      className="px-2 py-1 text-xs"
                    >
                      {example.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Result</label>
                <div className="p-2 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 transition-colors min-h-8">
                  {formattedDate}<CopyButton text={formattedDate} />
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                <button
                  onClick={() => setShowFormatPatterns(!showFormatPatterns)}
                  className="font-medium flex items-center w-full justify-between cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <span>Format Patterns</span>
                  <span className={`transform transition-transform ${showFormatPatterns ? 'rotate-180' : ''}`}>▼</span>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFormatPatterns ? 'max-h-96 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div>yyyy: Year (2023)</div>
                    <div>MM: Month (01-12)</div>
                    <div>dd: Day (01-31)</div>
                    <div>HH: Hours (00-23)</div>
                    <div>mm: Minutes (00-59)</div>
                    <div>ss: Seconds (00-59)</div>
                    <div>SSS: Milliseconds (000-999)</div>
                    <div>XXX: Timezone offset (+01:00)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Time adjustment controls */}
          {timeInfo && (
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
            </div>)
          }
        </div>

      </div>
    </ToolLayout>
  );
};

export default UnixTimeConverter;