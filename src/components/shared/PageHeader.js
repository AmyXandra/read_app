import React from 'react';

const PageHeader = ({ children, title, subtitle }) => {
  return (
    <div className='md:flex md:items-center md:justify-between lg:max-w-7xl mb-12'>
      <div className='flex items-center space-x-5'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
          <p className='text-sm font-medium text-gray-500'>{subtitle}</p>
        </div>
      </div>
      <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
        {children}
        {/* <Button
          type="button"
          classNames="whipik-button whipik-button__white"
          buttonText="Add Genre"
        /> */}
      </div>
    </div>
  );
};

export default PageHeader;
