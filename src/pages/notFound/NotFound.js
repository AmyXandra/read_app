import React from 'react';
import Button from '../../components/shared/button/Button';
import DefaultLayout from './../../layouts/DefaultLayout';
import { useHistory } from 'react-router-dom';
import { isAuthenticatedUser } from '../../libs/util/Auth';

export default function NotFound() {
  const history = useHistory();
  return (
    <DefaultLayout>
      <div className='flex w-full justify-center mt-16 text-center'>
        <div>
          <h4 className='text-orange-600 mb-1 font-semibold'>404 Error</h4>
          <h2 className='mb-3 text-3xl font-bold'>Page not found</h2>
          <p className='text-gray-600'>Sorry, we couldn't find the page you're looking for</p>
          <Button
            buttonText='Go back home'
            clicked={() =>
              isAuthenticatedUser() ? history.push('/my-stories') : history.push('/')
            }
            type='button'
            classNames='whipik-button whipik-button__primary mt-3'
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
