type TLogPostLayoutProps = {
  children: React.ReactNode;
};

// max-w-[768px]
const LogPostLayout = ({ children }: TLogPostLayoutProps) => {
  return <div className="mx-auto">{children}</div>;
};

export default LogPostLayout;
