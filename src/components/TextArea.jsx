import React from 'react';
import CopyButton from './CopyButton';

const TextArea = ({ value, onChange, placeholder, label, readOnly = false, monospace = true }) => {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm text-gray-200">{label}</label>}
      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          monospace={monospace}
          className={`w-full h-64 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 p-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors ${monospace ? 'font-mono' : 'font-sans'}`}
        />
        {value && <div className="absolute top-2 right-2">
          <CopyButton text={value} />
        </div>}
      </div>
    </div>
  );
};

export default TextArea;