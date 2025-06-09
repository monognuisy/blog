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
          <Sun
            fill="currentColor"
            onClick={toggleDarkmode}
            className="w-5 h-5 md:w-6 md:h-6"
          />
        ) : (
          <Moon
            fill="currentColor"
            onClick={toggleDarkmode}
            className="w-5 h-5 md:w-6 md:h-6"
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default DarkmodeToggleButton;
