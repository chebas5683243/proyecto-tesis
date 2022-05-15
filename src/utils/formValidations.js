import axios from "axios";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";
import { arrayHasElementValidation, dateIsBeforeOtherValidation, dniValidation, emailValidation, isAssignedValidation, isNumberValidation, notBlankValidation, notNullValidation, rangeValidation, rucValidation } from "./singleValidations"

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
  if(values.usa_aqi) {
    temp.aqi_1 = isNumberValidation(values.aqi_1) ? rangeValidation(values.aqi_1, 0) ? false : "El rango debe ser válido" : "Este campo no puede ser vacío";
    temp.aqi_2 = isNumberValidation(values.aqi_2) ? rangeValidation(values.aqi_2, values.aqi_1) ? false : "El rango debe ser válido" : "Este campo no puede ser vacío";
    temp.aqi_3 = isNumberValidation(values.aqi_3) ? rangeValidation(values.aqi_3, values.aqi_2) ? false : "El rango debe ser válido" : "Este campo no puede ser vacío";
    temp.aqi_4 = isNumberValidation(values.aqi_4) ? rangeValidation(values.aqi_4, values.aqi_3) ? false : "El rango debe ser válido" : "Este campo no puede ser vacío";
    temp.aqi_5 = isNumberValidation(values.aqi_5) ? rangeValidation(values.aqi_5, values.aqi_4) ? false : "El rango debe ser válido" : "Este campo no puede ser vacío";
  }
  else if(values.usa_wqi) {
    temp.valor_ideal = isNumberValidation(values.valor_ideal) ? false : "Este campo no puede ser vacío";
    temp.valor_estandar_permisible = isNumberValidation(values.valor_estandar_permisible) ? false : "Este campo no puede ser vacío";
  }
  else if(values.usa_estandar) {
    if(values.tiene_minimo) temp.valor_minimo = isNumberValidation(values.valor_minimo) ? false : "Este campo no puede ser vacío";
    if(values.tiene_maximo) temp.valor_maximo = isNumberValidation(values.valor_maximo) ? false : "Este campo no puede ser vacío";
  }

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

export const validateCreateTipoIncidente = (values, handleOpenSnackbar) => {
  let temp = {};
  temp.nombre = notBlankValidation(values.nombre) ? false : "Este campo no puede ser vacío";
  if(!arrayHasElementValidation(values.parametros)) {
    temp.parametros = "El proyecto debe contar con al menos un parámetro asociado";
    handleOpenSnackbar("parametros");
  }
  if(!arrayHasElementValidation(values.personas_alertas)) {
    temp.personas_alertas = "El proyecto debe contar con al menos una persona a alertar";
    handleOpenSnackbar("personas_alertas");
  }

  return parseValidation(temp);
}

export const validateCreatePersona = (values) => {
  let temp = {};
  temp.nombre_completo = notBlankValidation(values.nombre_completo) ? false : "Este campo no puede ser vacío";
  temp.email = emailValidation(values.email) ? false : "Email no válido";

  return parseValidation(temp);
}

export const validateCreateParametroAsociado = (values) => {
  let temp = {};
  temp.parametro = isAssignedValidation(values.parametro) ? false : "Seleccione un parámetro";

  return parseValidation(temp);
}

export const validateCreatePuntoMonitoreo = (values) => {
  let temp = {};
  temp.nombre = notBlankValidation(values.nombre) ? false : "Este campo no puede ser vacío";
  temp.longitud = isNumberValidation(values.longitud) ? false : "Este campo no puede ser vacío";
  temp.latitud = isNumberValidation(values.latitud) ? false : "Este campo no puede ser vacío";
  temp.altitud = isNumberValidation(values.altitud) ? false : "Este campo no puede ser vacío";

  return parseValidation(temp);
}

export const validateCreateCausa = (values) => {
  let temp = {};
  temp.tipo = isAssignedValidation(values.tipo) ? false : "Seleccione un tipo de causa";
  temp.descripcion = notBlankValidation(values.descripcion) ? false : "Este campo no puede ser vacío";

  return parseValidation(temp);
}