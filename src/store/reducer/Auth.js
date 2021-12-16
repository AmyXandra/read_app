import authType from './../actionTypes/Auth';

export const authReducer = (state, action) => {
  switch (action.type) {
    case authType.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        user: null,
      };
    case authType.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...action.payload },
        error: null,
      };
    case authType.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
