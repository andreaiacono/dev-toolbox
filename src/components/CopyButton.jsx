import React, { useState } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded hover:bg-gray-700 text-gray-400 hover:text-gray-200"
      title="Copy to clipboard"
    >
      {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
    </button>
  );
};

export default CopyButton;