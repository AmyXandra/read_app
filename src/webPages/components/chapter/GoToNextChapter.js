import React, { useContext, useEffect, useState } from 'react';
import CommentModal from '../modals/commentModal/CommentModal';
import { StoriesContext } from '../../../context/StoriesContext';
import { HeartIcon } from '@heroicons/react/outline';
import { getUserReadingHistory } from '../../utils/Cookies';
import { useParams } from 'react-router-dom';
import { isAuthenticatedUser } from '../../../libs/util/Auth';

export default function GoToNextChapter({
  currentChapterId,
  setCurrentChapterId = () => {},
  setNextChapter = () => {},
  getCompleteCount = () => {},
  setChatStoryProgress = () => {},
  setShowFooter = () => {},
}) {
  const { state } = useContext(StoriesContext);
  let singleStory = state.singleStory;
  const { storyId } = useParams();

  //open and close modal states
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const [showNextChapter, setShowNextChapter] = useState(false);
  const [showEndChapter, setShowEndChapter] = useState(false);
  useEffect(() => {
    if (singleStory.chatChapters && currentChapterId && Array.isArray(singleStory.chatChapters)) {
      let i = singleStory.chatChapters.filter((item) => item._id === currentChapterId);
      let complete = singleStory.chatChapters.pop();

      if (i.length > 0 && i[0].number === singleStory.chatChapters.length) {
        setShowNextChapter(false);
        //call story complete count
      } else if (i.length > 0 && i[0].number < singleStory.chatChapters.length) {
        setShowNextChapter(true);
        setShowFooter(true);
      }

      if (complete?._id === currentChapterId) {
        setShowEndChapter(true);
        setShowFooter(true);
        let readHistory = getUserReadingHistory();
        if (readHistory) {
          let i = JSON.parse(readHistory).filter((item) => item.name === storyId);
          if (i.length > 0 && i[0].complete) {
            return;
          } else {
            getCompleteCount(singleStory._id);
            isAuthenticatedUser() && setChatStoryProgress('complete', complete._id);
            return;
          }
        }
      }
    }
  }, []);

  //function to get next chapter
  function clickNextChapter() {
    setNextChapter(false);
    setShowNextChapter(false);
    setShowFooter(false);
    //dispatch next chapter
    if (singleStory.chatChapters && currentChapterId && Array.isArray(singleStory.chatChapters)) {
      let i = singleStory.chatChapters.filter((item) => item._id === currentChapterId);
      //get next chapter id if not last chapter
      if (i[0].number < singleStory.chatChapters.length) {
        let newChapter = singleStory.chatChapters[i[0].number];
        return setCurrentChapterId(newChapter._id);
      }
    }
  }

  return (
    <div className='max-w-2xl mx-auto flex flex-col items-center mt-20 mb-8 relative z-10'>
      <div className='grid grid-cols-3 text-sm text-gray-600 items-center w-64 lg:w-72'>
        <div className='flex items-center justify-center'>
          <svg
            width='24'
            height='18'
            viewBox='0 0 24 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='mr-2'
          >
            <path
              d='M23.855 8.39028C21.5954 3.97151 17.1221 0.981812 12 0.981812C6.87789 0.981812 2.40331 3.9736 0.144977 8.39069C0.0496613 8.57967 0 8.78845 0 9.0002C0 9.21195 0.0496613 9.42073 0.144977 9.60971C2.40456 14.0285 6.87789 17.0182 12 17.0182C17.1221 17.0182 21.5966 14.0264 23.855 9.60929C23.9503 9.42032 24 9.21153 24 8.99978C24 8.78803 23.9503 8.57925 23.855 8.39028ZM12 15.0136C10.8133 15.0136 9.65325 14.6609 8.66655 14.0001C7.67986 13.3394 6.91082 12.4002 6.4567 11.3013C6.00257 10.2025 5.88375 8.99332 6.11526 7.82679C6.34678 6.66026 6.91822 5.58873 7.75734 4.74771C8.59645 3.90669 9.66555 3.33394 10.8294 3.10191C11.9933 2.86987 13.1997 2.98896 14.2961 3.44412C15.3924 3.89928 16.3295 4.67006 16.9888 5.659C17.6481 6.64793 18 7.81061 18 8.99999C18.0004 9.78982 17.8454 10.572 17.544 11.3018C17.2426 12.0315 16.8007 12.6946 16.2435 13.2531C15.6862 13.8116 15.0247 14.2546 14.2965 14.5567C13.5684 14.8587 12.788 15.014 12 15.0136ZM12 4.9909C11.6429 4.9959 11.2882 5.04914 10.9454 5.14918C11.228 5.53408 11.3636 6.00774 11.3276 6.48426C11.2917 6.96079 11.0865 7.40861 10.7493 7.74652C10.4122 8.08444 9.96539 8.29007 9.48995 8.32611C9.01451 8.36216 8.54192 8.22625 8.15789 7.94301C7.93921 8.7505 7.97869 9.6064 8.27076 10.3902C8.56283 11.1741 9.0928 11.8464 9.78606 12.3125C10.4793 12.7786 11.301 13.0151 12.1354 12.9887C12.9698 12.9623 13.7749 12.6743 14.4374 12.1652C15.1 11.6562 15.5865 10.9517 15.8287 10.1509C16.0708 9.35019 16.0563 8.4935 15.7872 7.70145C15.5181 6.9094 15.0079 6.22188 14.3286 5.73564C13.6492 5.2494 12.8348 4.98893 12 4.9909Z'
              fill='#FFFFFF'
            />
          </svg>
          <span className='text-white'>{singleStory.readCount}</span>
        </div>
        <div className='flex items-center justify-center'>
          <HeartIcon className='h-6 w-6 text-white mr-2' />
          <span className='text-white'>{singleStory.likeCount}</span>
        </div>
        <div className='flex items-center justify-center'>
          <CommentModal
            rootModalIsOpen={modalIsOpen}
            setRootModalIsOpen={() => openModal()}
            setRootModalIsClosed={() => closeModal()}
            currentChapterId={currentChapterId}
          />
          <span className='text-white'>{singleStory.commentCount}</span>
        </div>
      </div>

      {showNextChapter && (
        <button
          className='bg-primary text-white font-semibold mb-6 mt-8 py-2 px-3 rounded'
          onClick={() => clickNextChapter()}
        >
          Continue to Next Episode
        </button>
      )}
      {showEndChapter && (
        <div className='text-primary font-semibold text-xl mb-6 mt-8'>The End!</div>
      )}
    </div>
  );
}
