import React from 'react';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/outline';
import { customStyles } from '../helper';
import InterpretAltTextForm from '../../forms/chatMessage/InterpreteAltTextForm';

const InterpretAltTextModal = ({
  interpretModalIsOpen,
  closeInterpretModal,
  updateOriginalText,
  updateAltText,
  originalText,
  meaning,
  createChatMessage,
  editChatMessage,
  messageActionType,
}) => {
  return (
    <Modal
      isOpen={interpretModalIsOpen}
      onRequestClose={closeInterpretModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel='Example Modal'
    >
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-grow w-auto mr-6'>
          <h3 className='text-gray-800 text-xl  font-normal'>Translate/Interprete</h3>
        </div>
        <button
          onClick={closeInterpretModal}
          className='hover:outline-none focus:outline-none outline-none'
        >
          <XIcon className='h6 w-6 text-gray-500 hover:text-gray-700' />
        </button>
      </div>

      <InterpretAltTextForm
        originalText={originalText}
        createChatMessage={createChatMessage}
        editChatMessage={editChatMessage}
        updateOriginalText={updateOriginalText}
        updateAltText={updateAltText}
        messageActionType={messageActionType}
        meaning={meaning}
      />
    </Modal>
  );
};

export default InterpretAltTextModal;
