import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

const JSONFormatTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  return (
    <ToolLayout title="JSON Format/Validate">
      <div className="space-y-4">
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter JSON to format..."
          label="Input JSON"
          monospace="True"
        />

        <div className="flex space-x-2">
          <Button onClick={handleFormat}>Format</Button>
          <Button variant="ghost" onClick={() => setInput('')}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >Clear</Button>
        </div>

        {error && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded text-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        {output && (
          <TextArea
            value={output}
            readOnly
            label="Formatted Output"
            monospace="True"
         />
        )}
      </div>
    </ToolLayout>
  );
};

export default JSONFormatTool;
