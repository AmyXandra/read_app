import React, { useState } from 'react';
import ConfirmAction from '../../modals/confirmAction/ConfirmAction';
import EditButton from './../../shared/actionBtn/EditButton';
import DeleteButton from './../../shared/actionBtn/DeleteButton';
import { notificationHandler } from './../../../libs/util/Notification';
import { tagsService } from './../../../services/Tags';
import Pagination from './../../shared/Pagination';
import { goToPage } from './../../../libs/util/Pagination';

const TagsTable = ({ tags, updateTagsTable, setTagInfo, setShowEditTagModal, nextPage }) => {
  const [deleteTagModalIsOpen, setDeleteTagModalIsOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deleteTag = async () => {
    try {
      setIsSubmitting(true);
      const { data } = await tagsService.processDeleteTag(currentTag._id);
      notificationHandler('success', data.message);
      setDeleteTagModalIsOpen(false);
      updateTagsTable();
      setIsSubmitting(false);
    } catch (error) {
      console.log('🚀 ~ file: TagsTable.js ~ line 67 ~ deleteTag ~ error', error);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className='flex flex-col'>
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {tags?.data?.map((tag) => (
                    <tr key={tag._id}>
                      <td className='px-3 py-4 whitespace-nowrap' style={{ width: '80%' }}>
                        <div className='flex items-center'>
                          <div className='text-sm font-medium text-gray-900 capitalize'>
                            {tag.name}
                          </div>
                        </div>
                      </td>
                      <td
                        className='px-3 py-4 whitespace-nowrap text-left'
                        style={{ width: '20%' }}
                      >
                        <span className='flex'>
                          <EditButton
                            tooltipMsg='Edit Tag'
                            editButtonClicked={() => {
                              setTagInfo(tag);
                              setShowEditTagModal(true);
                            }}
                          />
                          <DeleteButton
                            tooltipMsg='Delete Tag'
                            deleteButtonClicked={() => {
                              setDeleteTagModalIsOpen(true);
                              setCurrentTag(tag);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                paginationData={tags?.meta}
                nextPage={() => {
                  goToPage(tags?.meta, nextPage, 'next');
                }}
                prevPage={() => {
                  goToPage(tags?.meta, nextPage, 'prev');
                }}
                disableNextBtn={+tags?.meta?.page === +tags?.meta?.totalPages}
                disablePrevBtn={+tags?.meta?.page === 1}
              />
            </div>
          </div>
        </div>
        <ConfirmAction
          buttonText='Delete'
          caption={`Are you sure you want to proceed with the delete action?\n
          This action cannot be undone, and the data will be unrecoverable
          `}
          title='Delete Tag'
          confirmActionModalIsOpen={deleteTagModalIsOpen}
          takeAction={deleteTag}
          disabled={isSubmitting}
          closeConfirmActionModal={() => setDeleteTagModalIsOpen(false)}
        />
      </div>
    </>
  );
};

export default TagsTable;
