import React, { useContext, useState, useEffect } from 'react';
import { RemoteConfigContext } from './../../../context/RemoteConfigContext';
import { CheckIcon } from '@heroicons/react/solid';
import { StoriesContext } from './../../../context/StoriesContext';
import { characterService } from './../../../services/Character';
import ErrorMessage from './../../shared/error/ErrorMessage';
import { useForm } from 'react-hook-form';
import { notificationHandler } from '../../../libs/util/Notification';
import { processGetSingleStoryAsync } from './../../../store/actions/Stories';

const CharacterForm = ({ actionType, closeCharacterModal, storyId }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { characterColors } = useContext(RemoteConfigContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    state: { characterDetails, singleStory: story },
    dispatch,
  } = useContext(StoriesContext);
  const [selectedColor, setSelectedColor] = useState({});
  const [characterId, setCharacterId] = useState(null);

  useEffect(() => {
    if (characterDetails) {
      const characterColor = characterColors?.find(
        (color) => color?.nameColor === characterDetails.nameColor
      );
      setSelectedColor(characterColor);
      setCharacterId(characterDetails._id);
    }
  }, [characterDetails]);

  const checkMsgColorValidity = (color) => {
    setSelectedColor(color);
    clearErrors(['characterColor']);
  };

  const onSubmit = (data) => {
    if (Object.keys(selectedColor).length === 0) {
      setError('characterColor', {
        type: 'manual',
        message: 'Message color field is required',
      });
      return;
    }

    data.msgColor = selectedColor.msgColor;
    data.nameColor = selectedColor.nameColor;
    data.chatStory = story?.chatStoryId ?? storyId;

    if (actionType === 'edit') {
      data.id = characterId;
      updateCharacterDetails(data);
      return;
    }

    createCharacter(data);
  };

  const updateCharacterDetails = async (payload) => {
    setIsSubmitting(true);
    try {
      const { data } = await characterService.processUpdateCharacter(payload);
      notificationHandler('success', data.message);
      processGetSingleStoryAsync(dispatch, storyId);
      closeCharacterModal();
      document
        .getElementById('characters')
        ?.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
    } catch (error) {
      notificationHandler('error', error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const createCharacter = async (payload) => {
    setIsSubmitting(true);
    try {
      const { data } = await characterService.processCreateCharacter(payload);
      notificationHandler('success', data.message);
      processGetSingleStoryAsync(dispatch, storyId);
      closeCharacterModal();
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
            <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
              Name
            </label>
            <input
              type='text'
              name='name'
              defaultValue={characterDetails?.name}
              id='name'
              {...register('name', { required: true })}
              className='whipik-input'
            />
            {errors['name'] && <ErrorMessage msg='Name field is required' />}
          </div>

          {/* is main character= */}
          <div className='col-span-12'>
            <div className='relative flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='isMainXter'
                  name='isMainXter'
                  defaultChecked={characterDetails?.isMainXter}
                  {...register('isMainXter', { required: false })}
                  type='checkbox'
                  className='focus:ring-orange-500 h-5 w-5 text-orange-600 border-gray-300 rounded'
                />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor='comments' className='font-medium text-gray-700'>
                  Main Character
                </label>
              </div>
            </div>
            {errors['isMainXter'] && <ErrorMessage msg='Main character field is required' />}
          </div>

          {/* message color */}
          <div className='col-span-12'>
            <label htmlFor='first_name' className='block text-sm font-medium text-gray-700 mb-1'>
              Message Color
            </label>
            <div className='flex my-2 flex-wrap relative bg-gray-400 items-center p-3'>
              {characterColors?.map((color) => (
                <div key={color.nameColor} className='h-14 w-16 mr-2 relative bg-gray-400'>
                  <div
                    className='h-full w-full relative cursor-pointer'
                    onClick={() => checkMsgColorValidity(color)}
                    style={{ backgroundColor: color.msgColor }}
                  ></div>
                  {color?.nameColor === selectedColor?.nameColor && (
                    <span style={{ bottom: '25%', left: '25%' }} className='absolute'>
                      <CheckIcon className='h-8 w-8 text-gray-900' />
                    </span>
                  )}
                </div>
              ))}
            </div>
            {errors['characterColor'] && <ErrorMessage msg={errors.characterColor.message} />}
          </div>
        </div>
      </div>

      <div className='pb-3 pt-2 text-right'>
        <button
          type='submit'
          className='whipik-button whipik-button__primary'
          disabled={isSubmitting || !selectedColor?.msgColor}
        >
          {actionType === 'edit' ? 'Update' : 'Okay'}
        </button>
      </div>
    </form>
  );
};

export default CharacterForm;
