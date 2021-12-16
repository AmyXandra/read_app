import React, { useState, useContext } from 'react';
import Pagination from '../../shared/Pagination';
import EditButton from '../../shared/actionBtn/EditButton';
import DeleteButton from '../../shared/actionBtn/DeleteButton';
import Button from '../../shared/button/Button';
import MessageButton from '../../shared/actionBtn/MessageButton';
import ConfirmAction from '../../modals/confirmAction/ConfirmAction';
import { StoriesContext } from './../../../context/StoriesContext';
import { useHistory, useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { chapterDetails, processDeleteChapterAsync } from './../../../store/actions/Chapter';
import { ChapterContext } from './../../../context/ChapterContext';
import { notificationHandler } from './../../../libs/util/Notification';

export default function ChaptersTable({
  openCreateChapterModal,
  setChapterActionType,
  setNewChapterNumber,
  updateChaptersTable,
}) {
  const [deleteChapterModalIsOpen, setDeleteChapterModalIsOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState({});
  const [isDeletingChapter, setIsDeletingChapter] = useState(false);
  const {
    state: { singleStory: story },
  } = useContext(StoriesContext);
  const { dispatch } = useContext(ChapterContext);
  const history = useHistory();
  const { storyId } = useParams();

  const triggerCreateChapter = () => {
    setChapterActionType('create');
    openCreateChapterModal();
    const chapters = story.chatChapters;
    const lastChapter = chapters[chapters.length - 1];
    setNewChapterNumber(lastChapter?.number ? lastChapter.number + 1 : 1);
  };

  const setChapterDetails = (chapter) => {
    dispatch(chapterDetails(chapter));
    setChapterActionType('edit');
    openCreateChapterModal();
  };

  const deleteChapter = async () => {
    setIsDeletingChapter(true);
    try {
      const response = await processDeleteChapterAsync(dispatch, currentChapter._id);
      updateChaptersTable();
      notificationHandler('success', response.message);
      setDeleteChapterModalIsOpen(false);
    } catch (deleteChapterError) {
      notificationHandler('error', deleteChapterError.message);
    } finally {
      setIsDeletingChapter(false);
    }
  };

  const chapterStatusClass = (status) => {
    switch (status) {
      case 'unpublished':
        return 'bg-red-200 text-red-800';
      case 'published':
        return 'bg-green-200 text-green-800';
      default:
        break;
    }
  };

  return (
    <>
      <div className='flex flex-col mt-4' id='episodes'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='flex mb-4 mt-10 justify-between items-center'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>Episodes</h3>
              <div className='flex items-stretch'>
                <Button
                  type='button'
                  classNames='whipik-button whipik-button__primary'
                  buttonText='Create Episode'
                  clicked={triggerCreateChapter}
                />
              </div>
            </div>

            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='whipik-table'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th scope='col'>No</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Date Created</th>
                    <th scope='col'>Status</th>
                    <th scope='col' className='relative px-6 py-3 text-left'></th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {story?.chatChapters.map((chapter) => (
                    <tr key={chapter._id}>
                      <td style={{ width: '5%' }}>{chapter.number}</td>
                      <td style={{ width: '40%' }}>
                        <div className='text-sm text-gray-900'>{chapter.title}</div>
                      </td>
                      <td style={{ width: '20%' }}>
                        <div className='text-sm text-gray-900'>
                          <Moment format='YYYY/MM/DD'>{chapter.createdAt}</Moment>
                        </div>
                      </td>
                      <td style={{ width: '15%' }}>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${chapterStatusClass(
                            chapter.publishedStatus
                          )}`}
                        >
                          {chapter.publishedStatus}
                        </span>
                      </td>
                      <td style={{ width: '20%' }}>
                        <span className='flex'>
                          <MessageButton
                            tooltipMsg='Add Message'
                            addButtonClicked={() =>
                              history.push(`/stories/${storyId}/${chapter._id}`)
                            }
                          />
                          <EditButton
                            tooltipMsg='Edit Episode'
                            editButtonClicked={() => setChapterDetails(chapter)}
                          />
                          <DeleteButton
                            tooltipMsg='Delete Episode'
                            deleteButtonClicked={() => {
                              setDeleteChapterModalIsOpen(true);
                              setCurrentChapter(chapter);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination />
            </div>
          </div>
        </div>
        <ConfirmAction
          buttonText='Delete'
          caption={`Are you sure you want to proceed with the delete action?\n
          This action cannot be undone, and the data will be unrecoverable
          `}
          takeAction={deleteChapter}
          disabled={isDeletingChapter}
          confirmActionModalIsOpen={deleteChapterModalIsOpen}
          closeConfirmActionModal={() => setDeleteChapterModalIsOpen(false)}
          title='Delete Episode'
        />
      </div>
    </>
  );
}
