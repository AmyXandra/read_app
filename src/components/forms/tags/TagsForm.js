import React from 'react';
import ErrorMessage from './../../../components/shared/error/ErrorMessage';
import { useForm } from 'react-hook-form';
import { tagsService } from './../../../services/Tags';
import { notificationHandler } from './../../../libs/util/Notification';

const TagsForm = ({ actionType, updateTagsTable, tagInfo }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: tagInfo?.name ?? '',
    },
  });

  const onSubmit = async (data) => {
    try {
      if (actionType === 'create') {
        const response = await tagsService.processCreateTag(data);
        notificationHandler('success', response.data.message);
      } else {
        const response = await tagsService.processUpdateTag({ ...data, id: tagInfo._id });
        notificationHandler('success', response.data.message);
      }
      updateTagsTable();
      setValue('name', '');
    } catch (error) {
      notificationHandler('error', error.response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='block text-sm font-medium text-gray-700'>Tag Name</label>
        <div className='mt-1'>
          <input type='text' {...register('name', { required: true })} className='whipik-input' />
          {errors['name'] && <ErrorMessage msg='Tag name field is required' />}
        </div>
      </div>
      <div className='mt-4'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='whipik-button whipik-button__primary'
        >
          {actionType === 'create' ? 'Create' : 'Update'} Tag
        </button>
      </div>
    </form>
  );
};

export default TagsForm;
