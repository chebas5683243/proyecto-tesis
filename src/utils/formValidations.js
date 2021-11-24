import axios from "axios";
import ApiRoutes from "../constants/ApiRoutes.constants";
import Config from "../constants/Config.constants";
import { emailValidation, notBlankValidation } from "./singleValidations"

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