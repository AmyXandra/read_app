import chapterType from './../actionTypes/Chapter';
import { apiRequestError } from './../../libs/util/ApiRequestError';
import { chapterService } from './../../services/Chapter';

const chapterRequest = () => {
  return {
    type: chapterType['CHAPTER_REQUEST'],
  };
};

export const chapterDetails = (payload) => {
  return {
    type: chapterType['CHAPTER_DETAILS'],
    payload,
  };
};

export const chapterMessages = (payload) => {
  return {
    type: chapterType['CHAPTER_MESSAGES'],
    payload,
  };
};

const chapterFailure = (errorMsg) => {
  return {
    type: chapterType['CHAPTER_ERROR'],
    payload: errorMsg,
  };
};

export const chapterComments = (payload) => {
  return {
    type: chapterType['CHAPTER_COMMENTS'],
    payload,
  };
};

/**
 * Get chapter messages using chapter id as params
 */
export const processGetChapterMessagesAsync = async (dispatch, params) => {
  dispatch(chapterRequest());
  try {
    const { data } = await chapterService.processGetChapterMessages(params);
    const chatMessages = data.data;
    const paginationData = data.meta;
    dispatch(chapterMessages({ chatMessages, paginationData }));
    return data;
  } catch (getChapterMessagesError) {
    apiRequestError(getChapterMessagesError, dispatch, chapterFailure);
  }
};

/**
 * publish chapter
 */
export const processPublishChapterAsync = async (dispatch, chapterId) => {
  dispatch(chapterRequest());
  try {
    const { data } = await chapterService.processPublishChapter(chapterId);
    return data;
  } catch (processPublishChapterError) {
    apiRequestError(processPublishChapterError, dispatch, chapterFailure);
  }
};

/**
 * unpublish chapter
 */
export const processUnPublishChapterAsync = async (dispatch, chapterId) => {
  dispatch(chapterRequest());
  try {
    const { data } = await chapterService.processUnPublishChapter(chapterId);
    return data;
  } catch (processUnPublishChapterError) {
    apiRequestError(processUnPublishChapterError, dispatch, chapterFailure);
  }
};

/**
 * delete chapter
 */
export const processDeleteChapterAsync = async (dispatch, chapterId) => {
  dispatch(chapterRequest());
  try {
    const { data } = await chapterService.processDeleteChapter(chapterId);
    return data;
  } catch (processDeleteChapterError) {
    apiRequestError(processDeleteChapterError, dispatch, chapterFailure);
  }
};

/**
 * Get chapter messages using chapter id as params
 */
export const processGetChapterCommentsAsync = async (dispatch, chapterId) => {
  dispatch(chapterRequest());
  try {
    const { data } = await chapterService.processGetChapterCommentsAsync(chapterId);
    const comments = data.data;
    const paginationData = data.meta;
    dispatch(chapterComments({ comments, paginationData }));
    return data;
  } catch (getChapterMessagesError) {
    apiRequestError(getChapterMessagesError, dispatch, chapterFailure);
  }
};
