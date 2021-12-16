import React from 'react';
import AvatarBg from '../../assets/images/user-avatar-bg.jpg';

const ProfileAvi = ({ user }) => {
  return (
    <div>
      <img src={AvatarBg} className='w-full h-28 rounded-xl object-cover' />
      <div className='bg-white h-28 w-28 rounded-full border border-white flex items-center justify-center mx-auto -mt-20 z-10 relative mb-2 p-1'>
        {user?.avatar ? (
          <img
            className='inline-flex items-center justify-center h-full w-full rounded-full p-1'
            src={user?.avatar}
          />
        ) : (
          <span className='inline-flex items-center justify-center w-full h-full rounded-full bg-gray-500 p-1 text-white'>
            <span className='text-3xl font-medium leading-none capitalize'>
              {user?.name.charAt(0)}
            </span>
          </span>
        )}
      </div>
      <div className='text-center'>
        <h4 className='text-gray-900 font-semibold text-2xl leading-none'>{user?.name}</h4>
        <h4 className='text-gray-400 font-normal text-base mb-1'>
          @{user?.username ?? user?.name}
        </h4>
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize bg-green-200 text-green-800'>
          {user?.status}
        </span>
      </div>
    </div>
  );
};

export default ProfileAvi;
