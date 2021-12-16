import React from 'react';
/* This example requires Tailwind CSS v2.0+ */
export default function Pagination({
  prevPage,
  nextPage,
  disableNextBtn,
  disablePrevBtn,
  paginationData,
}) {
  return (
    <nav
      className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'
      aria-label='Pagination'
    >
      <p>
        Page {paginationData?.page} of {paginationData?.totalPages}
      </p>
      <div className='flex-1 flex justify-end'>
        <button
          onClick={prevPage}
          disabled={disablePrevBtn}
          className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none'
        >
          Previous
        </button>
        <button
          className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none'
          onClick={nextPage}
          disabled={disableNextBtn}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
