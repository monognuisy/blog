'use client';

import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        event.shiftKey &&
        (event.key === 'k' || event.key === 'K')
      ) {
        event.preventDefault();
        toggleModalOpen();
      }

      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="relative items-center hidden md:flex">
        <input
          type="text"
          placeholder="Search"
          className="text-sm border border-gray-300 dark:border-gray-700 rounded-md p-2 w-[300px] dark:bg-dark-bg"
          onFocus={(e) => e.preventDefault()}
          onClick={(e) => {
            toggleModalOpen();
            e.preventDefault();
          }}
        />
        <div className="flex gap-2 absolute right-2">
          <div className="rounded text-xs bg-slate-200 dark:bg-gray-800 p-1 px-2 monospace font-semibold text-slate-500">
            ctrl
          </div>
          <div className="rounded text-xs bg-slate-200 dark:bg-gray-800 p-1 px-2 monospace font-semibold text-slate-500">
            shift
          </div>
          <div className="rounded text-xs bg-slate-200 dark:bg-gray-800 p-1 px-2 monospace font-semibold text-slate-500">
            K
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleModalOpen}>
          <SearchIcon style={{ fontSize: '24px', color: 'gray' }} />
        </button>
      </div>

      {/* 모달, 검색 패널 */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-dvw h-[100vh] bg-black/50 flex justify-center items-center z-10"
          onClick={toggleModalOpen}
        >
          <div className="w-[600px] h-[500px] mx-auto px-4">
            <div
              className="w-full h-full rounded-md bg-white mx-auto shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                placeholder="Search or Type Commands"
                className="border-b-2 rounded-md rounded-b-none p-4 w-full text-xl"
                autoFocus
              />
              <div className="overflow-y-auto p-4">
                <div className="text-gray-500">
                  <p className="mb-4">
                    <b>Commands List</b>
                  </p>
                  <ul>
                    <li className="list-none mb-2">
                      <code>{`ls <directory>`}</code> - list posts in a
                      directory
                    </li>
                    <li className="list-none mb-2">
                      <code>{`cd <directory>`}</code> - change directory
                    </li>
                    <li className="list-none mb-2">
                      <code>{`ls <directory>`}</code> - list posts in a
                      directory
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="mb-4">
                    <b>Recently Viewed Posts</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
