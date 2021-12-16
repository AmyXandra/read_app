import React from 'react';
import { isAuthenticatedUser } from '../../libs/util/Auth';
import Button from '../shared/button/Button';
import DefaultLayout from './../../layouts/DefaultLayout';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(
      '🚀 ~ file: ErrorBoundary.js ~ line 10 ~ ErrorBoundary ~ getDerivedStateFromError ~ error',
      error
    );
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <DefaultLayout>
          <div className='flex w-full justify-center mt-16 text-center'>
            <div>
              <h4 className='text-orange-600 mb-1 font-semibold'>Error</h4>
              <h2 className='mb-3 text-3xl font-bold'>Page not found</h2>
              <p className='text-gray-600'>Sorry, we couldn't find the page you're looking for</p>
              <Button
                buttonText='Go back home'
                clicked={() =>
                  isAuthenticatedUser()
                    ? this.props.history.push('/my-stories')
                    : this.props.history.push('/')
                }
                type='button'
                classNames='whipik-button whipik-button__primary mt-3'
              />
            </div>
          </div>
        </DefaultLayout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
