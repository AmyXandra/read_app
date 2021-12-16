import React from 'react';
import StoryForm from './../../forms/stories/StoryForm';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/outline';
import { customStyles } from './../helper';

export default function StoryModal({
  modalIsOpen,
  closeModal,
  genres,
  actionType = 'create',
  storyInfo,
  updatePage,
  certifyAndSubmitDraftStory,
  draftStory,
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
      contentLabel='Example Modal'
    >
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-grow'>
          <h3 className='text-gray-800 text-xl font-normal capitalize'>{setModalHeader()} Story</h3>
          <p className='text-gray-500 text-base'>Fill the form below to {setModalHeader()} story</p>
        </div>
        <button onClick={closeModal} className='hover:outline-none focus:outline-none outline-none'>
          <XIcon className='h6 w-6 text-gray-500 hover:text-gray-700' />
        </button>
      </div>

      <StoryForm
        genres={genres}
        actionType={actionType}
        storyInfo={storyInfo}
        updatePage={updatePage}
        draftStory={draftStory}
        certifyAndSubmitDraftStory={certifyAndSubmitDraftStory}
      />
    </Modal>
  );
}
