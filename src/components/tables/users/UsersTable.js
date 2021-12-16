import React, { useContext } from 'react';
import { RemoteConfigContext } from './../../../context/RemoteConfigContext';
import ViewButton from './../../shared/actionBtn/ViewButton';
import { useHistory } from 'react-router-dom';
import Pagination from './../../shared/Pagination';
import { goToPage } from './../../../libs/util/Pagination';

const UsersTable = ({ users, nextPage }) => {
  const { characterColors } = useContext(RemoteConfigContext);
  const history = useHistory();
  const getRandomCharacterColor = () => {
    const randomIndex = Math.floor(Math.random() * +(characterColors?.length ?? 6));
    return characterColors?.[randomIndex];
  };

  const userStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-200 text-green-800';
      case 'inactive':
        return 'bg-red-200 text-red-800';
      default:
        break;
    }
  };
  return (
    <>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='whipik-table'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Username</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Provider</th>
                    <th scope='col' className='relative px-3 py-3 text-left'></th>
                  </tr>
                </thead>
                <tbody>
                  {users?.data?.map((user) => (
                    <tr
                      key={user._id}
                      className='cursor-pointer hover:underline'
                      onClick={() => history.push(`users/${user._id}`)}
                    >
                      <td style={{ width: '40%' }}>
                        <div className='flex items-center'>
                          {user.avatar ? (
                            <img
                              className='inline-flex items-center justify-center h-10 w-10 rounded-full'
                              src={user.avatar}
                            />
                          ) : (
                            <span
                              className='inline-flex items-center justify-center h-10 w-10 rounded-full'
                              style={{
                                backgroundColor: getRandomCharacterColor()?.nameColor,
                                color: getRandomCharacterColor()?.msgColor,
                              }}
                            >
                              <span className='text-base font-medium leading-none capitalize'>
                                {user.name.charAt(0)}
                              </span>
                            </span>
                          )}
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>{user.name}</div>
                            <div className='text-sm font-medium text-gray-500'>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ width: '20%' }}>
                        <div className='text-sm text-gray-900'>{user.username || 'Not Set'}</div>
                      </td>
                      <td style={{ width: '15%' }}>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${userStatusClass(
                            user?.status
                          )}`}
                        >
                          {user?.status}
                        </span>
                      </td>
                      <td className='px-3 py-4 whitespace-nowrap' style={{ width: '15%' }}>
                        <div className='text-sm text-gray-900 capitalize'>{user.provider}</div>
                      </td>
                      <td
                        className='px-3 py-4 whitespace-nowrap text-left'
                        style={{ width: '10%' }}
                      >
                        <span className='flex'>
                          <ViewButton
                            tooltipMsg='View Profile'
                            viewButtonClicked={() => history.push(`users/${user._id}`)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                paginationData={users?.meta}
                nextPage={() => {
                  goToPage(users?.meta, nextPage, 'next');
                }}
                prevPage={() => {
                  goToPage(users?.meta, nextPage, 'prev');
                }}
                disableNextBtn={+users?.meta?.page === +users?.meta?.totalPages}
                disablePrevBtn={+users?.meta?.page === 1}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
