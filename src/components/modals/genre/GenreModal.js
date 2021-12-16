import React from 'react';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/outline';
import { customStyles } from './../helper';
import GenreForm from './../../forms/genre/GenreForm';

export default function GenreModal({
  modalIsOpen,
  closeModal,
  actionType,
  updateGenreTable,
  genreInfo,
}) {
  const setModalHeader = () => {
    return actionType === 'create' ? 'create' : 'update';
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel='Genre Modal'
    >
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-grow'>
          <h3 className='text-gray-800 text-xl font-normal capitalize'>{setModalHeader()} Genre</h3>
          <p className='text-gray-500 text-base'>Fill the form below to {setModalHeader()} genre</p>
        </div>
        <button onClick={closeModal} className='hover:outline-none focus:outline-none outline-none'>
          <XIcon className='h6 w-6 text-gray-500 hover:text-gray-700' />
        </button>
      </div>
      <GenreForm
        actionType={actionType}
        updateGenreTable={updateGenreTable}
        genreInfo={genreInfo}
      />
    </Modal>
  );
}
