import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/outline';

const InterpretAltTextForm = ({
  updateOriginalText,
  updateAltText,
  originalText,
  meaning,
  createChatMessage,
  messageActionType,
  editChatMessage,
}) => {
  return (
    <form>
      <div className='grid grid-cols-12 gap-6'>
        <div className='space-y-1 col-span-10'>
          <div className='mt-1'>
            <label className='block text-sm font-medium text-gray-700'>Original</label>
            <input
              id='originalText'
              type='text'
              value={originalText}
              onChange={(e) => updateOriginalText(e.target.value)}
              className='whipik-input'
            />
          </div>
        </div>
        <div className='space-y-1 col-span-12'>
          <div className='grid grid-cols-12 gap-6 mt-1'>
            <div className='col-span-10'>
              <label className='block text-sm font-medium text-gray-700'>Meaning</label>
              <input
                id='meaning'
                type='text'
                value={meaning}
                className='whipik-input'
                onChange={(e) => updateAltText(e.target.value)}
              />
            </div>
            <div className='col-span-2 mt-5'>
              <button
                type='button'
                className='transform rotate-45 focus:outline-none bg-orange-600 h-10 w-10 text-white rounded-full flex items-center justify-center disabled:opacity-60'
                onClick={messageActionType === 'create' ? createChatMessage : editChatMessage}
              >
                <PaperAirplaneIcon className='h-6 w-6 text-white' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InterpretAltTextForm;
