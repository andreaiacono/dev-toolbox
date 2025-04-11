import React, { useState } from 'react';
import TextArea from '../components/TextArea';
import ToolLayout from '../components/ToolLayout';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    try {
      const result = btoa(input);
      setOutput(result);
    } catch (error) {
      console.log(error);
      setOutput('Invalid input');
    }
  };

  const handleDecode = () => {
    try {
      let sanitizedInput = input;
      if (input.charAt(0) === '"' && input.charAt(input.length - 1) === '"') {
        sanitizedInput = input.substring(1, input.length - 1);
      }
      const result = atob(sanitizedInput);
      setOutput(result);
    } catch (error) {
      console.log(error);
      setOutput('Invalid input');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <ToolLayout title="Base64 Encoder/Decoder">
      <div className="space-y-6">
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode/decode"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleEncode}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Encode
          </button>
          <button
            onClick={handleDecode}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Decode
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Clear
          </button>
        </div>

        <TextArea
          value={output}
          onChange={() => { }}
          placeholder="Output will appear here"
          readOnly={true}
        />
      </div>
    </ToolLayout>
  );
};

export default Base64Tool;