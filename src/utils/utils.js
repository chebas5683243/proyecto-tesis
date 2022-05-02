export const getSizeToPercentage = (size) => {
  return ( 102 * size - 8 ) / 4;
}

export const isEmptyObject = (obj) => {
  for(var prop in obj){
    if(obj.hasOwnProperty(prop)){
      return false;
    }
  }
  return true;
}