import React from 'react';
import { NarrationIcon, LineBreakIcon } from './../vectors/Vectors';

const QuickMessageTypeActions = ({ selectMessageType, messagePayload }) => {
  return (
    <div className='flex flex-shrink-0'>
      <button
        className={`${
          messagePayload.type === 'lineBreak' ? 'bg-orange-50 border-orange-200' : 'bg-gray-300'
        } inline-flex rounded-full items-center justify-center py-1.5 px-3 text-sm font-medium mr-2 cursor-pointer focus:outline-none text-gray-700`}
        onClick={() => selectMessageType('lineBreak')}
      >
        <div>
          <LineBreakIcon />
        </div>
        <span className='ml-2'>lineBreak</span>
      </button>
      <button
        className={`${
          messagePayload.type === 'narration' ? 'bg-orange-50 border-orange-200' : 'bg-gray-300'
        } inline-flex rounded-full items-center py-1.5 px-3 text-sm font-medium mr-2 cursor-pointer focus:outline-none text-gray-700`}
        onClick={() => selectMessageType('narration')}
      >
        <span className='sr-only'>Add Narration</span>
        <NarrationIcon />
        <span className='ml-2'>Narration</span>
      </button>
    </div>
  );
};

export default QuickMessageTypeActions;
