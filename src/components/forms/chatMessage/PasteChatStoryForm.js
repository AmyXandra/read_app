import React, { useState, useEffect, useContext } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { v4 as uuidv4 } from 'uuid';
import WritingTipsModal from './../../modals/writingTips/WritingTipsModal';
import Cookies from 'js-cookie';
import { ChapterContext } from './../../../context/ChapterContext';
import { chapterMessages } from '../../../store/actions/Chapter';
import { StoriesContext } from './../../../context/StoriesContext';
import { saveChatStoryDraftHelper } from '../../chatStory/helper';
import {
  singleStory,
  processStartChatStoryDraftReviewAsync,
} from './../../../store/actions/Stories';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import Tabs from './../../shared/tabs/Tabs';
import { notificationHandler } from './../../../libs/util/Notification';
import { messageTypesArray, showFeedbackForm, showWritersActionButtons } from './helper';
import { messageTypes, userRoleTypes } from '../../../libs/util';
import ConfirmAction from './../../modals/confirmAction/ConfirmAction';
import WriterConversionActions from './../../chatMessages/WriterConversionActionButtons';
import { AuthContext } from './../../../context/AuthContext';
import AdminConversionActions from './../../chatMessages/AdminConvertionActionButtons';
import Button from '../../shared/button/Button';
import StoryModal from './../../modals/story/StoryModal';
import {
  setStoryRequestProperties,
  getStoryRequestProperties,
} from './../../../libs/util/StoryRequestCheck';

const regExp = new RegExp(
  // eslint-disable-next-line
  /(?:\(\s*(break|narration|episode)+\s*\)|([^:\n\(]+\:))?(?:\s*\(\s*(typing|image)\s*\)\s*|\s*(?:\(\s*(deleted|thought)\s*\))?\s*\(\s*(?:(image)\s*:)(.*?\S.*?)\)\s*(?:\(\s*(deleted|thought)\s*\))?\s*|(.+?)?(?:\(\s*(deleted|thought)\s*\)\s*?)?(?:\(\s*(?:meaning\s*:)?(.*?\S.*?)\)\s*(?:\(\s*(deleted|thought)\s*\))?)?)?(?:\n|\r\n?|$)/,
  'igm'
);

const story = {
  _id: '',
  chatChapters: [],
  chatCharacters: [],
  commentCount: 0,
  completeCount: 2,
  coverImage: '',
  createdAt: new Date(),
  currentComposingChapterId: '',
  title: '',
};

const characterColors = [
  {
    nameColor: '#A31400',
    msgColor: '#FFEEEB',
    textColor: '#212D40',
  },
  {
    nameColor: '#285087',
    msgColor: '#F5F9FF',
    textColor: '#212D40',
  },
  {
    nameColor: '#0C652F',
    msgColor: '#F8FFF0',
    textColor: '#212D40',
  },
  {
    nameColor: '#8F008F',
    msgColor: '#FFF5FF',
    textColor: '#212D40',
  },
  {
    nameColor: '#005E75',
    msgColor: '#F5FDFF',
    textColor: '#212D40',
  },
];

function Character(
  _id,
  name = '',
  isMainXter = false,
  msgColor = '',
  textColor = '',
  chatStory = ''
) {
  this._id = _id;
  this.name = name;
  this.isMainXter = isMainXter;
  this.msgColor = msgColor;
  this.nameColor = textColor;
  this.chatStory = chatStory;
}

function Chapter(sId = '', title = '', number = 0, chatMessages = []) {
  this.sId = sId;
  this.title = title;
  this.number = number;
  this.chatMessages = chatMessages;
}

function ChatMessage(
  _id,
  image = '',
  text = '',
  altText = '',
  character = {},
  typing = false,
  chatChapter = {}
) {
  this._id = _id;
  this.image = image;
  this.text = text;
  this.altText = altText;
  this.character = character;
  this.typing = typing;
  this.chatChapter = chatChapter;
}

const tabs = [{ name: 'storyPad', current: true, id: 1 }];

const PasteChatStoryForm = ({
  showInteractiveStoryForm,
  storyPadMessage,
  saveMessageInLocalStorage,
  storyDetails,
  updateStoryDraft,
  genres,
  writingTipsModalIsOpen,
  setWritingTipsModalIsOpen,
}) => {
  const history = useHistory();
  const [comment, setComment] = useState(storyDetails?.comment ?? '');
  const [storyModalIsOpen, setStoryModalIsOpen] = useState(false);
  const [modalTrigger, setModalTrigger] = useState(true);
  const { dispatch: chapterDispatch } = useContext(ChapterContext);
  const [confirmSaveStory, setConfirmSaveStory] = useState(false);
  const [messageUpdated, setMessageUpdated] = useState(false);
  const [isSavingStory, setIsSavingStory] = useState(false);
  const [isSubmittingForReview, setIsSubmittingForReview] = useState(false);
  const [storyTabs, setStoryTabs] = useState(tabs);
  const [feedbackFormEditable, setFeedbackFormEditable] = useState(false);
  const [currentMessageTab, setCurrentMessageTab] = useState(
    storyTabs.find((tab) => tab.current)?.name ?? 'storyPad'
  );
  const {
    dispatch: storyDispatch,
    state: { singleStory: storyInfo },
  } = useContext(StoriesContext);
  const { storyId } = useParams();
  const {
    state: { user },
  } = useContext(AuthContext);

  const getRandomCharacterColor = () => {
    return characterColors.sort(() => 0.5 - Math.random())[0];
  };

  useEffect(() => {
    showFeedbackForm(user, storyDetails, setStoryTabs, storyTabs, setFeedbackFormEditable);
  }, [storyDetails?.status]);

  const formatMessage = (e) => {
    e.preventDefault();
    story.chatChapters = [];
    const matches = storyPadMessage.matchAll(regExp);
    for (const [index, match] of Array.from(matches).entries()) {
      //GROUP 1: (break|narration|episode) - Tells whether the line starts with (break), (narration), (episode)
      const firstCapturingGroup = match[1]?.toLowerCase().trim(),
        //GROUP 2: ([A-za-z0-9\-\_ ]+\:) - Or match the character name which is expected to end with :
        secondCapturingGroup = match[2]?.replace(':', '')?.trim(),
        // GROUP 3: (typing|image) - Tells whether the line is of typing or any of the media tags PLACEHOLDER
        thirdCapturingGroup = match[3]?.toLowerCase()?.trim(),
        //GROUP 4: (deleted|thought) - Tells whether the image is prefixed with either (deleted|thought) tag, otherwise, it's flagged as normal image
        fourthCapturingGroup = match[4]?.toLowerCase()?.trim(),
        //GROUP 5: (image) - Tells whether the media in the matched line is of image or audio or video
        fifthCapturingGroup = match[5]?.toLowerCase()?.trim(),
        //GROUP 6: (.*?\S.*?)\) - Captures a non-empty value corresponding to the tag used in GROUP 5
        sixthCapturingGroup = match[6]?.trim(),
        //GROUP 7: (deleted|thought) - Tells whether the image is suffixed with either (deleted|thought) tag, otherwise if null, it's flagged as normal image
        seventhCapturingGroup = match[7]?.toLowerCase()?.trim(),
        //GROUP 8: (.+?) - Captures Normal text, text after lineBreak, a narration or the original text of message with translation
        eighthCapturingGroup = match[8]?.trim(),
        //GROUP 9: (deleted|thought) - Tells whether the text in Group 8 is followed with either (deleted|thought) tag
        ninthCapturingGroup = match[9]?.toLowerCase()?.trim(),
        //GROUP 10: (.*?\S.*?) - Captures the translation/meaning of the text captured in Group 8
        tenthCapturingGroup = match[10]?.trim(),
        //GROUP 11: (deleted|thought) - This captures either (deleted|thought) tag that could follow the translation/meaning capturingGroup
        eleventhCapturingGroup = match[11]?.toLowerCase()?.trim();

      //Start a new chapter
      const chatMessage = new ChatMessage();
      chatMessage._id = uuidv4();
      if (index === 0 || firstCapturingGroup === 'episode') {
        story.currentComposingChapterId = uuidv4();
        const chapter = new Chapter(
          story.currentComposingChapterId,
          `Chapter ${(story.chatChapters?.length ?? 0) + 1}`,
          `${(story.chatChapters?.length ?? 0) + 1}`,
          []
        );
        story.chatChapters.push(chapter);
      }

      if (firstCapturingGroup != null) {
        if (firstCapturingGroup === 'break') {
          chatMessage.type = messageTypes.lineBreak;
          chatMessage.text = eighthCapturingGroup;
        } else if (firstCapturingGroup === 'narration') {
          chatMessage.type = messageTypes.narration;
          chatMessage.text = eighthCapturingGroup;
        }
      }
      //this match has character name which is expected to end with :
      else if (secondCapturingGroup != null) {
        const characterIndex = story.chatCharacters.findIndex(
          ({ name }) => name.toLowerCase() === secondCapturingGroup.toLowerCase() ?? -1
        );
        if (characterIndex !== -1) {
          chatMessage.chatCharacter = story.chatCharacters[characterIndex];
        } else {
          const characterColor = getRandomCharacterColor();
          const newCharacter = new Character(
            uuidv4(),
            secondCapturingGroup,
            false,
            characterColor['msgColor'],
            characterColor['nameColor']
          );
          story.chatCharacters.push(newCharacter);
          story.chatCharacters[0].isMainXter = true;
          chatMessage.chatCharacter = newCharacter;
        }
        //typing, image, audio or video "PLACEHOLDER"
        if (thirdCapturingGroup != null) {
          if (thirdCapturingGroup == 'typing') {
            chatMessage.typing = true;
            chatMessage.type = messageTypes.typing;
          } else if (thirdCapturingGroup == 'image') {
            chatMessage.type = messageTypes.dialogue;
            chatMessage.image =
              'https://www.whipik.com/sites/default/files/default_images/chatMsgPlaceholder.svg'; //PLACEHOLDER IMAGE
          }
        }

        //Message with translation
        else if (fifthCapturingGroup != null && sixthCapturingGroup != null) {
          chatMessage.type =
            fourthCapturingGroup === 'deleted' || seventhCapturingGroup === 'deleted'
              ? messageTypes.deleted
              : fourthCapturingGroup === 'thought' || seventhCapturingGroup == 'thought'
              ? messageTypes.thought
              : messageTypes.dialogue;
          if (fifthCapturingGroup == 'image') {
            chatMessage.image = sixthCapturingGroup; //Media URL
          }
        }
        //Captures Normal text, text after lineBreak, a narration or message with translation,
        //which could be optionally prefixed and/or suffixed with either of (deleted|thought) tags
        else if (eighthCapturingGroup != null) {
          chatMessage.type =
            ninthCapturingGroup === 'deleted' || eleventhCapturingGroup === 'deleted'
              ? messageTypes.deleted
              : ninthCapturingGroup === 'thought' || eleventhCapturingGroup === 'thought'
              ? messageTypes.thought
              : messageTypes.dialogue;
          chatMessage.text = eighthCapturingGroup;
          chatMessage.altText = tenthCapturingGroup; //could be null if it doesn't contain translation tag
        }
      }

      //if secondCapturingGroup/Character name is null and the media tag with value is found
      //Then regard it as a narration with image/media
      //image, audio or video message with value
      else if (fifthCapturingGroup != null && sixthCapturingGroup != null) {
        chatMessage.type = messageTypes.narration;
        if (fifthCapturingGroup === 'image') {
          chatMessage.image = sixthCapturingGroup; //Media URL
        }
      }

      //if secondCapturingGroup/Character name is null and the image/media tag PLACEHOLDER is found
      //Then regard it as a narration with image/media
      //image, audio or video "PLACEHOLDER"
      else if (thirdCapturingGroup != null && thirdCapturingGroup === 'image') {
        chatMessage.type = messageTypes.narration;
        chatMessage.image =
          'https://www.whipik.com/sites/default/files/default_images/chatMsgPlaceholder.svg'; //PLACEHOLDER IMAGE
      }

      //plain text termed as a narration
      //if previous clauses are skipped, this definitely won't.
      //Could have just been "else" statement, just like playing safe.
      else if (eighthCapturingGroup != null) {
        chatMessage.type = messageTypes.narration;
        chatMessage.text = eighthCapturingGroup;
        chatMessage.altText = tenthCapturingGroup; //could be null if it doesn't contain translation tag
      }

      if (chatMessage.type != null) {
        //Returns the first index in the list that satisfies the provided [test].
        //Returns -1 if [element - (e)] is not found.
        const indexOfCurrentComposingChapter = story.chatChapters.findIndex(
          ({ sId }) => sId == story.currentComposingChapterId
        );
        story.chatChapters[indexOfCurrentComposingChapter].chatMessages.push(chatMessage);
      }
    }
    chapterDispatch(chapterMessages(story.chatChapters[0]));
    storyDispatch(
      singleStory({
        ...storyInfo,
        chatChapters: story.chatChapters,
        chatCharacters: story.chatCharacters,
        draft: storyPadMessage,
      })
    );
    showInteractiveStoryForm();
  };

  const saveMessage = (e) => {
    const value = e.target.value;
    saveMessageInLocalStorage(value);
    setMessageUpdated(true);
  };

  const hideModalTips = () => {
    Cookies.set('showTipsModal', false);
    setModalTrigger(false);
    setWritingTipsModalIsOpen(false);
  };

  const saveChatStoryDraft = saveChatStoryDraftHelper(
    setIsSavingStory,
    storyId,
    storyPadMessage,
    storyDispatch,
    history,
    updateStoryDraft,
    setMessageUpdated
  );

  const startStoryReview = async () => {
    try {
      const { message: apiResponseMessage } = await processStartChatStoryDraftReviewAsync(
        storyDispatch,
        storyId
      );
      notificationHandler('success', apiResponseMessage);
      window.location.reload();
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsSubmittingForReview(false);
    }
  };

  const goToSingleStoryPage = () => {
    if (!messageUpdated) {
      const { reqType } = getStoryRequestProperties();
      setStoryRequestProperties('draft', reqType);
      history.push(`/stories/${storyId}`);
    } else {
      setConfirmSaveStory(true);
    }
  };

  const draftTextareaDisabled = (status) => {
    if (user?.roles?.includes(userRoleTypes.writer)) {
      if (status === 'submitted' || status === 'inreview' || status === 'converted') {
        return true;
      }
      return false;
    }
    if (
      user?.roles?.includes(userRoleTypes.superAdmin) ||
      user?.roles?.includes(userRoleTypes.admin) ||
      user?.roles?.includes(userRoleTypes.contentManager)
    ) {
      return true;
    }
    if (user?.roles?.includes(userRoleTypes.superAdmin) && status === 'inreview') {
      return false;
    }
    return true;
  };

  return (
    <>
      <div className='flex justify-between items-center mb-5'>
        <div className='flex items-center'>
          <button onClick={goToSingleStoryPage}>
            <span>
              <ArrowLeftIcon className='h-5 w-5 text-gray-700 mr-2' />
            </span>
          </button>
          <h4 className='mb-0 text-lg font-semibold overflow-ellipsis overflow-hidden text-gray-700'>
            {storyDetails?.title}
          </h4>
        </div>
        <div>
          {/* preview */}
          <Button
            buttonText='Preview'
            clicked={(e) => formatMessage(e)}
            type='button'
            classNames='whipik-button whipik-button__white mr-0 sm:mr-3'
          />
          {showWritersActionButtons(user) && (
            <WriterConversionActions
              saveChatStoryDraft={saveChatStoryDraft}
              status={storyDetails?.status}
              storyDetails={storyDetails}
              storyId={storyId}
              isSavingStory={isSavingStory}
              updateStoryDraft={updateStoryDraft}
              draftMessage={storyPadMessage}
              setStoryModalIsOpen={setStoryModalIsOpen}
            />
          )}
        </div>
      </div>
      <div className='mb-4 flex items-center'>
        {modalTrigger === true && (
          <button
            className='focus:outline-none mr-1 rounded-md bg-orange-50 border border-orange-700 text-gray-600 px-2.5 py-0.5'
            onClick={() => setWritingTipsModalIsOpen(true)}
          >
            <QuestionMarkCircleIcon className='h-5 w-5' />
          </button>
        )}
        <div className='w-11/12'>
          {messageTypesArray.map((type, index) => (
            <span
              className='px-2.5 py-0.5 rounded-md text-sm font-medium bg-orange-50 border border-orange-700 text-gray-600 mr-1 whitespace-nowrap'
              key={index}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      <div className='shadow'>
        <div className='border-b border-gray-200 px-2 flex items-center justify-between bg-gray-100 h-14 border rounded-t-md'>
          <Tabs
            tabs={storyTabs}
            currentTab={currentMessageTab}
            setCurrentTab={setCurrentMessageTab}
          />
        </div>
      </div>
      <div className={currentMessageTab === 'storyPad' ? 'block' : 'hidden'}>
        <form>
          <div className='col-span-12'>
            <textarea
              value={storyPadMessage}
              id='storyPad'
              onChange={(e) => saveMessage(e)}
              className='whipik-input disabled:opacity-100 disabled:cursor-not-allowed whitespace-pre-wrap'
              style={{ borderTop: 0, borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              rows={18}
              disabled={draftTextareaDisabled(storyDetails?.status)}
            />
          </div>
        </form>
      </div>

      <div className={currentMessageTab === 'feedback' ? 'block' : 'hidden'}>
        <form>
          <div className='col-span-12 relative'>
            <textarea
              value={comment}
              id='feedback'
              onChange={(e) => setComment(e.target.value)}
              disabled={!feedbackFormEditable}
              className='whipik-input relative disabled:opacity-100 disabled:cursor-not-allowed'
              style={{
                borderTop: 0,
                borderBottom: 0,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
              }}
              rows={18}
            />
            {storyDetails?.status === 'submitted' && (
              <div className='absolute w-full h-full bg-gray-50 top-0 right-0 left-0 flex items-center justify-center'>
                <Button
                  buttonText='Start Review'
                  clicked={() => startStoryReview()}
                  buttonType='button'
                  disabled={isSubmittingForReview}
                  classNames='whipik-button whipik-button__white mr-0 sm:mr-3'
                />
              </div>
            )}
          </div>
        </form>
        <div className='shadow'>
          <div className='w-full rounded-b border-b-md border-gray-200 px-2 py-2.5 bg-gray-100'>
            <AdminConversionActions
              status={storyDetails.status}
              updateStoryDraft={updateStoryDraft}
              comment={comment}
              storyId={storyId}
            />
          </div>
        </div>
      </div>
      <WritingTipsModal
        modalIsOpen={writingTipsModalIsOpen}
        closeModal={() => setWritingTipsModalIsOpen(false)}
        hideModalTips={hideModalTips}
      />
      <ConfirmAction
        buttonText='Save'
        takeAction={() => saveChatStoryDraft(messageUpdated ? true : false)}
        closeModalText="Don't Save"
        confirmActionModalIsOpen={confirmSaveStory}
        title='Are you sure'
        redirectUser={true}
        caption='All unsaved changes would be lost'
        closeConfirmActionModal={() => setConfirmSaveStory(false)}
        closeConfirmActionModalAndRedirect={() => {
          setConfirmSaveStory(false);
          history.goBack();
        }}
      />
      <StoryModal
        modalIsOpen={storyModalIsOpen}
        toggleModalOpen={() => setStoryModalIsOpen(true)}
        closeModal={() => setStoryModalIsOpen(false)}
        genres={genres}
        storyInfo={storyInfo}
        draftStory={storyPadMessage}
        actionType='edit'
        certifyAndSubmitDraftStory={true}
        updatePage={() => {
          updateStoryDraft();
          setStoryModalIsOpen(false);
        }}
      />
    </>
  );
};

export default PasteChatStoryForm;
