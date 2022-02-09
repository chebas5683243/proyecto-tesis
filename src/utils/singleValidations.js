export const emailValidation = (email) => {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email);
}

export const notNullValidation = (value) => {
  return value;
} 

export const notBlankValidation = (value) => {
  return value.trim() !== "";
}

export const rucValidation = (value) => {
  return (/^[0-9]{11}$/).test(value);
}

export const dniValidation = (value) => {
  return (/^[0-9]{8}$/).test(value);
}

export const isAssignedValidation = (value) => {
  return value && value.id !== 0;
}