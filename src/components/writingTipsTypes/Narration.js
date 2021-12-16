import React from 'react';

const NarrationTips = () => {
  return (
    <>
      <h4 className='text-gray-700 font-bold text-xl mb-1'>Narration</h4>
      <div className='bg-gray-100 p-4 rounded-md'>
        <div className='text-left'>
          <p className='text-red-500 text-sm italic'>Format</p>
          <p>Chidi has a look of horror on his face as he stares at Abby.</p>
        </div>
      </div>
      <div>
        <p className='italic text-gray-400 mt-4 mb-1'>Display</p>
        <p className='text-base'>Chidi has a look of horror on his face as he stares at Abby.</p>
      </div>
    </>
  );
};

export default NarrationTips;
