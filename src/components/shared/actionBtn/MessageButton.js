import React from 'react';
import ReactTooltip from 'react-tooltip';

const MessageButton = ({ addButtonClicked, tooltipMsg }) => {
  return (
    <span className='hidden sm:block shadow-sm rounded-md'>
      <button
        data-tip={tooltipMsg}
        type='button'
        className='relative inline-flex items-center px-2 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150'
        onClick={addButtonClicked}
      >
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
          />
        </svg>
      </button>
      <ReactTooltip />
    </span>
  );
};

export default MessageButton;
