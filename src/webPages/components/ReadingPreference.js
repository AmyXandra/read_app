import React, { useEffect, useState } from 'react';
import CheckReadingSettings from '../components/settings/CheckReadingSettings';
import { getUserReadingHistory } from '../utils/Cookies';
import { useParams } from 'react-router-dom';

export default function ReadingPreference({ setReadingPreference = () => {} }) {
  const { storyId } = useParams();
  const { readingSettings } = CheckReadingSettings();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    setSelected(readingSettings);
  }, [readingSettings]);

  const setReadingSettings = (setting) => {
    localStorage.setItem('READING_SETTINGS', JSON.stringify(setting));
    //also set this in the context
    setReadingPreference(false);
  };

  const [userReading, setUserReading] = useState(false);
  useEffect(() => {
    let readHistory = getUserReadingHistory();
    if (readHistory) {
      let i = JSON.parse(readHistory).filter((item) => item.name === storyId);
      if (i.length > 0) {
        setUserReading(true);
      }
    } else {
      setUserReading(false);
    }
  }, []);

  return (
    <div>
      {selected ? (
        !userReading ? (
          <div className='mb-8 mt-20 max-w-4xl mx-auto relative'>
            {readingSettings === 'click' && (
              <p className='text-center text-white italic capitalize'>
                {readingSettings} anywhere to read this story
              </p>
            )}
          </div>
        ) : (
          <div />
        )
      ) : (
        <div className='mb-8 mt-20 max-w-4xl mx-auto z-10 relative'>
          <p className='text-center text-white'>Choose your reading preference:</p>
          <div className='flex justify-center mt-4'>
            <button
              onClick={() => setReadingSettings('click')}
              className='py-2 px-3 bg-white rounded text-primary font-semibold mx-3'
            >
              Tap to Read
            </button>
            {/* <button
              onClick={() => setReadingSettings('scroll')}
              className='py-2 px-3 bg-white rounded text-primary font-semibold mx-3'
            >
              Scroll to Read
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
