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
    <div className="relative group">
      <pre {...props}>{children}</pre>
      <CopyButton raw={raw} />
    </div>
  );
};

export default Pre;
