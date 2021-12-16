import React from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import moment from 'moment';

export default function BrowseStoriesHero({ coverStory }) {
  return (
    <div
      className='bg-cover bg-center'
      style={{ backgroundImage: `url(${coverStory.coverImage})` }}
    >
      <div className='bg-opacity-75 pb-12 pt-16 md:pb-16 md:pt-24 story-hero'>
        <div className='max-w-7xl mx-auto px-4'>
          <h1 className='text-4xl text-white font-bold py-5'>{coverStory.title}</h1>
          <h4 className='text-white'>
            <span className='underline mr-2'>{coverStory.genre.name}</span>
            {'.'}
            <span className='ml-2'>{moment(coverStory.readTime).toObject().minutes} mins read</span>
          </h4>
          <a
            href={`/story-detail/${coverStory._id}`}
            className='inline-block bg-primary rounded px-5 py-2 my-4 text-white'
          >
            Read
          </a>
          <div className='flex items-center justify-between mt-4'>
            <div className='flex items-center'>
              <img
                className='w-12 h-12 rounded-full mr-4'
                src={coverStory.author.avatar}
                alt='Author avatar'
              />
              <div className='text-sm'>
                <p className='mb-2 text-white'>
                  <span>@</span>
                  {coverStory.author.username}
                </p>
                <h3 className='leading-none mb-1 font-semibold text-white'>
                  {coverStory.author.name}
                </h3>
              </div>
            </div>
            <div>
              <div className='flex justify-end text-sm text-gray-600 items-center w-52'>
                <div className='flex mr-8 text-white'>
                  <span className='mr-2'>
                    <HeartIcon className='h-6 w-6 text-primary' />
                  </span>
                  {coverStory.readCount}
                </div>
                <div className='flex text-white'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='mr-2'
                  >
                    <path
                      d='M13.4297 9.86719C12.8883 9.86719 12.4688 10.2867 12.4688 10.8047C12.4688 11.3227 12.8883 11.7422 13.4297 11.7422C13.9242 11.7422 14.3438 11.3227 14.3438 10.8047C14.3438 10.2867 13.9242 9.86719 13.4297 9.86719ZM6.86719 9.86719C6.32578 9.86719 5.90625 10.2867 5.90625 10.8047C5.90625 11.3227 6.32578 11.7422 6.86719 11.7422C7.36172 11.7422 7.78125 11.3227 7.78125 10.8047C7.78125 10.2867 7.36172 9.86719 6.86719 9.86719Z'
                      fill='#FF5841'
                    />
                    <path
                      d='M20.9528 8.08601C19.8255 6.53913 18.2505 5.50554 16.5231 5.03913V5.04148C16.1223 4.59617 15.67 4.18601 15.1637 3.82038C11.327 1.03132 5.94109 1.8821 3.14031 5.71882C0.883281 8.83601 0.979375 13.029 3.28094 16.0079L3.29969 19.1157C3.29969 19.1907 3.31141 19.2657 3.33484 19.336C3.45906 19.7321 3.88094 19.9501 4.27469 19.8259L7.24187 18.8907C8.02703 19.1696 8.83797 19.329 9.64422 19.3735L9.6325 19.3829C11.7208 20.904 14.4583 21.361 16.9684 20.5313L19.9473 21.5016C20.0223 21.5251 20.0997 21.5391 20.1794 21.5391C20.5942 21.5391 20.9294 21.204 20.9294 20.7891V17.6485C22.9942 14.8454 23.0481 10.9712 20.9528 8.08601ZM7.57 17.2266L7.28875 17.1094L4.96844 17.836L4.945 15.3985L4.7575 15.1876C2.77469 12.7688 2.64344 9.28367 4.49969 6.72663C6.75906 3.6282 11.0903 2.94382 14.1794 5.17976C17.2778 7.4321 17.9645 11.7563 15.7262 14.836C13.8489 17.4118 10.488 18.3634 7.57 17.2266ZM19.4059 16.8282L19.2184 17.0626L19.2419 19.5001L16.945 18.7266L16.6637 18.8438C15.3512 19.3313 13.952 19.3712 12.6559 19.0079L12.6512 19.0055C14.3833 18.4735 15.9536 17.3954 17.0856 15.8438C18.8762 13.3759 19.1669 10.2751 18.1262 7.63132L18.1403 7.6407C18.6794 8.02742 19.1739 8.51023 19.5934 9.09382C21.295 11.4282 21.1989 14.6063 19.4059 16.8282Z'
                      fill='#FF5841'
                    />
                    <path
                      d='M10.1484 9.86719C9.60703 9.86719 9.1875 10.2867 9.1875 10.8047C9.1875 11.3227 9.60703 11.7422 10.1484 11.7422C10.643 11.7422 11.0625 11.3227 11.0625 10.8047C11.0625 10.2867 10.643 9.86719 10.1484 9.86719Z'
                      fill='#FF5841'
                    />
                  </svg>
                  {coverStory.commentCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
