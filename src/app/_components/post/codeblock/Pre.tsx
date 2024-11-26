import { DetailedHTMLProps, HTMLAttributes } from 'react';
import CopyButton from './CopyButton';

export type TPreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  raw: string;
};

const Pre = ({ raw, children, ...props }: TPreProps) => {
  return (
    <pre {...props} style={{ position: 'relative' }}>
      {children}
      <CopyButton raw={raw} />
    </pre>
  );
};

export default Pre;
