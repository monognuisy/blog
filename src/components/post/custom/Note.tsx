'use client';

import {
  AlertCircle,
  AlertTriangle,
  ChevronsUpDown,
  Info,
  Lightbulb,
  Pen,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/styles';

const NoteVariant = {
  icon: {
    default: <Lightbulb className="h-4 w-4" />,
    note: <Pen className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    error: <AlertCircle className="h-4 w-4" />,
  },
  border: {
    default: 'border-gray-200 dark:border-gray-700',
    note: 'border-blue-200 dark:border-blue-700',
    info: 'border-green-200 dark:border-green-700',
    warning: 'border-yellow-200 dark:border-yellow-700',
    error: 'border-red-200 dark:border-red-700',
  },
  header: {
    default: 'bg-gray-200/40 dark:bg-white/10 text-gray-500 dark:text-gray-400',
    note: 'bg-blue-200/40 dark:bg-blue-900/80 text-blue-500 dark:text-blue-400',
    info: 'bg-green-200/40 dark:bg-green-900/80 text-green-700 dark:text-green-400',
    warning:
      'bg-yellow-200/40 dark:bg-yellow-900/80 text-yellow-700 dark:text-yellow-400',
    error: 'bg-red-200/40 dark:bg-red-900/90 text-red-500 dark:text-red-400',
  },
  content: {
    default: 'bg-white dark:bg-dark-bg',
    note: 'bg-blue-50/30 dark:bg-blue-900/20',
    info: 'bg-green-50/30 dark:bg-green-900/20',
    warning: 'bg-yellow-50/30 dark:bg-yellow-900/20',
    error: 'bg-red-50/30 dark:bg-red-900/20',
  },
} as const;

interface NoteProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'note' | 'info' | 'warning' | 'error';
  lock?: boolean;
  collapse?: boolean;
}

const Note = ({
  title,
  children,
  lock = false,
  collapse = false,
  variant = 'default',
}: NoteProps) => {
  const [isOpen, setIsOpen] = useState(!collapse);

  return (
    <div
      className={cn(
        'note my-4 mb-8 rounded border',
        NoteVariant.border[variant],
      )}
    >
      <div
        className={cn(
          'flex items-center rounded-t px-4 py-2',
          !lock && 'cursor-pointer',
          NoteVariant.header[variant],
        )}
        onClick={() => !lock && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {NoteVariant.icon[variant]}
          <span className={cn('block font-bold')}>{title}</span>
        </div>
        {!lock && (
          <ChevronsUpDown
            className={cn('ml-auto h-4 w-4')}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
      {isOpen && (
        <div
          className={cn(
            'w-full overflow-auto rounded-b p-4 [&>:last-child]:mb-0',
            NoteVariant.content[variant],
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Note;
