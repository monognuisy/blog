'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const ThemeColorSetter = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // 테마가 변경될 때 theme-color 메타 태그 업데이트
    const themeColor = resolvedTheme === 'dark' ? '#1a1a1a' : '#ffffff';
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = themeColor;
      document.head.appendChild(meta);
    }
  }, [resolvedTheme]);

  return null;
};

export default ThemeColorSetter;
