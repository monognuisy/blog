'use client';

import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

type TCopyButtonProps = {
  raw: string;
};

const CopyButton = ({ raw }: TCopyButtonProps) => {
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
      className="copy-button rounded-md p-1 absolute top-2 right-2 ease-in-out duration-300"
      style={{
        backgroundColor: isCopied ? '#b8fa7a' : '#0000000a',
      }}
      onClick={handleCopy}
    >
      {isCopied ? (
        <CheckIcon className="text-gray-500" fontSize="small" />
      ) : (
        <ContentCopyIcon className="text-gray-500" fontSize="small" />
      )}
    </button>
  );
};

export default CopyButton;
