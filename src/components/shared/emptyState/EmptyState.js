import React from 'react';

const EmptyState = ({ src, title, subTitle }) => {
  return (
    <div className='text-center'>
      <img src={src} className='h-52 w-52 inline-block object-contain' alt='' />
      <h3 className='mt-2 text-xl mb-1 font-medium text-gray-900'>{title}</h3>
      <p className='mt-1 text-base text-gray-500'>{subTitle}</p>
    </div>
  );
};

export default EmptyState;
