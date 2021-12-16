import React from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const ToggleStoryChapterStatus = ({ currentChapter, toggleChapterStatus }) => {
  const setSwitchClass = (storyStatus, type) => {
    if (type === 'bgColor') {
      return storyStatus === 'published' ? 'bg-orange-600' : 'bg-gray-200';
    }
    return storyStatus === 'published' ? 'translate-x-5' : 'translate-x-0';
  };

  const checkStoryPublishedStatus = (storyStatus) => {
    return storyStatus === 'published' ? true : false;
  };

  return (
    <Switch.Group as='div' className='flex items-center'>
      <Switch
        onChange={() => toggleChapterStatus(currentChapter.publishedStatus)}
        checked={checkStoryPublishedStatus(currentChapter.publishedStatus)}
        className={`${setSwitchClass(
          currentChapter.publishedStatus,
          'bgColor'
        )} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
      >
        <span className='sr-only'>Use setting</span>
        <span
          aria-hidden='true'
          className={classNames(
            setSwitchClass(currentChapter.publishedStatus),
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
      <Switch.Label as='span' className='ml-3'>
        <span className='text-base font-medium text-gray-900 capitalize'>
          {currentChapter.publishedStatus}
        </span>
      </Switch.Label>
    </Switch.Group>
  );
};

export default ToggleStoryChapterStatus;
