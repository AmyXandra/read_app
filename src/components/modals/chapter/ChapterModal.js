import React from 'react';
import ChapterForm from '../../forms/chapter/ChapterForm';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/outline';
import { customStyles } from './../helper';

export default function ChapterModal({
  chapterModalIsOpen,
  closeChapterModal,
  actionType,
  newChapterNumber,
}) {
  return (
    <Modal
      isOpen={chapterModalIsOpen}
      onRequestClose={closeChapterModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel='Example Modal'
    >
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-grow w-80'>
          <h3 className='text-gray-800 text-xl  font-normal'>
            {actionType === 'edit' ? 'Update' : 'Create'} Episode
          </h3>
          <p className='text-gray-500 text-base'>
            Fill the form below to{' '}
            {actionType === 'edit' ? 'update episode details' : 'Create a new episode'}
          </p>
        </div>
        <button
          onClick={closeChapterModal}
          className='hover:outline-none focus:outline-none outline-none'
        >
          <XIcon className='h6 w-6 text-gray-500 hover:text-gray-700' />
        </button>
      </div>

      <ChapterForm
        closeChapterModal={closeChapterModal}
        actionType={actionType}
        newChapterNumber={newChapterNumber}
      />
    </Modal>
  );
}
