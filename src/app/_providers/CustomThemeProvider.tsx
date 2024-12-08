'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && <ThemeProvider attribute="class">{children}</ThemeProvider>}
    </>
  );
};

export default CustomThemeProvider;
