import React from 'react';

const Sidebar = ({ tools, selectedTool, onSelectTool }) => {
  return (
    <div className="w-64 bg-gray-800 p-4 border-r border-gray-700">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Ctrl+L"
          className="w-full bg-gray-900 text-gray-300 p-2 rounded"
        />
      </div>
      <nav>
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className={`w-full text-left p-2 rounded mb-1 ${
              selectedTool === tool.id ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            {tool.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
