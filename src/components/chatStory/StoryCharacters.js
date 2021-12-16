import React from 'react';
import { CheckCircleIcon, PlusIcon } from '@heroicons/react/solid';

const StoryCharacters = ({ storyInfo, messagePayload, setCharacter, setCharacterModalIsOpen }) => {
  return (
    <>
      <div className='flex flex-grow-1 w-4/5 mx-3 overflow-x-auto character-scrollbar'>
        {storyInfo?.chatCharacters?.map((character) => (
          <span
            className={`
              ${
                character?._id === messagePayload?.character
                  ? 'bg-orange-50 border-orange-200'
                  : 'border-gray-200 bg-white'
              }
              inline-flex rounded-full items-center py-1.5 px-3 text-sm font-medium bg-white text-gray-700 border cursor-pointer mr-3 whitespace-nowrap`}
            onClick={() => setCharacter(character)}
            key={character?._id}
          >
            {character?.name}
            {character?.isMainXter && (
              <button
                type='button'
                className='flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-orange-600'
              >
                <div className='ml-2'>
                  <span className='sr-only'>Main Character</span>
                  <CheckCircleIcon className='h-4 w-4' />
                </div>
              </button>
            )}
          </span>
        ))}
      </div>

      {/* Add character CTA */}
      <div>
        <button
          type='button'
          onClick={() => setCharacterModalIsOpen(true)}
          className='inline-flex rounded-md items-center py-1.5 px-3 text-sm font-medium bg-white text-gray-700 border border-orange-600 border-dashed mr-3 focus:outline-none'
        >
          <span className='sr-only'>Add character</span>
          <PlusIcon className='h-4 w-4 text-orange-600' />
          Add
        </button>
        {/* </span> */}
      </div>
    </>
  );
};

export default StoryCharacters;
