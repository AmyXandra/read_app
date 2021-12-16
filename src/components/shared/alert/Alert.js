import React from 'react';
/* This example requires Tailwind CSS v2.0+ */
import { InformationCircleIcon } from '@heroicons/react/solid';

export default function Alert() {
  return (
    <div className='bg-white border-l-4 border-orange-600 mb-9 p-4'>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          <InformationCircleIcon className='h-5 w-5 text-orange-600' aria-hidden='true' />
        </div>
        <div className='ml-3 flex-1 md:flex md:justify-between items-center'>
          <p className='text-sm text-orange-600'>
            A new software update is available. See what’s new in version 2.0.4.
          </p>
          <p className='mt-3 text-sm md:mt-0 md:ml-6'>
            <button type='submit' className='whipik-button whipik-button__primary'>
              Create Episode
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
