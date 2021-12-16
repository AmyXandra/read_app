import React from 'react';
import Modal from 'react-modal';
import { XIcon, ExclamationIcon } from '@heroicons/react/outline';
import { customStylesAlt } from '../helper';
import Button from '../../shared/button/Button';

export default function ConfirmAction({
  confirmActionModalIsOpen,
  closeConfirmActionModal,
  buttonText,
  title,
  caption,
  takeAction,
  disabled,
  closeModalText = 'cancel',
  redirectUser = false,
  closeConfirmActionModalAndRedirect,
}) {
  return (
    <Modal
      isOpen={confirmActionModalIsOpen}
      onRequestClose={closeConfirmActionModal}
      style={customStylesAlt}
      ariaHideApp={false}
      contentLabel='Confirm Action Modal'
    >
      <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
        <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
          <button
            type='button'
            className='hover:outline-none focus:outline-none outline-none'
            onClick={closeConfirmActionModal}
          >
            <span className='sr-only'>Close</span>
            <XIcon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='sm:flex sm:items-start'>
          <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
            <ExclamationIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
          </div>
          <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>{title}</h3>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                {caption
                  ? caption
                  : 'Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone.'}
              </p>
            </div>
          </div>
        </div>
        <div className='mt-8 sm:mt-8 sm:flex sm:flex-row-reverse'>
          <Button
            buttonText={buttonText}
            type='button'
            classNames='whipik-button whipik-button__danger ml-3'
            clicked={takeAction}
            disabled={disabled}
          />
          <Button
            buttonText={closeModalText}
            type='button'
            classNames='whipik-button whipik-button__white'
            clicked={redirectUser ? closeConfirmActionModalAndRedirect : closeConfirmActionModal}
          />
        </div>
      </div>
    </Modal>
  );
}
