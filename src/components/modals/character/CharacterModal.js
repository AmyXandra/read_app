import React from 'react';
import CharacterForm from './../../forms/character/CharacterForm';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/outline';
import { customStyles } from './../helper';

export default function CharacterModal({
  characterModalIsOpen,
  closeCharacterModal,
  actionType,
  storyId,
}) {
  return (
    <Modal
      isOpen={characterModalIsOpen}
      onRequestClose={closeCharacterModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel='Example Modal'
    >
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-grow w-auto mr-6'>
          <h3 className='text-gray-800 text-xl  font-normal'>
            {actionType === 'edit' ? 'Update' : 'Create'} Character
          </h3>
          <p className='text-gray-500 text-base'>
            Fill the form below to{' '}
            {actionType === 'edit' ? 'update character details' : 'Create a new character'}
          </p>
        </div>
        <button
          onClick={closeCharacterModal}
          className='hover:outline-none focus:outline-none outline-none'
        >
          <XIcon className='h6 w-6 text-gray-500 hover:text-gray-700' />
        </button>
      </div>

      <CharacterForm
        actionType={actionType}
        closeCharacterModal={closeCharacterModal}
        storyId={storyId}
      />
    </Modal>
  );
}
