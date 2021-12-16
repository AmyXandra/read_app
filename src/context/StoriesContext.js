import React, { createContext, useReducer } from 'react';
import { storiesReducer } from './../store/reducer/Stories';

export const StoriesContext = createContext();

const StoriesContextProvider = ({ children }) => {
  const initialState = {
    loading: true,
    publishedStories: null,
    unPublishedStories: null,
    inReviewStories: null,
    draftStories: null,
    error: null,
    singleStory: {},
    genreStories: null,
    categoryCover: null,
    dropdownState: 0,
    readingSettings: null,
  };

  const [state, dispatch] = useReducer(storiesReducer, initialState);
  return <StoriesContext.Provider value={{ state, dispatch }}>{children}</StoriesContext.Provider>;
};

export default StoriesContextProvider;
