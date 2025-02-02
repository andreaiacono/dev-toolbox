import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';

const TextDiffTool = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  
  const computeDiff = () => {
    // Simple diff implementation - in a real app, you'd want to use a library like 'diff'
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result = [];
    
    for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
      if (lines1[i] !== lines2[i]) {
        result.push({
          line: i + 1,
          text1: lines1[i] || '',
          text2: lines2[i] || '',
        });
      }
    }
    
    return result;
  };

  return (
    <ToolLayout title="Text Diff Checker">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Original text"
            className="w-full h-64 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 p-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Modified text"
           className="w-full h-64 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 p-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        
        <div className="col-span-2">
          <h3 className="text-gray-400 mb-2">Differences:</h3>
          <div className=" bg-gray-100 dark:bg-gray-800 p-2 border border-gray-300 dark:border-gray-700 rounded">
            {computeDiff().map(diff => (
              <div key={diff.line} className="mb-2">
                <div className="text-red-400">- Line {diff.line}: {diff.text1}</div>
                <div className="text-green-400">+ Line {diff.line}: {diff.text2}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextDiffTool;
