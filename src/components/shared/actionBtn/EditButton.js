import React from 'react';
import ReactTooltip from 'react-tooltip';

const EditButton = ({ editButtonClicked, tooltipMsg }) => {
  return (
    <span className='hidden sm:block ml-3 shadow-sm rounded-md'>
      <button
        type='button'
        data-tip={tooltipMsg}
        onClick={editButtonClicked}
        className='relative inline-flex items-center px-2 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150'
      >
        <svg
          fill='currentColor'
          viewBox='0 0 20 20'
          className='h-4 w-4 text-gray-600 hover:text-gray-800'
        >
          <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
        </svg>
      </button>
      <ReactTooltip />
    </span>
  );
};

export default EditButton;
