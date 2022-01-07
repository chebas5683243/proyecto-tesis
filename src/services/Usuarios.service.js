import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchUsuarios = (params = {}, auto = true) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);

  const fetchUsuarios = async function () {
    setLoadingUsuarios(true);
    setUsuarios([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.USUARIOS}listar`, {params: params})
    .then((response) => {
      setUsuarios(response.data.data.usuarios);
    })
    .finally(() => {
      setLoadingUsuarios(false);
    })
  };

  useEffect(() => {
    if(auto) fetchUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingUsuarios, usuarios, fetchUsuarios};
}

export const useFetchDetalleUsuario = ( idUsuario ) => {
  const [usuario, setUsuario] = useState(null);
  const [loadingUsuario, setLoadingUsuario] = useState(true);

  const fetchUsuario = async function () {
    setLoadingUsuario(true);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.EMPRESAS}detalle/${idUsuario}`)
    .then((response) => {
      setUsuario(response.data.data.usuario);
    })
    .finally(() => {
      setLoadingUsuario(false);
    })
  };

  useEffect(() => {
    fetchUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingUsuario, usuario};
}