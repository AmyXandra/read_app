import React from 'react';
import { TrashIcon } from '@heroicons/react/outline';
const LineBreak = ({ message, setMessageId, editMessage, mode }) => {
  return (
    <div className='relative mt-5'>
      <div className='absolute inset-0 flex items-center cursor-pointer' aria-hidden='true'>
        <div className='w-full border-t border-gray-200' />
      </div>
      <div
        className='relative flex justify-center cursor-pointer'
        onClick={() => editMessage(message)}
      >
        <span className='px-2 bg-white text-sm text-gray-500 flex items-center'>
          <span className='cursor-pointer' onClick={() => editMessage(message)}>
            {message?.text}
          </span>
          {mode === 'edit' && (
            <div>
              <TrashIcon
                className='w-6 h-6 text-gray-300 cursor-pointer transition-all ml-2 hover:text-gray-800'
                onClick={() => setMessageId(message._id)}
              />
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default LineBreak;
