import { toast } from 'react-toastify';

export const notificationHandler = (type, message) => {
  return toast(message, {
    position: 'top-right',
    type: type,
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};
