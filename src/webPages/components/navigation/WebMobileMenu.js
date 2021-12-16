import React, { useContext } from 'react';
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import { isAuthenticatedUser } from '../../../libs/util/Auth';
import ApplePlay from '../../../assets/images/apple-play.jpg';
import GooglePlay from '../../../assets/images/google-play.jpg';
import LoginModal from '../modals/authModal/LoginModal';
import { AuthContext } from '../../../context/AuthContext';
import UserProfileImage from '../UserProfileImage';
import { useHistory } from 'react-router-dom';
import Dropdown from '../dropdown/Dropdown';

export default function WebMobileMenu({
  isHidden,
  toggleDropdown = () => {},
  toggleMenu = () => {},
  genres,
  user_rank = () => {},
  modalIsOpen,
  toggleModal = () => {},
}) {
  //Get user roles
  const {
    state: { user },
  } = useContext(AuthContext);
  const history = useHistory();

  //Push to new route on category click
  const pushToRoute = (genre) => {
    history.push({
      pathname: `/category/${genre._id}`,
      state: genre,
    });
    toggleDropdown();
    toggleMenu();
  };

  return (
    <div className={`${isHidden ? 'mobile-menu relative' : 'hidden mobile-menu relative'}`}>
      <div className='mb-10 flex items justify-end'>
        <button className='outline-none rounded-full p-3 close' onClick={() => toggleMenu()}>
          <XIcon className='h-6 w-6 text-primary' />
        </button>
      </div>
      {isAuthenticatedUser() && (
        <div className='mb-5 flex text-gray-900' role='none'>
          <UserProfileImage data={user} />
          <div className='flex flex-col ml-2'>
            <span>{user.name}</span>
            <span>{user.username}</span>
          </div>
        </div>
      )}
      <ul>
        <li className='active'>
          <a href='/browse/1' className='py-4 flex hover:text-primary'>
            BROWSE STORIES
          </a>
        </li>
        <li>
          <Dropdown
            id={3}
            direction={''}
            buttonName={
              <>
                CATEGORIES
                <ChevronDownIcon className='h-4 w-4 ml-1' />
              </>
            }
            dropdownBody={
              <div className='py-2 mobile-dropdown' role='none'>
                {genres &&
                  genres?.data.map((genre) => {
                    return (
                      <span
                        className='text-gray-700 block px-4 py-2 cursor-pointer'
                        id={genre._id}
                        key={genre._id}
                        onClick={() => pushToRoute(genre)}
                      >
                        {genre.name}
                      </span>
                    );
                  })}
              </div>
            }
          />
          {/* <div className='transition-all mt-2 w-56 rounded' /> */}
        </li>
        {isAuthenticatedUser() && user_rank() && (
          <li>
            <a href='/my-stories' className='py-4 flex hover:text-primary'>
              MY STORIES
            </a>
          </li>
        )}
      </ul>

      {!isAuthenticatedUser() && (
        <div className='flex flex-col items-center mt-32 w-80 mx-auto'>
          <div className='flex justify-between self-stretch'>
            <a
              href='https://play.google.com/store/apps/details?id=com.whipiktales'
              target='_blank'
              rel='noreferrer'
            >
              <img className='w-36' src={GooglePlay} alt='GooglePlay' />
            </a>
            <a
              href='https://apps.apple.com/us/app/whipik-stories/id1539338341'
              target='_blank'
              rel='noreferrer'
            >
              <img className='w-36' src={ApplePlay} alt='ApplePlay' />
            </a>
          </div>

          <div className='mt-16'>
            <LoginModal
              rootModalIsOpen={modalIsOpen}
              setRootModalIsOpen={() => toggleModal()}
              setRootModalIsClosed={() => toggleModal()}
              className='py-3 px-16'
            />
          </div>
        </div>
      )}
    </div>
  );
}
