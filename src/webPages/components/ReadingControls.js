import CheckReadingSettings from './settings/CheckReadingSettings';
import { setUserReadingHistory } from '../utils/Cookies';

export default function ReadingControls({
  numberOfChatMessages,
  setNumberOfChatMessages = () => {},
  readingPreference,
  setReadingPreference = () => {},
  forceLogin,
  storyId,
  setTriggerAuth = () => {},
  currentChapterId,
  getReadCount = () => {},
  setNextChapter = () => {},
  chapterMessages,
}) {
  //check reading preferences
  const { readingSettings } = CheckReadingSettings();
  console.log('numberOfChatMessages', numberOfChatMessages);
  console.log('chapterMessages', chapterMessages);

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
      }
      if (number > chapterMessages?.chatMessages.length) {
        setNextChapter(true);
      } else {
        setNextChapter(false);
      }
      if (number === 6) {
        //call readcount if it's first chapter and messages > 5
        getReadCount(storyId);
      }
    }
  }
}

//if scroll is selected implement scroll functions
