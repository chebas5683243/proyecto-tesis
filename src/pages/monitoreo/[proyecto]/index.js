import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import GeneralInfo from "../../../components/organisms/monitoreo/GeneralInfo.organism";
import useForm from "../../../hooks/useForm.hook";
import { useFetchDetalleProyecto } from "../../../services/Proyectos.service";
import { ListViewContainer } from "../../../styles/containers/View.style";
import { StyledTab, StyledTabs } from "../../../styles/Tabs.style";
import PuntosMonitoreo from "./puntosMonitoreo";
import { ProjectContext } from "../../../context/ProjectContext";
import PuntoMonitoreo from "./puntosMonitoreo/[punto]";
import ReporteRegistro from "./puntosMonitoreo/[punto]/[registro]";
import CustomTooltip from "../../../components/atoms/EVTooltip.atom";

const MonitoreoProyecto = () => {

  const { idProyecto } = useParams();

  const { setProyectoId, puntoId, setPuntoId, registroId, setRegistroId } = useContext(ProjectContext);

  const { loadingProyecto, proyecto, fetchProyecto } = useFetchDetalleProyecto(idProyecto);

  const { values, setValues } = useForm({
    nombre: '',
    descripcion: '',
    codigo: '',
    fecha_inicio: '',
    fecha_fin_tentativa: '',
    fecha_fin: '',
    ubicacion: '',
    empresa_ejecutora: {
      id: 0,
      label: 'Selecciona una empresa'
    },
    fases: [],
    fecha_mas_reciente: null
  });

  const [ tab, setTab ] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    setProyectoId(idProyecto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPuntoId(null);
    setRegistroId(null);
    if (tab === 0) fetchProyecto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  useEffect(() => {
    if(!loadingProyecto) setValues(proyecto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProyecto]);

  return (
    <ListViewContainer style={{paddingBottom: '0rem'}}>
      <Box>
        <StyledTabs value={tab} onChange={handleChange}>
          <StyledTab label="Información General" />
          <StyledTab label="Puntos de monitoreo" />
        </StyledTabs>
      </Box>
      {tab === 0 ?
        <GeneralInfo values={values} /> :
        (registroId ?
          <CustomTooltip>
            <ReporteRegistro />
          </CustomTooltip>
          :
          (puntoId ?
            <PuntoMonitoreo /> :
            <PuntosMonitoreo />
          )
        )
      }
    </ListViewContainer>
  );
}
 
export default MonitoreoProyecto;