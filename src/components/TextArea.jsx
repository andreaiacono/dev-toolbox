import React from 'react';
import CopyButton from './CopyButton';

const TextArea = ({ value, onChange, placeholder, label, readOnly = false }) => {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm text-gray-400">{label}</label>}
      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className="w-full h-48 bg-gray-800 text-gray-300 p-3 rounded resize-none focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        {value && <div className="absolute top-2 right-2">
          <CopyButton text={value} />
        </div>}
      </div>
    </div>
  );
};

export default TextArea;
