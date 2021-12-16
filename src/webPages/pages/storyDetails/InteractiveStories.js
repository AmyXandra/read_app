import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import MessageType from '../../components/chatType/MessageType';
import { ChapterContext } from '../../../context/ChapterContext';
import { StoriesContext } from '../../../context/StoriesContext';
import { notificationHandler } from '../../../libs/util/Notification';
import { processGetChapterMessagesAsync } from '../../../store/actions/Chapter';
import {
  processIncrementStoryReadCountAsync,
  processIncrementStoryCompleteCountAsync,
  processGetUserChatStoryProgressAsync,
} from '../../../store/actions/Stories';
import ReadingPreference from '../../components/ReadingPreference';
import LoginModal from '../../components/modals/authModal/LoginModal';
import GoToNextChapter from '../../components/chapter/GoToNextChapter';
import ApplePlay from '../../../assets/images/appstore-white.png';
import GooglePlay from '../../../assets/images/playstore-white.png';
import CheckReadingSettings from '../../components/settings/CheckReadingSettings';
import CheckUnauthenticatedRead from '../../components/settings/CheckUnauthenticatedRead';
import { getDeviceId, setDeviceId } from '../../utils/Cookies';
import { getUserReadingHistory } from '../../utils/Cookies';
import { setUserReadingHistory } from '../../utils/Cookies';
import WebFooter from '../../components/navigation/WebFooter';

export default function InteractiveStories({
  currentChapterId,
  background,
  setCurrentChapterId = () => {},
  nextChapter,
  setNextChapter = () => {},
  showFooter,
  setShowFooter = () => {},
}) {
  CheckReadingSettings();
  const { storyId } = useParams();
  const { state, dispatch } = useContext(ChapterContext);
  const { storiesDispatch = dispatch } = useContext(StoriesContext);
  const {
    state: { readingSettings },
  } = useContext(StoriesContext);
  let chapterMessages = state.chapterMessages;
  const [readingPreference, setReadingPreference] = useState(true);
  //show 2 chatmessages by default then update chat messages onclick
  const [numberOfChatMessages, setNumberOfChatMessages] = useState(2);
  const [triggerAuth, setTriggerAuth] = useState(false);
  const [forceLogin, setForceLogin] = useState(false);
  const scrollToBottom = useRef(null);

  //dispatch action to get chat messages by chatchapter
  const getChatMessage = async () => {
    try {
      await processGetChapterMessagesAsync(dispatch, { chatChapter: currentChapterId });
    } catch (error) {
      notificationHandler('error', error.message);
    }
  };

  //set device id if it does not exist
  let deviceId = getDeviceId();
  if (deviceId === null) {
    setDeviceId();
  }

  //dispatch action to update read count by chatchapter
  const getReadCount = async (storyID) => {
    try {
      await processIncrementStoryReadCountAsync(storiesDispatch, storyID, deviceId);
    } catch (error) {
      // notificationHandler('error', error.message);
    }
  };

  //dispatch action to update complete count by chatchapter
  const getCompleteCount = async (storyID) => {
    setUserReadingHistory(storyId, currentChapterId, numberOfChatMessages, true);
    try {
      await processIncrementStoryCompleteCountAsync(storiesDispatch, storyID, deviceId);
    } catch (error) {
      // notificationHandler('error', error.message);
    }
  };

  //dispatch action to set user chat story progress
  const [payload] = useState({
    status: '',
    device: deviceId,
    chatStory: storyId,
    chatChapter: currentChapterId,
    chatMessage: '',
  });
  const setChatStoryProgress = async (status, chatMessage) => {
    try {
      await processGetUserChatStoryProgressAsync(storiesDispatch, {
        ...payload,
        status: status,
        chatMessage: chatMessage,
      });
    } catch (error) {
      // notificationHandler('error', error.message);
    }
  };

  useEffect(() => {
    setTriggerAuth(false);
    setNextChapter(false);
    if (!currentChapterId) {
      return;
    }
    getChatMessage();
    setNumberOfChatMessages(2);
  }, [currentChapterId]);

  useEffect(() => {
    let unauthenticatedRead = CheckUnauthenticatedRead();
    if (unauthenticatedRead) {
      setForceLogin(true);
    }
  }, []);

  useEffect(() => {
    let readHistory = getUserReadingHistory();
    if (readHistory) {
      let i = JSON.parse(readHistory).filter((item) => item.name === storyId);
      if (i.length > 0) {
        setCurrentChapterId(i[0].chapterId);
        setNumberOfChatMessages(i[0].readCount);
      }
    } else {
      setUserReadingHistory(storyId, currentChapterId, numberOfChatMessages);
    }
  }, []);

  function tapToRead(number) {
    //if reading preference is showing users should not be able to show new messages
    if (readingPreference && !readingSettings) {
      setNumberOfChatMessages(number);
    } else {
      //if the conditions to force login are set, force login after 20 messages
      if (forceLogin && number <= 20) {
        setNumberOfChatMessages(number + 1);
        setReadingPreference(false);
        setUserReadingHistory(storyId, currentChapterId, numberOfChatMessages);
        scrollToBottom.current.scrollIntoView({ behavior: 'smooth' });
        if (number === 20) {
          setNumberOfChatMessages(number);
          setTriggerAuth(true);
        } else {
          setTriggerAuth(false);
        }
      } else {
        setNumberOfChatMessages(number + 1);
        setReadingPreference(false);
        setUserReadingHistory(storyId, currentChapterId, numberOfChatMessages);
        scrollToBottom.current.scrollIntoView({ behavior: 'smooth' });
      }
      if (number >= chapterMessages?.chatMessages.length) {
        setNextChapter(true);
        console.log('logfhfjk');
        setNumberOfChatMessages(number);
      } else {
        setNextChapter(false);
      }

      if (number === 6) {
        //call readcount if it's first chapter and messages > 5
        getReadCount(storyId);
      }
    }
  }

  useEffect(() => {
    if (numberOfChatMessages === chapterMessages?.chatMessages.length) {
      setNextChapter(true);
      console.log('i got called');
    }
  }, []);

  const tapmessages = useRef(null);
  // const ReaderControl = () => {
  //   console.log('tapped');
  //   tapToRead(numberOfChatMessages);
  // };

  const [runCode, setrunCode] = useState(0);
  function eventfunc() {
    setrunCode(runCode + 1);
  }
  useEffect(() => {
    console.log('checking runcode');
  }, [runCode]);

  useEffect(() => {
    if (readingSettings === 'click') {
      tapmessages.current?.addEventListener('click', eventfunc);
    } else if (readingSettings === 'scroll') {
      setNumberOfChatMessages(chapterMessages?.chatMessages.length);
      if (numberOfChatMessages > chapterMessages?.chatMessages.length) {
        setNextChapter(true);
      } else {
        setNextChapter(false);
      }
    }
  }, [readingSettings]);

  //open and close modal states
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  //scroll to bottom of chat messages
  const messageEl = useRef(null);
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    } else {
      return;
    }
  }, [readingSettings]);
  console.log('nextchapter', nextChapter);

  return (
    <>
      <div
        className='mx-auto bg-cover bg-center'
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className='backdrop-filter relative backdrop-blur-xl overflow-hidden px-4 sm:px-8 py-6 bg-black bg-opacity-75'>
          <div className='h-full absolute w-full left-0 cursor-pointer' ref={tapmessages}></div>
          <div
            className='max-w-2xl px-2 mx-auto read_stories_wrapper overflow-y-scroll'
            ref={messageEl}
            onClick={() => tapToRead(numberOfChatMessages)}
          >
            {chapterMessages &&
              chapterMessages.chatMessages
                .slice(0, numberOfChatMessages)
                .map(function (chat, index) {
                  return (
                    <MessageType
                      key={index}
                      numberOfChatMessages={numberOfChatMessages}
                      tapToRead={tapToRead}
                      data={chat}
                      id={chat._id}
                      className='msg_animate'
                    />
                  );
                })}

            {readingPreference && <ReadingPreference setReadingPreference={setReadingPreference} />}

            {nextChapter && (
              <GoToNextChapter
                currentChapterId={currentChapterId}
                setCurrentChapterId={setCurrentChapterId}
                setNextChapter={(value) => setNextChapter(value)}
                getCompleteCount={getCompleteCount}
                setChatStoryProgress={setChatStoryProgress}
                setShowFooter={setShowFooter}
              />
            )}
            {triggerAuth && (
              <div className='text-center text-white p-3 pt-6 relative z-10'>
                <h3 className='text-lg mb-4'>Complete the story</h3>
                <LoginModal
                  rootModalIsOpen={modalIsOpen}
                  setRootModalIsOpen={() => openModal()}
                  setRootModalIsClosed={() => closeModal()}
                  title='Login or Signup to finish reading this story'
                />
                <h3 className='text-lg my-4'>Or</h3>
                <h3 className='text-lg mb-5'>Download the free app</h3>
                <div className='flex justify-center'>
                  <img src={ApplePlay} className='px-2 w-40' alt='ApplePlay' />
                  <img src={GooglePlay} className='px-2 w-40' alt='GooglePlay' />
                </div>
              </div>
            )}

            <div ref={scrollToBottom} />
          </div>
        </div>
      </div>
      {showFooter && <WebFooter />}
    </>
  );
}
