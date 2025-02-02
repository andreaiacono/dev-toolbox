import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Base64Tool from './tools/Base64Tool';
import TextDiffTool from './tools/TextDiffTool';
import JSONFormatTool from './tools/JSONFormatTool';
import UnixTimeConverter from './tools/UnixTimeConverter';

const tools = [
  { id: 'base64', name: 'Base64 Decode/Encode', component: Base64Tool },
  { id: 'textdiff', name: 'Text Diff Checker', component: TextDiffTool },
  { id: 'jsonformat', name: 'JSON Format/Validate', component: JSONFormatTool },
  { id: 'unixtime', name: 'Unix Time Converter', component: UnixTimeConverter }
];

const App = () => {
  const [selectedTool, setSelectedTool] = useState('base64');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderTool = () => {
    const tool = tools.find(t => t.id === selectedTool);
    if (!tool) return null;
    const ToolComponent = tool.component;
    return <ToolComponent />;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-300 transition-colors">
        {/* Header */}
        <header className="bg-gray-100 dark:bg-[#2d2d2d] p-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="ml-2">Developer Tools</div>
          </div>
          <ThemeToggle />
        </header>

        <div className="flex">
          {/* Sidebar */}
          {isSidebarOpen && (
            <div className="w-64 bg-gray-50 dark:bg-[#252526] border-r border-gray-200 dark:border-gray-700 transition-colors">
              <div className="p-3">
                <input
                  type="text"
                  placeholder="Search Ctrl+L"
                  className="w-full bg-gray-100 dark:bg-[#3c3c3c] text-gray-900 dark:text-gray-300 px-3 py-1.5 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
              <nav className="space-y-1">
                {tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`w-full text-left px-4 py-2 transition-colors ${
                      selectedTool === tool.id
                        ? 'bg-blue-50 dark:bg-[#37373d] text-blue-700 dark:text-white'
                        : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2d2e]'
                    }`}
                  >
                    {tool.name}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 p-6">{renderTool()}</main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App