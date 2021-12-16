import React from 'react';
import Moment from 'react-moment';
const ProfileInfo = ({ user }) => {
  return (
    <ul className='-my-5 divide-y divide-gray-200 bg-white shadow rounded border border-gray-200'>
      <li className='py-4 p-3 border-b border-gray-200'>
        <p className='text-base font-medium text-gray-900'>Profile Info</p>
      </li>
      <li className='py-4 p-3'>
        <div className='flex items-center space-x-4'>
          <div className='flex-1 min-w-0'>
            <p className='text-base text-gray-500'>Name</p>
          </div>
          <div>
            <p className='text-base text-gray-700 font-medium'>{user?.name}</p>
          </div>
        </div>
      </li>
      <li className='py-4 p-3'>
        <div className='flex items-center space-x-4'>
          <div className='flex-1 min-w-0'>
            <p className='text-base text-gray-500'>Provider</p>
          </div>
          <div>
            <p className='text-base font-medium text-gray-700 capitalize'>{user?.provider}</p>
          </div>
        </div>
      </li>
      <li className='py-4 p-3'>
        <div className='flex items-center space-x-4'>
          <div className='flex-1 min-w-0'>
            <p className='text-base text-gray-500'>Joined</p>
          </div>
          <div>
            <p className='text-base text-gray-700 font-medium'>
              <Moment format='MMMM YYYY'>{user.createdAt}</Moment>
            </p>
          </div>
        </div>
      </li>
      <li className='py-4 p-3'>
        <div className='flex space-y-2 flex-col'>
          <div className='flex-1 min-w-0'>
            <p className='text-base font-medium text-gray-500'>Roles</p>
          </div>
          <div>
            {user?.roles.length > 0 ? (
              user.roles.map((role) => (
                <span
                  className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-200 text-orange-700 mr-2'
                  key={role}
                >
                  {role}
                </span>
              ))
            ) : (
              <p className='text-base text-gray-900 font-medium'>No role selected</p>
            )}
          </div>
        </div>
      </li>
      <li className='py-4 p-3'>
        <div className='flex space-y-2 flex-col'>
          <div className='flex-1 min-w-0'>
            <p className='text-base text-gray-500'>About</p>
          </div>
          <div>
            <p className='text-base text-gray-900 font-medium'>{user?.about ?? 'No Info'}</p>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default ProfileInfo;
