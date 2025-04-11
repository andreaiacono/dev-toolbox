import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import { Copy, Check } from 'lucide-react';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = async () => {
    if (output) {
      try {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy: ', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode/decode"
            className="w-full h-32 bg-gray-100 dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-300 p-3 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-colors"
          />
        </div>
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
        <div className="relative">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Output:</div>
          <div className="w-full min-h-[8rem] bg-gray-100 dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-300 p-3 rounded border border-gray-300 dark:border-gray-700 transition-colors overflow-auto">
            {output}
          </div>
          {output && (
            <button
              onClick={copyToClipboard}
              className="absolute top-8 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              title="Copy to clipboard"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Base64Tool;