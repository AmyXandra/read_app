import React, { useState, useEffect } from 'react';
import Button from '../../components/shared/button/Button';
import PageHeader from '../../components/shared/PageHeader';
import DefaultLayout from './../../layouts/DefaultLayout';
import GenreModal from './../../components/modals/genre/GenreModal';
import { useFetch } from '../../customHooks/UseFetch';
import { genreService } from './../../services/Genres';
import PreLoader from './../../components/shared/preLoader/PreLoader';
import GenreTable from './../../components/tables/genres/GenresTable';

const Genres = () => {
  const [open, setOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState('create');
  const [genreInfo, setGenreInfo] = useState({});
  const [page, setPage] = useState(1);
  const { isLoading, data, getPageData } = useFetch(genreService.processGetGenres, page);
  const [tabMeta, setTabMeta] = useState({});

  const updateGenreTable = () => {
    setGenreInfo({});
    setOpen(false);
    getPageData(genreService.processGetGenres, page);
  };

  const saveGenreInfo = (genre) => {
    setGenreInfo(genre);
    setModalActionType('edit');
    setOpen(true);
  };

  useEffect(async () => {
    setTabMeta(data?.meta);
  }, [page, data]);

  if (isLoading) {
    return <PreLoader />;
  }

  return (
    <DefaultLayout>
      <PageHeader title='Genres' subtitle='View listing of genres within the system'>
        <Button
          type='button'
          classNames='whipik-button whipik-button__primary'
          buttonText='Add Genre'
          clicked={() => {
            setOpen(true);
            setModalActionType('create');
          }}
        />
      </PageHeader>

      <div className='mb-3'>
        {+tabMeta?.total <= +tabMeta?.limit && (
          <p>
            Showing {tabMeta?.total} of {tabMeta?.total} results
          </p>
        )}
        {+tabMeta?.total > +tabMeta?.limit && (
          <p>
            Showing {tabMeta?.limit} of {tabMeta?.total} results
          </p>
        )}
      </div>

      <GenreTable
        genres={data}
        setGenreInfo={saveGenreInfo}
        updateGenreTable={updateGenreTable}
        nextPage={setPage}
      />

      <GenreModal
        modalIsOpen={open}
        toggleModalOpen={() => setOpen(true)}
        genreInfo={genreInfo}
        closeModal={() => {
          setOpen(false);
          setGenreInfo({});
        }}
        actionType={modalActionType}
        updateGenreTable={updateGenreTable}
      />
    </DefaultLayout>
  );
};

export default Genres;
