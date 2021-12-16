import React from 'react';
import ReactTooltip from 'react-tooltip';

const DeleteButton = ({ deleteButtonClicked, tooltipMsg }) => {
  return (
    <span className='hidden sm:block ml-3 shadow-sm rounded-md'>
      <button
        data-tip={tooltipMsg}
        onClick={deleteButtonClicked}
        type='button'
        className='relative inline-flex items-center px-2 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='h-4 w-4 text-red-500'
        >
          <polyline points='3 6 5 6 21 6'></polyline>
          <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
          <line x1='10' y1='11' x2='10' y2='17'></line>
          <line x1='14' y1='11' x2='14' y2='17'></line>
        </svg>
      </button>
      <ReactTooltip />
    </span>
  );
};

export default DeleteButton;
