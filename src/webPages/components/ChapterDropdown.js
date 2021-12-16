import React, { useState, useContext, useEffect } from 'react';
import { StoriesContext } from '../../context/StoriesContext';

export default function ChapterDropdown({
  currentChapterId,
  setCurrentChapterId,
  setNextChapter,
  setShowFooter = () => {},
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  const [selectedItem, setSelectedItem] = useState();
  const [items, setItems] = useState();

  const { state } = useContext(StoriesContext);
  const story = state.singleStory;
  let chapters = story && story.chatChapters;

  useEffect(() => {
    setItems(chapters);
    setSelectedItem(currentChapterId);
    episodeTitle();
  }, [state, items, currentChapterId, selectedItem]);

  const getNewChapter = (newID) => {
    setSelectedItem(newID);
    setCurrentChapterId(newID);
    setNextChapter(false);
    setShowFooter(false);
    console.log('ffff');
    toggleDropdown();
  };

  const episodeTitle = () => {
    if (items && selectedItem && Array.isArray(items)) {
      let i = items.filter((item) => item._id === selectedItem);
      if (i.length > 0) {
        return i[0].title;
      }
    } else {
      return 'Episodes';
    }
  };
  let currentEpisode = episodeTitle();

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-200'
          id='menu-button'
          aria-expanded='true'
          aria-haspopup='true'
          onClick={() => toggleDropdown()}
        >
          {currentEpisode}
          <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      {openDropdown && (
        <div
          className='transition-all z-10 origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex={-4}
        >
          <div className='py-1' role='none'>
            {story &&
              story.chatChapters.map((chapter) => {
                return (
                  <div
                    className='text-gray-700 block px-4 py-2 text-sm'
                    onClick={() => getNewChapter(chapter._id)}
                    id={chapter._id}
                    key={chapter._id}
                  >
                    {/* {chapter._id === selectedItem && <span>•</span>} */}
                    <span className={chapter._id === selectedItem && 'text-primary'}>
                      {chapter.title}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
