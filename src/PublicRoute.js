import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticatedUser } from './libs/util/Auth';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isAuthenticatedUser() ? <Redirect to='/browse' /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
