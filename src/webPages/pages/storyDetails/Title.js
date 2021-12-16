import React, { useContext } from 'react';
import { StoriesContext } from '../../../context/StoriesContext';
import moment from 'moment';
import { HeartIcon } from '@heroicons/react/outline';
import UserProfileImage from '../../components/UserProfileImage';
import { Helmet } from 'react-helmet';

export default function Title() {
  const { state } = useContext(StoriesContext);
  const story = state.singleStory;
  console.log('story', story);

  return (
    <>
      <Helmet>
        <title>{`${story?.title} | Whipik`}</title>
        <meta name='description' content={story?.synopsis} />
        <meta itemProp='image' content={story?.coverImage} />
        <meta property='og:description' content={story?.synopsis} />
        <meta property='og:image' content={story?.coverImage} />
        H1 = {story?.title}
      </Helmet>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row px-5 sm:py-12 sm:gap-x-10'>
        <div
          className='bg-cover text-center story-title-img hidden md:block md:w-full'
          style={{ backgroundImage: `url(${story?.coverImage})`, minHeight: '366px' }}
          title='Story cover image'
        ></div>

        {/* Show image, author, genre and story title in mobile */}
        <div className='flex w-full h-full gap-x-4 md:gap-x-0 md:hidden mb-5 pt-4'>
          <div
            className='bg-cover text-center story-title-img w-32 flex-shrink-0 flex-grow-0'
            style={{ backgroundImage: `url(${story?.coverImage})` }}
            title='Story cover image'
          ></div>

          <div>
            <div className='flex mb-4 items-center'>
              {story?.author && <UserProfileImage data={story?.author} />}
              <div>
                <h3 className='text-gray-900 leading-none font-semibold'> {story?.author?.name}</h3>
                <p className='text-gray-600'>
                  <span>@</span>
                  {story?.author?.username}
                </p>
              </div>
            </div>
            <div className='text-gray-900 font-bold text-xl mb-4'>
              <h1>{story && story.title}</h1>
            </div>
            <div className='text-gray-600 flex items-center mb-4'>
              <div>{story?.genre?.name}</div>
              <div className='ml-3 flex items-center'>
                <svg
                  width={8}
                  height={9}
                  viewBox='0 0 8 9'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-2'
                >
                  <circle opacity='0.7' cx={4} cy='4.5' r={4} fill='#212D40' />
                </svg>
                {moment(story && story.readTime).toObject().minutes}
                <span className='ml-1'>mins read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Show synopsis, tags and story count in mobile view */}
        <div className='md:hidden mb-10'>
          <p className='text-gray-700 text-base'>{story && story.synopsis}</p>
          <div className='flex my-4'>
            {Array.isArray(story?.tags) &&
              story?.tags.length > 0 &&
              story.tags.map(function (tag, index) {
                return (
                  <span
                    key={index}
                    className='bg-black bg-opacity-10 text-sm text-black mr-2 rounded-3xl p-1 px-3'
                  >
                    {tag.name}
                  </span>
                );
              })}
          </div>
          <div className='grid grid-cols-3 text-sm text-gray-600 items-center w-72'>
            <div className='flex'>
              <svg
                width='24'
                height='18'
                viewBox='0 0 24 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mr-2'
              >
                <path
                  d='M23.855 8.39028C21.5954 3.97151 17.1221 0.981812 12 0.981812C6.87789 0.981812 2.40331 3.9736 0.144977 8.39069C0.0496613 8.57967 0 8.78845 0 9.0002C0 9.21195 0.0496613 9.42073 0.144977 9.60971C2.40456 14.0285 6.87789 17.0182 12 17.0182C17.1221 17.0182 21.5966 14.0264 23.855 9.60929C23.9503 9.42032 24 9.21153 24 8.99978C24 8.78803 23.9503 8.57925 23.855 8.39028ZM12 15.0136C10.8133 15.0136 9.65325 14.6609 8.66655 14.0001C7.67986 13.3394 6.91082 12.4002 6.4567 11.3013C6.00257 10.2025 5.88375 8.99332 6.11526 7.82679C6.34678 6.66026 6.91822 5.58873 7.75734 4.74771C8.59645 3.90669 9.66555 3.33394 10.8294 3.10191C11.9933 2.86987 13.1997 2.98896 14.2961 3.44412C15.3924 3.89928 16.3295 4.67006 16.9888 5.659C17.6481 6.64793 18 7.81061 18 8.99999C18.0004 9.78982 17.8454 10.572 17.544 11.3018C17.2426 12.0315 16.8007 12.6946 16.2435 13.2531C15.6862 13.8116 15.0247 14.2546 14.2965 14.5567C13.5684 14.8587 12.788 15.014 12 15.0136ZM12 4.9909C11.6429 4.9959 11.2882 5.04914 10.9454 5.14918C11.228 5.53408 11.3636 6.00774 11.3276 6.48426C11.2917 6.96079 11.0865 7.40861 10.7493 7.74652C10.4122 8.08444 9.96539 8.29007 9.48995 8.32611C9.01451 8.36216 8.54192 8.22625 8.15789 7.94301C7.93921 8.7505 7.97869 9.6064 8.27076 10.3902C8.56283 11.1741 9.0928 11.8464 9.78606 12.3125C10.4793 12.7786 11.301 13.0151 12.1354 12.9887C12.9698 12.9623 13.7749 12.6743 14.4374 12.1652C15.1 11.6562 15.5865 10.9517 15.8287 10.1509C16.0708 9.35019 16.0563 8.4935 15.7872 7.70145C15.5181 6.9094 15.0079 6.22188 14.3286 5.73564C13.6492 5.2494 12.8348 4.98893 12 4.9909Z'
                  fill='#FF5841'
                />
              </svg>
              {story?.readCount}
            </div>
            <div className='flex'>
              <span className='mr-2'>
                <HeartIcon className='h-6 w-6 text-primary' />
              </span>
              {story && story.likeCount}
            </div>
            <div className='flex'>
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
                  fill='#212D40'
                />
                <path
                  d='M20.9528 8.08601C19.8255 6.53913 18.2505 5.50554 16.5231 5.03913V5.04148C16.1223 4.59617 15.67 4.18601 15.1637 3.82038C11.327 1.03132 5.94109 1.8821 3.14031 5.71882C0.883281 8.83601 0.979375 13.029 3.28094 16.0079L3.29969 19.1157C3.29969 19.1907 3.31141 19.2657 3.33484 19.336C3.45906 19.7321 3.88094 19.9501 4.27469 19.8259L7.24187 18.8907C8.02703 19.1696 8.83797 19.329 9.64422 19.3735L9.6325 19.3829C11.7208 20.904 14.4583 21.361 16.9684 20.5313L19.9473 21.5016C20.0223 21.5251 20.0997 21.5391 20.1794 21.5391C20.5942 21.5391 20.9294 21.204 20.9294 20.7891V17.6485C22.9942 14.8454 23.0481 10.9712 20.9528 8.08601ZM7.57 17.2266L7.28875 17.1094L4.96844 17.836L4.945 15.3985L4.7575 15.1876C2.77469 12.7688 2.64344 9.28367 4.49969 6.72663C6.75906 3.6282 11.0903 2.94382 14.1794 5.17976C17.2778 7.4321 17.9645 11.7563 15.7262 14.836C13.8489 17.4118 10.488 18.3634 7.57 17.2266ZM19.4059 16.8282L19.2184 17.0626L19.2419 19.5001L16.945 18.7266L16.6637 18.8438C15.3512 19.3313 13.952 19.3712 12.6559 19.0079L12.6512 19.0055C14.3833 18.4735 15.9536 17.3954 17.0856 15.8438C18.8762 13.3759 19.1669 10.2751 18.1262 7.63132L18.1403 7.6407C18.6794 8.02742 19.1739 8.51023 19.5934 9.09382C21.295 11.4282 21.1989 14.6063 19.4059 16.8282Z'
                  fill='#212D40'
                />
                <path
                  d='M10.1484 9.86719C9.60703 9.86719 9.1875 10.2867 9.1875 10.8047C9.1875 11.3227 9.60703 11.7422 10.1484 11.7422C10.643 11.7422 11.0625 11.3227 11.0625 10.8047C11.0625 10.2867 10.643 9.86719 10.1484 9.86719Z'
                  fill='#212D40'
                />
              </svg>
              {story && story.commentCount}
            </div>
          </div>
        </div>

        {/* Show synopsis, tags and story count in web view */}
        <div className='hidden md:block w-5/12 rounded-b lg:rounded-b-none lg:rounded-r py-4 flex flex-col leading-normal'>
          <div className='flex items-center'>
            {story?.author && <UserProfileImage data={story.author} />}
            <div className='text-sm'>
              <h3 className='text-gray-900 leading-none mb-1 font-semibold'>
                {story?.author?.name}
              </h3>
              <p className='text-gray-600'>
                <span>@</span>
                {story?.author?.username}
              </p>
            </div>
          </div>
          <div className='mt-8 mb-4'>
            <div className='text-gray-900 font-bold text-xl mb-4'>
              <h1>{story && story.title}</h1>
            </div>
            <div className='text-sm text-gray-600 flex items-center mb-4'>
              <div>{story?.genre?.name}</div>
              <div className='ml-3 flex items-center'>
                <svg
                  width={8}
                  height={9}
                  viewBox='0 0 8 9'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-2'
                >
                  <circle opacity='0.7' cx={4} cy='4.5' r={4} fill='#212D40' />
                </svg>
                {moment(story && story.readTime).toObject().minutes}
                <span className='ml-1'>mins read</span>
              </div>
            </div>
            <p className='text-gray-700 text-base'>{story && story.synopsis}</p>
          </div>
          <div className='flex mb-6'>
            {Array.isArray(story?.tags) &&
              story?.tags.length > 0 &&
              story.tags.map(function (tag, index) {
                return (
                  <span
                    key={index}
                    className='bg-black bg-opacity-10 text-sm text-black mr-2 rounded-3xl p-1 px-3'
                  >
                    {tag.name}
                  </span>
                );
              })}
          </div>
          <div className='grid grid-cols-3 text-sm text-gray-600 items-center w-72'>
            <div className='flex'>
              <svg
                width='24'
                height='18'
                viewBox='0 0 24 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mr-2'
              >
                <path
                  d='M23.855 8.39028C21.5954 3.97151 17.1221 0.981812 12 0.981812C6.87789 0.981812 2.40331 3.9736 0.144977 8.39069C0.0496613 8.57967 0 8.78845 0 9.0002C0 9.21195 0.0496613 9.42073 0.144977 9.60971C2.40456 14.0285 6.87789 17.0182 12 17.0182C17.1221 17.0182 21.5966 14.0264 23.855 9.60929C23.9503 9.42032 24 9.21153 24 8.99978C24 8.78803 23.9503 8.57925 23.855 8.39028ZM12 15.0136C10.8133 15.0136 9.65325 14.6609 8.66655 14.0001C7.67986 13.3394 6.91082 12.4002 6.4567 11.3013C6.00257 10.2025 5.88375 8.99332 6.11526 7.82679C6.34678 6.66026 6.91822 5.58873 7.75734 4.74771C8.59645 3.90669 9.66555 3.33394 10.8294 3.10191C11.9933 2.86987 13.1997 2.98896 14.2961 3.44412C15.3924 3.89928 16.3295 4.67006 16.9888 5.659C17.6481 6.64793 18 7.81061 18 8.99999C18.0004 9.78982 17.8454 10.572 17.544 11.3018C17.2426 12.0315 16.8007 12.6946 16.2435 13.2531C15.6862 13.8116 15.0247 14.2546 14.2965 14.5567C13.5684 14.8587 12.788 15.014 12 15.0136ZM12 4.9909C11.6429 4.9959 11.2882 5.04914 10.9454 5.14918C11.228 5.53408 11.3636 6.00774 11.3276 6.48426C11.2917 6.96079 11.0865 7.40861 10.7493 7.74652C10.4122 8.08444 9.96539 8.29007 9.48995 8.32611C9.01451 8.36216 8.54192 8.22625 8.15789 7.94301C7.93921 8.7505 7.97869 9.6064 8.27076 10.3902C8.56283 11.1741 9.0928 11.8464 9.78606 12.3125C10.4793 12.7786 11.301 13.0151 12.1354 12.9887C12.9698 12.9623 13.7749 12.6743 14.4374 12.1652C15.1 11.6562 15.5865 10.9517 15.8287 10.1509C16.0708 9.35019 16.0563 8.4935 15.7872 7.70145C15.5181 6.9094 15.0079 6.22188 14.3286 5.73564C13.6492 5.2494 12.8348 4.98893 12 4.9909Z'
                  fill='#FF5841'
                />
              </svg>
              {story?.readCount}
            </div>
            <div className='flex'>
              <span className='mr-2'>
                <HeartIcon className='h-6 w-6 text-primary' />
              </span>
              {story && story.likeCount}
            </div>
            <div className='flex'>
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
                  fill='#212D40'
                />
                <path
                  d='M20.9528 8.08601C19.8255 6.53913 18.2505 5.50554 16.5231 5.03913V5.04148C16.1223 4.59617 15.67 4.18601 15.1637 3.82038C11.327 1.03132 5.94109 1.8821 3.14031 5.71882C0.883281 8.83601 0.979375 13.029 3.28094 16.0079L3.29969 19.1157C3.29969 19.1907 3.31141 19.2657 3.33484 19.336C3.45906 19.7321 3.88094 19.9501 4.27469 19.8259L7.24187 18.8907C8.02703 19.1696 8.83797 19.329 9.64422 19.3735L9.6325 19.3829C11.7208 20.904 14.4583 21.361 16.9684 20.5313L19.9473 21.5016C20.0223 21.5251 20.0997 21.5391 20.1794 21.5391C20.5942 21.5391 20.9294 21.204 20.9294 20.7891V17.6485C22.9942 14.8454 23.0481 10.9712 20.9528 8.08601ZM7.57 17.2266L7.28875 17.1094L4.96844 17.836L4.945 15.3985L4.7575 15.1876C2.77469 12.7688 2.64344 9.28367 4.49969 6.72663C6.75906 3.6282 11.0903 2.94382 14.1794 5.17976C17.2778 7.4321 17.9645 11.7563 15.7262 14.836C13.8489 17.4118 10.488 18.3634 7.57 17.2266ZM19.4059 16.8282L19.2184 17.0626L19.2419 19.5001L16.945 18.7266L16.6637 18.8438C15.3512 19.3313 13.952 19.3712 12.6559 19.0079L12.6512 19.0055C14.3833 18.4735 15.9536 17.3954 17.0856 15.8438C18.8762 13.3759 19.1669 10.2751 18.1262 7.63132L18.1403 7.6407C18.6794 8.02742 19.1739 8.51023 19.5934 9.09382C21.295 11.4282 21.1989 14.6063 19.4059 16.8282Z'
                  fill='#212D40'
                />
                <path
                  d='M10.1484 9.86719C9.60703 9.86719 9.1875 10.2867 9.1875 10.8047C9.1875 11.3227 9.60703 11.7422 10.1484 11.7422C10.643 11.7422 11.0625 11.3227 11.0625 10.8047C11.0625 10.2867 10.643 9.86719 10.1484 9.86719Z'
                  fill='#212D40'
                />
              </svg>
              {story && story.commentCount}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
