import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export function setDeviceId() {
  Cookies.set('deviceId', uuidv4());
}

export function getDeviceId() {
  const deviceId = Cookies.get('deviceId');
  return deviceId ? deviceId : null;
}

export function setUserReadingHistory(name, chapterId, readCount, complete) {
  let userLibraryItem = {
    name: name,
    chapterId: chapterId,
    readCount: readCount,
    complete: complete,
  };
  //check if cookies exist
  const match = Cookies.get('userReadingHistory');
  //check if object exists in cookie
  if (!match) {
    Cookies.set('userReadingHistory', JSON.stringify([userLibraryItem]));
    return;
  } else {
    //get cookies
    let storedValue = JSON.parse(match);
    let newValue;
    if (userLibraryItem && storedValue) {
      /* if contains the object we're looking for */
      let i = storedValue.filter((item) => item.chapterId === userLibraryItem?.chapterId);
      if (i.length > 0) {
        newValue = storedValue.map((x) =>
          x.chapterId === userLibraryItem?.chapterId
            ? { ...x, readCount: userLibraryItem.readCount }
            : x
        );
        Cookies.set('userReadingHistory', JSON.stringify(newValue));
        return;
      } else {
        newValue = storedValue.concat([userLibraryItem]);
        Cookies.set('userReadingHistory', JSON.stringify(newValue));
      }
      return;
    }

    return;
  }
}

export function getUserReadingHistory() {
  //check if cookies exist
  const match = Cookies.get('userReadingHistory');
  //check if object exists in cookie
  if (!match) {
    return;
  }
  return match;
}
