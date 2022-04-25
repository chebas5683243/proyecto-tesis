import ColoresCategorias from '../constants/ColoresCategorias.constants';

export const getColoresParametrizacion = (parametrizacion) => {
  switch (parametrizacion) {
    case "AQI":
      return ColoresCategorias.AQI;
    case "WQI":
      return ColoresCategorias.WQI;
    case "Estándar":
      return ColoresCategorias.ESTANDAR;
    case "No aplica":
      return ColoresCategorias.NO_APLICA;
    default:
      return ColoresCategorias.NO_APLICA;
  }
}

export const getColoresCategoria = (parametrizacion, tipo) => {
  switch (parametrizacion) {
    case "AQI":
      return getColoresCategoriaAQI(tipo);
    case "WQI":
      return getColoresCategoriaWQI(tipo);
    case "Estándar":
      return getColoresCategoriaEstandar(tipo);
    default:
      return getColoresCategoriaAQI(tipo);
  }
}

const getColoresCategoriaAQI = (categoria) => {
  return ColoresCategorias['TIPO_' + categoria];
}

const getColoresCategoriaWQI = (categoria) => {
  return ColoresCategorias['TIPO_' + (categoria+1)];
}

const getColoresCategoriaEstandar = (categoria) => {
  switch (categoria) {
    case 1:
      return ColoresCategorias.TIPO_1;
    case 2:
      return ColoresCategorias.TIPO_6;
    default:
      return ColoresCategorias.TIPO_1;
  }
}