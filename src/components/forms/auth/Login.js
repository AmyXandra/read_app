import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from './../../shared/error/ErrorMessage';
import { useForm } from 'react-hook-form';
import { AuthContext } from './../../../context/AuthContext';
import { processLoginAsync } from '../../../store/actions/Auth';
import { notificationHandler } from './../../../libs/util/Notification';

const LoginForm = () => {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.provider = 'email';
    try {
      const response = await processLoginAsync(dispatch, data);
      notificationHandler('success', response.message);
      setTimeout(() => {
        history.push('/my-stories');
      }, 300);
    } catch (error) {
      notificationHandler('error', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>Email address</label>
        <div className='mt-1'>
          <input
            id='email'
            type='email'
            {...register('email', { required: true })}
            className='whipik-input'
          />
          {errors['email'] && <ErrorMessage msg='Email field is required' />}
        </div>
      </div>

      <div className='space-y-1'>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
          Password
        </label>
        <div className='mt-1'>
          <input
            id='password'
            type='password'
            {...register('password', { required: true })}
            className='whipik-input'
          />
          {errors['password'] && <ErrorMessage msg='Password field is required' />}
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <input
            id='remember_me'
            name='remember_me'
            type='checkbox'
            className='h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded'
          />
          <label htmlFor='remember_me' className='ml-2 block text-sm text-gray-900'>
            Remember me
          </label>
        </div>

        <div className='text-sm'>
          <a href='#' className='font-medium text-orange-600 hover:text-orange-500'>
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type='submit'
          disabled={isSubmitting}
          className='whipik-button whipik-button__primary w-full'
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
