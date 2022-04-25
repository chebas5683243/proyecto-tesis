import axios from "axios";
import { useEffect, useState } from "react";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchPuntos = (id, auto = true) => {
  const [puntos, setPuntos] = useState([]);
  const [loadingPuntos, setLoadingPuntos] = useState(true);
  const idProyecto = id;

  const fetchPuntos = async function () {
    setLoadingPuntos(true);
    setPuntos([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PROYECTOS}${idProyecto}/puntos`)
    .then((response) => {
      setPuntos(response.data.data.puntos);
    })
    .finally(() => {
      setLoadingPuntos(false);
    })
  };

  useEffect(() => {
    if(auto) fetchPuntos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingPuntos, puntos, fetchPuntos};
}

export const useFetchDetallePunto = () => {
  const [punto, setPunto] = useState(null);
  const [loadingPunto, setLoadingPunto] = useState(true);

  const fetchPunto = async function (idPunto) {
    setLoadingPunto(true);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PUNTOS}detalle/${idPunto}`)
    .then((response) => {
      setPunto(response.data.data.punto);
    })
    .finally(() => {
      setLoadingPunto(false);
    })
  };

  useEffect(() => {
    fetchPunto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingPunto, punto, fetchPunto};
}

export const useFetchDetallePuntoConRegistros = (idPunto) => {
  const [punto, setPunto] = useState(null);
  const [loadingPunto, setLoadingPunto] = useState(true);

  const fetchPunto = async function () {
    setLoadingPunto(true);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PUNTOS}detalle/${idPunto}`)
    .then((response) => {
      setPunto(response.data.data.punto);
    })
    .finally(() => {
      setLoadingPunto(false);
    })
  };

  useEffect(() => {
    fetchPunto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingPunto, punto, fetchPunto};
}

export const useAddParametroPunto = ( parametroPuntoData, puntoId ) => {
  const [loadingParametroPunto, setLoadingParametroPunto] = useState(false);

  const modifyParametroPunto = async function (handleClose, fetchParametros) {
    setLoadingParametroPunto(true);
    await axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PUNTOS}modificarParametro`, {...parametroPuntoData, puntoId})
    .then((response) => {
      handleClose();
      fetchParametros();
    })
    .finally(() => {
      setLoadingParametroPunto(false);
    })
  };

  return {loadingParametroPunto, modifyParametroPunto};
}

export const useListParametrosPunto = (puntoId, auto = true) => {
  const [parametrosPunto, setParametrosPunto] = useState([]);
  const [loadingParametrosPunto, setLoadingParametrosPunto] = useState(true);

  const fetchParametros = async function () {
    setLoadingParametrosPunto(true);
    setParametrosPunto([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PUNTOS}${puntoId}/parametros`)
    .then((response) => {
      setParametrosPunto(response.data.data.parametros);
    })
    .finally(() => {
      setLoadingParametrosPunto(false);
    })
  };

  useEffect(() => {
    if(auto) fetchParametros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingParametrosPunto, parametrosPunto, fetchParametros};
}