import React, { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from './../../shared/error/ErrorMessage';
import { XIcon } from '@heroicons/react/outline';
import {
  processCreateStoryAsync,
  processUpdateStoryAsync,
  processSubmitStoryDraftAsync,
} from '../../../store/actions/Stories';
import { StoriesContext } from './../../../context/StoriesContext';
import { notificationHandler } from './../../../libs/util/Notification';
import { CoverPhotoDefault } from './../../vectors/Vectors';
import { setStoryRequestProperties } from './../../../libs/util/StoryRequestCheck';

const StoryForm = ({
  genres,
  actionType = 'create',
  storyInfo,
  updatePage,
  certifyAndSubmitDraftStory,
  draftStory,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: storyInfo?.title ?? '',
      genre: storyInfo?.genre?._id ?? '',
      synopsis: storyInfo?.synopsis,
      coverImage: storyInfo?.coverImage,
      maturityRating: storyInfo?.maturityRating,
    },
  });
  const history = useHistory();
  const [imageURL, setImageURL] = useState('');
  const imageUpload = useRef(null);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dispatch } = useContext(StoriesContext);
  const showImageUrl = watch('coverImage');

  const checkFieldError = (fieldName, msg) => {
    return errors[fieldName] && <ErrorMessage msg={msg} />;
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const renderImage = async ({ target }) => {
    setImageURL(URL.createObjectURL(target.files[0]));
    const base64Image = await getBase64(target.files[0]);
    setImage(base64Image);
  };

  const createStory = async (data) => {
    try {
      setIsSubmitting(true);
      const { data: storyData, message } = await processCreateStoryAsync(dispatch, data);
      notificationHandler('success', message);
      setStoryRequestProperties('draft', 'personal');
      history.push(`/chat-story/${storyData._id}`);
    } catch (error) {
      notificationHandler('error', error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStory = async (data) => {
    try {
      setIsSubmitting(true);
      if (certifyAndSubmitDraftStory) {
        if (draftStory === null || draftStory === undefined || draftStory.length === 0) {
          notificationHandler('error', 'Please add a draft story');
          return;
        }
        const payload = {
          chatStoryDraft: storyInfo?._id,
          draft: draftStory,
          id: storyInfo?._id,
          title: data.title,
          coverImage: data.coverImage,
          certified: data.certified,
          genre: data.genre,
          synopsis: data.synopsis,
        };
        const { message } = await processSubmitStoryDraftAsync(dispatch, payload);
        notificationHandler('success', message);
        updatePage();
      } else {
        const { message } = await processUpdateStoryAsync(dispatch, { ...data });
        notificationHandler('success', message);
        updatePage();
      }
    } catch (error) {
      console.log('error', error.message);
      notificationHandler('error', error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setFormInfo = () => {
    return actionType === 'create' ? 'Create' : 'Update';
  };

  const onSubmit = async (data, e) => {
    if (actionType === 'create') {
      await createStory({
        ...data,
        coverImage: image,
        maturityRating: data.maturityRating === 'false' ? false : true,
      });
    } else {
      await updateStory({
        ...data,
        coverImage: image ?? storyInfo.coverImage,
        id: storyInfo?.chatStoryId ?? storyInfo._id,
        maturityRating: data.maturityRating === 'false' ? false : true,
      });
    }
    e.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '480px' }}>
      <div className='py-3 bg-white'>
        <div className='grid grid-cols-12 gap-x-3 gap-y-3'>
          {/* title */}
          <div className='col-span-12'>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>
              Title
            </label>
            <input
              type='text'
              id='title'
              autoComplete='given-name'
              {...register('title', { required: true })}
              className='whipik-input'
            />
            {checkFieldError('title', 'Story title is required')}
          </div>

          {/* genre */}
          <div className='col-span-6'>
            <label htmlFor='genre' className='block text-sm font-medium text-gray-700 mb-1'>
              Genre
            </label>
            <select
              id='genre'
              {...register('genre', { required: certifyAndSubmitDraftStory ? true : false })}
              className='whipik-input'
            >
              <option hidden></option>
              {genres?.data.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
            {checkFieldError('genre', 'Story genre is required')}
          </div>

          {/* maturity rating */}
          <div className='col-span-6 hidden'>
            <label htmlFor='genre' className='block text-sm font-medium text-gray-700 mb-1'>
              Maturity Rating
            </label>
            <select
              id='genre'
              {...register('maturityRating', {
                required: certifyAndSubmitDraftStory ? true : false,
              })}
              className='whipik-input'
            >
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
              ))
            </select>
            {checkFieldError('maturityRating', 'Maturity rating is required')}
          </div>

          {/* synopsis */}
          <div className='col-span-12'>
            <label htmlFor='synopsis' className='block text-sm font-medium text-gray-700 mb-1'>
              Synopsis
            </label>
            <textarea
              id='synopsis'
              {...register('synopsis', { required: certifyAndSubmitDraftStory ? true : false })}
              className='whipik-input'
            />
            {checkFieldError('synopsis', 'Synopsis is required')}
          </div>

          {/* image */}
          <div className='col-span-12'>
            {imageURL.length > 0 || showImageUrl?.length > 0 ? (
              <div className='relative w-full'>
                <img
                  src={imageURL || getValues('coverImage')}
                  className='h-44 object-cover w-full'
                />
                <button
                  onClick={() => {
                    setImageURL('');
                    setValue('coverImage', null);
                  }}
                  className='hover:outline-none focus:outline-none outline-none absolute bg-gray-100 h-7 w-7 rounded-full flex items-center justify-center shadow'
                  style={{ bottom: '80%', left: '90%' }}
                  type='button'
                >
                  <XIcon className='h6 w-6 text-gray-500 hover:text-gray-700' />
                </button>
              </div>
            ) : (
              <>
                <label className='block text-sm font-medium text-gray-700'>Cover photo</label>
                <div className='mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center'>
                  <div className='space-y-1 text-center'>
                    <CoverPhotoDefault />
                    <div className='flex text-sm text-gray-600'>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 w-full'
                      >
                        <span className='text-center cursor-pointer'>Upload a file</span>
                        <input
                          id='file-upload'
                          ref={imageUpload}
                          accept='image/*'
                          {...register('coverImage', {
                            required: certifyAndSubmitDraftStory ? true : false,
                          })}
                          type='file'
                          onChange={(e) => renderImage(e)}
                          className='sr-only'
                        />
                      </label>
                    </div>
                    <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                {checkFieldError('coverImage', 'Please Upload an image')}
              </>
            )}
          </div>
          {certifyAndSubmitDraftStory && (
            <div className='col-span-12 mt-3'>
              <div className='relative flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    defaultChecked={storyInfo?.certified ?? false}
                    id='certified'
                    name='certified'
                    {...register('certified', { required: true })}
                    type='checkbox'
                    className='focus:ring-orange-500 h-5 w-5 text-orange-600 border-gray-300 rounded'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='isCertified' className='font-medium text-gray-600'>
                    I certify that the submission is my work and i have complete rights to it.
                    Whipik shall not be held liable for any copyright issues
                  </label>
                </div>
              </div>
              {errors['certified'] && <ErrorMessage msg='Please check the box' />}
            </div>
          )}
        </div>
      </div>

      <div className='py-3 text-right'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='whipik-button whipik-button__primary'
        >
          {setFormInfo()}
        </button>
      </div>
    </form>
  );
};

export default StoryForm;
