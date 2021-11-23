import React, { createContext, useState } from 'react';

export const NavbarContext = createContext({
    show: false,
    setShow: () => {},
});

export const NavbarProvider = (props) => {
  const [show, setShow] = useState(false);

  return (
    <NavbarContext.Provider
      value={{
        show,
        setShow
      }}
    >
      {props.children}
    </NavbarContext.Provider>
  );
};
