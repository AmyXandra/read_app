import React, { useContext } from 'react';
import Pagination from '../../shared/Pagination';
import { StoriesContext } from '../../../context/StoriesContext';
import Moment from 'react-moment';
import EditButton from '../../shared/actionBtn/EditButton';
import { useHistory } from 'react-router-dom';
import DefaultImage from '../../../assets/images/defaultstory.jpg';
import { storyStatusClass } from './../../../libs/util/StoryStatusClass';
import { goToPage } from './../../../libs/util/Pagination';
import { setStoryRequestProperties } from '../../../libs/util/StoryRequestCheck';

export default function ReviewsStoriesTable({ pageRendered, currentTab, nextPage, requestType }) {
  const history = useHistory();
  const {
    state: { inReviewStories },
  } = useContext(StoriesContext);

  const gotoSingleStoryPage = (storyId) => {
    setStoryRequestProperties('draft', requestType);
    history.push(`/stories/${storyId}`);
  };

  return (
    <>
      <div className='flex flex-col mt-6'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='mb-4 mt-10 hidden'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                {currentTab} Stories Listing
              </h3>
            </div>

            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='whipik-table'>
                <thead>
                  <tr>
                    <th scope='col'>Title</th>
                    <th scope='col'>Author</th>
                    <th scope='col'>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {inReviewStories?.stories?.map((story) => (
                    <tr key={story._id} className='cursor-pointer hover:underline'>
                      <td style={{ width: '45%' }} onClick={() => gotoSingleStoryPage(story._id)}>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 h-10 w-10'>
                            {story?.chatStory?.coverImage ? (
                              <img
                                className='h-10 w-10 rounded-full'
                                src={story?.chatStory?.coverImage}
                                alt=''
                              />
                            ) : (
                              <img className='h-10 w-10 rounded-full' src={DefaultImage} alt='' />
                            )}
                          </div>
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>
                              {story?.chatStory?.title ?? 'Not Set'}
                            </div>
                            <div className='text-sm text-gray-500'>
                              <Moment format='MMM, DD, YYYY'>{story?.createdAt}</Moment>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ width: '25%' }} onClick={() => gotoSingleStoryPage(story._id)}>
                        <div className='text-sm text-gray-900'>
                          {story?.author?.name ?? 'Not Set'}
                        </div>
                      </td>
                      <td style={{ width: '20%' }}>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${storyStatusClass(
                            story?.status
                          )}`}
                        >
                          {story?.status ?? 'unpublished'}
                        </span>
                      </td>
                      <td className='text-left' style={{ width: '10%' }}>
                        <span className='flex'>
                          <EditButton
                            editButtonClicked={() => {
                              setStoryRequestProperties('draft', requestType);
                              history.push(`/stories/${story._id}`);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {pageRendered === 'stories page' && (
                <Pagination
                  paginationData={inReviewStories?.paginationData}
                  nextPage={() => {
                    goToPage(inReviewStories.paginationData, nextPage, 'next');
                  }}
                  prevPage={() => {
                    goToPage(inReviewStories.paginationData, nextPage, 'prev');
                  }}
                  disableNextBtn={
                    +inReviewStories?.paginationData?.page ===
                    +inReviewStories?.paginationData?.totalPages
                  }
                  disablePrevBtn={+inReviewStories?.paginationData?.page === 1}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
