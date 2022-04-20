import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchProyectos = (params = {}, auto = true) => {
  const [proyectos, setProyectos] = useState([]);
  const [loadingProyectos, setLoadingProyectos] = useState(true);

  const fetchProyectos = async function () {
    setLoadingProyectos(true);
    setProyectos([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PROYECTOS}listar`, {params: params})
    .then((response) => {
      setProyectos(response.data.data.proyectos);
    })
    .finally(() => {
      setLoadingProyectos(false);
    })
  };

  useEffect(() => {
    if(auto) fetchProyectos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingProyectos, proyectos, fetchProyectos};
}

export const useFetchDetalleProyecto = ( idProyecto ) => {
  const [proyecto, setProyecto] = useState(null);
  const [loadingProyecto, setLoadingProyecto] = useState(true);

  const fetchProyecto = async function () {
    setLoadingProyecto(true);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PROYECTOS}detalle/${idProyecto}`)
    .then((response) => {
      setProyecto(response.data.data.proyecto);
    })
    .finally(() => {
      setLoadingProyecto(false);
    })
  };

  useEffect(() => {
    fetchProyecto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingProyecto, proyecto};
}

export const useEditProyecto = ( proyectoData ) => {
  const [loadingEdit, setLoadingEdit] = useState(false);
  const history = useHistory();

  const editProyecto = async function () {
    setLoadingEdit(true);
    await axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PROYECTOS}editar`, proyectoData)
    .then((response) => {
      history.push("/proyectos/" + proyectoData.id);
    })
  }

  return {loadingEdit, editProyecto};
}