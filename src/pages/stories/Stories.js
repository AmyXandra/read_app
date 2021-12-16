import React, { useState, useEffect, useContext } from 'react';
import PublishedStoriesTable from '../../components/tables/stories/PublishedStoriesTable';
import DefaultLayout from './../../layouts/DefaultLayout';
import Tabs from './../../components/shared/tabs/Tabs';
import ReviewsStoriesTable from './../../components/tables/stories/ReviewsStoryTable';

import PageHeader from './../../components/shared/PageHeader';
import Button from './../../components/shared/button/Button';
import StoryModal from './../../components/modals/story/StoryModal';
import {
  processGetChatStoryDraftAsync,
  processGetPublishedStoriesAsync,
  processGetInReviewStoriesAsync,
} from './../../store/actions/Stories';
import { StoriesContext } from './../../context/StoriesContext';
import PreLoader from './../../components/shared/preLoader/PreLoader';
import { useFetch } from '../../customHooks/UseFetch';
import { genreService } from './../../services/Genres';
import DraftsStoriesTable from './../../components/tables/stories/DraftStoriesTable';

const tabs = [
  { name: 'Draft', current: false },
  { name: 'In Review', current: false },
  { name: 'Published', current: true },
];

const Stories = () => {
  const [open, setOpen] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [currentTab, setCurrentTab] = useState('Published');
  const {
    dispatch,
    state: { publishedStories, draftStories, inReviewStories },
  } = useContext(StoriesContext);
  const [tabMeta, setTabMeta] = useState({});
  const { isLoading, data } = useFetch(genreService.processGetGenres);
  const [publishedStoriesPage, setPublishedStoriesPage] = useState(1);
  const [draftStoriesPage, setDraftStoriesPage] = useState(1);
  const [reviewsStoriesPage, setReviewsStoriesPage] = useState(1);

  const formatPaginationMeta = () => {
    if (currentTab === 'In Review') {
      setTabMeta(inReviewStories?.paginationData);
    }
    if (currentTab === 'Draft') {
      setTabMeta(draftStories?.paginationData);
    }
    if (currentTab === 'Published') {
      setTabMeta(publishedStories?.paginationData);
    }
  };

  useEffect(async () => {
    await processGetPublishedStoriesAsync(dispatch, publishedStoriesPage, 'all');
    formatPaginationMeta();
    setIsLoadingPage(false);
  }, [publishedStoriesPage]);

  useEffect(async () => {
    await processGetChatStoryDraftAsync(dispatch, draftStoriesPage, 'all');
    formatPaginationMeta();
    setIsLoadingPage(false);
  }, [draftStoriesPage]);

  useEffect(async () => {
    await processGetInReviewStoriesAsync(dispatch, reviewsStoriesPage, 'all');
    formatPaginationMeta();
    setIsLoadingPage(false);
  }, [reviewsStoriesPage]);

  useEffect(async () => {
    formatPaginationMeta();
  }, [currentTab, publishedStories, draftStories, inReviewStories]);

  if (isLoadingPage || isLoading) {
    return <PreLoader />;
  }

  return (
    <DefaultLayout>
      <PageHeader title='All Stories' subtitle=''>
        <Button
          type='button'
          classNames='whipik-button whipik-button__primary'
          buttonText='Add Story'
          clicked={() => setOpen(true)}
        />
      </PageHeader>

      <div className='flex items-centrer justify-between'>
        <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {+tabMeta?.total <= +tabMeta?.limit && (
          <p>
            Showing {tabMeta?.total} of {tabMeta?.total} results
          </p>
        )}
        {+tabMeta?.total > +tabMeta?.limit && (
          <p>
            Showing {tabMeta?.limit} of {tabMeta?.total} results
          </p>
        )}
      </div>

      {currentTab === 'Published' && (
        <PublishedStoriesTable
          pageRendered='stories page'
          currentTab={currentTab}
          nextPage={setPublishedStoriesPage}
        />
      )}

      {currentTab === 'In Review' && (
        <ReviewsStoriesTable
          pageRendered='stories page'
          currentTab={currentTab}
          nextPage={setReviewsStoriesPage}
        />
      )}

      {currentTab === 'Draft' && (
        <DraftsStoriesTable currentTab={currentTab} nextPage={setDraftStoriesPage} />
      )}

      <StoryModal
        modalIsOpen={open}
        toggleModalOpen={() => setOpen(true)}
        closeModal={() => setOpen(false)}
        genres={data}
      />
    </DefaultLayout>
  );
};

export default Stories;
