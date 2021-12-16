export function apiRequestError(error, dispatch, callback) {
  if (error.response) {
    dispatch(callback(error.response.data.message));
    throw new Error(error.response.data.message);
  } else if (error.request) {
    dispatch(callback('Something went wrong'));
    throw error;
  } else {
    dispatch(callback('network error'));
    throw error;
  }
}
