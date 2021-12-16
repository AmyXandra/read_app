import React, { useContext } from 'react';
import { StoriesContext } from '../../../context/StoriesContext';
import { toggleDropdownState } from '../../../store/actions/Stories';

export default function Dropdown({ id, buttonName, dropdownBody, direction }) {
  const { state, dispatch } = useContext(StoriesContext);
  const dropdownState = state.dropdownState;

  const toggleDropdown = () => {
    if (dropdownState.id === id) {
      toggleDropdownState(dispatch, 0);
    } else {
      toggleDropdownState(dispatch, id);
    }
  };

  //   function useOutsideAlerter() {
  //     useEffect(() => {
  //       //Alert if clicked on outside of element
  //       function handleClickOutside(event) {
  //         if (ref.current && !ref.current.contains(event.target)) {
  //           console.log('hide nav');
  //         }
  //       }

  //       // Bind the event listener
  //       document.addEventListener('mousedown', handleClickOutside);
  //       return () => {
  //         // Unbind the event listener on clean up
  //         document.removeEventListener('mousedown', handleClickOutside);
  //       };
  //     }, [ref]);
  //   }

  return (
    <div className='relative block'>
      <button
        className='transition items-center duration-300 flex'
        onClick={() => toggleDropdown()}
      >
        {buttonName}
      </button>
      {dropdownState.id === id && (
        <div
          className={`${direction} transition-all z-10 absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex={-4}
        >
          {dropdownBody}
        </div>
      )}
    </div>
  );
}
