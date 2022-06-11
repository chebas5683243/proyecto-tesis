import { useContext } from "react";
import BreadcrumbsReporte from "../../../../../components/organisms/monitoreo/BreadcrumbsReporte.organism";
import { ProjectContext } from "../../../../../context/ProjectContext";
import { ReporteContainer } from "../../../../../styles/monitoreo/Reporte.style";
import { PieChart, Pie, Cell } from 'recharts';
import EVDataGrid from "../../../../../components/atoms/EVDataGrid.atom";
import { useColumnsListReporteRegistro } from "../../../../../constants/RegistrosColumns.constants";
import { useFetchReporteRegistro } from "../../../../../services/Registros.service";
import ColoresCategorias from "../../../../../constants/ColoresCategorias.constants";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Tooltip } from "@mui/material";
import { useTooltipContext } from "../../../../../components/atoms/EVTooltip.atom";

const ReporteRegistro = () => {

  const { openTooltip, closeTooltip, getTooltipLabel } = useTooltipContext();

  const { registroId, setRegistroId } = useContext(ProjectContext);

  const { loadingReporte, registro, parametros, aqi, wqi, estandar, noAplica } = useFetchReporteRegistro(registroId);

  const porcentajeCategoriasAQI = [
    {name: "Buena", value: aqi?.aqi_1},
    {name: "Media", value: aqi?.aqi_2},
    {name: "Dañina", value: aqi?.aqi_3},
    {name: "No saludable", value: aqi?.aqi_4},
    {name: "Muy insalubre", value: aqi?.aqi_5},
    {name: "Peligrosa", value: aqi?.aqi_6},
  ];

  const porcentajeCategoriasWQI = [
    {name: "Excelente", value: wqi?.wqi_1},
    {name: "Buena", value: wqi?.wqi_2},
    {name: "Baja", value: wqi?.wqi_3},
    {name: "Muy baja", value: wqi?.wqi_4},
    {name: "Inadecuada", value: wqi?.wqi_5},
  ];

  const porcentajeCategoriasEstandar = [
    {name: "Buena", value: estandar?.buena},
    {name: "Inadecuada", value: estandar?.inadecuada},
  ];

  return (
    <ReporteContainer>
      <div className="header-container">
        <div className="go-back-button" onClick={() => setRegistroId(null)}> {'<<'} <span>Volver</span></div>
        <BreadcrumbsReporte />
      </div>
      <div className="titulo-container">
        EV-REG-{String(registroId).padStart(6, '0')}
      </div>
      <div className="info-general-container">
        <div className="info-container">
          <span className="info-titulo">Proyecto:</span>
          <span className="info-valor">{loadingReporte ? <Skeleton /> : registro?.proyecto}</span>
        </div>
        {/* <div className="info-container">
          <span className="info-titulo">Fase:</span>
          <span className="info-valor">{loadingReporte ? <Skeleton /> : registro?.proyecto}</span>
        </div> */}
        <div className="info-container">
          <span className="info-titulo">Punto de Monitoreo:</span>
          <span className="info-valor">{loadingReporte ? <Skeleton /> : registro?.punto}</span>
        </div>
        <div className="info-container">
          <span className="info-titulo">Empresa ejecutora:</span>
          <span className="info-valor">{loadingReporte ? <Skeleton /> : registro?.empresa}</span>
        </div>
        <div className="info-container">
          <span className="info-titulo">Registrado por:</span>
          <span className="info-valor">{loadingReporte ? <Skeleton /> : registro?.registrado_por}</span>
        </div>
        <div className="info-container">
          <span className="info-titulo">Fecha y hora de registro:</span>
          <span className="info-valor">{loadingReporte ? <Skeleton /> : registro?.fecha_registro}</span>
        </div>
      </div>
      <div className="info-parametros-container">
        {/* parametros considerados */}
        <div className="widget widget-parametros">
          <span className="widget-titulo">Parámetros considerados</span>
          <div className="numeros-parametros">
            <span className="big-number">{loadingReporte ? <Skeleton width={100}/> : `${Math.round(100 * registro?.parametros_considerados / registro?.total_parametros)}%`}</span>
            <span className="small-number">{loadingReporte ? <Skeleton width={100}/> : `${registro?.parametros_considerados}/${registro?.total_parametros} parámetros`}</span>
          </div>
          <div className="small-bar">
            <div style={{
              backgroundColor: ColoresCategorias.NO_APLICA.fontColor,
              width: Math.round(100 * registro?.parametros_considerados / registro?.total_parametros) + "%",
              height: '6px',
            }}/>
          </div>
        </div>
        {/* parametrizacion */}
        <div className="widget widget-parametrizacion">
          <span className="widget-titulo">Parametrización</span>
          <div className="small-bar" style={{backgroundColor: ColoresCategorias.NO_APLICA.fontColor}}>
            <Tooltip title={"Cantidad: " + aqi?.cantidad} followCursor>
              <div style={{
                backgroundColor: ColoresCategorias.AQI.fontColor,
                width: aqi?.cantidad_perc + "%",
                height: '6px',
              }}/>
            </Tooltip>
            <Tooltip title={"Cantidad: " + wqi?.cantidad} followCursor>
              <div style={{
                backgroundColor: ColoresCategorias.WQI.fontColor,
                width: wqi?.cantidad_perc + "%",
                height: '6px',
              }}/>
            </Tooltip>
            <Tooltip title={"Cantidad: " + estandar?.cantidad} followCursor>
              <div style={{
                backgroundColor: ColoresCategorias.ESTANDAR.fontColor,
                width: estandar?.cantidad_perc + "%",
                height: '6px',
              }}/>
            </Tooltip>
            <Tooltip title={"Cantidad: " + noAplica?.cantidad} followCursor>
              <div style={{
                backgroundColor: ColoresCategorias.NO_APLICA.fontColor,
                width: noAplica?.cantidad_perc + "%",
                height: '6px',
              }}/>
            </Tooltip>
          </div>
          <div className="leyenda-container">
            <div className="leyenda-item">
              <span className="item-nombre" style={{color: ColoresCategorias.AQI.fontColor}}>Parametrización AQI</span>
              <div className="item-value">
                <div className="bolita" style={{backgroundColor: ColoresCategorias.AQI.fontColor}}/>
                <span className="value-number">{loadingReporte ? <Skeleton width={100}/> : aqi?.cantidad_perc + "%"}</span>
              </div>
            </div>
            <div className="leyenda-item">
              <span className="item-nombre" style={{color: ColoresCategorias.WQI.fontColor}}>Parametrización WQI</span>
              <div className="item-value">
                <div className="bolita" style={{backgroundColor: ColoresCategorias.WQI.fontColor}}/>
                <span className="value-number">{loadingReporte ? <Skeleton width={100}/> : wqi?.cantidad_perc + "%"}</span>
              </div>
            </div>
            <div className="leyenda-item">
              <span className="item-nombre" style={{color: ColoresCategorias.ESTANDAR.fontColor}}>Parametrización Estándar</span>
              <div className="item-value">
                <div className="bolita" style={{backgroundColor: ColoresCategorias.ESTANDAR.fontColor}}/>
                <span className="value-number">{loadingReporte ? <Skeleton width={100}/> : estandar?.cantidad_perc + "%"}</span>
              </div>
            </div>
            <div className="leyenda-item">
              <span className="item-nombre" style={{color: ColoresCategorias.NO_APLICA.fontColor}}>No aplica parametrizacion</span>
              <div className="item-value">
                <div className="bolita" style={{backgroundColor: ColoresCategorias.NO_APLICA.fontColor}}/>
                <span className="value-number">{loadingReporte ? <Skeleton width={100}/> : noAplica?.cantidad_perc + "%"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="parametrizaciones-container">
        <span className="section-titulo">Detalle de las parametrizaciones</span>
        <div className="widgets-container">
          <div className="widget widget-tipos">
            <span className="widget-titulo">Parametrización AQI</span>
            <div className="data-container">
              <PieChart width={150} height={150}>
                <Pie
                  data={porcentajeCategoriasAQI}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  fill="#000"
                  dataKey="value"
                >
                  {porcentajeCategoriasAQI.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={ColoresCategorias['TIPO_' + (index+1)].fontColor}
                      onMouseEnter={e =>
                        openTooltip({
                          content: getTooltipLabel(entry.name + ": " + entry.value),
                        })
                      }
                      onMouseLeave={() => closeTooltip()}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className="leyenda-container">
                <div className="leyenda-izq">
                  <span style={{color: ColoresCategorias.TIPO_1.fontColor}}>Buena</span>
                  <span style={{color: ColoresCategorias.TIPO_2.fontColor}}>Media</span>
                  <span style={{color: ColoresCategorias.TIPO_3.fontColor}}>Dañina</span>
                  <span style={{color: ColoresCategorias.TIPO_4.fontColor}}>No saludable</span>
                  <span style={{color: ColoresCategorias.TIPO_5.fontColor}}>Muy insalubre</span>
                  <span style={{color: ColoresCategorias.TIPO_6.fontColor}}>Peligrosa</span>
                </div>
                <div className="leyenda-der">
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * aqi?.aqi_1 / aqi?.cantidad).toFixed(2) + "%"}</span>
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * aqi?.aqi_2 / aqi?.cantidad).toFixed(2) + "%"}</span>
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * aqi?.aqi_3 / aqi?.cantidad).toFixed(2) + "%"}</span>
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * aqi?.aqi_4 / aqi?.cantidad).toFixed(2) + "%"}</span>
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * aqi?.aqi_5 / aqi?.cantidad).toFixed(2) + "%"}</span>
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * aqi?.aqi_6 / aqi?.cantidad).toFixed(2) + "%"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="widget widget-tipos">
            <span className="widget-titulo">Parametrización WQI</span>
            <div className="data-container">
              <PieChart width={150} height={150}>
                <Pie
                  data={porcentajeCategoriasWQI}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  // outerRadius={80}
                  fill="#000"
                  dataKey="value"
                >
                  {porcentajeCategoriasWQI.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={ColoresCategorias['TIPO_' + (index+2)].fontColor}
                      onMouseEnter={e =>
                        openTooltip({
                          content: getTooltipLabel(entry.name + ": " + entry.value),
                        })
                      }
                      onMouseLeave={() => closeTooltip()}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className="leyenda-container">
                <div className="leyenda-izq">
                  <span style={{color: ColoresCategorias.TIPO_2.fontColor}}>Excelente</span>
                  <span style={{color: ColoresCategorias.TIPO_3.fontColor}}>Buena</span>
                  <span style={{color: ColoresCategorias.TIPO_4.fontColor}}>Baja</span>
                  <span style={{color: ColoresCategorias.TIPO_5.fontColor}}>Muy baja</span>
                  <span style={{color: ColoresCategorias.TIPO_6.fontColor}}>Inadecuada</span>
                </div>
                <div className="leyenda-der">
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * wqi?.wqi_1 / wqi?.cantidad).toFixed(2) + "%"}</span>
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * wqi?.wqi_2 / wqi?.cantidad).toFixed(2) + "%"}</span>
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * wqi?.wqi_3 / wqi?.cantidad).toFixed(2) + "%"}</span>
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * wqi?.wqi_4 / wqi?.cantidad).toFixed(2) + "%"}</span>
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * wqi?.wqi_5 / wqi?.cantidad).toFixed(2) + "%"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="widget widget-tipos">
            <span className="widget-titulo">Parametrización Estándar</span>
            <div className="data-container">
              <PieChart width={150} height={150}>
                <Pie
                  data={porcentajeCategoriasEstandar}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  // outerRadius={80}
                  fill="#000"
                  dataKey="value"
                >
                  {porcentajeCategoriasEstandar.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={ColoresCategorias['TIPO_' + (5*index+1)].fontColor}
                      onMouseEnter={e =>
                        openTooltip({
                          content: getTooltipLabel(entry.name + ": " + entry.value),
                        })
                      }
                      onMouseLeave={() => closeTooltip()}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className="leyenda-container">
                <div className="leyenda-izq">
                  <span style={{color: ColoresCategorias.TIPO_2.fontColor}}>Buena</span>
                  <span style={{color: ColoresCategorias.TIPO_6.fontColor}}>Inadecuada</span>
                </div>
                <div className="leyenda-der">
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * estandar?.buena / estandar?.cantidad).toFixed(2) + "%"}</span>
                  <span>{loadingReporte ? <Skeleton width={40}/> : (100 * estandar?.inadecuada / estandar?.cantidad).toFixed(2) + "%"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EVDataGrid
        loading={false}
        columns={useColumnsListReporteRegistro()}
        rows={parametros}
        rowHeight={60}
      />
    </ReporteContainer>
  );
}
 
export default ReporteRegistro;