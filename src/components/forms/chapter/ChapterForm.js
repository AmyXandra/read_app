import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { notificationHandler } from '../../../libs/util/Notification';
import { processGetSingleStoryAsync } from './../../../store/actions/Stories';
import ErrorMessage from './../../shared/error/ErrorMessage';
import { chapterService } from './../../../services/Chapter';
import { StoriesContext } from './../../../context/StoriesContext';
import { ChapterContext } from './../../../context/ChapterContext';

const ChapterForm = ({ actionType, closeChapterModal, newChapterNumber }) => {
  const { storyId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    dispatch,
    state: { singleStory: story },
  } = useContext(StoriesContext);
  const {
    state: { chapterDetails },
  } = useContext(ChapterContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.chatStory = story?.chatStoryId ?? storyId;
    if (actionType === 'edit') {
      data.id = chapterDetails._id;
      updateChapterDetails(data);
      return;
    }
    createChapter(data);
  };

  const updateChapterDetails = async (payload) => {
    setIsSubmitting(true);
    try {
      const { data } = await chapterService.processUpdateChapter(payload);
      notificationHandler('success', data.message);
      processGetSingleStoryAsync(dispatch, storyId);
      closeChapterModal();
      document
        .getElementById('episodes')
        ?.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
    } catch (error) {
      notificationHandler('error', error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const createChapter = async (payload) => {
    setIsSubmitting(true);
    try {
      const { data } = await chapterService.processCreateChapter(payload);
      notificationHandler('success', data.message);
      processGetSingleStoryAsync(dispatch, storyId);
      closeChapterModal();
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (error) {
      notificationHandler('error', error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='py-3 bg-white'>
        <div className='grid grid-cols-12 gap-6'>
          {/* title */}
          <div className='col-span-12'>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>
              Title
            </label>
            <input
              type='text'
              defaultValue={chapterDetails?.title}
              id='title'
              {...register('title', { required: true })}
              className='whipik-input'
            />
            {errors['title'] && <ErrorMessage msg='Title field is required' />}
          </div>

          {/* episode no */}
          <div className='col-span-12'>
            <label htmlFor='number' className='block text-sm font-medium text-gray-700 mb-1'>
              Episode Number
            </label>
            <input
              type='text'
              defaultValue={chapterDetails?.number || newChapterNumber}
              id='number'
              className='whipik-input'
              {...register('number', { required: true })}
            />
            {errors['number'] && <ErrorMessage msg='Chapter No field is required' />}
          </div>
          {/* authors note */}
          <div className='col-span-12'>
            <label htmlFor='authorsNote' className='block text-sm font-medium text-gray-700 mb-1'>
              Authors Note
            </label>
            {/* <textarea
              type='text'
              defaultValue={chapterDetails?.authorsNote}
              id='authorsNote'
              className='whipik-input'
              {...register('authorsNote', { required: true })}
            ></textarea>
            {errors['authorsNote'] && <ErrorMessage msg='Authors note field is required' />} */}
          </div>
        </div>
      </div>

      <div className='py-3 text-right'>
        <button
          type='submit'
          className='whipik-button whipik-button__primary'
          disabled={isSubmitting}
        >
          {actionType === 'edit' ? 'Update' : 'Create Episode'}
        </button>
      </div>
    </form>
  );
};

export default ChapterForm;
