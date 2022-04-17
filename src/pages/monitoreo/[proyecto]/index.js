import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import GeneralInfo from "../../../components/organisms/monitoreo/GeneralInfo.organism";
import useForm from "../../../hooks/useForm.hook";
import { useFetchDetalleProyecto } from "../../../services/Proyectos.service";
import { ListViewContainer } from "../../../styles/containers/View.style";
import { StyledTab, StyledTabs } from "../../../styles/Tabs.style";
import PuntosMonitoreo from "./puntosMonitoreo";
import { ProjectContext } from "../../../context/ProjectContext";
import PuntoMonitoreo from "./puntosMonitoreo/[punto]";

const MonitoreoProyecto = () => {

  const { idProyecto } = useParams();

  const { setProyectoId, puntoId, setPuntoId } = useContext(ProjectContext);

  const { loadingProyecto, proyecto } = useFetchDetalleProyecto(idProyecto);

  const { values, setValues, errors, handleInputChange } = useForm({
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
    fases: []
  });

  const [ tab, setTab ] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    setProyectoId(idProyecto);
  }, []);

  useEffect(() => {
    setPuntoId(null);
  }, [tab])

  useEffect(() => {
    if(!loadingProyecto) setValues(proyecto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProyecto]);

  return (
    <ListViewContainer>
      <Box>
        <StyledTabs value={tab} onChange={handleChange}>
          <StyledTab label="Información General" />
          <StyledTab label="Puntos de monitoreo" />
        </StyledTabs>
      </Box>
      {tab === 0 ?
        <GeneralInfo values={values} /> :
        (puntoId ?
          <PuntoMonitoreo /> :
          <PuntosMonitoreo />
        )
      }
    </ListViewContainer>
  );
}
 
export default MonitoreoProyecto;