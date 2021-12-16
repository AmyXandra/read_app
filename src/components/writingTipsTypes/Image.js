import React from 'react';
import imageTipPreview from '../../assets/images/imagePlaceholder.svg';
const ImageGuideTips = () => {
  return (
    <>
      <h4 className='text-gray-700 font-bold text-xl mb-1'>Image</h4>
      <div className='bg-gray-100 p-4 rounded-md'>
        <div className='text-left'>
          <p className='text-red-500 text-sm italic'>Format</p>
          <p>
            <span className='font-semibold text-gray-900'>Teni:</span> <span>(image)</span>
          </p>
          <p className='text-gray-500 italic text-sm mt-1'>
            NOTE: This adds a placeholder for an image
          </p>
        </div>
      </div>
      <p className='italic text-gray-400 mt-4 mb-1'>Display</p>
      <div className='pt-2'>
        <div className='inline-flex items-center justify-center'>
          <img src={imageTipPreview} alt='' width='150' height='100' />
        </div>
      </div>
    </>
  );
};

export default ImageGuideTips;
