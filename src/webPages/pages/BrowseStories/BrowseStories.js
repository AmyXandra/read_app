import React, { useContext, useState, useEffect } from 'react';
import WebLayout from '../../layouts/WebLayout';
import Logo from '../../../assets/images/whipik-logo.png';
import StoryListCard from '../../components/StoryList/StoryListCard';
import { StoriesContext } from '../../../context/StoriesContext';
import {
  processGetPublishedStoriesAsync,
  processGetLoadMorePublishedStoriesAsync,
} from '../../../store/actions/Stories';
import { notificationHandler } from '../../../libs/util/Notification';
import PreLoader from '../../../components/shared/preLoader/PreLoader';
import BrowseStoriesHero from './BrowseStoriesHero';
import LoadMoreButton from '../../components/LoadMoreButton';
import { Helmet } from 'react-helmet';

export default function BrowseStories() {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const { state, dispatch } = useContext(StoriesContext);
  let returnedStories = state.publishedStories;
  let publishedStories = (returnedStories && returnedStories.stories) ?? [];
  let coverStory = publishedStories[0];
  const [page, setPage] = useState(Number(1));

  const getPublishedStories = async () => {
    try {
      await processGetPublishedStoriesAsync(dispatch, page, 'all');
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsLoadingPage(false);
    }
  };

  const loadMore = async () => {
    setPage(Number(page + 1));
    try {
      await processGetLoadMorePublishedStoriesAsync(dispatch, page + 1);
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
    <WebLayout>
      <Helmet>
        <title>{'Explore stories on Whipik'}</title>
        <meta
          name='description'
          content='Enjoy highly engaging short stories from your favorite content creators.'
        />
        <meta itemProp='image' content={Logo} />
        <meta
          property='og:description'
          content='Enjoy highly engaging short stories from your favorite content creators.'
        />
        <meta property='og:image' content={Logo} />
        {/* H1 = Browse Stories */}
      </Helmet>
      {coverStory && <BrowseStoriesHero coverStory={coverStory} />}
      <div>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='pt-20 mb-4'>
            <h2 className='text-3xl mb-2 font-bold flex items-center'>
              <span className='mr-2'>Explore All Stories</span>
              <svg
                width={24}
                height={28}
                viewBox='0 0 24 28'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_6682:17485)'>
                  <path
                    d='M17.3336 3.02856C16.2193 4.06249 15.2132 5.14946 14.3218 6.24124C12.8614 4.22963 11.0507 2.1891 9 0.285706C3.73607 5.16981 0 11.5336 0 15.3714C0 22.1884 5.37268 27.7143 12 27.7143C18.6273 27.7143 24 22.1884 24 15.3714C24 12.5177 21.2154 6.63178 17.3336 3.02856ZM12 25.1428C6.80089 25.1428 2.57143 20.7591 2.57143 15.3714C2.57143 12.9409 4.94464 8.23517 9.00857 3.90231C10.2054 5.15374 11.3025 6.45874 12.2411 7.75196L14.2029 10.4541L16.3141 7.86713C16.6264 7.4841 16.9489 7.1091 17.2789 6.74374C19.762 9.81928 21.4286 13.7011 21.4286 15.3714C21.4286 20.7591 17.1991 25.1428 12 25.1428ZM16.793 13.3121L14.0448 16.4471C14.0448 16.4471 9.73661 10.9453 9.41196 10.5714C7.13946 13.2961 6 14.8903 6 16.7005C6 20.3337 8.75196 22.5714 12.1339 22.5714C13.4871 22.5714 14.7386 22.1498 15.7543 21.4395C18.0621 19.8248 18.6032 16.6941 17.3218 14.248C17.1637 13.947 16.9875 13.633 16.793 13.3121Z'
                    fill='#FF5841'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_6682:17485'>
                    <rect
                      width={24}
                      height='27.4286'
                      fill='white'
                      transform='translate(0 0.285706)'
                    />
                  </clipPath>
                </defs>
              </svg>
            </h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 my-6 sm:my-10 gap-4 sm:gap-10 pb-12'>
            {publishedStories &&
              publishedStories.map(function (stories, index) {
                return <StoryListCard key={index} stories={stories} />;
              })}
          </div>
          <LoadMoreButton
            story_number={publishedStories}
            totalStories={returnedStories}
            loadMore={loadMore}
          />
        </div>
      </div>
    </WebLayout>
  );
}
