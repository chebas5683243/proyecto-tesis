import { Error, Help } from "@mui/icons-material";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import { EstandarValuesContainer } from "../../../styles/parametros/EstandarValues.style";
import { ParamsTextField } from "../../../styles/TextField.style";

const WQIValues = ({ values, errors, handleInputChange}) => {
  return (
    <EstandarValuesContainer>
      <span className="titulo-estandar">
        Parametrización WQI
        <Tooltip
          title="WQI indica el grado de contaminación para un determinado uso."
          placement="bottom" >
          <IconButton>
            <Help style={{width: "1.25rem", height: "1.25rem"}}/>
          </IconButton>
        </Tooltip>
      </span>
      <div className="check-field-container">

        <span className="etiqueta-estandar estado-uno">Valor ideal por defecto</span>

        <ParamsTextField
          type="number"
          name="valor_ideal"
          value={values.valor_ideal ? values.valor_ideal : ""}
          error={errors.valor_ideal ? true : false}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
          }} />
        
        {errors.valor_ideal ?
          <Tooltip title={errors.valor_ideal} followCursor>
            <IconButton>
              <Error style={{width: "1.25rem", height: "1.25rem"}}/>
            </IconButton>
          </Tooltip>
          :
          null}
      </div>
    </EstandarValuesContainer>
  );
}
 
export default WQIValues;