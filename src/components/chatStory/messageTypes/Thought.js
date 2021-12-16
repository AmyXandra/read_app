import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import { AltTextIcon } from '../../vectors/Vectors';
import { ThinkingIcon } from './../../vectors/Vectors';

const ThoughtMessage = ({ message, previousMessage, setMessageId, editMessage, mode }) => {
  const [showAltText, toggleAltText] = useState(false);
  return (
    <div
      className={`w-full flex flex-col mt-5 ${
        message?.chatCharacter?.isMainXter ? 'items-end' : 'items-start'
      } ${message?.altText?.length > 0 ? 'mb-8' : 'mb-0'}`}
    >
      <div
        className={`flex items-center ${
          message?.chatCharacter?.isMainXter ? 'flex-row-reverse' : ''
        }`}
        style={{
          maxWidth: '80%',
        }}
      >
        <div
          className={`w-11/12 py-3 px-5 rounded-xl bg-purple-100 relative cursor-pointer ${
            message?.chatCharacter?.isMainXter ? 'rounded-br-none ml-2' : 'rounded-bl-none'
          }`}
          style={{
            backgroundColor: message?.chatCharacter?.msgColor,
            color: message?.chatCharacter?.nameColor,
          }}
          onClick={() => editMessage(message)}
        >
          <p className='text-sm mb-1 font-bold'>
            {(previousMessage?.chatCharacter?._id !== message?.chatCharacter?._id ||
              previousMessage?.type === 'narration' ||
              previousMessage?.type === 'lineBreak') &&
              message?.chatCharacter?.name}
          </p>

          {message?.image?.length > 0 && (
            <div>
              <span className='pb-1.5'>
                <ThinkingIcon fill='#374151' />
              </span>
              <img src={message.image} alt='' className='h-52 w-52 object-cover mt-2' />
            </div>
          )}

          {!message?.image?.length && (
            <p className='text-gray-700 flex items-start'>
              <span className='pt-1.5'>
                <ThinkingIcon fill='#374151' />
              </span>
              {showAltText && message?.altText?.length > 0 && (
                <span className='ml-1'>{message?.altText}</span>
              )}
              {!showAltText && <span className='ml-1'>{message?.text}</span>}
            </p>
          )}

          {message?.altText?.length > 0 && (
            <button
              onClick={() => toggleAltText(!showAltText)}
              className={`absolute h-8 w-8 rounded-full flex items-center justify-center border-gray-400 border-2 focus:outline-none ${
                message?.chatCharacter?.isMainXter ? 'right-1' : 'left-3'
              }`}
              style={{ backgroundColor: message?.chatCharacter?.msgColor }}
            >
              <AltTextIcon height='18' width='18' />
            </button>
          )}
        </div>

        {mode === 'edit' && (
          <div>
            <TrashIcon
              className='w-6 h-6 text-gray-300 cursor-pointer transition-all hover:text-gray-800'
              onClick={() => setMessageId(message._id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ThoughtMessage;
