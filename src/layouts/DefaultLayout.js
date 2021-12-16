// import React, { Fragment, useContext } from 'react';
import React, { useContext } from 'react';
// import { Menu, Popover, Transition } from '@headlessui/react';
import { Popover } from '@headlessui/react';
// import MobileMenu from '../components/navigation/MobileMenu';
import WebNavbar from '../webPages/components/navigation/WebNavbar';
import {
  FireIcon,
  TrendingUpIcon,
  UserGroupIcon,
  TagIcon,
  BookmarkAltIcon,
} from '@heroicons/react/outline';
import DesktopSideBar from './../components/navigation/DesktopSidebar';
import RemoteConfigContextProvider from '../context/RemoteConfigContext';
import { AuthContext } from './../context/AuthContext';
import { userRoleTypes } from '../libs/util';
// import { useHistory } from 'react-router-dom';
// import { removeUserFromCookies } from './../libs/util/Auth';

export default function DefaultLayout({ children }) {
  // const history = useHistory();
  const {
    state: { user },
  } = useContext(AuthContext);

  const checkCurrentRoute = (routeName) => {
    return window.location.pathname === routeName ? true : false;
  };

  // const goToProfile = () => {
  //   history.push(`/users/${user._id}`);
  // };

  // const logoutUserHandler = () => {
  //   removeUserFromCookies();
  //   history.push('/browse/1');
  // };

  const navigation = [
    // {
    //   name: 'Dashboard',
    //   href: '/dashboard',
    //   icon: HomeIcon,
    //   current: window.location.pathname === '/dashboard' ? true : false,
    // },
    {
      name: 'All Stories',
      href: '/stories',
      icon: FireIcon,
      current: checkCurrentRoute('/stories'),
      access: [userRoleTypes.superAdmin, userRoleTypes.contentManager],
    },
    {
      name: 'My Stories',
      href: '/my-stories',
      icon: FireIcon,
      current: checkCurrentRoute('/my-stories'),
      access: [userRoleTypes.all],
    },
    {
      name: 'Roles',
      href: '#',
      icon: TrendingUpIcon,
      current: false,
      access: [userRoleTypes.superAdmin],
    },
    {
      name: 'Tags',
      href: '/tags',
      icon: TagIcon,
      current: checkCurrentRoute('/tags'),
      access: [userRoleTypes.superAdmin, userRoleTypes.contentManager],
    },
    {
      name: 'Users',
      href: '/users',
      icon: UserGroupIcon,
      current: checkCurrentRoute('/users'),
      access: [userRoleTypes.superAdmin],
    },
    {
      name: 'Genres',
      href: '/genres',
      icon: BookmarkAltIcon,
      current: checkCurrentRoute('/genres'),
      access: [userRoleTypes.superAdmin, userRoleTypes.contentManager],
    },
  ];

  // const userNavigation = [
  //   { name: 'Your Profile', action: goToProfile },
  //   // { name: 'Settings', href: '#' },
  //   { name: 'Sign out', action: logoutUserHandler },
  // ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as='header'
        className={({ open }) =>
          classNames(
            open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
            'bg-white shadow-sm lg:static lg:overflow-y-visible'
          )
        }
      >
        <>
          <WebNavbar />
        </>
      </Popover>

      <div className='py-8'>
        <div className='max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8'>
          <DesktopSideBar navigation={navigation} classNames={classNames} userRoles={user?.roles} />
          {/* main content */}
          <main className='lg:col-span-10'>
            <div className='mt-0'>
              <RemoteConfigContextProvider> {children} </RemoteConfigContextProvider>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
