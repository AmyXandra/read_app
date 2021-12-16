import React from 'react';

export default function UserProfileImage({ data }) {
  const getInitials = (name) => {
    let initials = name && name.split(' ');
    if (initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
      initials = name.substring(0, 2);
    }
    return initials.toUpperCase();
    // return name;
  };

  return (
    <div className='e'>
      {data?.avatar ? (
        <img className='w-12 h-12 rounded-full mr-2' src={data?.avatar} alt='avatar' />
      ) : (
        <div className='w-12 h-12 rounded-full mr-2 bg-secondary flex items-center justify-center'>
          <span className='text-white text-center text-xl'> {getInitials(data?.name)} </span>
        </div>
      )}
    </div>
  );
}
