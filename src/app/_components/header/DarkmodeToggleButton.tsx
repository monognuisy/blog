'use client';

import { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from 'next-themes';

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
          <LightModeIcon onClick={toggleDarkmode} />
        ) : (
          <DarkModeIcon onClick={toggleDarkmode} />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default DarkmodeToggleButton;
