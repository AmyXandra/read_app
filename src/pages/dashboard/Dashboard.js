import React, { useState, useContext, useEffect } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import Analytics from '../../components/dashboard/Analytics';
import PublishedStoriesTable from '../../components/tables/stories/PublishedStoriesTable';
import PageHeader from './../../components/shared/PageHeader';
import { StoriesContext } from './../../context/StoriesContext';
import PreLoader from './../../components/shared/preLoader/PreLoader';
import { processGetPublishedStoriesAsync } from '../../store/actions/Stories';
import { notificationHandler } from './../../libs/util/Notification';

const Dashboard = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const { dispatch } = useContext(StoriesContext);
  const getPublishedStories = async () => {
    try {
      await processGetPublishedStoriesAsync(dispatch);
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsLoadingPage(false);
    }
  };
  useEffect(() => {
    getPublishedStories();
  }, []);

  if (isLoadingPage) {
    return <PreLoader />;
  }
  return (
    <DefaultLayout>
      <PageHeader subtitle='Wednesday 25 April 2021 | 11:59pm' title='Good Morning Tunmise' />
      <Analytics />
      <PublishedStoriesTable currentTab='Published' pageRendered='dashboard' />
    </DefaultLayout>
  );
};

export default Dashboard;
