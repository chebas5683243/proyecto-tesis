import axios from "axios";
import { useEffect, useState } from "react";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchUnidades = (params = {}, auto = true) => {
  const [unidades, setUnidades] = useState([]);
  const [loadingUnidades, setLoadingUnidades] = useState(true);

  const fetchUnidades = async function () {
    setLoadingUnidades(true);
    setUnidades([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.UNIDADES}listar`, {params: params})
    .then((response) => {
      setUnidades(response.data.data.unidades);
    })
    .finally(() => {
      setLoadingUnidades(false);
    })
  };

  useEffect(() => {
    if(auto) fetchUnidades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingUnidades, unidades, fetchUnidades};
}

export const useFetchDetalleUnidad = () => {
  const [unidad, setUnidad] = useState(null);
  const [loadingUnidad, setLoadingUnidad] = useState(true);

  const fetchUnidad = async function (idUnidad) {
    setLoadingUnidad(true);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.UNIDADES}detalle/${idUnidad}`)
    .then((response) => {
      setUnidad(response.data.data.unidad);
    })
    .finally(() => {
      setLoadingUnidad(false);
    })
  };

  return {loadingUnidad, unidad, fetchUnidad};
}