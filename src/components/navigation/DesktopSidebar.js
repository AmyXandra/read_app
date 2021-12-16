import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticatedUser } from '../../libs/util/Auth';
import { checkUserAccess } from './../../libs/util/CheckUserAccess';

const DesktopSideBar = ({ navigation, classNames, userRoles }) => {
  return (
    <div className='hidden lg:block lg:col-span-3 xl:col-span-2'>
      <nav aria-label='Sidebar' className='sticky top-4 divide-y divide-gray-300'>
        <div className='pb-8 space-y-1'>
          {navigation.map(
            (item) =>
              checkUserAccess(item.access, userRoles) &&
              isAuthenticatedUser() && (
                <Link
                  to={item.href}
                  key={item.name}
                  className={classNames(
                    item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                      'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                    )}
                    aria-hidden='true'
                  />
                  <span className='truncate'>{item.name}</span>
                </Link>
              )
          )}
        </div>
      </nav>
    </div>
  );
};

export default DesktopSideBar;
