import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import { useFetch } from '../../customHooks/UseFetch';
import { useParams } from 'react-router-dom';
import { usersService } from './../../services/Users';
import PreLoader from './../../components/shared/preLoader/PreLoader';
import ProfileAvi from './../../components/profile/ProfileAvi';
import ProfileInfo from './../../components/profile/ProfileInfo';
import ProfilePublishedStory from './../../components/profile/PublishedStories';

const SingleUser = () => {
  const { userId } = useParams();
  const { isLoading, data } = useFetch(usersService.processGetUserOtherUserProfile, userId);

  if (isLoading) {
    return <PreLoader />;
  }

  return (
    <DefaultLayout>
      <ProfileAvi user={data?.data} />
      <div className='grid grid-cols-6 gap-6 my-20'>
        {/* profile info */}
        <div className='col-span-2'>
          <ProfileInfo user={data?.data} />
        </div>
        {/* published stories */}
        <div className='col-span-4'>
          <ProfilePublishedStory user={data?.data} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SingleUser;
