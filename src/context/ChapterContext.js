import React, { createContext, useReducer } from 'react';
import { chapterReducer } from './../store/reducer/Chapter';

export const ChapterContext = createContext();

const ChapterContextProvider = ({ children }) => {
  const initialState = {
    loading: true,
    chatMessages: null,
    error: null,
    chapterComments: null,
  };

  const [state, dispatch] = useReducer(chapterReducer, initialState);

  return <ChapterContext.Provider value={{ state, dispatch }}>{children}</ChapterContext.Provider>;
};

export default ChapterContextProvider;
