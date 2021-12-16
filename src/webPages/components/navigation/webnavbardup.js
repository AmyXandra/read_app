import React, { useState, useContext, useRef, useEffect } from 'react';
import AuthLogo from '../../../assets/images/whipik-logo.png';
import LoginModal from '../modals/authModal/LoginModal';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { genreService } from '../../../services/Genres';
import { useFetch } from '../../../customHooks/UseFetch';
import { isAuthenticatedUser } from '../../../libs/util/Auth';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import WebMobileMenu from './WebMobileMenu';
import UserProfileImage from '../UserProfileImage';
import { removeUserFromCookies } from '../../../libs/util/Auth';
import Dropdown from '../dropdown/Dropdown';

export default function WebNavbar() {
  const history = useHistory();
  const [isHidden, setIsHidden] = useState(false);
  //open and close mobile menu states
  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };
  //open and close dropdown states
  const [openDropdown, setOpenDropdown] = useState(false);
  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  //open and close mobile menu dropdown states
  // const [menuDropdown, setMenuDropdown] = useState(false);
  // const toggleMenuDropdown = () => {
  //   setMenuDropdown(!menuDropdown);
  // };
  //open and close modal states
  const [modalIsOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  //Hook that checks clicks outside of the passed ref
  const wrapperRef = useRef(null);
  // const wrapperRef2 = useRef(null);
  // useOutsideAlerter(wrapperRef);
  // useOutsideAlerter(wrapperRef2);

  // function useOutsideAlerter(ref) {
  //   useEffect(() => {
  //     //Alert if clicked on outside of element
  //     function handleClickOutside(event) {
  //       if (ref.current && !ref.current.contains(event.target)) {
  //         setOpenDropdown(false);
  //         setMenuDropdown(false);
  //       }
  //     }

  //     // Bind the event listener
  //     document.addEventListener('mousedown', handleClickOutside);
  //     return () => {
  //       // Unbind the event listener on clean up
  //       document.removeEventListener('mousedown', handleClickOutside);
  //     };
  //   }, [ref]);
  // }

  function onClickOutside(event) {
    console.log('gf');
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpenDropdown(false);
      // setMenuDropdown(false);
    }
  }

  useEffect(() => {
    document.current?.addEventListener('mousedown', onClickOutside);
    return () => {
      document.current?.removeEventListener('mousedown', onClickOutside);
    };
  });

  //Push to new route on category click
  const pushToRoute = (genre) => {
    history.push({
      pathname: `/category/${genre._id}`,
      state: genre,
    });
    setOpenDropdown(false);
  };

  //Get user roles
  const {
    state: { user },
  } = useContext(AuthContext);

  const user_rank = () => {
    if (user?.roles.includes('Writer' || 'superadmin' || 'ContentManager')) {
      return true;
    } else {
      return false;
    }
  };

  //Get list of genre
  const { data: genres } = useFetch(genreService.processGetGenres);

  //Log user out
  const logoutUserHandler = () => {
    removeUserFromCookies();
    history.push('/browse/1');
  };

  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto'>
        <nav className='relative'>
          <div className='max-w-7xl mx-auto px-4 py-2'>
            <div className='flex justify-between align-center'>
              <div className='flex space-x-4'>
                {/* Mobile menu button */}
                <div className='lg:hidden flex items-center'>
                  <button className='outline-none mobile-menu-button' onClick={() => toggleMenu()}>
                    <svg
                      width={24}
                      height={15}
                      viewBox='0 0 24 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M0 0.75C0 0.335786 0.335786 0 0.75 0H23.25C23.6642 0 24 0.335786 24 0.75C24 1.16421 23.6642 1.5 23.25 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75ZM7.5 7.49995C7.5 7.08574 7.83579 6.74995 8.25 6.74995H23.25C23.6642 6.74995 24 7.08574 24 7.49995C24 7.91417 23.6642 8.24995 23.25 8.24995H8.25C7.83579 8.24995 7.5 7.91417 7.5 7.49995ZM0.75 13.4999C0.335786 13.4999 0 13.8357 0 14.2499C0 14.6641 0.335786 14.9999 0.75 14.9999H23.25C23.6642 14.9999 24 14.6641 24 14.2499C24 13.8357 23.6642 13.4999 23.25 13.4999H0.75Z'
                        fill='#212D40'
                      />
                    </svg>
                  </button>
                </div>

                {/* Website Logo */}
                <div>
                  <a href='/browse'>
                    <img className='block h-auto w-16 sm:w-20' src={AuthLogo} alt='Logo' />
                  </a>
                </div>

                {/* Primary Navbar items */}
                <div className='hidden lg:flex items-center space-x-1'>
                  <a href='/browse' className='py-4 px-4 text-black font-bold hover:text-primary'>
                    Browse Stories
                  </a>
                  <div className='relative' ref={wrapperRef}>
                    <button
                      className='py-4 px-4 text-black flex items-center hover:text-primary transition duration-300'
                      onClick={() => toggleDropdown()}
                    >
                      Categories
                      <ChevronDownIcon className='h-4 w-4' />
                    </button>
                    {openDropdown && (
                      <div
                        className='transition-all z-10 origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'
                        role='menu'
                        aria-orientation='vertical'
                        aria-labelledby='menu-button'
                        tabIndex={-4}
                      >
                        <div className='py-1' role='none'>
                          {genres &&
                            genres?.data.map((genre) => {
                              return (
                                <span
                                  className='text-gray-700 block px-4 py-2 text-sm cursor-pointer'
                                  id={genre._id}
                                  key={genre._id}
                                  onClick={() => pushToRoute(genre)}
                                >
                                  {genre.name}
                                </span>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Search Bar */}
                {/* <div className='hidden lg:flex relative inline-flex text-gray-600 py-4'>
                  <input
                    className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                    type='search'
                    name='search'
                    placeholder='Search stories...'
                  />
                  <button type='submit' className='absolute right-0 top-0 mt-7 mr-4'>
                    <svg
                      className='text-gray-600 h-4 w-4 fill-current'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      version='1.1'
                      id='Capa_1'
                      x='0px'
                      y='0px'
                      viewBox='0 0 56.966 56.966'
                      style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                      xmlSpace='preserve'
                      width='512px'
                      height='512px'
                    >
                      <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
                    </svg>
                  </button>
                </div> */}
              </div>
              {/* Secondary Navbar items */}
              <div className='flex items-center space-x-3 '>
                <a
                  href='https://apps.apple.com/us/app/whipik-stories/id1539338341'
                  className='hidden lg:flex py-2 px-2'
                  target='_blank'
                  rel='noreferrer'
                >
                  <svg
                    width='21'
                    height='24'
                    viewBox='0 0 21 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M20.1012 17.524C19.682 18.823 19.0738 20.0532 18.2962 21.175L18.3262 21.129C17.0855 23.0137 15.8502 23.956 14.6202 23.956C13.911 23.908 13.2142 23.7466 12.5562 23.478L12.6002 23.494C11.911 23.2126 11.1772 23.0565 10.4332 23.033H10.4222C9.70255 23.0592 8.99498 23.2256 8.33916 23.523L8.37416 23.509C7.78159 23.7915 7.14035 23.9579 6.48516 23.999L6.47016 24C5.00883 24 3.5615 22.755 2.12816 20.265C0.80131 18.0797 0.0703596 15.5848 0.00816184 13.029V13.009C-0.0768225 11.0679 0.503916 9.15594 1.65416 7.59L1.63716 7.614C2.10078 6.97027 2.71078 6.44597 3.41685 6.08432C4.12293 5.72268 4.90486 5.53405 5.69816 5.534H5.73516H5.73316C6.62359 5.56216 7.50574 5.71429 8.35416 5.986L8.28616 5.967C8.91803 6.18245 9.57215 6.32602 10.2362 6.395L10.2772 6.399C11.0025 6.33738 11.7142 6.1661 12.3882 5.891L12.3402 5.908C13.1354 5.61334 13.9726 5.44791 14.8202 5.418H14.9052C15.9852 5.41628 17.0394 5.74767 17.9242 6.367L17.9072 6.356C18.4792 6.772 18.9732 7.246 19.3952 7.78L19.4072 7.796C18.7975 8.28586 18.251 8.8495 17.7802 9.474L17.7632 9.498C17.1502 10.3623 16.8223 11.3964 16.8252 12.456V12.485V12.484V12.546C16.8252 13.727 17.1982 14.821 17.8322 15.717L17.8202 15.7C18.3446 16.5399 19.1364 17.1789 20.0682 17.514L20.0992 17.524H20.1012ZM14.6782 0.606C14.6601 1.29312 14.5136 1.9708 14.2462 2.604L14.2602 2.568C13.9537 3.31628 13.4978 3.99413 12.9202 4.56L12.9192 4.561C12.4941 5.01639 11.9708 5.36897 11.3892 5.592L11.3612 5.601C10.8786 5.7299 10.3846 5.81128 9.88616 5.844L9.86116 5.845V5.817C9.86116 4.445 10.2812 3.17 11.0002 2.116L10.9852 2.139C11.8679 1.00699 13.142 0.245851 14.5572 0.005L14.5912 0C14.6042 0.043 14.6172 0.097 14.6262 0.152L14.6272 0.16C14.6372 0.223 14.6502 0.277 14.6662 0.33L14.6632 0.32C14.6632 0.358667 14.6655 0.406667 14.6702 0.464C14.6748 0.521333 14.6772 0.568667 14.6772 0.606H14.6782Z'
                      fill='black'
                    />
                  </svg>
                </a>
                <a
                  href='https://play.google.com/store/apps/details?id=com.whipiktales'
                  className='hidden lg:flex py-2 px-2'
                  target='_blank'
                  rel='noreferrer'
                >
                  <svg
                    width='22'
                    height='24'
                    viewBox='0 0 22 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M0 0.257945V23.7421C0.000157331 23.793 0.0153536 23.8428 0.0436834 23.8851C0.0720132 23.9275 0.112215 23.9605 0.159248 23.9801C0.206282 23.9997 0.258052 24.005 0.308069 23.9953C0.358085 23.9855 0.40412 23.9613 0.440402 23.9255L12.6683 12.0006L0.440402 0.0744936C0.40412 0.0387221 0.358085 0.0144585 0.308069 0.00474538C0.258052 -0.00496775 0.206282 0.00030201 0.159248 0.0198939C0.112215 0.0394857 0.0720132 0.0725276 0.0436834 0.114876C0.0153536 0.157224 0.000157331 0.206994 0 0.257945Z'
                      fill='url(#paint0_linear_6619:2125)'
                    />
                    <path
                      d='M15.7225 8.48553L0.390318 0.038422L0.380757 0.033044C0.116636 -0.11037 -0.13434 0.246971 0.0819772 0.454921L12.1007 11.9472L15.7225 8.48553Z'
                      fill='#0AEA78'
                    />
                    <path
                      d='M0.0826776 23.5403C-0.134834 23.7483 0.116141 24.1056 0.381458 23.9622L0.391018 23.9568L15.722 15.5097L12.1002 12.0469L0.0826776 23.5403Z'
                      fill='#EF3D4F'
                    />
                    <path
                      d='M20.3542 10.3892L16.0726 8.03125L12.0469 11.8831L16.0726 15.7332L20.3542 13.377C21.5188 12.7335 21.5188 11.0328 20.3542 10.3892Z'
                      fill='#FFBC00'
                    />
                    <defs>
                      <linearGradient
                        id='paint0_linear_6619:2125'
                        x1='6.33414'
                        y1='0'
                        x2='6.33414'
                        y2='24'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stopColor='#00B4EB' />
                        <stop offset='1' stopColor='#38E8FF' />
                      </linearGradient>
                    </defs>
                  </svg>
                </a>
                {!isAuthenticatedUser() && (
                  <LoginModal
                    rootModalIsOpen={modalIsOpen}
                    setRootModalIsOpen={() => toggleModal()}
                    setRootModalIsClosed={() => toggleModal()}
                    title='Login or Signup'
                  />
                )}
                {isAuthenticatedUser() && (
                  // <div className='relative block' ref={wrapperRef2}>
                  //   <button
                  //     className='transition items-center duration-300 flex'
                  //     onClick={() => toggleMenuDropdown()}
                  //   >
                  //     <UserProfileImage data={user} />
                  //     <ChevronDownIcon className='h-4 w-4' />
                  //   </button>
                  //   {menuDropdown && (
                  //     <div
                  //       className='transition-all z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'
                  //       role='menu'
                  //       aria-orientation='vertical'
                  //       aria-labelledby='menu-button'
                  //       tabIndex={-4}
                  //     >
                  //       <div className='py-1 px-4 flex bg-gray-100 text-gray-900' role='none'>
                  //         <UserProfileImage data={user} />
                  //         <div className='flex flex-col ml-2'>
                  //           <span>{user.name}</span>
                  //           <span>{user.username}</span>
                  //         </div>
                  //       </div>
                  //       <div className='py-1' role='none'>
                  //         {isAuthenticatedUser() && user_rank() && (
                  //           <a
                  //             href='/my-stories'
                  //             className='text-gray-700 block px-4 py-2 text-sm'
                  //             role='menuitem'
                  //             tabIndex={-1}
                  //           >
                  //             My Stories
                  //           </a>
                  //         )}
                  //         <button
                  //           onClick={() => logoutUserHandler()}
                  //           className='text-primary block px-4 py-2 text-sm'
                  //           role='menuitem'
                  //           tabIndex={-1}
                  //           id='menu-item-2'
                  //         >
                  //           Sign Out
                  //         </button>
                  //       </div>
                  //     </div>
                  //   )}
                  // </div>
                  <Dropdown
                    buttonName={
                      <>
                        <UserProfileImage data={user} />
                        <ChevronDownIcon className='h-4 w-4' />
                      </>
                    }
                    dropdownBody={
                      <>
                        <div className='py-1 px-4 flex bg-gray-100 text-gray-900' role='none'>
                          <UserProfileImage data={user} />
                          <div className='flex flex-col ml-2'>
                            <span>{user.name}</span>
                            <span>{user.username}</span>
                          </div>
                        </div>
                        <div className='py-1' role='none'>
                          {isAuthenticatedUser() && user_rank() && (
                            <a
                              href='/my-stories'
                              className='text-gray-700 block px-4 py-2 text-sm'
                              role='menuitem'
                              tabIndex={-1}
                            >
                              My Stories
                            </a>
                          )}
                          <button
                            onClick={() => logoutUserHandler()}
                            className='text-primary block px-4 py-2 text-sm'
                            role='menuitem'
                            tabIndex={-1}
                            id='menu-item-2'
                          >
                            Sign Out
                          </button>
                        </div>
                      </>
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* mobile menu */}
          <WebMobileMenu
            isHidden={isHidden}
            toggleDropdown={toggleDropdown}
            openDropdown={openDropdown}
            genres={genres}
            user_rank={user_rank}
            toggleMenu={toggleMenu}
            modalIsOpen={modalIsOpen}
            toggleModal={toggleModal}
          />
        </nav>
      </div>
    </div>
  );
}
