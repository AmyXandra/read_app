import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/shared/PageHeader';
import DefaultLayout from './../../layouts/DefaultLayout';
import { useFetch } from '../../customHooks/UseFetch';
import PreLoader from './../../components/shared/preLoader/PreLoader';
import { tagsService } from '../../services/Tags';
import TagsTable from './../../components/tables/tags/TagsTable';
import TagsForm from './../../components/forms/tags/TagsForm';
import TagModal from './../../components/modals/tag/TagModal';

const Tags = () => {
  const [open, setOpen] = useState(false);
  const [tagInfo, setTagInfo] = useState({});
  const [page, setPage] = useState(1);
  const { isLoading, data, getPageData } = useFetch(tagsService.processGetTags, page);
  const [tabMeta, setTabMeta] = useState({});

  const updateTagsTable = () => {
    setTagInfo({});
    setOpen(false);
    getPageData(tagsService.processGetTags, page);
  };

  useEffect(async () => {
    setTabMeta(data?.meta);
  }, [page, data]);

  if (isLoading) {
    return <PreLoader />;
  }

  return (
    <DefaultLayout>
      <PageHeader title='Tags' subtitle='View listing of tags within the system' />

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
      <div className='grid grid-cols-6 gap-4'>
        <div className='col-span-4'>
          <TagsTable
            tags={data}
            setTagInfo={setTagInfo}
            updateTagsTable={updateTagsTable}
            setShowEditTagModal={() => setOpen(true)}
            nextPage={setPage}
          />
        </div>
        <div className='col-span-2'>
          <div className='shadow overflow-hidden'>
            <div className='min-w-full divide-y divide-gray-200 bg-gray-50 p-2 sm:rounded-lg'>
              Create a new tag
            </div>
            <div className='bg-white p-4'>
              <TagsForm actionType='create' updateTagsTable={updateTagsTable} tagInfo={tagInfo} />
            </div>
          </div>
        </div>
      </div>

      <TagModal
        modalIsOpen={open}
        closeModal={() => {
          setOpen(false);
          setTagInfo({});
        }}
        updateTagsTable={updateTagsTable}
        tagInfo={tagInfo}
      />
    </DefaultLayout>
  );
};

export default Tags;
