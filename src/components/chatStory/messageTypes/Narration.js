import React, { useState } from 'react';
import { AltTextIcon } from '../../vectors/Vectors';
import { TrashIcon } from '@heroicons/react/outline';

const Narration = ({ message, previousMessage, mode, editMessage, setMessageId }) => {
  const [showAltText, toggleAltText] = useState(false);
  return (
    <div className={`${previousMessage.type === message.type ? 'mt-3' : 'mt-5'}`}>
      <div className='flex items-center max-w-full'>
        {!message?.image?.length && (
          <>
            {showAltText && message?.altText?.length > 0 && (
              <p
                className='text-medium flex-grow-1 flex-shrink-0 mr-3 break-words cursor-pointer'
                onClick={() => editMessage(message)}
              >
                {message?.altText}
              </p>
            )}

            {!showAltText && (
              <p
                className='text-medium flex-grow-1 flex-shrink-0 mr-3 break-words max-w-full cursor-pointer'
                onClick={() => editMessage(message)}
              >
                {message?.text}
              </p>
            )}

            {message?.altText?.length > 0 && (
              <span
                className='cursor-pointer'
                onClick={() => toggleAltText((prevState) => !prevState)}
              >
                <AltTextIcon fill={showAltText ? '#F97300' : '#212d40'} />
              </span>
            )}

            {mode === 'edit' && (
              <div>
                <TrashIcon
                  className='w-6 h-6 text-gray-300 cursor-pointer transition-all ml-2 hover:text-gray-800'
                  onClick={() => setMessageId(message._id)}
                />
              </div>
            )}
          </>
        )}

        {message?.image?.length > 0 && (
          <div
            className='w-full flex justify-center items-center cursor-pointer'
            onClick={() => editMessage(message)}
          >
            <img src={message.image} alt='' className='h-52 w-52 object-cover' />
            {mode === 'edit' && (
              <div>
                <TrashIcon
                  className='w-6 h-6 text-gray-300 cursor-pointer transition-all ml-2 hover:text-gray-800'
                  onClick={() => setMessageId(message._id)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Narration;
