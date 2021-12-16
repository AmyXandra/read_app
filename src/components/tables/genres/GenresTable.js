import React, { useState } from 'react';
import ConfirmAction from '../../modals/confirmAction/ConfirmAction';
import EditButton from './../../shared/actionBtn/EditButton';
import DeleteButton from './../../shared/actionBtn/DeleteButton';
import Moment from 'react-moment';
import { genreService } from './../../../services/Genres';
import { notificationHandler } from './../../../libs/util/Notification';
import Pagination from './../../shared/Pagination';
import { goToPage } from './../../../libs/util/Pagination';

const GenreTable = ({ genres, updateGenreTable, setGenreInfo, nextPage }) => {
  const [deleteGenreModalIsOpen, setDeleteGenreIsOpen] = useState(false);
  const [currentGenre, setCurrentGenre] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const deleteGenre = async () => {
    try {
      setIsSubmitting(true);
      const { data } = await genreService.processDeleteGenre(currentGenre._id);
      notificationHandler('success', data.message);
      setDeleteGenreIsOpen(false);
      updateGenreTable();
      setIsSubmitting(false);
    } catch (error) {
      notificationHandler('error', error.response.data.message);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className='flex flex-col mt-4'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Created At
                    </th>
                    <th scope='col' className='relative px-3 py-3 text-left'></th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {genres?.data?.map((genre) => (
                    <tr key={genre._id}>
                      <td className='px-3 py-4 whitespace-nowrap' style={{ width: '40%' }}>
                        <div className='flex items-center'>
                          <img
                            className='inline-flex items-center justify-center h-10 w-10 rounded-full'
                            src={genre.image}
                          />
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>{genre.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className='px-3 py-4 whitespace-nowrap' style={{ width: '20%' }}>
                        <div className='text-sm text-gray-900'>
                          {' '}
                          <Moment format='YYYY/MM/DD'>{genre.createdAt}</Moment>
                        </div>
                      </td>
                      <td
                        className='px-3 py-4 whitespace-nowrap text-left'
                        style={{ width: '20%' }}
                      >
                        <span className='flex'>
                          <EditButton
                            tooltipMsg='Edit Genre'
                            editButtonClicked={() => setGenreInfo(genre)}
                          />
                          <DeleteButton
                            tooltipMsg='Delete Genre'
                            deleteButtonClicked={() => {
                              setDeleteGenreIsOpen(true);
                              setCurrentGenre(genre);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                paginationData={genres?.meta}
                nextPage={() => {
                  goToPage(genres?.meta, nextPage, 'next');
                }}
                prevPage={() => {
                  goToPage(genres?.meta, nextPage, 'prev');
                }}
                disableNextBtn={+genres?.meta?.page === +genres?.meta?.totalPages}
                disablePrevBtn={+genres?.meta?.page === 1}
              />
            </div>
          </div>
        </div>
        <ConfirmAction
          buttonText='Delete'
          caption={`Are you sure you want to proceed with the delete action?\n
          This action cannot be undone, and the data will be unrecoverable
          `}
          title='Delete Genre'
          confirmActionModalIsOpen={deleteGenreModalIsOpen}
          takeAction={deleteGenre}
          disabled={isSubmitting}
          closeConfirmActionModal={() => setDeleteGenreIsOpen(false)}
        />
      </div>
    </>
  );
};

export default GenreTable;
