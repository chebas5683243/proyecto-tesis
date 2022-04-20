import React, { createContext, useState } from 'react';

export const ProjectContext = createContext({
    proyectoId: null,
    setProyectoId: () => {},
    puntoId: null,
    setPuntoId: () => {},
    registroId: null,
    setRegistroId: () => {},
    openParametros: false,
    setOpenParametros: () => {},
    openModalParametro: false,
    setOpenModalParametro: () => {},
    selectedParametroPunto: null,
    setSelectedParametroPunto: () => {}
});

export const ProjectProvider = (props) => {
  const [proyectoId, setProyectoId] = useState(null);
  const [puntoId, setPuntoId] = useState(null);
  const [registroId, setRegistroId] = useState(null);
  const [openParametros, setOpenParametros] = useState(false);
  const [openModalParametro, setOpenModalParametro] = useState(false);
  const [selectedParametroPunto, setSelectedParametroPunto] = useState(null);

  return (
    <ProjectContext.Provider
      value={{
        proyectoId,
        setProyectoId,
        puntoId,
        setPuntoId,
        registroId,
        setRegistroId,
        openParametros,
        setOpenParametros,
        openModalParametro,
        setOpenModalParametro,
        selectedParametroPunto,
        setSelectedParametroPunto
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};
