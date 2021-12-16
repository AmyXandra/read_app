import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useParams } from 'react-router';
import DefaultLayout from './../../layouts/DefaultLayout';
import StoryInfo from './../../components/storyInfo/StoryInfo';
import ChaptersTable from '../../components/tables/chapters/ChaptersTable';
import CharactersTable from './../../components/tables/characters/CharactersTable';
import PageHeader from '../../components/shared/PageHeader';
import ChapterModal from '../../components/modals/chapter/ChapterModal';
import { notificationHandler } from './../../libs/util/Notification';
import CharacterModal from './../../components/modals/character/CharacterModal';
import { StoriesContext } from './../../context/StoriesContext';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import {
  processGetSingleStoryAsync,
  processUnpublishStoryAsync,
  processPublishStoryAsync,
} from '../../store/actions/Stories';
import PreLoader from './../../components/shared/preLoader/PreLoader';
import { characterDetails } from './../../store/actions/Stories';
import { chapterDetails } from './../../store/actions/Chapter';
import { ChapterContext } from './../../context/ChapterContext';
import EditButton from './../../components/shared/actionBtn/EditButton';
import { useFetch } from './../../customHooks/UseFetch';
import StoryModal from './../../components/modals/story/StoryModal';
import { genreService } from './../../services/Genres';
import {
  getStoryRequestProperties,
  setStoryRequestProperties,
} from '../../libs/util/StoryRequestCheck';

const BackIcon = ({ requestType }) => {
  return (
    <Link
      to={requestType === 'personal' ? '/my-stories' : '/stories'}
      className='flex items-center'
    >
      <span className='cursor-pointer'>
        <ArrowLeftIcon className='h-5 w-5 text-gray-700 mr-2' />
      </span>
      <span className='text-lg text-gray-700'>
        Back to {requestType === 'personal' ? 'my stories' : 'all stories'}
      </span>
    </Link>
  );
};

const StoryDetails = () => {
  const [chapterModalIsOpen, setChapterModalIsOpen] = useState(false);
  const [characterModalIsOpen, setCharacterModalIsOpen] = useState(false);
  const [storyModalIsOpen, setStoryModalIsOpen] = useState(false);
  const [characterActionType, setCharacterActionType] = useState(null);
  const [chapterActionType, setChapterActionType] = useState(null);
  const [newChapterNumber, setNewChapterNumber] = useState('');
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [storyState, setStoryState] = useState('');
  const { storyId } = useParams();
  const history = useHistory();
  const { data: genres } = useFetch(genreService.processGetGenres);
  const [requestType, setRequestType] = useState('');
  const {
    dispatch,
    state: { singleStory: story },
  } = useContext(StoriesContext);
  const { dispatch: chapterDispatch } = useContext(ChapterContext);

  const getStoryDetails = async (storyID) => {
    try {
      setStoryModalIsOpen(false);
      const { storyStatus, reqType } = getStoryRequestProperties();
      setRequestType(reqType);
      await processGetSingleStoryAsync(dispatch, storyID ?? storyId);
      setStoryState(storyStatus === 'draft' ? 'draft' : 'published');
    } catch (error) {
      console.log('🚀 ~ file: SingleStory.js ~ line 23 ~ getStoryDetails ~ error', error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  const closeCharacterModal = () => {
    dispatch(characterDetails(null));
    setCharacterModalIsOpen(false);
  };

  const closeChapterModal = () => {
    chapterDispatch(chapterDetails(null));
    setChapterModalIsOpen(false);
  };

  const unPublishStory = async () => {
    setIsLoadingPage(true);
    try {
      const response = await processUnpublishStoryAsync(dispatch, storyId);
      notificationHandler('success', response.message);
      await getStoryDetails(storyId);
    } catch (error) {
      notificationHandler('error', error.message);
    }
  };

  const publishStory = async () => {
    setIsLoadingPage(true);
    try {
      await processPublishStoryAsync(dispatch, storyId);
      await getStoryDetails(storyId);
    } catch (error) {
      notificationHandler('error', error.message);
    }
  };

  const toggleStoryStatus = async () => {
    if (story.publishedStatus === 'published') {
      unPublishStory();
    } else {
      publishStory();
    }
  };

  useEffect(() => {
    getStoryDetails(storyId);
  }, []);

  if (isLoadingPage) {
    return <PreLoader />;
  }

  return (
    <DefaultLayout>
      <PageHeader title={<BackIcon requestType={requestType} />} />
      <StoryInfo
        toggleStoryStatus={toggleStoryStatus}
        storyState={storyState}
        updatePage={getStoryDetails}
        triggerEditStoryModal={() => setStoryModalIsOpen(true)}
        requestType={requestType}
      />
      {(storyState === 'published' || story?.status === 'converted') && (
        <>
          <ChaptersTable
            openCreateChapterModal={() => setChapterModalIsOpen(true)}
            setChapterActionType={(type) => setChapterActionType(type)}
            setNewChapterNumber={(num) => setNewChapterNumber(num)}
            updateChaptersTable={getStoryDetails}
          />
          <CharactersTable
            openCharacterModal={() => setCharacterModalIsOpen(true)}
            setCharacterActionType={(type) => setCharacterActionType(type)}
            updateCharactersTable={getStoryDetails}
          />
        </>
      )}

      {/* story pad for draft story */}
      {storyState === 'draft' && (
        <div className='flex flex-col mt-4'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 min-w-full sm:px-6 lg:px-8 relative'>
              <textarea
                className='whipik-input relative'
                style={{ paddingTop: '3rem' }}
                disabled
                rows={10}
                value={story?.draft ? story?.draft?.slice(0, 300) + '...' : '...'}
              />
              <div className='absolute top-6 w-full right-0 px-8'>
                <div className='flex justify-between px-3'>
                  <p className='italic text-sm'>Storypad</p>
                  <EditButton
                    editButtonClicked={() => {
                      setStoryRequestProperties('draft', requestType);
                      history.push(`/chat-story/${storyId}`);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* modal imports */}
      <ChapterModal
        chapterModalIsOpen={chapterModalIsOpen}
        closeChapterModal={closeChapterModal}
        actionType={chapterActionType}
        newChapterNumber={newChapterNumber}
      />

      <CharacterModal
        characterModalIsOpen={characterModalIsOpen}
        closeCharacterModal={closeCharacterModal}
        actionType={characterActionType}
        storyId={storyId}
      />

      <StoryModal
        modalIsOpen={storyModalIsOpen}
        toggleModalOpen={() => setStoryModalIsOpen(true)}
        closeModal={() => setStoryModalIsOpen(false)}
        genres={genres}
        storyInfo={story}
        updatePage={getStoryDetails}
        actionType='edit'
      />
    </DefaultLayout>
  );
};

export default StoryDetails;
