import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WebLayout from '../../layouts/WebLayout';
import InteractiveStories from './InteractiveStories';
import Title from './Title';
import StoryNav from './StoryNav';
import { StoriesContext } from '../../../context/StoriesContext';
import PreLoader from '../../../components/shared/preLoader/PreLoader';
import { processGetSingleStoryAsync } from '../../../store/actions/Stories';
import { notificationHandler } from '../../../libs/util/Notification';

export default function StoryDetails() {
  const { storyId } = useParams();
  const {
    state: { singleStory },
    dispatch,
  } = useContext(StoriesContext);
  // const story = state.singleStory;
  // let first_chapter_id = story?.chatChapters && story?.chatChapters[0]._id;
  let first_chapter_id = singleStory?.chatChapters?.length > 0 && singleStory?.chatChapters[0]._id;
  // console.log('singleStory?.chatChapters', singleStory?.chatChapters);
  const [currentChapterId, setCurrentChapterId] = useState();
  const [nextChapter, setNextChapter] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  // console.log('first_chapter_id', first_chapter_id);

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const getSingleStory = async () => {
    try {
      await processGetSingleStoryAsync(dispatch, storyId);
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsLoadingPage(false);
    }
  };
  useEffect(() => {
    getSingleStory();
  }, []);
  useEffect(() => {
    setCurrentChapterId(first_chapter_id);
  }, [singleStory]);

  if (isLoadingPage) {
    return <PreLoader />;
  }

  return (
    <WebLayout noFooter>
      <Title />
      <div>
        <StoryNav
          setCurrentChapterId={setCurrentChapterId}
          currentChapterId={currentChapterId}
          setNextChapter={setNextChapter}
          setShowFooter={setShowFooter}
        />
        <InteractiveStories
          currentChapterId={currentChapterId}
          setCurrentChapterId={setCurrentChapterId}
          background={singleStory?.coverImage}
          nextChapter={nextChapter}
          setNextChapter={setNextChapter}
          showFooter={showFooter}
          setShowFooter={setShowFooter}
        />
      </div>
    </WebLayout>
  );
}
