import React, { useState } from 'react';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');
  const [output, setOutput] = useState('');

  const handleConvert = () => {
    try {
      const result = mode === 'encode' 
        ? btoa(input)
        : atob(input);
      setOutput(result);
    } catch (error) {
      setOutput('Invalid input');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <label className="inline-flex items-center">
          <input
            type="radio"
            checked={mode === 'encode'}
            onChange={() => setMode('encode')}
            className="text-blue-500 focus:ring-blue-500"
          />
          <span className="ml-2">Encode</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            checked={mode === 'decode'}
            onChange={() => setMode('decode')}
            className="text-blue-500 focus:ring-blue-500"
          />
          <span className="ml-2">Decode</span>
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode/decode"
            className="w-full h-32 bg-[#1e1e1e] text-gray-300 p-3 rounded border border-gray-700 focus:outline-none focus:border-gray-500 resize-none"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleConvert}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Convert
          </button>
          <button
            onClick={() => {
              setInput('');
              setOutput('');
            }}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Clear
          </button>
        </div>

        <div>
          <div className="text-sm text-gray-400 mb-2">Output:</div>
          <div className="w-full min-h-[8rem] bg-[#1e1e1e] text-gray-300 p-3 rounded border border-gray-700">
            {output}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Tool;
