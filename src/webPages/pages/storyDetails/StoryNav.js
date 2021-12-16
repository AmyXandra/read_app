import React from 'react';
import ChapterDropdown from '../../components/ChapterDropdown';
import ReadingSettings from '../../components/settings/ReadingSettings';
import StickyNav from '../../components/StickyNav';

export default function ChapterNav({
  currentChapterId,
  setCurrentChapterId = () => {},
  setNextChapter = () => {},
  setShowFooter = () => {},
}) {
  const { navRef, isSticky } = StickyNav();
  return (
    <div>
      {isSticky && (
        <div
          className='bg-black py-2 sticky'
          style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
        >
          <div className='max-w-7xl mx-auto text-white flex justify-between items-center px-4'>
            <ChapterDropdown
              currentChapterId={currentChapterId}
              setCurrentChapterId={setCurrentChapterId}
              setShowFooter={setShowFooter}
            />
            <ReadingSettings />
          </div>
        </div>
      )}
      <div ref={navRef}>
        {/* navRef */}
        <div className='bg-black py-2'>
          <div className='max-w-7xl mx-auto text-white flex justify-between items-center px-4'>
            <ChapterDropdown
              currentChapterId={currentChapterId}
              setCurrentChapterId={setCurrentChapterId}
              setNextChapter={setNextChapter}
            />
            <ReadingSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
