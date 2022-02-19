import axios from "axios";
import { useEffect, useState } from "react";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchParametros = (params = {}, auto = true) => {
  const [parametros, setParametros] = useState([]);
  const [loadingParametros, setLoadingParametros] = useState(true);

  const fetchParametros = async function () {
    setLoadingParametros(true);
    setParametros([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PARAMETROS}listar`, {params: params})
    .then((response) => {
      setParametros(response.data.data.parametros);
    })
    .finally(() => {
      setLoadingParametros(false);
    })
  };

  useEffect(() => {
    if(auto) fetchParametros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingParametros, parametros, fetchParametros};
}

export const useFetchDetalleParametro = () => {
  const [parametro, setParametro] = useState(null);
  const [loadingParametro, setLoadingParametro] = useState(true);

  const fetchParametro = async function (idParametro) {
    setLoadingParametro(true);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PARAMETROS}detalle/${idParametro}`)
    .then((response) => {
      setParametro(response.data.data.parametro);
    })
    .finally(() => {
      setLoadingParametro(false);
    })
  };

  return {loadingParametro, parametro, fetchParametro};
}