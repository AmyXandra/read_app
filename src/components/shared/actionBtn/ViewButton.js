import React from 'react';
import ReactTooltip from 'react-tooltip';

const ViewButton = ({ viewButtonClicked, tooltipMsg }) => {
  return (
    <span className='hidden sm:block shadow-sm rounded-md'>
      <button
        data-tip={tooltipMsg}
        type='button'
        className='relative inline-flex items-center px-2 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150'
        onClick={viewButtonClicked}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='h-4 w-4 text-gray-700'
        >
          <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
          <circle cx='12' cy='12' r='3'></circle>
        </svg>
      </button>
      <ReactTooltip />
    </span>
  );
};

export default ViewButton;
