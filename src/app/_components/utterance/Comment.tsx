'use client';

import { useTheme } from 'next-themes';

const Comment = () => {
  const { theme } = useTheme();

  return (
    <section
      ref={(element) => {
        if (!element) return;

        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('src', 'https://utteranc.es/client.js');
        scriptElement.setAttribute(
          'repo',
          'monognuisy/blog-utterances-comments',
        );
        scriptElement.setAttribute('issue-term', 'pathname');
        scriptElement.setAttribute('label', '✨💬✨');
        scriptElement.setAttribute(
          'theme',
          // theme === 'light' ? 'github-light' : 'github-dark',
          'github-light',
        );
        scriptElement.setAttribute('crossorigin', 'anonymous');
        scriptElement.setAttribute('async', 'true');
        element.replaceChildren(scriptElement);
      }}
    />
  );
};

export default Comment;
