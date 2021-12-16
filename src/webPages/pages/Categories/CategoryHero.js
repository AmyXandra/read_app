import React from 'react';

export default function CategoryHero({ coverStory }) {
  return (
    <div className='bg-cover bg-center' style={{ backgroundImage: `url(${coverStory.image})` }}>
      <div className='pb-8 pt-16 sm:pb-16 sm:pt-24 story-hero px-4'>
        <div className=' max-w-7xl mx-auto px-4'>
          <h1 className='text-4xl text-white font-bold pt-5'>{coverStory.name}</h1>
          <p className='text-xl text-white py-3 sm:py-4'>{coverStory.description}</p>
        </div>
      </div>
    </div>
  );
}
