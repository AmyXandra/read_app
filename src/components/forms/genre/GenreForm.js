import React, { useRef, useState } from 'react';
import Button from '../../shared/button/Button';
import { useForm } from 'react-hook-form';
import ErrorMessage from './../../shared/error/ErrorMessage';
import { genreService } from './../../../services/Genres';
import { notificationHandler } from '../../../libs/util/Notification';

const GenreForm = ({ actionType, updateGenreTable, genreInfo }) => {
  const imageUpload = useRef(null);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: genreInfo?.name ?? '',
    },
  });

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const setFormInfo = () => {
    return actionType === 'create' ? 'Create' : 'Update';
  };

  const checkFieldError = (fieldName, msg) => {
    return errors[fieldName] && <ErrorMessage msg={msg} />;
  };

  const createGenre = async (data) => {
    if (data.image.length === 0) {
      setError('image', {
        type: 'manual',
        message: 'Genre cover photo is required',
      });
      return;
    }
    try {
      setIsSubmitting(true);
      const { data: response } = await genreService.processCreateGenre({
        name: data.name,
        image,
      });
      setIsSubmitting(false);
      updateGenreTable();
      return response;
    } catch (error) {
      setIsSubmitting(false);
      throw new Error(error.response.data.message);
    }
  };

  const updateGenre = async (data) => {
    try {
      setIsSubmitting(true);
      const { data: response } = await genreService.processUpdateGenre({
        name: data.name,
        image: image === null ? genreInfo.image : image,
        id: genreInfo._id,
      });
      setIsSubmitting(false);
      updateGenreTable();
      return response;
    } catch (error) {
      setIsSubmitting(false);
      throw new Error(error.response.data.message);
    }
  };

  const onSubmit = (data, e) => {
    if (actionType === 'create') {
      createGenre(data)
        .then((response) => {
          e.target.reset();
          notificationHandler('success', response.message);
        })
        .catch((error) => {
          notificationHandler('error', error.message);
        });
      return;
    }
    updateGenre(data)
      .then((response) => {
        e.target.reset();
        notificationHandler('success', response.message);
      })
      .catch((error) => {
        notificationHandler('error', error.message);
      });
  };

  const convertImageToBase64 = async ({ target }) => {
    const base64Image = await getBase64(target.files[0]);
    setImage(base64Image);
    clearErrors('image');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='py-3 bg-white'>
        <div className='grid grid-cols-12 gap-8'>
          {/* name */}
          <div className='col-span-12'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input type='text' {...register('name', { required: true })} className='whipik-input' />
            {checkFieldError('name', 'Story title is required')}
          </div>

          {/* image */}
          <div className='col-span-12'>
            <label className='block text-sm font-medium text-gray-700'>Cover photo</label>
            <div className='mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center'>
              <div className='space-y-1 text-center'>
                <svg
                  className='mx-auto h-12 w-12 text-gray-400'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 48 48'
                  aria-hidden='true'
                >
                  <path
                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <div className='flex text-sm text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 w-full'
                  >
                    <span className='text-center cursor-pointer'>Upload a file</span>
                    <input
                      id='file-upload'
                      ref={imageUpload}
                      {...register('image', { required: false })}
                      type='file'
                      onChange={(e) => convertImageToBase64(e)}
                      className='sr-only'
                    />
                  </label>
                </div>
                {getValues('image')?.[0]?.name?.length > 0 ? (
                  <p className='text-xs text-gray-900'>{getValues('image')?.[0]?.name}</p>
                ) : (
                  <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                )}
              </div>
            </div>
            {checkFieldError('image', 'Genre cover photo is required')}
          </div>
        </div>
      </div>

      <div className='py-3 text-right'>
        <Button
          type='submit'
          classNames='whipik-button whipik-button__primary'
          buttonText={setFormInfo()}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default GenreForm;
