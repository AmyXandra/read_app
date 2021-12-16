import React from 'react';
import Modal from 'react-modal';
import { customStyles } from './../helper';
import { XIcon } from '@heroicons/react/outline';

const RootModal = ({ rootModalIsOpen, setRootModalIsOpen, children, title }) => {
  return (
    <Modal
      isOpen={rootModalIsOpen}
      onRequestClose={setRootModalIsOpen}
      style={customStyles}
      ariaHideApp={false}
      contentLabel='Example Modal'
    >
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-grow w-auto mr-6'>
          <h3 className='text-gray-800 text-xl  font-normal'>{title}</h3>
        </div>
        <button
          onClick={setRootModalIsOpen}
          className='hover:outline-none focus:outline-none outline-none'
        >
          <XIcon className='h6 w-6 text-gray-500 hover:text-gray-700' />
        </button>
      </div>
      {children}
    </Modal>
  );
};

export default RootModal;
