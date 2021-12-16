import React, { useState } from 'react';
import Modal from 'react-modal';
import { tipsModalStyles } from './../helper';
import RenderWritingTips from './RenderWritingTips';

export default function WritingTipsModal({ modalIsOpen, closeModal }) {
  const tipsList = [
    'dialogue',
    'narration',
    'line break',
    'typing',
    'translation',
    'deleted',
    'thought',
    'image',
    'chapter',
  ];
  const [currentTips, setCurrentTips] = useState('dialogue');
  const [currentIndex, setCurrentIndex] = useState(0);

  const setNextTip = () => {
    let currentTipIndex = tipsList.findIndex((tip) => tip === currentTips);
    const nextTipIndex = (currentTipIndex += 1);
    setCurrentIndex(currentTipIndex);

    if (nextTipIndex === tipsList.length) {
      setCurrentTips('dialogue');
      setCurrentIndex(0);
    } else {
      setCurrentTips(tipsList[nextTipIndex]);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={tipsModalStyles}
      ariaHideApp={false}
      contentLabel='Example Modal'
    >
      <div className='text-center max-w-3xl w-96'>
        <div className='p-5'>
          <p className='text-base mb-4'>
            {currentIndex + 1} of {tipsList.length}
          </p>

          <RenderWritingTips currentTips={currentTips} />
          <div className='inline-flex mb-4 mt-6 mx-auto'>
            {tipsList.map((tip) => (
              <span
                className={`rounded-full h-3 w-3 mx-1 ${
                  currentTips === tip ? 'bg-orange-500' : 'bg-orange-200'
                }`}
                key={tip}
                onClick={() => setCurrentTips(tip)}
              ></span>
            ))}
          </div>
        </div>
        <div className='bg-orange-600 p-5'>
          <div className='mb-4'>
            <button
              type='button'
              onClick={closeModal}
              className='inline-flex whipik-button mr-3 bg-orange-700 border-orange-700 text-white'
            >
              Close
            </button>
            <button
              type='button'
              className='inline-flex whipik-button whipik-button__white focus:border-0 focus:ring-orange-500'
              onClick={setNextTip}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
