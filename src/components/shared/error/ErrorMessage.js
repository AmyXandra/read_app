import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/solid';

const ErrorMessage = ({ msg }) => {
  return (
    <small className='text-sm text-orange-500 flex items-center mt-2'>
      <InformationCircleIcon className='h-4 w-4 fill-current' /> {msg}
    </small>
  );
};

export default ErrorMessage;
