'use client';

import { useEffect, useState } from 'react';

const DarkmodeToggleButton = () => {
  const [isDarkmode, setIsDarkmode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark');
      setIsDarkmode(true);
    } else {
      document.body.classList.remove('dark');
      setIsDarkmode(false);
    }
  }, []);

  const toggleDarkmode = () => {
    if (isDarkmode) {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkmode(!isDarkmode);
    console.log('changed!');
  };

  return <button onClick={toggleDarkmode}>{isDarkmode ? '🌞' : '🌚'}</button>;
};

export default DarkmodeToggleButton;
