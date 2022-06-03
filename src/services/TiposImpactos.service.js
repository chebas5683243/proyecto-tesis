import axios from "axios";
import { useEffect, useState } from "react";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchTiposImpactos = (auto = true) => {
  const [tiposImpacto, setTiposImpactos] = useState([]);
  const [loadingTiposImpactos, setLoadingTiposImpactos] = useState(true);

  const fetchTiposImpactos = async function () {
    setLoadingTiposImpactos(true);
    setTiposImpactos([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.TIPOS_IMPACTOS}listar`)
    .then((response) => {
      setTiposImpactos(response.data.data.tipos_impacto);
    })
    .finally(() => {
      setLoadingTiposImpactos(false);
    })
  };

  useEffect(() => {
    if(auto) fetchTiposImpactos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingTiposImpactos, tiposImpacto, fetchTiposImpactos};
}