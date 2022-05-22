import axios from "axios";
import { useEffect, useState } from "react";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchTiposCausas = (auto = true) => {
  const [tiposCausa, setTiposCausas] = useState([]);
  const [loadingTiposCausas, setLoadingTiposCausas] = useState(true);

  const fetchTiposCausas = async function () {
    setLoadingTiposCausas(true);
    setTiposCausas([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.CAUSAS}listar`)
    .then((response) => {
      setTiposCausas(response.data.data.tipos_causa);
    })
    .finally(() => {
      setLoadingTiposCausas(false);
    })
  };

  useEffect(() => {
    if(auto) fetchTiposCausas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingTiposCausas, tiposCausa, fetchTiposCausas};
}