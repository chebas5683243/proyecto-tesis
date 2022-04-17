import { Add, Edit, RemoveRedEye } from "@mui/icons-material";
import { Divider, Drawer, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { ProjectContext } from "../../../context/ProjectContext";
import useForm from "../../../hooks/useForm.hook";
import { PuntoParamtrosContainer } from "../../../styles/monitoreo/PuntoParamtros.style";
import EVAutocomplete from "../../atoms/EVAutocomplete.atom";
import EVButton from "../../atoms/EVButton.atom";
import { useListParametrosConParametrizacion } from "../../../services/Parametros.service";
import AgregarParametro from "./AgregarParametro.organism";
import { useListParametrosPunto } from "../../../services/Puntos.service";

const ParametersPunto = () => {

  const { puntoId, openParametros, setOpenParametros, setOpenModalParametro, setSelectedParametroPunto } = useContext(ProjectContext);

  const { loadingParametros, parametros } = useListParametrosConParametrizacion();

  const { loadingParametrosPunto, parametrosPunto, fetchParametros } = useListParametrosPunto(puntoId);

  const [disabledForm, setDisabledForm] = useState(false);

  const { values, setValues, errors, setErrors } = useForm({
    parametro: {
      id: 0,
      label: 'Selecciona un parametro',
    },
  });

  const handleOpenModalParametro = (param, disabled) => {
    setDisabledForm(disabled);
    setSelectedParametroPunto(param);
    setOpenModalParametro(true);
  }

  const getParametrizacion = (parametrizacion) => {
    switch (parametrizacion) {
      case "usa_aqi": return "AQI";
      case "usa_wqi": return "WQI";
      case "usa_estandar": return "Estándar";
      case "usa_aqi": return "No aplica";
    }
  }
  
  return (
    <Drawer
      anchor='right'
      open={openParametros}
      onClose={() => setOpenParametros(false)}
    >
      <PuntoParamtrosContainer>
        <div className="drawer-title">
          Parámetros del punto de monitoreo
        </div>
        <div className="drawer-subtitle">
          Monitoreando 11 parámetros
        </div>
        <div className="buscador-parametros">
          <EVAutocomplete
            disabled={loadingParametros}
            label="PARÁMETRO"
            size={3}
            options={parametros}
            name="parametro"
            value={values.parametro}
            setValues={setValues}
            error={errors.parametro ? true : false}
            helperText={errors.parametro}
          />
          <EVButton
            label="Agregar"
            variant="contained"
            startIcon={<Add style={{ fontSize: 24 }}/>}
            onClick={() => handleOpenModalParametro(values.parametro, false)}
          />
        </div>
        <Divider />
        <div className="lista-parametros">
          {parametrosPunto.map( parametroPunto =>
            <div className="item-parametro">
              <div className="detalle-parametro">
                <span className="nombre-parametro">{parametroPunto.nombre}</span>
                <div className="abreviatura-parametro">
                  <span>{parametroPunto.nombre_corto} </span>
                  <span>({parametroPunto.unidad.nombre_corto})</span>
                </div>
              </div>
              <div className="tipo-parametrizacion-container">
                <div className="tipo-parametrizacion">
                  <span>{getParametrizacion(parametroPunto.modo_parametros)}</span>
                </div>
              </div>
              <div className="opciones">
                <IconButton onClick={() => handleOpenModalParametro(parametroPunto, true)}>
                  <RemoveRedEye />
                </IconButton>
                <IconButton onClick={() => handleOpenModalParametro(parametroPunto, false)}>
                  <Edit />
                </IconButton>
              </div>
            </div>
          )}
        </div>
      </PuntoParamtrosContainer>
      <AgregarParametro fetchParametros={fetchParametros} disabled={disabledForm}/>
    </Drawer>
  );
}
 
export default ParametersPunto;