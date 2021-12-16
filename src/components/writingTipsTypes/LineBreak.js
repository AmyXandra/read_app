import React from 'react';

const LineBreakTips = () => {
  return (
    <>
      <h4 className='text-gray-700 font-bold text-xl mb-1'>Line break</h4>
      <div className='bg-gray-100 p-4 rounded-md'>
        <div className='text-left'>
          <p className='text-red-500 text-sm italic'>Format</p>
          <p>
            <span className='font-semibold text-gray-900'>
              <span className='font-bold'>(break)</span> 2 weeks later.
            </span>
          </p>
        </div>
      </div>
      <p className='italic text-gray-400 mt-4 mb-1'>Display</p>
      <div className='mt-6 relative'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-white text-gray-500'>2 weeks later</span>
        </div>
      </div>
    </>
  );
};

export default LineBreakTips;
