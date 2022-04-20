export const getToken = () => {
  return localStorage.getItem('token');
}

export const isEmptyObject = (obj) => {
  for(var prop in obj){
    if(obj.hasOwnProperty(prop)){
      return false;
    }
  }
  return true;
}

export const deleteToken = () => {
  localStorage.removeItem('token');
}