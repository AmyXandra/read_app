import {
  processSubmitStoryDraftAsync,
  processUpdateChatStoryDraftAsync,
  processConvertChatStoryDraftAsync,
  processUnsubmitChatStoryDraftAsync,
} from './../../store/actions/Stories';
import { chatMessageService } from './../../services/ChatMessage';
import { processGetChapterMessagesAsync } from '../../store/actions/Chapter';
import { notificationHandler } from './../../libs/util/Notification';
import { initialPayload } from './InteractiveStory';

export const findMainCharacter = (characters) => {
  const mainCharacter = characters?.find((character) => character.isMainXter);
  return mainCharacter?._id ?? '';
};

// ================================================= draft helper functions start =========================
export function saveChatStoryDraftHelper(
  setIsSavingStory,
  storyId,
  message,
  storyDispatch,
  history,
  updateStoryDraft,
  setMessageUpdated
) {
  return async (redirect) => {
    setIsSavingStory(true);
    try {
      const payload = {
        id: storyId,
        draft: message,
      };
      const { message: apiResponseMessage } = await processUpdateChatStoryDraftAsync(
        storyDispatch,
        payload
      );
      notificationHandler('success', apiResponseMessage);
      if (redirect) {
        history.goBack();
      } else {
        updateStoryDraft();
        setMessageUpdated(false);
      }
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsSavingStory(false);
    }
  };
}
/**
 * function to submit chat story draft
 *
 * @export
 * @param {*} dispatch
 * @param {*} storyId
 * @param {*} history
 * @return {*}
 */

export function submitChatStoryDraftHelper(
  dispatch,
  storyId,
  history,
  setIsSubmitting,
  draft,
  storyDetails,
  cb,
  setStoryModalIsOpen
) {
  return async () => {
    const genre = Object.keys(storyDetails?.genre)?.length > 0 ? storyDetails?.genre : null;
    const synopsis = storyDetails?.synopsis?.length > 0 ? storyDetails?.synopsis : null;
    const coverImage = storyDetails?.coverImage ?? null;

    const mandatoryFields = {
      genre,
      synopsis,
      coverImage,
    };

    Object.keys(mandatoryFields).forEach((elem) => {
      if (mandatoryFields[elem] !== null) {
        delete mandatoryFields[elem];
      }
    });

    const validateMandatoryFields = Object.keys(mandatoryFields).some(
      (key) => mandatoryFields[key] === null
    );

    if (validateMandatoryFields || storyDetails.certified === false) {
      setStoryModalIsOpen(true);
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = { chatStoryDraft: storyId, draft, id: storyId };

      if (!payload.draft) {
        notificationHandler('error', 'Draft field cannot be left empty');
        return;
      }
      await processSubmitStoryDraftAsync(dispatch, payload);
      notificationHandler('success', 'ChatStory Draft submitted successfully');

      if (cb) {
        cb();
      }

      if (history) {
        setTimeout(() => {
          history.push(`/stories/${storyId}`);
        }, 300);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsSubmitting(false);
    }
  };
}
/**
 *
 * function to convert chat story draft
 * @param {*} setIsReverting
 * @param {*} dispatch
 * @param {*} storyId
 * @param {*} history
 * @return {*}
 */
export function convertStoryDraftHelper(
  setIsReverting,
  dispatch,
  storyId,
  history,
  cb,
  draftMessage
) {
  return async () => {
    try {
      setIsReverting(true);
      const payload = { chatStoryDraft: storyId, id: storyId, draft: draftMessage ?? '' };
      const { message } = await processConvertChatStoryDraftAsync(dispatch, payload);
      notificationHandler('success', message);
      if (cb) {
        cb();
      }
      if (history) {
        setTimeout(() => {
          history.push(`/stories/${storyId}`);
        }, 300);
      }
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsReverting(false);
    }
  };
}

/**
 * function to update chat story draft
 *
 * @export
 * @param {*} storyId
 * @param {*} storyInfo
 * @param {*} dispatch
 * @param {*} history
 * @return {*}
 */
export function updateChatStoryDraftHelper(storyId, storyInfo, dispatch, history) {
  return async () => {
    try {
      const payload = {
        id: storyId,
        draft: storyInfo.draft ?? '',
      };
      await processUpdateChatStoryDraftAsync(dispatch, payload);
      notificationHandler('success', 'ChatStory Draft updated successfully');
      setTimeout(() => {
        history.goBack();
      }, 300);
    } catch (error) {
      notificationHandler('error', error.message);
    }
  };
}

export function revertChatStoryDraftHelper(setIsReverting, dispatch, storyId, history, cb) {
  return async () => {
    try {
      setIsReverting(true);
      const { message } = await processUnsubmitChatStoryDraftAsync(dispatch, storyId);
      notificationHandler('success', message);
      if (cb) {
        cb();
      }
      if (history) {
        setTimeout(() => {
          history.push(`/stories/${storyId}`);
        }, 300);
      }
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsReverting(false);
    }
  };
}

// ================================================= draft helper functions end =========================

/**
 * function to delete chat message
 *
 * @export
 * @param {*} chapterDispatch
 * @param {*} chapterId
 * @return {*}
 */
export function deleteMessageHelper(
  chapterDispatch,
  chapterId,
  setDeleteMessageModalIsOpen,
  setIsDeletingMessage,
  messageId
) {
  return async () => {
    setIsDeletingMessage(true);
    try {
      const {
        data: { message },
      } = await chatMessageService.processDeleteChatMessage(messageId);
      await processGetChapterMessagesAsync(chapterDispatch, { chatChapter: chapterId });
      setDeleteMessageModalIsOpen(false);
      notificationHandler('success', message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeletingMessage(false);
    }
  };
}
/**
 *
 * function to edit chat message
 * @export
 * @param {*} messagePayload
 * @param {*} chapterId
 * @param {*} setInterpretModalIsOpen
 * @param {*} chapterDispatch
 * @param {*} setMessageActionType
 * @param {*} setMessagePayload
 * @param {*} characters
 * @return {*}
 */
export function editChatMessageHelper(
  messagePayload,
  chapterId,
  setInterpretModalIsOpen,
  chapterDispatch,
  setMessageActionType,
  setMessagePayload,
  characters,
  setRootModalIsOpen,
  setIsCreating
) {
  return async () => {
    setIsCreating(true);
    const mainCharacter = findMainCharacter(characters);
    try {
      const {
        data: { message },
      } = await chatMessageService.processUpdateChatMessage({
        ...messagePayload,
        chatChapter: chapterId,
        typing: messagePayload.type === 'typing' ? true : false,
        character:
          messagePayload?.type === 'lineBreak' || messagePayload?.type === 'narration'
            ? mainCharacter
            : messagePayload?.character,
      });
      setInterpretModalIsOpen(false);
      notificationHandler('success', message);
      await processGetChapterMessagesAsync(chapterDispatch, { chatChapter: chapterId });
      setRootModalIsOpen(false);
      setMessageActionType('create');
      setMessagePayload(initialPayload);
      setIsCreating(false);
    } catch (error) {
      console.log(error);
      setIsCreating(false);
    }
  };
}

// ================================================= story helper functions end ========================
