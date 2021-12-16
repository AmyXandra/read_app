import React from 'react';
/* This example requires Tailwind CSS v2.0+ */
const stats = [
  { name: 'Total Writers', stat: '71,897' },
  { name: 'Total Stories', stat: '58.16' },
  { name: 'Total Chapters', stat: '24.57' },
];

export default function Genres() {
  return (
    <div className='mb-16'>
      <h3 className='text-lg leading-6 font-medium text-gray-900'>Analytics</h3>
      <dl className='mt-5 grid grid-cols-1 sm:grid-cols-3'>
        {stats.map((item) => (
          <div key={item.name} className='px-4 py-5 bg-white shadow overflow-hidden sm:p-6'>
            <dt className='text-sm font-medium text-gray-500 truncate'>{item.name}</dt>
            <dd className='mt-1 text-3xl font-semibold text-gray-900'>{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
