import React from 'react';
import SocialAuth from '../../../../components/forms/auth/SocialAuth';
import { LOGINMODAL } from '../../images/index';
import AuthLogo from '../../../../assets/images/whipik-logo.png';
import AppleIcon from '../../../../assets/images/apple-icon.png';
import GoogleIcon from '../../../../assets/images/google-icon.png';
import { XIcon } from '@heroicons/react/outline';
// import { useHistory } from "react-router-dom";

const LoginModal = ({ rootModalIsOpen, setRootModalIsOpen, setRootModalIsClosed, title }) => {
  // let history = useHistory();
  return (
    <div>
      <button
        onClick={setRootModalIsOpen}
        className='py-2 px-5 font-medium text-white bg-primary rounded hover:bg-primary transition duration-300'
      >
        Login
      </button>
      {rootModalIsOpen && (
        <div className='flex justify-center items-center fixed w-100 h-100 inset-0 z-10 bg-black bg-opacity-50'>
          <div
            className='relative w-full h-full sm:h-auto sm:w-3/4 md:w-9/12 md:mx-5 bg-white shadow-md flex flex-col md:flex-row items-center items-stretch rounded'
            style={{ maxWidth: '745px' }}
          >
            <div
              className='hidden md:block w-2/6 bg-no-repeat bg-cover bg-center'
              style={{ backgroundImage: `url(${LOGINMODAL})` }}
            />

            <div className='sm:block absolute top-0 right-0 pt-4 pr-4'>
              <button
                type='button'
                className='hover:outline-none focus:outline-none outline-none'
                onClick={setRootModalIsClosed}
              >
                <span className='sr-only'>Close</span>
                <XIcon className='h-6 w-6 text-black' aria-hidden='true' />
              </button>
            </div>

            <div className='w-full md:w-8/12 flex flex-col bg-white px-6 lg:px-8'>
              <div className='p-2'>
                <div className='flex justify-center md:justify-start mb-6'>
                  <img src={AuthLogo} className='block h-auto md:w-16 w-36' alt='logo' />
                </div>

                <div className='max-w-xs mx-auto'>
                  <h4 className='mb-2'>Welcome,</h4>
                  <h3 className='mb-4 font-bold text-2xl text-left flex text-black mb-3'>
                    {title}
                  </h3>

                  <SocialAuth />

                  <div className='mt-10 flex justify-between'>
                    <p className='text-black'>Download the free app today</p>
                    <div className='flex justify-between self-stretch'>
                      <a
                        href='https://apps.apple.com/us/app/whipik-stories/id1539338341'
                        target='_blank'
                        rel='noreferrer'
                      >
                        <img className='w-8 mr-3' src={AppleIcon} alt='AppleIcon' />
                      </a>
                      <a
                        href='https://play.google.com/store/apps/details?id=com.whipiktales'
                        target='_blank'
                        rel='noreferrer'
                      >
                        <img className='w-8' src={GoogleIcon} alt='GoogleIcon' />
                      </a>
                    </div>
                  </div>
                  <div className='my-10'>
                    <div className='italic text-xs' style={{ color: 'rgba(41, 53, 64, 0.75)' }}>
                      By continuing, you agree to Whipik’s{' '}
                      <a
                        href='https://www.whipik.com/terms-conditions'
                        className='underline font-semibold'
                      >
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a
                        href='https://www.whipik.com/privacy-policy'
                        className='underline font-semibold'
                      >
                        Privacy Policy.
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
