import React, { useEffect, useState } from 'react';
import { ExclamationIcon } from '@heroicons/react/solid';
import { useLocation } from 'react-router-dom';
import AuthLogo from '../assets/images/whipik-logo.png';
import SocialAuth from './../components/forms/auth/SocialAuth';

export default function AuthLayout({ children, title, caption, authType }) {
  const location = useLocation();
  const [sessionExpired, setSessionExpired] = useState(false);
  const useQuery = () => {
    return new URLSearchParams(location.search).get('session');
  };
  useEffect(() => {
    if (useQuery() === 'expired') {
      setSessionExpired(true);
    }
  }, [useQuery()]);

  useEffect(() => {
    if (sessionExpired) {
      setTimeout(() => {
        setSessionExpired(false);
      }, 4000);
    }
  }, [sessionExpired]);

  return (
    <div className='min-h-screen bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 lg:w-1/2'>
        {/* form */}
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img className='h-auto w-20' src={AuthLogo} alt='whipik' />
            {sessionExpired && (
              <div className='bg-blue-50 border-l-4 border-blue-400 p-4 mt-4'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <ExclamationIcon className='h-5 w-5 text-blue-400' aria-hidden='true' />
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm text-blue-700'>
                      You session has expired,{' '}
                      <span className='font-medium'>kindly login again to continue</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
            <h2 className='mt-6 text-3xl font-extrabold text-gray-700'>{title}</h2>
            <p className='mt-2 text-sm text-gray-600'>{caption}</p>
          </div>

          <SocialAuth authType={authType} />

          <div className='mt-8'>
            <div>
              <div className='mt-6 relative'>
                <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                  <div className='w-full border-t border-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                </div>
              </div>
            </div>

            <div className='mt-6'>{children}</div>
          </div>
        </div>
      </div>

      {/* image */}
      <div className='hidden lg:block relative w-0 flex-1'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src='https://images.unsplash.com/photo-1523043829291-4195e5c69656?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
          alt=''
        />
      </div>
    </div>
  );
}
