'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const DarkmodeToggleButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  const toggleDarkmode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDarkmode = resolvedTheme === 'dark';

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <div className="flex items-center cursor-pointer">
      {loaded ? (
        isDarkmode ? (
          <Sun fill="currentColor" onClick={toggleDarkmode} />
        ) : (
          <Moon fill="currentColor" onClick={toggleDarkmode} />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default DarkmodeToggleButton;
