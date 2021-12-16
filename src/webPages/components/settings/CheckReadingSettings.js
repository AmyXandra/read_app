import { useContext, useEffect } from 'react';
import { processSetReadingSettings } from '../../../store/actions/Stories';
import { StoriesContext } from '../../../context/StoriesContext';

export default function CheckReadingSettings() {
  const { dispatch } = useContext(StoriesContext);
  let readingSettings = JSON.parse(localStorage.getItem('READING_SETTINGS'));
  useEffect(() => {
    processSetReadingSettings(dispatch, readingSettings);
  }, []);
  return { readingSettings };
}
