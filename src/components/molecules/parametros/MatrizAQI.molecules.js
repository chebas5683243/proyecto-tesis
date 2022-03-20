import { Error, Help } from "@mui/icons-material";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import { MatrixAQIContainer } from "../../../styles/parametros/MatrixAQI.style";
import { ParamsTextField } from "../../../styles/TextField.style";

const MatrizAQI = ({ values, errors, handleInputChange, disabled }) => {

  return (
    <MatrixAQIContainer>
      <span className="titulo-matriz">
        Matriz AQI
        <Tooltip
          title="AQI es una métrica estandarizada utilizada internacionalmente para evaluar la polución del aire"
          // followCursor
          placement="right" >
          <IconButton>
            <Help style={{width: "1.25rem", height: "1.25rem"}}/>
          </IconButton>
        </Tooltip>
      </span>
      <div className="matriz-aqi">
        <div className="columnas-matriz separated">
          <div className="header-matriz">
            Categoría AQI
          </div>
          <div className="etiqueta-matriz estado-uno">
            Bueno
          </div>
          <div className="etiqueta-matriz estado-dos">
            Medio
          </div>
          <div className="etiqueta-matriz estado-tres">
            Dañino
          </div>
          <div className="etiqueta-matriz estado-cuatro">
            No saludable
          </div>
          <div className="etiqueta-matriz estado-cinco">
            Muy insalubre
          </div>
          <div className="etiqueta-matriz estado-seis">
            Peligroso
          </div>
        </div>
        <div className="columnas-matriz">
          <div className="header-matriz">
            Desde
            <Tooltip title="Concentración mínima de la Categoría AQI" followCursor>
              <IconButton>
                <Help style={{width: "1.25rem", height: "1.25rem"}}/>
              </IconButton>
            </Tooltip>
          </div>
          <div className="inputs-matriz">
            <ParamsTextField
              disabled
              value={0}
              InputProps={{
                endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
              }} />
          </div>
          <div className="inputs-matriz">
            <ParamsTextField
              disabled
              value={values.aqi_1}
              InputProps={{
                endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
              }} />
          </div>
          <div className="inputs-matriz">
            <ParamsTextField
              disabled
              value={values.aqi_2}
              InputProps={{
                endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
              }} />
          </div>
          <div className="inputs-matriz">
            <ParamsTextField
              disabled
              value={values.aqi_3}
              InputProps={{
                endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
              }} />
          </div>
          <div className="inputs-matriz">
            <ParamsTextField
              disabled
              value={values.aqi_4}
              InputProps={{
                endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
              }} />
          </div>
          <div className="inputs-matriz">
            <ParamsTextField
              disabled
              value={values.aqi_5}
              InputProps={{
                endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
              }} />
          </div>
        </div>
        <div className="columnas-matriz">
          <div className="header-matriz">
            Hasta
            <Tooltip title="Concentración máxima de la Categoría AQI" followCursor>
              <IconButton>
                <Help style={{width: "1.25rem", height: "1.25rem"}}/>
              </IconButton>
            </Tooltip>
          </div>
          <div className="inputs-matriz">
            <ParamsTextField
              type="number"
              disabled={disabled}
              value={values.aqi_1}
              onChange={handleInputChange}
              name="aqi_1"
              error={errors.aqi_1 ? true : false}
              InputProps={{
                endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
              }} />
            {errors.aqi_1 ?
              <Tooltip title={errors.aqi_1} followCursor>
                <IconButton>
                  <Error style={{width: "1.25rem", height: "1.25rem"}}/>
                </IconButton>
              </Tooltip>
              :
              null}
          </div>
          <div className="inputs-matriz">
            <ParamsTextField
              type="number"
              disabled={disabled}
              value={values.aqi_2}
              onChange={handleInputChange}
              name="aqi_2"
              error={errors.aqi_2 ? true : false}
              InputProps={{
                endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
              }} />
            {errors.aqi_2 ?
              <Tooltip title={errors.aqi_2} followCursor>
                <IconButton>
                  <Error style={{width: "1.25rem", height: "1.25rem"}}/>
                </IconButton>
              </Tooltip>
              :
              null}
          </div>
          <div className="inputs-matriz">
            <ParamsTextField
              type="number"
              disabled={disabled}
              value={values.aqi_3}
              onChange={handleInputChange}
              name="aqi_3"
              error={errors.aqi_3 ? true : false}
              InputProps={{
                endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
              }} />
            {errors.aqi_3 ?
              <Tooltip title={errors.aqi_3} followCursor>
                <IconButton>
                  <Error style={{width: "1.25rem", height: "1.25rem"}}/>
                </IconButton>
              </Tooltip>
              :
              null}
          </div>
          <div className="inputs-matriz">
            <ParamsTextField
              type="number"
              disabled={disabled}
              value={values.aqi_4}
              onChange={handleInputChange}
              name="aqi_4"
              error={errors.aqi_4 ? true : false}
              InputProps={{
                endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
              }} />
            {errors.aqi_4 ?
              <Tooltip title={errors.aqi_4} followCursor>
                <IconButton>
                  <Error style={{width: "1.25rem", height: "1.25rem"}}/>
                </IconButton>
              </Tooltip>
              :
              null}
          </div>
          <div className="inputs-matriz">
            <ParamsTextField
              type="number"
              disabled={disabled}
              value={values.aqi_5}
              onChange={handleInputChange}
              name="aqi_5"
              error={errors.aqi_5 ? true : false}
              InputProps={{
                endAdornment: <InputAdornment position="end">{values.unidad.nombre_corto}</InputAdornment>,
              }} />
            {errors.aqi_5 ?
              <Tooltip title={errors.aqi_5} followCursor>
                <IconButton>
                  <Error style={{width: "1.25rem", height: "1.25rem"}}/>
                </IconButton>
              </Tooltip>
              :
              null}
          </div>
        </div>
      </div>
    </MatrixAQIContainer>
  );
}
 
export default MatrizAQI;