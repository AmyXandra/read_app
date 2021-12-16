import React, { createContext, useState, useEffect } from 'react';
import { remoteConfig } from './../services/Firebase';

export const RemoteConfigContext = createContext();

const RemoteConfigContextProvider = ({ children }) => {
  const [characterColors, setCharacterColors] = useState([]);

  useEffect(() => {
    let defaultValue = remoteConfig.getValue('storyCreation').asString();
    setCharacterColors(defaultValue.storyCharacterColors);
    remoteConfig
      .fetchAndActivate()
      .then(() => {
        defaultValue = JSON.parse(remoteConfig.getValue('storyCreation').asString());
        setCharacterColors(defaultValue.storyCharacterColors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <RemoteConfigContext.Provider value={{ characterColors }}>
      {children}
    </RemoteConfigContext.Provider>
  );
};

export default RemoteConfigContextProvider;
