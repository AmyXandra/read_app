import React from 'react';
import EmptyState from './../shared/emptyState/EmptyState';
import defaultImg from '../../assets/images/default-empty.svg';
import { HeartIcon, ChatIcon, EyeIcon } from '@heroicons/react/outline';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ProfilePublishedStory = ({ user }) => {
  return (
    <div className='-my-5 bg-white shadow rounded'>
      <div className='py-4 p-3 border-b border-gray-200'>
        <p className='text-base font-medium text-gray-900'>Published Stories</p>
      </div>
      {user?.chatStory?.length > 0 ? (
        <div className='mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 px-3 py-4'>
          {user?.chatStory.map((story) => (
            <div
              key={story.title}
              className='transition ease-in duration-75 relative rounded-lg border border-gray-300 bg-white p-5 shadow-sm flex items-stretch space-x-3 hover:border-orange-600'
            >
              <div className='flex-shrink-0'>
                <img
                  className='h-full w-20 object-cover rounded-xl'
                  src={story?.coverImage}
                  alt=''
                />
              </div>
              <div className='flex-1 min-w-0'>
                <Link
                  to={{
                    pathname: `/stories/${story._id}`,
                    state: { published: true },
                  }}
                  className='focus:outline-none'
                >
                  <span className='absolute inset-0' aria-hidden='true' />
                  <p className='text-gray-500 text-sm'>
                    <Moment format='DD MMM YYYY'>{story.createdAt}</Moment>
                  </p>
                  <p className='text-sm font-medium text-gray-900 my-2 overflow-ellipsis overflow-hidden'>
                    {story.title}
                  </p>
                  <div className='flex justify-between'>
                    <div className='flex items-center'>
                      <span>
                        <EyeIcon className='h-4 w-4 text-orange-400' />
                      </span>
                      <span className='text-gray-500 text-sm pl-1'>{story.readCount}</span>
                    </div>
                    <div className='flex items-center'>
                      <span>
                        <ChatIcon className='h-4 w-4 text-orange-400' />
                      </span>
                      <span className='text-gray-500 text-sm pl-1'>{story.commentCount}</span>
                    </div>
                    <div className='flex items-center'>
                      <span>
                        <HeartIcon className='h-4 w-4 text-orange-400' />
                      </span>
                      <span className='text-gray-500 text-sm pl-1'>{story.likeCount}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // </ul>
        <div className='pt-5 pb-9'>
          <EmptyState
            src={defaultImg}
            title='No published stories'
            subTitle='No published stories'
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePublishedStory;
