import React from 'react';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs({ tabs, setCurrentTab, currentTab }) {
  return (
    <div>
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        <select
          id='tabs'
          name='tabs'
          className='block w-full focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md'
          defaultValue={tabs?.find((tab) => tab?.current)?.name}
          onChange={(event) => setCurrentTab(event.target.value)}
        >
          {tabs?.map((tab) => (
            <option key={tab?.name} value={tab?.name}>
              {tab?.name}
            </option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <nav className='flex space-x-4' aria-label='Tabs'>
          {tabs?.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setCurrentTab(tab?.name, tab)}
              className={classNames(
                tab.name === currentTab
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 font-medium text-sm rounded-md'
              )}
              aria-current={tab?.name === currentTab ? 'page' : undefined}
            >
              {tab?.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
