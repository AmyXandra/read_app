// requestType can be personal or general
export const setStoryRequestProperties = (status, requestType) => {
  localStorage.setItem('storyRequestType', requestType);
  localStorage.setItem('storyStatus', status);
};

export const getStoryRequestProperties = () => {
  const reqType = localStorage.getItem('storyRequestType');
  const storyStatus = localStorage.getItem('storyStatus');
  return { storyStatus, reqType };
};
