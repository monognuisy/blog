import type React from 'react';

export function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="rounded bg-yellow-200 px-1">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
