export const emailValidation = (email) => {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email);
}

export const notBlankValidation = (value) => {
  return value.trim() !== "";
}

export const rucValidation = (value) => {
  return (/^[0-9]{11}$/).test(value);
}