import axios from "axios";
import { useEffect, useState } from "react";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchTiposIncidentes = (params = {}, auto = true) => {
  const [tiposIncidentes, setTiposIncidentes] = useState([]);
  const [loadingTiposIncidentes, setLoadingTiposIncidentes] = useState(true);

  const fetchTiposIncidentes = async function () {
    setLoadingTiposIncidentes(true);
    setTiposIncidentes([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.TIPOS_INCIDENTES}listar`, {params: params})
    .then((response) => {
      setTiposIncidentes(response.data.data.tipos_incidente);
    })
    .finally(() => {
      setLoadingTiposIncidentes(false);
    })
  };

  useEffect(() => {
    if(auto) fetchTiposIncidentes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingTiposIncidentes, tiposIncidentes, fetchTiposIncidentes};
}