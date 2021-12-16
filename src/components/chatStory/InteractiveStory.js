import React, { useState, useContext, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import MessageList from './MessageList';
import InterpretAltTextModal from '../modals/chatMessage/InterpretAltTextModal';
import { ChapterContext } from './../../context/ChapterContext';
import { StoriesContext } from './../../context/StoriesContext';
import CharacterModal from './../modals/character/CharacterModal';
import { characterDetails } from './../../store/actions/Stories';
import { chatMessageService } from './../../services/ChatMessage';
import { notificationHandler } from './../../libs/util/Notification';
import { chapterMessages, processGetChapterMessagesAsync } from '../../store/actions/Chapter';
import Tabs from './../shared/tabs/Tabs';
import Button from '../shared/button/Button';
import ToggleStoryChapterStatus from './ToggleStoryChapterStatus';
import StoryCharacters from './StoryCharacters';
import QuickMessageTypeActions from './QuickMessageTypeActions';
import CreateNewChatMessage from './CreateNewChatMessage';
import ConfirmAction from './../modals/confirmAction/ConfirmAction';
import { showWritersActionButtons } from './../forms/chatMessage/helper';
import { AuthContext } from './../../context/AuthContext';
import StoryModal from './../modals/story/StoryModal';
import RootModal from './../modals/rootModal/RootModal';
import AddMediaMessage from './../forms/chatMessage/AddMediaMessage';
import {
  submitChatStoryDraftHelper,
  updateChatStoryDraftHelper,
  deleteMessageHelper,
  editChatMessageHelper,
  findMainCharacter,
  convertStoryDraftHelper,
  revertChatStoryDraftHelper,
} from './helper';

export const initialPayload = {
  image: '',
  text: '',
  altText: '',
  character: '',
  typing: false,
  type: 'dialogue',
};

const InteractiveStory = ({
  toggleChapterStatus,
  updateRouteAndGetMessages,
  mode,
  showInteractiveStoryForm,
  genres,
}) => {
  const [currentTab, setCurrentTab] = useState('episode 1');
  const [currentChapter, setCurrentChapter] = useState('');
  const [interpretModalIsOpen, setInterpretModalIsOpen] = useState(false);
  const [characterModalIsOpen, setCharacterModalIsOpen] = useState(false);
  const [messageType, setMessageType] = useState('dialogue');
  const [messageTypeSelectDisabled, setMessageTypeSelectDisabled] = useState(false);
  const [messageBoxDisabled, setMessageBoxDisabled] = useState(true);
  const [messagePayload, setMessagePayload] = useState(initialPayload);
  const [messageActionType, setMessageActionType] = useState('create');
  const [deleteMessageModalIsOpen, setDeleteMessageModalIsOpen] = useState(false);
  const [isDeletingMessage, setIsDeletingMessage] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  const [storyModalIsOpen, setStoryModalIsOpen] = useState(false);
  const [rootModalIsOpen, setRootModalIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const history = useHistory();
  const messageInput = useRef(null);
  const { chapterId, storyId } = useParams();

  const {
    dispatch: chapterDispatch,
    state: {
      chapterMessages: { chatMessages },
    },
  } = useContext(ChapterContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    state: { singleStory: storyInfo },
    dispatch,
  } = useContext(StoriesContext);

  const closeCharacterModal = () => {
    dispatch(characterDetails(null));
    setCharacterModalIsOpen(false);
  };

  const selectMessageType = (type) => {
    setMessagePayload({ ...messagePayload, type });
    setMessageTypeSelectDisabled(false);
    setMessageType(type);
    focusTextInput();
    if (type === 'lineBreak' || type === 'narration') {
      setMessagePayload({ ...messagePayload, type, character: '' });
    }
  };

  const focusTextInput = () => {
    setTimeout(() => {
      if (messageInput.current) {
        messageInput.current.focus();
      }
    }, 200);
  };

  const formatTabs = () => {
    return storyInfo?.chatChapters?.map((chapter) => {
      return {
        name: `Episode ${chapter.number}`,
        current: chapter._id === chapterId ? true : false,
        id: chapter._id,
      };
    });
  };

  useEffect(() => {
    const chapterDetails = storyInfo?.chatChapters?.find((chapter) => chapter._id === chapterId);
    setCurrentTab(`Episode ${chapterDetails?.number}`);
    setCurrentChapter(chapterDetails);
  }, [chapterId]);

  const scrollToPosition = (x, y) => {
    console.log('scrolling now to', x, y);
    const element = document.querySelector('.message-body');
    console.log('element', element);
    element.scrollTo(x, y);
  };

  const getChapterMessages = (_, chapter) => {
    setCurrentTab(chapter.name);
    if (mode === 'edit') {
      updateRouteAndGetMessages(chapter);
    } else {
      chapterDispatch(
        chapterMessages(
          storyInfo?.chatChapters?.find(
            ({ title }) =>
              title.toLowerCase().replace('chapter', 'episode') === chapter.name.toLowerCase()
          )
        )
      );
      scrollToPosition(0, 0);
    }
  };

  const setMessageText = (text) => {
    setMessagePayload({ ...messagePayload, text });
  };

  const setCharacter = (character) => {
    setMessagePayload({ ...messagePayload, character: character._id, type: 'dialogue' });
    setMessageType('dialogue');
    focusTextInput();
  };

  const resetInitialData = (payload) => {
    setMessageType(payload.type);
    initialPayload.character = payload.character;
    setMessagePayload({ ...initialPayload, type: payload.type });
    setMessageTypeSelectDisabled(false);
    setMessageBoxDisabled(false);
  };

  const createChatMessage = async () => {
    const payload = { ...messagePayload };
    payload.chatChapter = chapterId;
    if (payload.type === 'lineBreak' || payload.type === 'narration') {
      payload.character = findMainCharacter(storyInfo?.chatCharacters);
    }
    if (!['lineBreak', 'narration'].includes(payload.type) && payload.character === '') {
      notificationHandler('error', 'Please select a character');
      return;
    }
    setIsCreating(true);
    try {
      await chatMessageService.processCreateChatMessage(payload);
      await processGetChapterMessagesAsync(chapterDispatch, { chatChapter: chapterId });
      setInterpretModalIsOpen(false);
      resetInitialData(payload);
      const element = document.querySelector('.message-body');
      scrollToPosition(0, element.scrollHeight + 500);

      setMessageActionType('create');
      focusTextInput();
      setRootModalIsOpen(false);
    } catch (error) {
      console.log(error);
      notificationHandler('error', error?.response?.data?.message);
    } finally {
      setIsCreating(false);
    }
  };

  const checkMessageType = () => {
    if (messagePayload.type.length === 0 || messagePayload.type === 'typing') {
      setMessageBoxDisabled(true);
      return;
    }
    setMessageBoxDisabled(false);
  };

  const setEditMessagePayload = (message) => {
    setMessagePayload({
      image: message.image ?? '',
      text: message.text,
      altText: message.altText,
      character:
        message.type === 'lineBreak' || message.type === 'narration'
          ? ''
          : message?.chatCharacter?._id,
      typing: message.typing,
      type: message.type,
      id: message._id,
    });
    if (message?.image?.length > 0) {
      setRootModalIsOpen(true);
    }
    if (message.type !== 'lineBreak' || message.type !== 'narration') {
      setMessageType(message.type);
    }
    setMessageActionType('edit');
  };

  useEffect(() => {
    const mainCharacter = findMainCharacter(storyInfo?.chatCharacters);
    setMessagePayload({ ...messagePayload, character: mainCharacter });
  }, [storyInfo?.chatCharacters]);

  useEffect(() => {
    checkMessageType();
  }, [messagePayload.type]);

  const deleteMessage = deleteMessageHelper(
    chapterDispatch,
    chapterId,
    setDeleteMessageModalIsOpen,
    setIsDeletingMessage,
    messageId
  );

  const editChatMessage = editChatMessageHelper(
    messagePayload,
    chapterId,
    setInterpretModalIsOpen,
    chapterDispatch,
    setMessageActionType,
    setMessagePayload,
    storyInfo?.chatCharacters,
    setRootModalIsOpen,
    setIsCreating
  );

  const updateChatStoryDraft = updateChatStoryDraftHelper(storyId, storyInfo, dispatch, history);

  const submitChatStoryDraft = submitChatStoryDraftHelper(
    dispatch,
    storyId,
    history,
    setIsSubmitting,
    storyInfo?.draft,
    storyInfo,
    null,
    setStoryModalIsOpen
  );

  const revertToDraft = revertChatStoryDraftHelper(
    setIsReverting,
    dispatch,
    storyId,
    history,
    null
  );

  const convertChatStoryDraft = convertStoryDraftHelper(
    setIsReverting,
    dispatch,
    storyId,
    history,
    null,
    storyInfo?.draft
  );

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' && event.shiftKey) {
        console.log('enter key');
      } else if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        console.log(messageActionType, messagePayload);
        messageActionType === 'create' ? createChatMessage() : editChatMessage();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [messagePayload]);

  const goBack = () => {
    if (mode === 'edit') {
      history.push({
        pathname: `/stories/${storyInfo._id}`,
        state: { draft: false },
      });
    }
    if (mode !== 'edit') {
      showInteractiveStoryForm();
    }
  };

  return (
    <>
      <div className='w-full flex justify-between mb-5'>
        <div className='flex items-center'>
          <span className='cursor-pointer' onClick={goBack}>
            <ArrowLeftIcon className='h-5 w-5 text-gray-700 mr-2' />
          </span>
          <h4 className='mb-0 text-lg font-semibold overflow-ellipsis overflow-hidden'>
            {storyInfo?.title}
          </h4>
        </div>
        {mode === 'edit' &&
          chatMessages.length > 0 &&
          storyInfo?.publishedStatus === 'published' && (
            <ToggleStoryChapterStatus
              currentChapter={currentChapter}
              toggleChapterStatus={toggleChapterStatus}
            />
          )}

        {mode !== 'edit' && showWritersActionButtons(user) && (
          <div>
            {(storyInfo?.status === 'draft' ||
              storyInfo?.status === 'editreview' ||
              storyInfo?.status === 'approved') && (
              <Button
                clicked={updateChatStoryDraft}
                buttonText='Save & Exit'
                type='button'
                classNames='whipik-button whipik-button__white mr-0 sm:mr-3'
              />
            )}
            {(storyInfo?.status === 'draft' || storyInfo?.status === 'editreview') && (
              <Button
                buttonText={storyInfo?.status === 'draft' ? 'Submit' : 'Re-Submit'}
                clicked={submitChatStoryDraft}
                disabled={isSubmitting}
                type='button'
                classNames='whipik-button whipik-button__gray mr-0 sm:mr-3'
              />
            )}
            {/* revert to draft */}
            {storyInfo?.status === 'submitted' && (
              <Button
                buttonText='Revert to draft'
                clicked={revertToDraft}
                type='button'
                disabled={isReverting}
                classNames='whipik-button whipik-button__success mr-0 sm:mr-3'
              />
            )}

            {/* transform to draft */}
            {storyInfo?.status === 'approved' && (
              <Button
                buttonText='Convert'
                clicked={convertChatStoryDraft}
                type='button'
                classNames='whipik-button whipik-button__success mr-0 sm:mr-3'
              />
            )}
          </div>
        )}
      </div>
      <div
        className='border border-gray-200 w-full max-h-full mt-3 bg-white shadow rounded-md'
        style={{ height: 600 }}
      >
        {/* topbar */}
        <div
          className='border-b border-gray-200 px-7 flex items-center justify-between bg-gray-100'
          style={{ height: '8%' }}
        >
          <Tabs tabs={formatTabs()} currentTab={currentTab} setCurrentTab={getChapterMessages} />
        </div>

        {/* message body */}
        <div
          className='overflow-y-auto message-body px-12'
          style={{ height: mode === 'edit' ? '70%' : '92%' }}
        >
          <MessageList
            messages={chatMessages ?? []}
            setMessageId={(messageID) => {
              setMessageId(messageID);
              setDeleteMessageModalIsOpen(true);
            }}
            editMessage={setEditMessagePayload}
            mode={mode}
          />
        </div>

        {/* characters, line break and narration */}
        {mode === 'edit' && (
          <>
            <div className='bg-gray-100 flex items-center px-7' style={{ height: '10%' }}>
              {/* narration and line break */}
              <QuickMessageTypeActions
                selectMessageType={selectMessageType}
                messagePayload={messagePayload}
              />

              {/* characters */}
              <StoryCharacters
                storyInfo={storyInfo}
                messagePayload={messagePayload}
                setCharacter={setCharacter}
                setCharacterModalIsOpen={setCharacterModalIsOpen}
              />
            </div>

            {/* message type and message */}
            <CreateNewChatMessage
              selectMessageType={selectMessageType}
              messagePayload={messagePayload}
              messageType={messageType}
              messageTypeSelectDisabled={messageTypeSelectDisabled}
              messageBoxDisabled={messageBoxDisabled}
              setMessageText={setMessageText}
              setInterpretModalIsOpen={setInterpretModalIsOpen}
              messageActionType={messageActionType}
              createChatMessage={createChatMessage}
              editChatMessage={editChatMessage}
              setMessagePayload={setMessagePayload}
              initialPayload={initialPayload}
              textareaRef={messageInput}
              setMessageActionType={setMessageActionType}
              setRootModalIsOpen={setRootModalIsOpen}
              isCreating={isCreating}
            />

            <InterpretAltTextModal
              interpretModalIsOpen={interpretModalIsOpen}
              closeInterpretModal={() => setInterpretModalIsOpen(false)}
              originalText={messagePayload.text}
              createChatMessage={createChatMessage}
              updateOriginalText={(text) => setMessagePayload({ ...messagePayload, text })}
              meaning={messagePayload.altText}
              editChatMessage={editChatMessage}
              messageActionType={messageActionType}
              updateAltText={(altText) => setMessagePayload({ ...messagePayload, altText })}
            />

            <RootModal
              rootModalIsOpen={rootModalIsOpen}
              setRootModalIsOpen={() => {
                setRootModalIsOpen(false);
                setMessageActionType('create');
                setMessagePayload({ ...messagePayload, image: '' });
              }}
              title='Upload an image'
            >
              <AddMediaMessage
                updateImageField={(imageURL) =>
                  setMessagePayload({ ...messagePayload, image: imageURL })
                }
                currentImage={messagePayload?.image}
                editChatMessage={editChatMessage}
                createChatMessage={createChatMessage}
                eitChatMessage={editChatMessage}
                messageActionType={messageActionType}
                selectMessageType={selectMessageType}
                messageTypeSelectDisabled={messageTypeSelectDisabled}
                messageTypeSelected={messageType}
                isCreating={isCreating}
              />
            </RootModal>

            <CharacterModal
              characterModalIsOpen={characterModalIsOpen}
              closeCharacterModal={closeCharacterModal}
              actionType='create'
              storyId={storyId}
            />

            <ConfirmAction
              buttonText='Delete'
              takeAction={deleteMessage}
              disabled={isDeletingMessage}
              confirmActionModalIsOpen={deleteMessageModalIsOpen}
              closeConfirmActionModal={() => setDeleteMessageModalIsOpen(false)}
              title='Delete Chat Message'
              caption={`Are you sure you want to proceed with the delete action?\n
              This action cannot be undone, and the data will be unrecoverable
              `}
            />
          </>
        )}
      </div>
      <StoryModal
        modalIsOpen={storyModalIsOpen}
        toggleModalOpen={() => setStoryModalIsOpen(true)}
        closeModal={() => setStoryModalIsOpen(false)}
        genres={genres}
        storyInfo={storyInfo}
        actionType='edit'
        certifyAndSubmitDraftStory={true}
        updatePage={() => {
          setStoryModalIsOpen(false);
          history.goBack();
        }}
      />
    </>
  );
};

export default InteractiveStory;
