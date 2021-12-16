import React from 'react';
import Routes from './Routes';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  );
}

export default App;
