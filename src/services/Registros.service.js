import axios from "axios";
import { useEffect, useState } from "react";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchRegistros = (id, auto = true) => {
  const [registros, setRegistros] = useState([]);
  const [loadingRegistros, setLoadingRegistros] = useState(true);
  const idPunto = id;

  const fetchRegistros = async function () {
    setLoadingRegistros(true);
    setRegistros([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PUNTOS}${idPunto}/registros`)
    .then((response) => {
      setRegistros(response.data.data.registros);
    })
    .finally(() => {
      setLoadingRegistros(false);
    })
  };

  useEffect(() => {
    if(auto) fetchRegistros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingRegistros, registros, fetchRegistros};
}

export const useFetchReporteRegistro = (id, auto = true) => {
  const idRegistro = id;
  const [registro, setRegistro] = useState(null);
  const [parametros, setParametros] = useState([]);
  const [aqi, setAQI] = useState(null);
  const [wqi, setWQI] = useState(null);
  const [estandar, setEstandar] = useState(null);
  const [noAplica, setNoAplica] = useState(null);
  const [loadingReporte, setLoadingReporte] = useState(false);

  const fetchReporteRegistro = async function () {
    setLoadingReporte(true);
    setRegistro(null);
    setParametros([]);
    setAQI(null);
    setWQI(null);
    setEstandar(null);
    setNoAplica(null);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.REGISTROS}${idRegistro}`)
    .then((response) => {
      setRegistro(response.data.data.registro);
      setParametros(response.data.data.parametros);
      setAQI(response.data.data.aqi);
      setWQI(response.data.data.wqi);
      setEstandar(response.data.data.estandar);
      setNoAplica(response.data.data.no_aplica);
    })
    .finally(() => {
      setLoadingReporte(false);
    })
  };

  useEffect(() => {
    if(auto) fetchReporteRegistro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingReporte, registro, parametros, aqi, wqi, estandar, noAplica, fetchReporteRegistro};
}