'use client';

import { useState } from 'react';
import { cn } from '@/lib/styles';
import { Check, Copy } from 'lucide-react';

type TCopyButtonProps = {
  raw: string;
  className?: string;
};

const CopyButton = ({ raw, className }: TCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(raw);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <button
      className={cn(
        'opacity-0 copy-button rounded-md p-1 absolute top-2 right-2 ease-in-out duration-300 group-hover:opacity-100',
        className,
      )}
      style={{
        backgroundColor: isCopied ? '#b8fa7a' : '#0000000a',
      }}
      onClick={handleCopy}
    >
      {isCopied ? (
        <Check className="text-gray-500 w-4 h-4" />
      ) : (
        <Copy className="text-gray-500 w-4 h-4" />
      )}
    </button>
  );
};

export default CopyButton;
