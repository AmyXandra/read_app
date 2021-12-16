import React, { useState, useEffect, useContext } from 'react';
import { processSetReadingSettings } from '../../../store/actions/Stories';
import { StoriesContext } from '../../../context/StoriesContext';

export default function ReadingSettings() {
  const {
    state: { readingSettings },
    dispatch,
  } = useContext(StoriesContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleClose = () => {
    setOpenDropdown(!openDropdown);
  };
  const [selected, setSelected] = useState('');
  useEffect(() => {
    setSelected(readingSettings);
  }, [readingSettings]);

  const handleChange = (event) => {
    setSelected(event.target.value);
    localStorage.setItem('READING_SETTINGS', JSON.stringify(event.target.value));
    //set the reducer
    processSetReadingSettings(dispatch, event.target.value);
  };

  return (
    <div className='relative inline-block text-left'>
      <div>
        {/* <Dropdown
        /> */}
        <button
          type='button'
          className='inline-flex justify-center w-full px-4 py-2 bg-transparent text-sm font-medium text-white focus:outline-none'
          id='menu-button'
          aria-expanded='true'
          aria-haspopup='true'
          onClick={() => handleClose()}
        >
          {/* Settings Icon */}
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8.125 1.25V3.75L6.875 4.375L5 2.5L2.5 5L4.375 6.875L3.75 8.125H1.25V11.875H3.75L4.375 13.125L2.5 15L5 17.5L6.875 15.625L8.125 16.25V18.75H11.875V16.25L13.125 15.625L15 17.5L17.5 15L15.625 13.125L16.25 11.875H18.75V8.125H16.25L15.625 6.875L17.5 5L15 2.5L13.125 4.375L11.875 3.75V1.25H8.125Z'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span className='hidden sm:block ml-2'>Settings</span>
        </button>
      </div>
      {openDropdown && (
        <div
          className='transition-all z-10 pb-4 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex={-1}
        >
          <form>
            <div className='py-2 px-4 bg-gray-100 text-sm text-gray-900' role='none'>
              Reading Settings
            </div>
            <div className='py-2 px-4 text-gray-900 flex justify-between items-center' role='none'>
              <label htmlFor='click'>Tap to Read</label>
              <input
                type='radio'
                value='click'
                id='click'
                checked={selected === 'click'}
                onChange={handleChange}
              />
            </div>
            {/* <div className='py-2 px-4 text-gray-900 flex justify-between items-center' role='none'>
              <label htmlFor='scroll'>Scroll to Read</label>
              <input
                type='radio'
                value='scroll'
                id='scroll'
                checked={selected === 'scroll'}
                onChange={handleChange}
              />
            </div> */}
          </form>
        </div>
      )}
    </div>
  );
}
