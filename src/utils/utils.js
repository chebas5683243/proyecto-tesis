import GridCellExpand from "../components/atoms/GridCellExpand.atom";

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

export const renderCellExpand = (params) => (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
);