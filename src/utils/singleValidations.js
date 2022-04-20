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

export const isNumberValidation = (value) => {
  return value !== '' && !isNaN(value) && value !== null;
}

export const arrayHasElementValidation = (value) => {
  if(value) {
    let notDeletedValue = value.filter(element => (!element.deleted) );
    return notDeletedValue.length !== 0;
  }
  else return false;
}

export const dateIsBeforeOtherValidation = (date1, date2) => {
  let d1 = new Date(date1);
  let d2 = new Date(date2);
  return d1 < d2;
}

export const rangeValidation = (d1, d2) => {
  return parseFloat(d1) > parseFloat(d2);
}