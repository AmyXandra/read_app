import storiesType from './../actionTypes/Stories';
import { storiesService } from './../../services/Stories';
import { apiRequestError } from './../../libs/util/ApiRequestError';
import { getStoryRequestProperties } from '../../libs/util/StoryRequestCheck';

const storiesRequest = () => {
  return {
    type: storiesType['STORIES_REQUEST'],
  };
};

const publishedStories = (payload) => {
  return {
    type: storiesType['PUBLISHED_STORIES'],
    payload,
  };
};

const loadMorePublishedStories = (payload) => {
  return {
    type: storiesType['LOAD_MORE_PUBLISHED_STORIES'],
    payload,
  };
};

const unPublishedStories = (payload) => {
  return {
    type: storiesType['UNPUBLISHED_STORIES'],
    payload,
  };
};

const storiesFailure = (errorMsg) => {
  return {
    type: storiesType['UNPUBLISHED_STORIES'],
    payload: errorMsg,
  };
};

export const singleStory = (payload) => {
  return {
    type: storiesType['SINGLE_STORY'],
    payload,
  };
};

export const characterDetails = (payload) => {
  return {
    type: storiesType['CHARACTER_DETAILS'],
    payload,
  };
};

const inReviewStories = (payload) => {
  return {
    type: storiesType['IN_REVIEW_STORIES'],
    payload,
  };
};

const draftStories = (payload) => {
  return {
    type: storiesType['DRAFT_STORIES'],
    payload,
  };
};

const genreStories = (payload) => {
  return {
    type: storiesType['GENRE_STORIES'],
    payload,
  };
};

const genreLoadMoreStories = (payload) => {
  return {
    type: storiesType['LOAD_MORE_GENRE_STORIES'],
    payload,
  };
};

const dropdownState = (payload) => {
  return {
    type: storiesType['DROPDOWN_STATE'],
    payload,
  };
};

const setReadingSettings = (payload) => {
  return {
    type: storiesType['READING_SETTINGS'],
    payload,
  };
};

const formatStory = (data) => {
  return {
    commentCount: data.chatStory.commentCount,
    completeCount: data.chatStory.completeCount,
    readCount: data.chatStory.readCount,
    genre: data.chatStory.genre,
    publishedStatus: data.chatStory.publishedStatus,
    coverImage: data.chatStory.coverImage,
    author: data.author,
    readTime: data.chatStory.readTime,
    likeCount: data.chatStory.likeCount,
    title: data.chatStory.title,
    synopsis: data.chatStory.synopsis,
    wordCount: data.chatStory.wordCount,
    converted: data.converted,
    chatCharacters: data.chatCharacters,
    chatChapters: data.chatChapters,
    draft: data.draft,
    status: data.status,
    comment: data.comment,
    _id: data._id,
    chatStoryId: data.chatStory._id,
    certified: data.certified,
  };
};

/**
 * function to get all published stories
 */
export const processGetPublishedStoriesAsync = async (dispatch, page, type) => {
  dispatch(storiesRequest());
  try {
    let apiResponse;
    if (type === 'all') {
      apiResponse = await storiesService.processGetPublishedStories(page);
    } else {
      apiResponse = await storiesService.processGetMyPublishedStories();
    }
    const stories = apiResponse.data.data;
    const paginationData = apiResponse.data.meta;
    dispatch(publishedStories({ stories, paginationData }));
    return apiResponse.data;
  } catch (getPublishedStoriesError) {
    apiRequestError(getPublishedStoriesError, dispatch, storiesFailure);
  }
};

/**
 * Load more published stories
 */
export const processGetLoadMorePublishedStoriesAsync = async (dispatch, page) => {
  dispatch(storiesRequest());
  try {
    let apiResponse;
    apiResponse = await storiesService.processGetPublishedStories(page);
    const stories = apiResponse.data.data;
    const paginationData = apiResponse.data.meta;
    dispatch(loadMorePublishedStories({ stories, paginationData }));
    return apiResponse.data;
  } catch (getPublishedStoriesError) {
    apiRequestError(getPublishedStoriesError, dispatch, storiesFailure);
  }
};

/**
 * function to get all unpublished stories
 */
export const processGetUnPublishedStoriesAsync = async (dispatch) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processGetUnpublishedStories();
    const stories = data.data;
    const paginationData = data.meta;
    dispatch(unPublishedStories({ stories, paginationData }));
    return data;
  } catch (getUnPublishedStoriesError) {
    apiRequestError(getUnPublishedStoriesError, dispatch, storiesFailure);
  }
};

/**
 * function to get single story details
 */
export const processGetSingleStoryAsync = async (dispatch, storyId) => {
  dispatch(storiesRequest());
  try {
    const { storyStatus, reqType } = getStoryRequestProperties();
    let apiResponse;
    if (storyStatus === 'draft') {
      if (reqType === 'personal') {
        const { data } = await storiesService.processGetPersonalDraftStory(storyId);
        apiResponse = formatStory(data.data);
      } else {
        const { data } = await storiesService.processGetSingleDraftStory(storyId);
        apiResponse = formatStory(data.data);
      }
    } else {
      // const { data } = await storiesService.processGetSingleStory(storyId);
      // console.log('--x-->', data);
      let data = await storiesService.processGetSingleStory(storyId);
      console.log('--x-->', data);
      data = data.data;
      console.log('--y-->', data);
      // data = data.data;
      let fish = data.data;
      console.log('--z-->', fish);
      dispatch(singleStory(fish));
    }
    return apiResponse;
  } catch (getSingleStoryError) {
    apiRequestError(getSingleStoryError, dispatch, storiesFailure);
  }
};

/**
 * function to delete chat story
 */
export const processDeleteChatStory = async (dispatch, { storyID }) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processDeleteStory({ storyID });
    return data;
  } catch (processDeleteStoryError) {
    apiRequestError(processDeleteStoryError, dispatch, storiesFailure);
  }
};

/**
 * function to unpublish a story
 */
export const processUnpublishStoryAsync = async (dispatch, storyId) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processUnPublishStory(storyId);
    return data;
  } catch (processUnpublishStoryError) {
    apiRequestError(processUnpublishStoryError, dispatch, storiesFailure);
  }
};

/**
 * function to publish a story
 */
export const processPublishStoryAsync = async (dispatch, storyId) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processPublishStory(storyId);
    return data;
  } catch (processPublishStoryError) {
    apiRequestError(processPublishStoryError, dispatch, storiesFailure);
  }
};

/**
 * function to update story
 */
export const processUpdateStoryAsync = async (dispatch, payload) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processUpdateStory(payload);
    return data;
  } catch (updateChatStoryError) {
    apiRequestError(updateChatStoryError, dispatch, storiesFailure);
  }
};

/**
 * function to create a story
 */
export const processCreateStoryAsync = async (dispatch, payload) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processCreateStory(payload);
    return data;
  } catch (processCreateStoryError) {
    apiRequestError(processCreateStoryError, dispatch, storiesFailure);
  }
};

/**
 * function to GET in review stories
 */
export const processGetInReviewStoriesAsync = async (dispatch, page, type) => {
  dispatch(storiesRequest());
  try {
    let apiResponse;
    if (type === 'all') {
      apiResponse = await storiesService.processGetInReviewStories(page);
    } else {
      apiResponse = await storiesService.processGetMyInReviewStories(page);
    }
    const stories = apiResponse.data.data;
    const paginationData = apiResponse.data.meta;
    dispatch(inReviewStories({ stories, paginationData }));
    return apiResponse.data;
  } catch (createStoryError) {
    apiRequestError(createStoryError, dispatch, storiesFailure);
  }
};

/**
 * function to get draft stories
 */
export const processGetChatStoryDraftAsync = async (dispatch, page, type) => {
  dispatch(storiesRequest());
  try {
    let apiResponse;
    if (type === 'all') {
      apiResponse = await storiesService.processGetChatStoryDrafts(page);
    } else {
      apiResponse = await storiesService.processGetMyChatStoryDrafts(page);
    }
    const stories = apiResponse.data.data;
    const paginationData = apiResponse.data.meta;
    dispatch(draftStories({ stories, paginationData }));
    return apiResponse.data;
  } catch (createStoryError) {
    apiRequestError(createStoryError, dispatch, storiesFailure);
  }
};

/**
 * function to update a draft story
 */
export const processUpdateChatStoryDraftAsync = async (dispatch, payload) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processUpdateChatStoryDraft(payload);
    return data;
  } catch (updateChatStoryDraftError) {
    apiRequestError(updateChatStoryDraftError, dispatch, storiesFailure);
  }
};

/**
 * function to submit chat story draft for review
 */
export const processSubmitStoryDraftAsync = async (dispatch, payload) => {
  dispatch(storiesRequest());
  try {
    processUpdateChatStoryDraftAsync(dispatch, payload);
    const { data } = await storiesService.processSubmitChatStoryDraft(payload);
    return data;
  } catch (submitChatStoryDraftError) {
    apiRequestError(submitChatStoryDraftError, dispatch, storiesFailure);
  }
};

/**
 * function to unsubmit chat story draft for review
 */
export const processUnsubmitChatStoryDraftAsync = async (dispatch, payload) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processUnsubmitChatStoryDraft(payload);
    return data;
  } catch (unsubmitChatStoryDraftError) {
    apiRequestError(unsubmitChatStoryDraftError, dispatch, storiesFailure);
  }
};

/**
 * function to approve chat story draft
 */
export const processApproveChatStoryDraftAsync = async (dispatch, payload) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processApproveChatStoryDraft(payload);
    return data;
  } catch (approveChatStoryDraftError) {
    apiRequestError(approveChatStoryDraftError, dispatch, storiesFailure);
  }
};

/**
 * function to start chat story draft review
 */
export const processStartChatStoryDraftReviewAsync = async (dispatch, payload) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processStartChatStoryDraftReview(payload);
    return data;
  } catch (startChatStoryDraftReviewError) {
    apiRequestError(startChatStoryDraftReviewError, dispatch, storiesFailure);
  }
};

/**
 * function to convert chat story draft
 */
export const processConvertChatStoryDraftAsync = async (dispatch, payload) => {
  dispatch(storiesRequest());
  try {
    processUpdateChatStoryDraftAsync(dispatch, payload);
    const { data } = await storiesService.processConvertChatStoryDraft(payload);
    return data;
  } catch (convertChatStoryDraftError) {
    apiRequestError(convertChatStoryDraftError, dispatch, storiesFailure);
  }
};

/**
 * function to comment on chat story draft
 */
export const processCommentOnChatStoryDraftAsync = async (dispatch, payload) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processCommentOnChatStoryDraft(payload);
    return data;
  } catch (commentOnChatStoryDraftError) {
    apiRequestError(commentOnChatStoryDraftError, dispatch, storiesFailure);
  }
};

/**
 * function to complete review on chat story draft
 */
export const processCompleteChatStoryDraftReviewAsync = async (dispatch, storyId) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processCompleteChatStoryDraftReview(storyId);
    return data;
  } catch (completeChatStoryDraftError) {
    apiRequestError(completeChatStoryDraftError, dispatch, storiesFailure);
  }
};

/**
 * function to publish chat story draft
 */
export const processPublishChatStoryDraftAsync = async (dispatch, payload) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processPublishChatStoryDraft(payload);
    return data;
  } catch (publishChatStoryDraftError) {
    apiRequestError(publishChatStoryDraftError, dispatch, storiesFailure);
  }
};

/**
 * increment story count
 */
export const processIncrementStoryReadCountAsync = async (dispatch, chatId, deviceId) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processIncrementStoryReadCountAsync(chatId, deviceId);
    return data;
  } catch (processIncrementStoryReadCountError) {
    apiRequestError(processIncrementStoryReadCountError, dispatch, storiesFailure);
  }
};

/**
 * increment complete count
 */
export const processIncrementStoryCompleteCountAsync = async (dispatch, storyId, deviceId) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processIncrementStoryCompleteCountAsync(
      storyId,
      deviceId
    );
    return data;
  } catch (processIncrementStoryCompleteCountError) {
    apiRequestError(processIncrementStoryCompleteCountError, dispatch, storiesFailure);
  }
};

/**
 * get category stories by id
 */
export const processGetStoryByGenre = async (dispatch, genreId, page) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processGetStoryByGenre(genreId, page);
    const stories = data.data;
    const paginationData = data.meta;
    dispatch(genreStories({ stories, paginationData }));
    return data;
  } catch (processGetStoryByGenreError) {
    apiRequestError(processGetStoryByGenreError, dispatch, storiesFailure);
  }
};

/**
 * get category stories by id
 */
export const processGetLoadMoreStoryByGenre = async (dispatch, genreId, page) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processGetStoryByGenre(genreId, page);
    const stories = data.data;
    const paginationData = data.meta;
    dispatch(genreLoadMoreStories({ stories, paginationData }));
    return data;
  } catch (processGetStoryByGenreError) {
    apiRequestError(processGetStoryByGenreError, dispatch, storiesFailure);
  }
};

/**
 * get category stories by id
 */
export const processGetUserChatStoryProgressAsync = async (dispatch, payload) => {
  dispatch(storiesRequest());
  try {
    const { data } = await storiesService.processGetUserChatStoryProgressAsync(payload);
    return data;
  } catch (processIncrementStoryCompleteCountError) {
    apiRequestError(processIncrementStoryCompleteCountError, dispatch, storiesFailure);
  }
};

export const toggleDropdownState = (dispatch, id) => {
  dispatch(dropdownState({ id }));
};

export const processSetReadingSettings = (dispatch, payload) => {
  dispatch(setReadingSettings(payload));
};
