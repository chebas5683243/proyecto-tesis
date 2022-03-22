import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
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

export const useFetchDetalleTipoIncidente = ( idTipoIncidente ) => {
  const [tipoIncidente, setTipoIncidente] = useState(null);
  const [loadingTipoIncidente, setLoadingTipoIncidente] = useState(true);

  const fetchTipoIncidente = async function () {
    setLoadingTipoIncidente(true);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.TIPOS_INCIDENTES}detalle/${idTipoIncidente}`)
    .then((response) => {
      setTipoIncidente(response.data.data.tipo_incidente);
    })
    .finally(() => {
      setLoadingTipoIncidente(false);
    })
  };

  useEffect(() => {
    fetchTipoIncidente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingTipoIncidente, tipoIncidente};
}

export const useEditTipoIncidente = ( tipoIncidenteData ) => {
  const [loadingEdit, setLoadingEdit] = useState(false);
  const history = useHistory();

  const editTipoIncidente = async function () {
    setLoadingEdit(true);
    await axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.TIPOS_INCIDENTES}editar`, tipoIncidenteData)
    .then((response) => {
      history.push("/tipoIncidentes/" + tipoIncidenteData.id);
    })
  }

  return {loadingEdit, editTipoIncidente};
}