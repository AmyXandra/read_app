import storiesType from './../actionTypes/Stories';

export const storiesReducer = (state, action) => {
  switch (action.type) {
    case storiesType.STORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case storiesType.PUBLISHED_STORIES:
      return {
        ...state,
        loading: false,
        publishedStories: { ...action.payload },
        error: null,
      };
    case storiesType.LOAD_MORE_PUBLISHED_STORIES:
      return {
        ...state,
        loading: false,
        publishedStories: {
          ...state.publishedStories,
          stories: [...state.publishedStories.stories, ...action.payload.stories],
        },
        error: null,
      };
    case storiesType.UNPUBLISHED_STORIES:
      return {
        ...state,
        loading: false,
        unPublishedStories: { ...action.payload },
        error: null,
      };
    case storiesType.IN_REVIEW_STORIES:
      return {
        ...state,
        loading: false,
        inReviewStories: { ...action.payload },
        error: null,
      };
    case storiesType.DRAFT_STORIES:
      return {
        ...state,
        loading: false,
        draftStories: { ...action.payload },
        error: null,
      };
    case storiesType.SINGLE_STORY:
      return {
        ...state,
        singleStory: { ...action.payload },
        error: null,
        loading: false,
      };
    case storiesType.STORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        publishedStories: null,
        unpublishedStories: null,
      };
    case storiesType.CHARACTER_DETAILS:
      return {
        ...state,
        loading: false,
        error: null,
        characterDetails: { ...action.payload },
      };
    case storiesType.GENRE_STORIES:
      return {
        ...state,
        loading: false,
        error: null,
        genreStories: { ...action.payload },
      };
    case storiesType.LOAD_MORE_GENRE_STORIES:
      return {
        ...state,
        loading: false,
        error: null,
        genreStories: {
          ...state.genreStories,
          stories: [...state.genreStories.stories, ...action.payload.stories],
        },
      };
    case storiesType.DROPDOWN_STATE:
      return {
        ...state,
        dropdownState: { ...action.payload },
      };
    case storiesType.READING_SETTINGS:
      return {
        ...state,
        readingSettings: action.payload,
      };
    default:
      return state;
  }
};
