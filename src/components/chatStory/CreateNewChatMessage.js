import React from 'react';
import ChatMessageTypeSelect from './ChatMessageTypeSelect';
import { PaperAirplaneIcon, XIcon } from '@heroicons/react/outline';
import { AltTextIcon } from '../vectors/Vectors';
import { AddMediaIcon } from './../vectors/Vectors';

const CreateNewChatMessage = (props) => {
  const disableSendButton = () => {
    const { type, text } = { ...props.messagePayload };
    if ((type === 'typing' || type === 'lineBreak') && text?.trim()?.length >= 0) {
      return false;
    } else if (type !== 'typing' && type !== 'lineBreak' && text?.trim()?.length > 0) {
      return false;
    } else {
      return true;
    }
  };
  const disableMediaButton = () => {
    const { type, text } = { ...props.messagePayload };
    if (type === '' || type === 'lineBreak' || type === 'typing' || text?.trim()?.length > 0) {
      return true;
    }
    return false;
  };

  return (
    <div className='flex items-center px-7 justify-between' style={{ height: '12%' }}>
      {/* message type select */}
      <div className='mr-3' style={{ width: '20%' }}>
        <ChatMessageTypeSelect
          selectMessageType={props.selectMessageType}
          messageTypeSelected={props.messageType}
          messageTypeSelectDisabled={props.messageTypeSelectDisabled}
        />
      </div>

      {/* textarea */}
      <div className='flex-grow mx-3 relative' style={{ width: '68%' }}>
        <textarea
          rows={2}
          ref={props.textareaRef}
          disabled={props.messageBoxDisabled}
          placeholder='Start typing'
          className='whipik-input disabled:opacity-60 relative pr-10'
          value={props.messagePayload.text}
          onChange={(e) => props.setMessageText(e.target.value)}
        ></textarea>
        <button
          className='focus:outline-none disabled:opacity-60 absolute top-1/4 right-6'
          onClick={() => props.setInterpretModalIsOpen(true)}
          disabled={
            props.messagePayload.text.length === 0 || props.messagePayload.type === 'typing'
              ? true
              : false
          }
        >
          <AltTextIcon />
        </button>
      </div>

      {/* alt text, add media and send message */}
      <div
        className='flex items-center justify-between'
        style={{
          width: props.messageActionType === 'edit' ? '12%' : '8%',
        }}
      >
        {props.messageActionType === 'edit' && (
          <button
            className='focus:outline-none'
            onClick={() => {
              props.setMessagePayload(props.initialPayload);
              props.setMessageActionType('create');
            }}
          >
            <XIcon className='w-6 h-6 text-gray-800 cursor-pointer transition-all ml-0 hover:text-orange-600' />
          </button>
        )}
        <button
          className='cursor-pointer focus:outline-none disabled:opacity-60'
          onClick={() => props.setRootModalIsOpen(true)}
          disabled={disableMediaButton()}
        >
          <AddMediaIcon />
        </button>
        {/* send message */}
        <button
          className='bg-orange-600 h-8 w-8 rounded-full flex items-center justify-center focus:outline-none disabled:opacity-60'
          disabled={disableSendButton() || props.isCreating}
          onClick={
            props.messageActionType === 'create' ? props.createChatMessage : props.editChatMessage
          }
        >
          <span className='transform rotate-45'>
            <PaperAirplaneIcon className='h-5 w-5 text-white' />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CreateNewChatMessage;
