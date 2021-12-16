import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import {
  NormalTextIcon,
  ThinkingIcon,
  DeleteIcon,
  TypingIcon,
  NarrationIcon,
  LineBreakIcon,
} from '../vectors/Vectors';

const messageTypesArray = [
  {
    id: 1,
    text: 'dialogue',
    icon: <NormalTextIcon />,
  },
  {
    id: 2,
    text: 'thought',
    icon: <ThinkingIcon />,
  },
  {
    id: 3,
    text: 'deleted',
    icon: <DeleteIcon />,
  },
  {
    id: 4,
    text: 'typing',
    icon: <TypingIcon />,
  },
  {
    id: 5,
    text: 'narration',
    icon: <NarrationIcon />,
  },
  {
    id: 6,
    text: 'lineBreak',
    icon: <LineBreakIcon />,
  },
];
const ChatMessageTypeSelect = ({
  selectMessageType,
  messageTypeSelectDisabled,
  messageTypeSelected = 'dialogue',
  placement = 'top',
  messageTypes = messageTypesArray,
}) => {
  return (
    <Menu as='div' className='relative inline-block text-left w-full'>
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className='inline-flex justify-between w-full py-2 text-base font-medium text-gray-600 bg-white rounded-md outline-none items-center focus:outline-none border border-gray-300 px-3 disabled:opacity-60'
              disabled={messageTypeSelectDisabled}
            >
              <span className='text-orange-600 flex items-center text-sm capitalize'>
                {messageTypes.find((message) => message.text == messageTypeSelected)?.icon}
                <span className='ml-2'>{messageTypeSelected}</span>
              </span>
              <ChevronDownIcon
                className='w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100 fill-current'
                aria-hidden='true'
              />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items
              className={`absolute right-0 w-56 mt-2 origin-top-right left-0 z-50 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                placement === 'top' ? 'bottom-0' : 'top-5'
              }`}
            >
              {messageTypes.map((type) => (
                <div className='px-1 py-1' key={type.id}>
                  <Menu.Item>
                    <button
                      className='text-gray-800 group flex rounded-md items-center w-full px-2 py-2 text-sm focus:outline-none'
                      onClick={() => selectMessageType(type.text)}
                    >
                      {type.icon}
                      <span className='ml-3 capitalize'>{type.text}</span>
                    </button>
                  </Menu.Item>
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default ChatMessageTypeSelect;
