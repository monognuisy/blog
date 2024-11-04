'use client';

import { useEffect, useState } from 'react';

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
      <div>
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-md p-2"
          onFocus={(e) => e.preventDefault()}
          onClick={(e) => {
            toggleModalOpen();
            e.preventDefault();
          }}
        />
      </div>

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
          onClick={toggleModalOpen}
        >
          <div
            className="w-[600px] h-[500px] rounded-md bg-white mx-auto shadow-lg"
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
                    <code>{`ls <directory>`}</code> - list posts in a directory
                  </li>
                  <li className="list-none mb-2">
                    <code>{`cd <directory>`}</code> - change directory
                  </li>
                  <li className="list-none mb-2">
                    <code>{`ls <directory>`}</code> - list posts in a directory
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
      )}
    </>
  );
};

export default SearchBar;
