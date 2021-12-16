import React from 'react';
import episodeTipPreview from '../../assets/images/newChapter.svg';
const NewChapterTips = () => {
  return (
    <>
      <h4 className='text-gray-700 font-bold text-xl mb-1'>New episode</h4>
      <div className='bg-gray-100 p-4 rounded-md'>
        <div className='text-left'>
          <p className='text-red-500 text-sm italic'>Format</p>
          <p className='font-semibold text-gray-900'>(episode)</p>
        </div>
      </div>
      <p className='italic text-gray-400 mt-4 mb-1'>Display</p>
      <div className='pt-2'>
        <div className='inline-flex items-center justify-center'>
          <img src={episodeTipPreview} alt='' width='250' height='100' />
        </div>
      </div>
    </>
  );
};

export default NewChapterTips;
