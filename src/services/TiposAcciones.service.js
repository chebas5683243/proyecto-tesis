import axios from "axios";
import { useEffect, useState } from "react";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchTiposAcciones = (auto = true) => {
  const [tiposAccion, setTiposAcciones] = useState([]);
  const [loadingTiposAcciones, setLoadingTiposAcciones] = useState(true);

  const fetchTiposAcciones = async function () {
    setLoadingTiposAcciones(true);
    setTiposAcciones([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.TIPOS_ACCIONES}listar`)
    .then((response) => {
      setTiposAcciones(response.data.data.tipos_accion);
    })
    .finally(() => {
      setLoadingTiposAcciones(false);
    })
  };

  useEffect(() => {
    if(auto) fetchTiposAcciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingTiposAcciones, tiposAccion, fetchTiposAcciones};
}