import React, { useContext, useEffect, useState } from 'react';
import DefaultLayout from './../../layouts/DefaultLayout';
import InteractiveStory from './../../components/chatStory/InteractiveStory';
import { ChapterContext } from './../../context/ChapterContext';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import {
  processPublishChapterAsync,
  processGetChapterMessagesAsync,
  processUnPublishChapterAsync,
} from './../../store/actions/Chapter';
import { StoriesContext } from './../../context/StoriesContext';
import { processGetSingleStoryAsync } from './../../store/actions/Stories';
import PreLoader from './../../components/shared/preLoader/PreLoader';
import { notificationHandler } from './../../libs/util/Notification';

const EditChatMessage = () => {
  const { chapterId, storyId } = useParams();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const { dispatch } = useContext(ChapterContext);
  const history = useHistory();
  const { dispatch: storiesDispatch } = useContext(StoriesContext);

  const getChatMessages = async () => {
    await processGetChapterMessagesAsync(dispatch, { chatChapter: chapterId });
  };

  const getStoryDetails = async () => {
    await processGetSingleStoryAsync(storiesDispatch, storyId);
  };

  useEffect(async () => {
    setIsLoadingPage(true);
    try {
      await getChatMessages();
      await getStoryDetails();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPage(false);
      const element = document.querySelector('.message-body');
      if (element !== null) {
        element.scrollTo(0, element.scrollHeight + 500);
      }
    }
  }, [chapterId]);

  const updateRouteAndGetMessages = (chapter) => {
    history.push(`/stories/${storyId}/${chapter.id}`);
  };

  const unPublishChapter = async () => {
    setIsLoadingPage(true);
    try {
      const response = await processUnPublishChapterAsync(dispatch, chapterId);
      notificationHandler('success', response.message);
      await getStoryDetails();
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsLoadingPage(false);
    }
  };

  const publishChapter = async () => {
    setIsLoadingPage(true);
    try {
      const response = await processPublishChapterAsync(dispatch, chapterId);
      notificationHandler('success', response.message);
      await getStoryDetails();
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsLoadingPage(false);
    }
  };

  const toggleChapterStatus = (status) => {
    if (status === 'published') {
      unPublishChapter();
    } else {
      publishChapter();
    }
  };

  if (isLoadingPage) {
    return <PreLoader />;
  }

  return (
    <DefaultLayout>
      <InteractiveStory
        toggleChapterStatus={toggleChapterStatus}
        updateRouteAndGetMessages={updateRouteAndGetMessages}
        mode='edit'
      />
    </DefaultLayout>
  );
};

export default EditChatMessage;
