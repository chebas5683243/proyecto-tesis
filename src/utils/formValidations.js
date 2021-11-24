import { emailValidation, notBlankValidation } from "./singleValidations"

export const validateLogin = (values) => {
  let temp = {};
  temp.email = emailValidation(values.email) ? false : "Email no válido";
  temp.password = notBlankValidation(values.password) ? false : "La contraseña no puede ser vacía"

  return {isValid: Object.values(temp).every(x => x === false), errors: temp};
}