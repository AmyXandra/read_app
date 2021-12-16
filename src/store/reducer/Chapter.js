import chapterType from './../actionTypes/Chapter';

export const chapterReducer = (state, action) => {
  switch (action.type) {
    case chapterType.CHAPTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case chapterType.CHAPTER_MESSAGES:
      return {
        ...state,
        loading: false,
        chapterMessages: { ...action.payload },
        error: null,
      };
    case chapterType.CHAPTER_DETAILS:
      return {
        ...state,
        loading: false,
        chapterDetails: { ...action.payload },
        error: null,
      };
    case chapterType.CHAPTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case chapterType.CHAPTER_COMMENTS:
      return {
        ...state,
        loading: false,
        chapterComments: { ...action.payload },
        error: null,
      };
    default:
      return state;
  }
};
