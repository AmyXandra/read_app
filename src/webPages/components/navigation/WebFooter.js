import React from 'react';
import AuthLogo from '../../../assets/images/whipik-logo.png';
import ApplePlay from '../../../assets/images/apple-play.jpg';
import GooglePlay from '../../../assets/images/google-play.jpg';

export default function WebFooter() {
  return (
    <div style={{ background: '#F9FAFB' }}>
      <div className='w-80 sm:w-96 mx-auto py-16 px-4'>
        <h2 className='text-2xl text-black text-center'>
          <span className='text-primary font-bold mr-2'>Download the app</span>
          for a more immersive experience.
        </h2>
        <div className='flex justify-between mt-10'>
          <a
            href='https://play.google.com/store/apps/details?id=com.whipiktales'
            target='_blank'
            rel='noreferrer'
          >
            <img className='w-32 sm:w-40' src={GooglePlay} alt='GooglePlay' />
          </a>
          <a
            href='https://apps.apple.com/us/app/whipik-stories/id1539338341'
            target='_blank'
            rel='noreferrer'
          >
            <img className='w-32 sm:w-40' src={ApplePlay} alt='ApplePlay' />
          </a>
        </div>
      </div>
      <footer className='footer bg-secondary relative pt-1 px-4'>
        <div className='container max-w-7xl mx-auto py-6'>
          <div className='sm:flex sm:mt-8'>
            <div className='mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between'>
              <div className='flex flex-col'>
                <span className='my-2'>
                  <a href='' target='_blank'>
                    <img className='block h-auto w-16' src={AuthLogo} alt='Logo' />
                  </a>
                </span>
                <span className='my-2 text-white text-md'> © 2021 Whipik.co </span>
              </div>
              <div className='flex flex-col'>
                <span className='my-2'>
                  <a
                    href='https://www.whipik.com/about'
                    className='text-white text-md hover:text-primary'
                  >
                    About
                  </a>
                </span>
                <span className='my-2'>
                  <a
                    href='https://www.whipik.com/for-writers'
                    className='text-white  text-md hover:text-primary'
                  >
                    For Writers
                  </a>
                </span>
                <span className='my-2'>
                  <a
                    href='https://www.whipik.com/content-policy'
                    className='text-white text-md hover:text-primary'
                  >
                    Content Policy
                  </a>
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='my-2'>
                  <a
                    href='https://www.whipik.com/privacy-policy'
                    className='text-white  text-md hover:text-primary'
                  >
                    Privacy Policy
                  </a>
                </span>
                <span className='my-2'>
                  <a
                    href='https://www.whipik.com/terms-conditions'
                    className='text-white  text-md hover:text-primary'
                  >
                    Terms & Conditions
                  </a>
                </span>
              </div>
              <div className='flex'>
                <span className='my-2'>
                  <a
                    href='https://www.instagram.com/whipik'
                    target='_blank'
                    rel='noreferrer'
                    className='text-white mr-5 social_icons text-md hover:text-primary'
                  >
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M13.75 2.5H6.25C4.17893 2.5 2.5 4.17893 2.5 6.25V13.75C2.5 15.8211 4.17893 17.5 6.25 17.5H13.75C15.8211 17.5 17.5 15.8211 17.5 13.75V6.25C17.5 4.17893 15.8211 2.5 13.75 2.5Z'
                        stroke='#FDF1ED'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M13 9.52693C13.0926 10.1511 12.986 10.7886 12.6953 11.3487C12.4047 11.9088 11.9449 12.363 11.3812 12.6467C10.8176 12.9304 10.1789 13.0291 9.55586 12.9289C8.93287 12.8286 8.35734 12.5345 7.91115 12.0883C7.46496 11.6421 7.17082 11.0666 7.07058 10.4436C6.97033 9.8206 7.06907 9.18185 7.35277 8.61821C7.63646 8.05457 8.09066 7.59474 8.65076 7.30411C9.21086 7.01349 9.84834 6.90687 10.4725 6.99943C11.1092 7.09385 11.6987 7.39053 12.1538 7.84566C12.6089 8.30079 12.9056 8.89024 13 9.52693Z'
                        stroke='#FDF1ED'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M14.125 5.87518H14.1319'
                        stroke='#FDF1ED'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </a>
                </span>
                <span className='my-2'>
                  <a
                    href='https://twitter.com/whipikstories'
                    className='text-white mr-5 text-md hover:text-primary social_icons'
                  >
                    <svg
                      width={20}
                      height={20}
                      viewBox='0 0 20 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M18.3333 3.34079C17.6078 3.84271 16.8046 4.2266 15.9545 4.47768C15.4982 3.96311 14.8919 3.5984 14.2174 3.43287C13.5429 3.26734 12.8329 3.30898 12.1834 3.55215C11.5338 3.79533 10.9761 4.2283 10.5856 4.79252C10.1951 5.35675 9.99064 6.02499 9.99996 6.70687V7.44994C8.66862 7.4838 7.34941 7.19418 6.15981 6.60689C4.97022 6.0196 3.94717 5.153 3.18178 4.084C3.18178 4.084 0.151474 10.7714 6.96966 13.7437C5.40945 14.7825 3.55084 15.3033 1.66663 15.2298C8.48481 18.9452 16.8181 15.2298 16.8181 6.68458C16.8174 6.4776 16.7972 6.27113 16.7575 6.06784C17.5307 5.31994 18.0763 4.37566 18.3333 3.34079Z'
                        stroke='#FDF1ED'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </a>
                </span>
                <span className='my-2'>
                  <a href='#' className='text-white  text-md hover:text-primary social_icons'>
                    <svg
                      width={20}
                      height={20}
                      viewBox='0 0 20 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M15 1.66669H12.5C11.395 1.66669 10.3352 2.10567 9.55376 2.88708C8.77236 3.66848 8.33337 4.72829 8.33337 5.83335V8.33335H5.83337V11.6667H8.33337V18.3334H11.6667V11.6667H14.1667L15 8.33335H11.6667V5.83335C11.6667 5.61234 11.7545 5.40038 11.9108 5.2441C12.0671 5.08782 12.279 5.00002 12.5 5.00002H15V1.66669Z'
                        stroke='#FDF1ED'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
