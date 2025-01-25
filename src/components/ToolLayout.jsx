import React from 'react';

const ToolLayout = ({ title, children }) => {
  return (
    <div className="h-full">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default ToolLayout;
