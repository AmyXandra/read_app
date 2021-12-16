import React, { useContext } from 'react';
import Pagination from '../../shared/Pagination';
import { useHistory } from 'react-router-dom';
import ViewButton from './../../shared/actionBtn/ViewButton';
import { StoriesContext } from './../../../context/StoriesContext';
import Moment from 'react-moment';
import { checkIsNan } from './../../../libs/util/CheckIsNan';
import DefaultImage from '../../../assets/images/defaultstory.jpg';
import { goToPage } from './../../../libs/util/Pagination';
import { setStoryRequestProperties } from '../../../libs/util/StoryRequestCheck';

export default function PublishedStoriesTable({ pageRendered, currentTab, nextPage, requestType }) {
  const history = useHistory();
  const {
    state: { publishedStories },
  } = useContext(StoriesContext);

  const completeReadPercent = (completeCount, readCount) => {
    const calculate = completeCount / readCount;
    if (checkIsNan(calculate)) {
      return '(0%)';
    } else {
      return `(${Math.floor(calculate.toString().substr(0, 5) * 100)}%)`;
    }
  };

  const determineStoriesToRender = () => {
    return pageRendered === 'dashboard'
      ? publishedStories?.stories?.slice(0, 5)
      : publishedStories?.stories;
  };

  const gotoSingleStoryPage = (storyId) => {
    setStoryRequestProperties('published', requestType);
    history.push(`/stories/${storyId}`);
  };

  return (
    <>
      <div className='flex flex-col mt-6'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='hidden mb-4 mt-10'>
              <h3 className='text-lg leading-6 font-medium text-gray-900 hidden'>
                {currentTab} Stories Listing
              </h3>
            </div>

            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='whipik-table'>
                <thead>
                  <tr>
                    <th scope='col'>Title</th>
                    <th scope='col'>Author</th>
                    <th scope='col'>Reads</th>
                    <th scope='col'>Complete(%)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {determineStoriesToRender()?.map((story) => (
                    <tr key={story._id} className='cursor-pointer hover:underline'>
                      <td style={{ width: '40%' }} onClick={() => gotoSingleStoryPage(story._id)}>
                        <div div className='flex items-center'>
                          <div className='flex-shrink-0 h-10 w-10'>
                            {story.coverImage ? (
                              <img
                                className='h-10 w-10 rounded-full'
                                src={story?.coverImage}
                                alt=''
                              />
                            ) : (
                              <img className='h-10 w-10 rounded-full' src={DefaultImage} alt='' />
                            )}
                          </div>
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>{story.title}</div>
                            <div className='text-sm text-gray-500'>
                              {story?.genre?.name} |{' '}
                              <Moment format='MMM DD, YYYY'>{story?.publishDate}</Moment>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ width: '20%' }} onClick={() => gotoSingleStoryPage(story._id)}>
                        <div className='text-sm text-gray-900'>
                          {story?.author?.name ?? 'Not Set'}
                        </div>
                      </td>
                      <td style={{ width: '15%' }} onClick={() => gotoSingleStoryPage(story._id)}>
                        <div className='text-sm text-gray-900'>{story?.readCount}</div>
                      </td>
                      <td style={{ width: '15%' }} onClick={() => gotoSingleStoryPage(story._id)}>
                        <div className='text-sm text-gray-900'>
                          {story?.completeCount}{' '}
                          {completeReadPercent(story?.completeCount, story?.readCount)}
                        </div>
                      </td>
                      <td style={{ width: '10%' }}>
                        <span className='flex'>
                          <ViewButton
                            viewButtonClicked={() => {
                              setStoryRequestProperties('published', requestType);
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
                  paginationData={publishedStories?.paginationData}
                  nextPage={() => {
                    goToPage(publishedStories.paginationData, nextPage, 'next');
                  }}
                  prevPage={() => {
                    goToPage(publishedStories.paginationData, nextPage, 'prev');
                  }}
                  disableNextBtn={
                    +publishedStories?.paginationData?.page ===
                    +publishedStories?.paginationData?.totalPages
                  }
                  disablePrevBtn={+publishedStories?.paginationData?.page === 1}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
