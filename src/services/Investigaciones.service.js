import axios from "axios";
import { useEffect, useState } from "react";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchInvestigaciones = (auto = true) => {
  const [investigaciones, setInvestigaciones] = useState([]);
  const [loadingInvestigaciones, setLoadingInvestigaciones] = useState(true);

  const fetchInvestigaciones = async function () {
    setLoadingInvestigaciones(true);
    setInvestigaciones([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INVESTIGACIONES}listar`)
    .then((response) => {
      setInvestigaciones(response.data.data.investigaciones);
    })
    .finally(() => {
      setLoadingInvestigaciones(false);
    })
  };

  useEffect(() => {
    if(auto) fetchInvestigaciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingInvestigaciones, investigaciones, fetchInvestigaciones};
}

export const useFetchDetalleInvestigacion = ( idInvestigacion ) => {
  const [investigacion, setInvestigacion] = useState(null);
  const [loadingInvestigacion, setLoadingInvestigacion] = useState(true);

  const fetchInvestigacion = async function () {
    setLoadingInvestigacion(true);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INVESTIGACIONES}detalle/${idInvestigacion}`)
    .then((response) => {
      setInvestigacion(response.data.data.investigacion);
    })
    .finally(() => {
      setLoadingInvestigacion(false);
    })
  };

  useEffect(() => {
    fetchInvestigacion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingInvestigacion, investigacion};
}

export const useSaveDatosGenerales = ( investigacionData, handleOpenSnackbar, handleNextStep ) => {
  const [loadingEdit, setLoadingEdit] = useState(false);

  const saveDatosGenerales = async function () {
    setLoadingEdit(true);
    await axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INVESTIGACIONES}guardarDatosGenerales`, investigacionData)
    .then((response) => {
      handleOpenSnackbar("guardado");
      if (investigacionData.nextStep) {
        handleNextStep();
      }
    })
    .catch((error) => {
      handleOpenSnackbar("error");
    })
    .finally(() => {
      setLoadingEdit(false);
    })
  }

  return {loadingEdit, saveDatosGenerales};
}

export const useSaveConsecuencias = ( investigacionData, handleOpenSnackbar, handleNextStep ) => {
  const [loadingEdit, setLoadingEdit] = useState(false);

  const saveConsecuencias = async function () {
    setLoadingEdit(true);
    await axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INVESTIGACIONES}guardarConsecuencias`, investigacionData)
    .then((response) => {
      handleOpenSnackbar("guardado");
      if (investigacionData.nextStep) {
        handleNextStep();
      }
    })
    .catch((error) => {
      handleOpenSnackbar("error");
    })
    .finally(() => {
      setLoadingEdit(false);
    })
  }

  return {loadingEdit, saveConsecuencias};
}

export const useSaveCausasAcciones = ( investigacionData, handleOpenSnackbar, handleNextStep ) => {
  const [loadingEdit, setLoadingEdit] = useState(false);

  const saveCausasAcciones = async function () {
    setLoadingEdit(true);
    await axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INVESTIGACIONES}guardarCausasAcciones`, investigacionData)
    .then((response) => {
      handleOpenSnackbar("guardado");
      if (investigacionData.nextStep) {
        console.log("u.u")
        handleNextStep();
      }
    })
    .catch((error) => {
      handleOpenSnackbar("error");
    })
    .finally(() => {
      setLoadingEdit(false);
    })
  }

  return {loadingEdit, saveCausasAcciones};
}

export const useSavePlanAcciones = ( investigacionData, handleOpenSnackbar ) => {
  const [loadingEdit, setLoadingEdit] = useState(false);

  const savePlanAcciones = async function () {
    setLoadingEdit(true);
    await axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INVESTIGACIONES}guardarPlanAcciones`, investigacionData)
    .then((response) => {
      handleOpenSnackbar("acciones");
    })
    .catch((error) => {
      handleOpenSnackbar("error");
    })
    .finally(() => {
      setLoadingEdit(false);
    })
  }

  return {loadingEdit, savePlanAcciones};
}