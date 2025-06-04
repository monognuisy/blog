import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // 초기 상태 설정
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // 미디어 쿼리 변경 감지
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    // 클린업
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
