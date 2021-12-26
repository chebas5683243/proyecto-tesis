import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";

export const useFetchEmpresas = (params = {}, auto = true) => {
  const [empresas, setEmpresas] = useState([]);
  const [loadingEmpresas, setLoadingEmpresas] = useState(true);

  const fetchEmpresas = async function () {
    setLoadingEmpresas(true);
    setEmpresas([]);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.EMPRESAS}listar`, {params: params})
    .then((response) => {
      setEmpresas(response.data.data.empresas);
    })
    .finally(() => {
      setLoadingEmpresas(false);
    })
  };

  useEffect(() => {
    if(auto) fetchEmpresas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingEmpresas, empresas, fetchEmpresas};
}

export const useFetchDetalleEmpresa = ( idEmpresa ) => {
  const [empresa, setEmpresa] = useState(null);
  const [loadingEmpresa, setLoadingEmpresa] = useState(true);

  const fetchEmpresa = async function () {
    setLoadingEmpresa(true);
    await axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.EMPRESAS}detalle/${idEmpresa}`)
    .then((response) => {
      setEmpresa(response.data.data.empresa);
    })
    .finally(() => {
      setLoadingEmpresa(false);
    })
  };

  useEffect(() => {
    fetchEmpresa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loadingEmpresa, empresa};
}

export const useEditEmpresa = ( empresaData ) => {
  const [loadingEdit, setLoadingEdit] = useState(false);
  const history = useHistory();

  const editEmpresa = async function () {
    setLoadingEdit(true);
    await axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.EMPRESAS}editar`, empresaData)
    .then((response) => {
      history.push("/empresas/" + empresaData.id);
    })
  }

  return {loadingEdit, editEmpresa};
}

export const useDeleteEmpresa = () => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteEmpresa = async function (empresaId, fetchEmpresas) {
    setLoadingDelete(true);
    await axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.EMPRESAS}desactivar/${empresaId}`)
    .then((response) => {
      fetchEmpresas();
    })
  }

  return {loadingDelete, deleteEmpresa};
}

export const useActivateEmpresa = () => {
  const [loadingActive, setLoadingActive] = useState(false);

  const activateEmpresa = async function (empresaId, fetchEmpresas) {
    setLoadingActive(true);
    await axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.EMPRESAS}activar/${empresaId}`)
    .then((response) => {
      fetchEmpresas();
    })
  }

  return {loadingActive, activateEmpresa};
}