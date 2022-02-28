import axios from "axios";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";
import { arrayHasElementValidation, dateIsBeforeOtherValidation, dniValidation, emailValidation, isAssignedValidation, isNumberValidation, notBlankValidation, notNullValidation, rucValidation } from "./singleValidations"

export const parseValidation = (temp) => {
  return {isValid: Object.values(temp).every(x => x === false), errors: temp};
}

export const validateChangePassword = async (values, infoUsuario, token) => {
  let temp = {};
  let payload = {'email': infoUsuario.email, 'password': values.current};
  if(!notBlankValidation(values.current)) {
    temp.current = "La contraseña anterior no se ha escrito correctamente.";
    return parseValidation(temp);
  }
  else {
    const response = await axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.AUTH}validateUser`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if(!response.data.validation) {
      temp.current = "La contraseña actual no es válida.";
      return parseValidation(temp);
    }
  }
  if(!notBlankValidation(values.newPassword)) {
    temp.newPassword = "No puedes utilizar una contraseña en blanco.";
    return parseValidation(temp);
  }
  if(values.newPassword !== values.repeatPassword) {
    temp.newPassword = "Debes introducir la misma contraseña dos veces para confirmarla.";
    temp.repeatPassword = "Debes introducir la misma contraseña dos veces para confirmarla.";
  }
  return parseValidation(temp);
}

export const validateLogin = (values) => {
  let temp = {};
  temp.email = emailValidation(values.email) ? false : "Email no válido";
  temp.password = notBlankValidation(values.password) ? false : "La contraseña no puede ser vacía"

  return parseValidation(temp);
}

export const validateCreateEmpresa = (values) => {
  let temp = {};
  temp.ruc = rucValidation(values.ruc) ? false : "RUC no válido";
  temp.razon_social = notBlankValidation(values.razon_social) ? false : "Este campo no puede ser vacío";
  temp.tipo_contribuyente = notBlankValidation(values.tipo_contribuyente) ? false : "Este campo no puede ser vacío";
  temp.direccion_fiscal = notBlankValidation(values.direccion_fiscal) ? false : "Este campo no puede ser vacío";
  temp.distrito_ciudad = notBlankValidation(values.distrito_ciudad) ? false : "Este campo no puede ser vacío";
  temp.departamento = notBlankValidation(values.departamento) ? false : "Este campo no puede ser vacío";
  temp.email = emailValidation(values.email) ? false : "Email no válido";
  temp.numero_telefonico = notBlankValidation(values.numero_telefonico) ? false : "Este campo no puede ser vacío";

  return parseValidation(temp);
}

export const validateCreateUsuario = (values) => {
  let temp = {};
  temp.primer_nombre = notBlankValidation(values.primer_nombre) ? false : "Este campo no puede ser vacío";
  temp.segundo_nombre = notBlankValidation(values.segundo_nombre) ? false : "Este campo no puede ser vacío";
  temp.primer_apellido = notBlankValidation(values.primer_apellido) ? false : "Este campo no puede ser vacío";
  temp.segundo_apellido = notBlankValidation(values.segundo_apellido) ? false : "Este campo no puede ser vacío";
  temp.dni = dniValidation(values.dni) ? false : "DNI no válido";
  temp.email = emailValidation(values.email) ? false : "Email no válido";
  temp.numero_celular = notBlankValidation(values.numero_celular) ? false : "Este campo no puede ser vacío";
  temp.company = isAssignedValidation(values.company) ? false : "Seleccione una empresa";
  temp.cargo = notBlankValidation(values.cargo) ? false : "Este campo no puede ser vacío";

  return parseValidation(temp);
}

export const validateCreateUnidadMedida = (values) => {
  let temp = {};
  temp.nombre = notBlankValidation(values.nombre) ? false : "Este campo no puede ser vacío";
  temp.nombre_corto = notBlankValidation(values.nombre_corto) ? false : "Este campo no puede ser vacío";

  return parseValidation(temp);
}

export const validateCreateParametro = (values) => {
  let temp = {};
  temp.nombre = notBlankValidation(values.nombre) ? false : "Este campo no puede ser vacío";
  temp.nombre_corto = notBlankValidation(values.nombre_corto) ? false : "Este campo no puede ser vacío";
  temp.unidad = isAssignedValidation(values.unidad) ? false : "Seleccione una unidad";
  if(values.tiene_minimo) temp.valor_minimo = isNumberValidation(values.valor_minimo) ? false : "Este campo no puede ser vacío";
  if(values.tiene_maximo) temp.valor_maximo = isNumberValidation(values.valor_maximo) ? false : "Este campo no puede ser vacío";

  return parseValidation(temp);
}

export const validateCreateFase = (values) => {
  let temp = {};
  temp.nombre = notBlankValidation(values.nombre) ? false : "Este campo no puede ser vacío";
  temp.descripcion = notBlankValidation(values.descripcion) ? false : "Este campo no puede ser vacío";

  return parseValidation(temp);
}

export const validateCreateProyecto = (values, handleOpenSnackbar) => {
  let temp = {};
  temp.nombre = notBlankValidation(values.nombre) ? false : "Este campo no puede ser vacío";
  temp.descripcion = notBlankValidation(values.descripcion) ? false : "Este campo no puede ser vacío";
  temp.fecha_inicio = notBlankValidation(values.fecha_inicio) ? false : "Este campo no puede ser vacío";
  temp.fecha_fin_tentativa = notBlankValidation(values.fecha_fin_tentativa) ? false : "Este campo no puede ser vacío";
  if(!temp.fecha_inicio && !temp.fecha_fin_tentativa) {
    temp.fecha_fin_tentativa = dateIsBeforeOtherValidation(values.fecha_inicio, values.fecha_fin_tentativa) ? false : "La fecha debe ser menor a la fecha de inicio";
  }
  temp.ubicacion = notBlankValidation(values.ubicacion) ? false : "Este campo no puede ser vacío";
  temp.responsable_propio = isAssignedValidation(values.responsable_propio) ? false : "Seleccione un usuario";
  temp.empresa_ejecutora = isAssignedValidation(values.empresa_ejecutora) ? false : "Seleccione una empresa";
  if(isAssignedValidation(values.empresa_ejecutora)) {
    temp.responsable_externo = isAssignedValidation(values.responsable_externo) ? false : "Seleccione un usuario";
  }
  if(!arrayHasElementValidation(values.fases)) {
    temp.fases = "El proyecto debe contar con al menos una fase";
    handleOpenSnackbar("fases");
  }

  return parseValidation(temp);
}