'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/styles';

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
      type="button"
      className={cn(
        'copy-button absolute top-2 right-2 rounded-md p-1 opacity-0 duration-300 ease-in-out group-hover:opacity-100',
        className,
      )}
      style={{
        backgroundColor: isCopied ? '#b8fa7a' : '#0000000a',
      }}
      onClick={handleCopy}
    >
      {isCopied ? (
        <Check className="h-4 w-4 text-gray-500" />
      ) : (
        <Copy className="h-4 w-4 text-gray-500" />
      )}
    </button>
  );
};

export default CopyButton;
