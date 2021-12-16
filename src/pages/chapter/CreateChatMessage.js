import React, { useState, useEffect, useContext } from 'react';
import DefaultLayout from './../../layouts/DefaultLayout';
import PasteChatStoryForm from '../../components/forms/chatMessage/PasteChatStoryForm';
import InteractiveStory from './../../components/chatStory/InteractiveStory';
import { processGetSingleStoryAsync } from './../../store/actions/Stories';
import { useParams } from 'react-router';
import PreLoader from './../../components/shared/preLoader/PreLoader';
import { StoriesContext } from './../../context/StoriesContext';
import { genreService } from './../../services/Genres';
import { useFetch } from './../../customHooks/UseFetch';

const CreateChatMessage = () => {
  const { data: genres } = useFetch(genreService.processGetGenres);
  const [showPasteStoryForm, setShowPasteStoryForm] = useState(true);
  const [writingTipsModalIsOpen, setWritingTipsModalIsOpen] = useState(true);
  const [storyPadMessage, setStoryPadMessage] = useState('');
  const { storyId } = useParams();

  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const {
    dispatch,
    state: { singleStory: story },
  } = useContext(StoriesContext);

  const saveMessageInLocalStorage = (value) => {
    localStorage.setItem('message', value);
    setStoryPadMessage(value);
  };

  const getStoryDetails = async () => {
    try {
      const data = await processGetSingleStoryAsync(dispatch, storyId);
      saveMessageInLocalStorage(data.draft);
      setStoryPadMessage(data.draft);
    } catch (error) {
      console.log('🚀 ~ file: SingleStory.js ~ line 23 ~ getStoryDetails ~ error', error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  useEffect(() => {
    getStoryDetails();
  }, []);

  useEffect(() => {
    setStoryPadMessage(story?.draft ?? '');
    const localStorageMessage = localStorage.getItem('message');
    setStoryPadMessage(localStorageMessage ?? '');
    return () => {
      localStorage.removeItem('message');
    };
  }, []);

  if (isLoadingPage) {
    return <PreLoader />;
  }

  return (
    <DefaultLayout>
      {showPasteStoryForm ? (
        <PasteChatStoryForm
          storyDetails={story}
          showInteractiveStoryForm={() => setShowPasteStoryForm(false)}
          saveMessageInLocalStorage={saveMessageInLocalStorage}
          storyPadMessage={storyPadMessage}
          updateStoryDraft={getStoryDetails}
          genres={genres}
          writingTipsModalIsOpen={writingTipsModalIsOpen}
          setWritingTipsModalIsOpen={setWritingTipsModalIsOpen}
        />
      ) : (
        <InteractiveStory
          showInteractiveStoryForm={() => setShowPasteStoryForm(true)}
          genres={genres}
          updateStoryDraft={getStoryDetails}
        />
      )}
    </DefaultLayout>
  );
};
export default CreateChatMessage;
