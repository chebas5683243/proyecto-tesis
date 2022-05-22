import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchIncidentes = (auto = true) => {
  const [incidentes, setIncidentes] = useState([]);
  const [loadingIncidentes, setLoadingIncidentes] = useState(true);

  const fetchIncidentes = async function () {
    setLoadingIncidentes(true);
    setIncidentes([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INCIDENTES}listar`)
    .then((response) => {
      setIncidentes(response.data.data.incidentes);
    })
    .finally(() => {
      setLoadingIncidentes(false);
    })
  };

  useEffect(() => {
    if(auto) fetchIncidentes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingIncidentes, incidentes, fetchIncidentes};
}

export const useFetchDetalleIncidente = ( idIncidente ) => {
  const [incidente, setIncidente] = useState(null);
  const [loadingIncidente, setLoadingIncidente] = useState(true);

  const fetchIncidente = async function () {
    setLoadingIncidente(true);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INCIDENTES}detalle/${idIncidente}`)
    .then((response) => {
      setIncidente(response.data.data.incidente);
    })
    .finally(() => {
      setLoadingIncidente(false);
    })
  };

  useEffect(() => {
    fetchIncidente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingIncidente, incidente};
}

export const useEditIncidente = ( incidenteData ) => {
  const [loadingEdit, setLoadingEdit] = useState(false);
  const history = useHistory();

  const editIncidente = async function () {
    setLoadingEdit(true);
    await axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INCIDENTES}editar`, incidenteData)
    .then((response) => {
      history.push("/incidentes/" + incidenteData.id);
    })
  }

  return {loadingEdit, editIncidente};
}