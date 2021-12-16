import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/remote-config';

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const remoteConfig = firebase.remoteConfig();

remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

remoteConfig.defaultConfig = {
  storyCreation: {
    storyCharacterColors: [
      {
        nameColor: '#A31400',
        msgColor: '#FFEEEB',
        textColor: '#212D40',
      },
      {
        nameColor: '#285087',
        msgColor: '#F5F9FF',
        textColor: '#212D40',
      },
      {
        nameColor: '#0C652F',
        msgColor: '#F8FFF0',
        textColor: '#212D40',
      },
      {
        nameColor: '#8F008F',
        msgColor: '#FFF5FF',
        textColor: '#212D40',
      },
      {
        nameColor: '#005E75',
        msgColor: '#F5FDFF',
        textColor: '#212D40',
      },
    ],
  },
};
