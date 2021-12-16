import React, { useState, useRef } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import ErrorMessage from './../../shared/error/ErrorMessage';
import {
  CoverPhotoDefault,
  NormalTextIcon,
  ThinkingIcon,
  DeleteIcon,
  NarrationIcon,
} from './../../vectors/Vectors';
import ChatMessageTypeSelect from './../../chatStory/ChatMessageTypeSelect';

const messageTypesArray = [
  {
    id: 1,
    text: 'dialogue',
    icon: <NormalTextIcon />,
  },
  {
    id: 2,
    text: 'thought',
    icon: <ThinkingIcon />,
  },
  {
    id: 3,
    text: 'deleted',
    icon: <DeleteIcon />,
  },
  {
    id: 5,
    text: 'narration',
    icon: <NarrationIcon />,
  },
];

const AddMediaMessage = (props) => {
  const [imageURL, setImageURL] = useState('');
  const imageUpload = useRef(null);
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
      image: props.currentImage ?? '',
    },
  });
  const showImageUrl = watch('image');

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
    props.updateImageField(base64Image);
  };

  const onSubmit = () => {
    props.messageActionType === 'create' ? props.createChatMessage() : props.editChatMessage();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '480px' }}>
      <div className='w-2/5 mb-4'>
        <ChatMessageTypeSelect
          selectMessageType={props.selectMessageType}
          messageTypeSelected={props.messageTypeSelected}
          messageTypeSelectDisabled={props.messageTypeSelectDisabled}
          placement='bottom'
          messageTypes={messageTypesArray}
        />
      </div>
      {console.log(props)}
      {imageURL.length > 0 || showImageUrl?.length > 0 ? (
        <div className='relative w-full'>
          <img src={imageURL || getValues('image')} className='h-44 object-cover w-full' />
          <button
            onClick={() => {
              setImageURL('');
              setValue('image', null);
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
          <label className='block text-sm font-medium text-gray-700'>Image</label>
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
                    {...register('image', {
                      required: true,
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
          {checkFieldError('image', 'Please Upload an image')}
        </>
      )}
      <div className='w-full text-center'>
        <button
          type='submit'
          className='whipik-button whipik-button__primary mt-4'
          disabled={props.isCreating}
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default AddMediaMessage;
