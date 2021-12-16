import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './context/AuthContext';
import StoriesContextProvider from './context/StoriesContext';
import ChapterContextProvider from './context/ChapterContext';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StoriesContextProvider>
        <ChapterContextProvider>
          <ToastContainer />
          <App />
        </ChapterContextProvider>
      </StoriesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
