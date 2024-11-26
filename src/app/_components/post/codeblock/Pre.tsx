'use client';

import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import CopyButton from './CopyButton';

export type TPreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  raw: string;
};

const Pre = ({ raw, children, ...props }: TPreProps) => {
  const [isCodeClicked, setIsCodeClicked] = useState(false);

  const handleClick = () => {
    setIsCodeClicked(true);
    setTimeout(() => {
      setIsCodeClicked(false);
    }, 5000);
  };

  return (
    <pre {...props} style={{ position: 'relative' }} onClick={handleClick}>
      {children}
      {isCodeClicked && <CopyButton raw={raw} />}
    </pre>
  );
};

export default Pre;
