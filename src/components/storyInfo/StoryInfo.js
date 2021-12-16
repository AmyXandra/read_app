import React, { useContext, useState } from 'react';
import EditButton from './../shared/actionBtn/EditButton';
import DeleteButton from './../shared/actionBtn/DeleteButton';
import { StoriesContext } from './../../context/StoriesContext';
import { Switch } from '@headlessui/react';
import DefaultImage from '../../assets/images/defaultstory.jpg';
import { storyStatusClass } from './../../libs/util/StoryStatusClass';
import { checkIsNan } from './../../libs/util/CheckIsNan';
import ConfirmAction from './../modals/confirmAction/ConfirmAction';
import { processDeleteChatStory } from '../../store/actions/Stories';
import { notificationHandler } from './../../libs/util/Notification';
import Button from '../shared/button/Button';
import { useHistory } from 'react-router-dom';
import { processPublishChatStoryDraftAsync } from './../../store/actions/Stories';
import { setStoryRequestProperties } from './../../libs/util/StoryRequestCheck';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const completeReadPercent = (completeCount, readCount) => {
  const calculate = completeCount / readCount;
  if (checkIsNan(calculate)) {
    return '(0%)';
  } else {
    return `(${Math.floor(calculate.toString().substr(0, 5) * 100)}%)`;
  }
};

export default function StoryInfo({
  toggleStoryStatus,
  storyState,
  updatePage,
  triggerEditStoryModal,
  requestType,
}) {
  const [isDeletingStory, setIsDeletingStory] = useState(false);
  const [isPublishingStory, setIsPublishingStory] = useState(false);
  const [deleteStoryModalIsOpen, setDeleteStoryModalIsOpen] = useState(false);
  const history = useHistory();
  const {
    state: { singleStory: story },
    dispatch,
  } = useContext(StoriesContext);

  function createMarkup(markup) {
    return { __html: markup };
  }

  const deleteStory = async (storyID) => {
    setIsDeletingStory(true);
    try {
      const { message } = await processDeleteChatStory(dispatch, { storyID });
      notificationHandler('success', message);
      setDeleteStoryModalIsOpen(false);
      history.push('/my-stories');
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeletingStory(false);
    }
  };

  const publishChatStoryDraft = async (storyId) => {
    setIsPublishingStory(true);
    try {
      const { message } = await processPublishChatStoryDraftAsync(dispatch, storyId);
      notificationHandler('success', message);
      setStoryRequestProperties('published', requestType);
      await updatePage(story?.chatStoryId);
      history.replace(`/stories/${story?.chatStoryId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPublishingStory(false);
    }
  };

  return (
    <>
      {storyState === 'draft' && (
        <div className={`rounded-md p-4 mb-8 ${storyStatusClass(story?.status)}`}>
          <div className='flex justify-center'>
            <p className='text-sm font-medium capitalize'>{story?.status}</p>
          </div>
        </div>
      )}
      <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
        <div className='grid grid-cols-6'>
          <div className='col-span-6 sm:col-span-2'>
            {story?.coverImage ? (
              <img
                className='inline-block h-96 object-cover object-top w-full'
                src={story?.coverImage}
                alt=''
              />
            ) : (
              <img
                className='inline-block h-96 object-cover object-top w-full'
                src={DefaultImage}
                alt=''
              />
            )}
          </div>
          <div className='col-span-6 sm:col-span-4 p-4'>
            <dl className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4'>
              <div className='col-span-2 sm:col-span-4'>
                <div className='flex sm:justify-between items-center'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    {story?.title ?? 'No story title'}
                  </h3>
                  <div className='flex items-center'>
                    {storyState === 'published' && (
                      <Switch.Group as='div' className='flex items-center mr-3'>
                        <Switch
                          onChange={toggleStoryStatus}
                          checked={story?.publishedStatus === 'published' ? 'true' : false}
                          className={classNames(
                            story?.publishedStatus === 'published'
                              ? 'bg-orange-600'
                              : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                          )}
                        >
                          <span className='sr-only'>Toggle Story Status</span>
                          <span
                            aria-hidden='true'
                            className={classNames(
                              story?.publishedStatus === 'published'
                                ? 'translate-x-5'
                                : 'translate-x-0',
                              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                          />
                        </Switch>
                        <Switch.Label as='span' className='ml-3'>
                          <span className='text-base font-medium text-gray-900 capitalize'>
                            {story?.publishedStatus}
                          </span>
                        </Switch.Label>
                      </Switch.Group>
                    )}
                    {storyState === 'draft' && story?.status === 'converted' && (
                      <Button
                        type='button'
                        disabled={isPublishingStory}
                        classNames='whipik-button whipik-button__primary'
                        buttonText='Publish All'
                        clicked={() => publishChatStoryDraft(story._id)}
                      />
                    )}
                    {story?.status !== 'published' && (
                      <span onClick={triggerEditStoryModal}>
                        <EditButton />
                      </span>
                    )}
                    <span onClick={() => setDeleteStoryModalIsOpen(true)}>
                      <DeleteButton />
                    </span>
                  </div>
                </div>
              </div>
              <div className='sm:col-span-1'>
                <dt className='text-sm font-medium text-gray-500'>Author</dt>
                <dd className='mt-1 text-sm text-gray-900'>{story?.author?.name}</dd>
              </div>
              <div className='sm:col-span-1'>
                <dt className='text-sm font-medium text-gray-500'>Genre</dt>
                <dd className='mt-1 text-sm text-gray-900'>{story?.genre?.name}</dd>
              </div>
              {story?.readTime?.toString() && (
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>Read Time</dt>
                  <dd className='mt-1 text-sm text-gray-900'>
                    {Math.ceil(story?.readTime / 60000)} mins
                  </dd>
                </div>
              )}
              {story?.likeCount?.toString() && (
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>Like Count</dt>
                  <dd className='mt-1 text-sm text-gray-900'>{story?.likeCount}</dd>
                </div>
              )}

              {story?.commentCount?.toString() && (
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>Comment Count</dt>
                  <dd className='mt-1 text-sm text-gray-900'>{story?.commentCount}</dd>
                </div>
              )}
              {story?.readCount?.toString() && (
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>Read Count</dt>
                  <dd className='mt-1 text-sm text-gray-900'>{story?.readCount}</dd>
                </div>
              )}
              {story?.completeCount?.toString() && (
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>Complete (%)</dt>
                  <dd className='mt-1 text-sm text-gray-900'>
                    {story?.completeCount}{' '}
                    {completeReadPercent(story?.completeCount, story?.readCount)}
                  </dd>
                </div>
              )}
              <div className='col-span-2 sm:col-span-4'>
                <dt className='text-sm font-medium text-gray-500'>Synopsis</dt>
                <dd
                  className='mt-1 text-sm text-gray-900'
                  dangerouslySetInnerHTML={createMarkup(story?.synopsis ?? 'No Data')}
                ></dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <ConfirmAction
        buttonText='Delete'
        takeAction={() => deleteStory(story._id)}
        disabled={isDeletingStory}
        confirmActionModalIsOpen={deleteStoryModalIsOpen}
        closeConfirmActionModal={() => setDeleteStoryModalIsOpen(false)}
        caption={`Are you sure you want to proceed with the delete action?\n
        This action cannot be undone, and the data will be unrecoverable
        `}
        title='Delete Story'
      />
    </>
  );
}
