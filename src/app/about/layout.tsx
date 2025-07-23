const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex h-full min-h-screen w-full max-w-screen-2xl flex-col">
      {children}
    </div>
  );
};

export default AboutLayout;
