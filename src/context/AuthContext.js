import React, { createContext, useReducer } from 'react';
import { authReducer } from './../store/reducer/Auth';
import { getUserFromCookies } from './../libs/util/Auth';
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const initialState = {
    loading: true,
    user: {},
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState, () => {
    const userDetails = getUserFromCookies();
    return {
      loading: true,
      user: userDetails ? userDetails : {},
      error: null,
    };
  });

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
