import { Error, Help } from "@mui/icons-material";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import { EstandarValuesContainer } from "../../../styles/parametros/EstandarValues.style";
import { ParamsTextField } from "../../../styles/TextField.style";
import EVCheckbox from "../../atoms/EVCheckbox.atom";

const EstandarValues = ({ values, errors, handleInputChange, handleCheckChange }) => {
  return (
    <EstandarValuesContainer>
      <span className="titulo-estandar">
        Parametrización Estándar
        <Tooltip
          title="Valores admisibles por defecto. Estos valores pueden ser modificados por cada punto de monitoreo."
          placement="right" >
          <IconButton>
            <Help style={{width: "1.25rem", height: "1.25rem"}}/>
          </IconButton>
        </Tooltip>
      </span>
      <div className="check-field-container">
        <EVCheckbox
          name="tiene_minimo"
          checked={values.tiene_minimo}
          onChange={handleCheckChange} />

        <div className="etiqueta-estandar estado-uno">
          Valor mínimo por defecto
        </div>

        <ParamsTextField
          disabled={!values.tiene_minimo}
          type="number"
          name="valor_minimo"
          value={values.tiene_minimo ? values.valor_minimo : ""}
          error={errors.valor_minimo ? true : false}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
          }} />

        {errors.valor_minimo ?
          <Tooltip title={errors.valor_minimo} followCursor>
            <IconButton>
              <Error style={{width: "1.25rem", height: "1.25rem"}}/>
            </IconButton>
          </Tooltip>
          :
          null}
      </div>
      <div className="check-field-container">
        <EVCheckbox
          name="tiene_maximo"
          checked={values.tiene_maximo}
          onChange={handleCheckChange} />

        <div className="etiqueta-estandar estado-cinco">
          Valor máximo por defecto
        </div>

        <ParamsTextField
          disabled={!values.tiene_maximo}
          type="number"
          name="valor_maximo"
          value={values.tiene_maximo ? values.valor_maximo : ""}
          error={errors.valor_maximo ? true : false}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
          }} />

        {errors.valor_maximo ?
          <Tooltip title={errors.valor_maximo} followCursor>
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
 
export default EstandarValues;