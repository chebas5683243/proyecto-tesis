import React, { createContext, useState } from 'react';

export const UserContext = createContext({
    infoUsuario: null,
    setInfoUsuario: () => {},
    token: null, //contiene la informacion de los cursos
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
