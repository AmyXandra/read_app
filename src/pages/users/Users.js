import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/shared/PageHeader';
import UsersTable from '../../components/tables/users/UsersTable';
import DefaultLayout from './../../layouts/DefaultLayout';
import { useFetch } from '../../customHooks/UseFetch';
import PreLoader from './../../components/shared/preLoader/PreLoader';
import { usersService } from '../../services/Users';

const Users = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data } = useFetch(usersService.processGetUsers, page);
  const [tabMeta, setTabMeta] = useState({});

  useEffect(async () => {
    setTabMeta(data?.meta);
  }, [page, data]);

  if (isLoading) {
    return <PreLoader />;
  }

  return (
    <DefaultLayout>
      <PageHeader title='Users' subtitle='' />
      <div className='grid grid-cols-6 gap-4'>
        <div className='col-span-6'>
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
          <UsersTable users={data} nextPage={setPage} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Users;
