import React from 'react';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/outline';
import { customStyles } from './../helper';
import TagsForm from './../../forms/tags/TagsForm';

export default function TagModal({ modalIsOpen, closeModal, updateTagsTable, tagInfo }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel='Genre Modal'
    >
      <div className='p-3'>
        <div className='flex items-start justify-between mb-5'>
          <div className='flex-grow'>
            <h3 className='text-gray-800 text-xl font-normal capitalize'>Update Tag</h3>
            <p className='text-gray-500 text-base'>Fill the form below to update tag details</p>
          </div>
          <button
            onClick={closeModal}
            className='hover:outline-none focus:outline-none outline-none'
          >
            <XIcon className='h6 w-6 text-gray-500 hover:text-gray-700' />
          </button>
        </div>
        <TagsForm actionType='edit' updateTagsTable={updateTagsTable} tagInfo={tagInfo} />
      </div>
    </Modal>
  );
}
