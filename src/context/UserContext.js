import React, { createContext, useState } from 'react';

export const UserContext = createContext({
    infoUsuario: null,
    setInfoUsuario: () => {},
    token: null,
    setToken: () => {}
});

export const UserProvider = (props) => {
  const [infoUsuario, setInfoUsuario] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider
      value={{
        infoUsuario,
        setInfoUsuario,
        token,
        setToken
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
