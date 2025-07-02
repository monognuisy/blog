'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const DarkmodeToggleButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  const toggleDarkmode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDarkmode = resolvedTheme === 'dark';

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="flex cursor-pointer items-center">
      {loaded ? (
        isDarkmode ? (
          <Sun
            fill="currentColor"
            onClick={toggleDarkmode}
            className="h-5 w-5 md:h-6 md:w-6"
          />
        ) : (
          <Moon
            fill="currentColor"
            onClick={toggleDarkmode}
            className="h-5 w-5 md:h-6 md:w-6"
          />
        )
      ) : null}
    </div>
  );
};

export default DarkmodeToggleButton;
