import React from 'react';
import { DotsHorizontalIcon, TrashIcon } from '@heroicons/react/outline';
const TypingMessage = ({ message, previousMessage, setMessageId, editMessage, mode }) => {
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
            message?.chatCharacter?.isMainXter ? 'rounded-br-none ml-2' : 'rounded-bl-none mr-2'
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
          <p className='text-gray-700'>
            <DotsHorizontalIcon className='w-6' />
          </p>
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

export default TypingMessage;
