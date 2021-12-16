import React from 'react';
import AuthLogo from '../../../../assets/images/whipik-logo.png';
import { HeartIcon } from '@heroicons/react/outline';

const singleComment = ({ data }) => {
  const getInitials = (name) => {
    let initials = name.split(' ');
    if (initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
      initials = name.substring(0, 2);
    }
    return initials.toUpperCase();
  };
  return (
    <div className='flex justify-between py-4'>
      <div className='flex'>
        <div className='e'>
          {data.user.img ? (
            <img className='w-12 h-12 rounded-full mr-4' src={AuthLogo} alt='avatar' />
          ) : (
            <div className='w-12 h-12 rounded-full mr-4 bg-secondary flex items-center justify-center'>
              <span className='text-white text-center text-xl'>
                {getInitials(data?.user?.name)}
              </span>
            </div>
          )}
        </div>
        <div className='e'>
          <div className='flex flex-col justify-between'>
            <p className='mb-2 text-sm text-gray-500'>@{data?.user?.name}</p>
            <p className='mb-2 text-base'>{data.comment}</p>
            <div className='flex mb-2'>
              <p className='mr-4 text-sm text-gray-500'>{data.createdAt}</p>
              <button className='text-sm text-gray-500 flex items-center'>
                <svg
                  width={12}
                  height={11}
                  viewBox='0 0 12 11'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-1'
                >
                  <path
                    opacity='0.2'
                    d='M4.66667 3.16667V0.5L0 5.16667L4.66667 9.83333V7.1C8 7.1 10.3333 8.16667 12 10.5C11.3333 7.16667 9.33333 3.83333 4.66667 3.16667Z'
                    fill='#212D40'
                  />
                </svg>
                Reply
              </button>
            </div>
            {data.replyCount > 0 && (
              <p className='text-gray-500'>View replies ({data.replyCount})</p>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <HeartIcon className='h-6 w-6 text-primary' />
        <span>{data.likeCount}</span>
      </div>
    </div>
  );
};

export default singleComment;
