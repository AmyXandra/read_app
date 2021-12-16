import React, { useState, useContext } from 'react';
import EditButton from './../../shared/actionBtn/EditButton';
import DeleteButton from './../../shared/actionBtn/DeleteButton';
import Button from './../../shared/button/Button';
import ConfirmAction from '../../modals/confirmAction/ConfirmAction';
import { StoriesContext } from './../../../context/StoriesContext';
import { characterDetails } from './../../../store/actions/Stories';
import { characterService } from './../../../services/Character';
import { notificationHandler } from './../../../libs/util/Notification';

export default function CharactersTable({
  openCharacterModal,
  setCharacterActionType,
  updateCharactersTable,
}) {
  const {
    state: { singleStory: story },
    dispatch,
  } = useContext(StoriesContext);
  const [deleteCharacterModalIsOpen, setDeleteCharacterModalIsOpen] = useState(false);
  const [isDeletingCharacter, setIsDeletingCharacter] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState({});

  const setCharacterDetails = (character) => {
    dispatch(characterDetails(character));
    setCharacterActionType('edit');
    openCharacterModal();
  };

  const triggerCreateCharacter = () => {
    setCharacterActionType('create');
    openCharacterModal();
  };

  const deleteCharacter = async () => {
    setIsDeletingCharacter(true);
    try {
      const { data } = await characterService.processDeleteCharacter(currentCharacter._id);
      notificationHandler('success', data.message);
      setDeleteCharacterModalIsOpen(false);
      updateCharactersTable();
    } catch (error) {
      notificationHandler('error', error.response.data.message);
    } finally {
      setIsDeletingCharacter(false);
    }
  };

  return (
    <>
      <div className='flex flex-col mt-4' id='characters'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='flex mb-4 mt-10 justify-between items-center'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>Characters</h3>
              <div className='flex items-stretch'>
                <Button
                  type='button'
                  classNames='whipik-button whipik-button__primary'
                  buttonText='Create Character'
                  clicked={triggerCreateCharacter}
                />
              </div>
            </div>

            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='whipik-table'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Name Color</th>
                    <th scope='col'>Message Color</th>
                    <th scope='col' className='relative px-6 py-3 text-left'></th>
                  </tr>
                </thead>
                <tbody>
                  {story?.chatCharacters.map((character) => (
                    <tr key={character._id}>
                      <td style={{ width: '40%' }}>
                        <div className='flex items-center'>
                          <span
                            className='inline-flex items-center justify-center h-10 w-10 rounded-full'
                            style={{
                              backgroundColor: character.msgColor,
                              color: character.nameColor,
                            }}
                          >
                            <span className='text-base font-medium leading-none'>
                              {character.name.charAt(0)}
                            </span>
                          </span>
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>
                              {character.name}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {character.isMainXter ? 'Main Character' : ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ width: '20%' }}>
                        <div className='text-sm text-gray-900'>{character.nameColor}</div>
                      </td>
                      <td style={{ width: '20%' }}>
                        <div className='text-sm text-gray-900'>{character.msgColor}</div>
                      </td>
                      <td
                        className='px-3 py-4 whitespace-nowrap text-left'
                        style={{ width: '20%' }}
                      >
                        <span className='flex'>
                          <EditButton
                            tooltipMsg='Edit Character'
                            editButtonClicked={() => setCharacterDetails(character)}
                          />
                          <DeleteButton
                            tooltipMsg='Delete Character'
                            deleteButtonClicked={() => {
                              setDeleteCharacterModalIsOpen(true);
                              setCurrentCharacter(character);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ConfirmAction
          buttonText='Delete'
          caption={`Are you sure you want to proceed with the delete action?\n
          This action cannot be undone, and the data will be unrecoverable
          `}
          takeAction={deleteCharacter}
          disabled={isDeletingCharacter}
          confirmActionModalIsOpen={deleteCharacterModalIsOpen}
          closeConfirmActionModal={() => setDeleteCharacterModalIsOpen(false)}
          title='Delete Character'
        />
      </div>
    </>
  );
}
