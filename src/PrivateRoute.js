import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticatedUser, getToken } from './libs/util/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to login page and return token expired error
    <Route
      {...rest}
      render={(props) =>
        isAuthenticatedUser() && getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/?session=expired',
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
