import { Close, Save } from "@mui/icons-material";
import { Alert, Collapse, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import EVButton from "../../../components/atoms/EVButton.atom";
import AccionesInmediatas from "../../../components/molecules/incidentes/accionesInmediatas/AccionesInmediatas.molecule";
import Causas from "../../../components/molecules/incidentes/causas/Causas.molecule";
import EventData from "../../../components/molecules/incidentes/EventData.molecule";
import LocationData from "../../../components/molecules/incidentes/LocationData.molecule";
import ProjectData from "../../../components/molecules/incidentes/ProjectData.molecule";
import FormHeader from "../../../components/organisms/FormHeader.organism";
import useForm from "../../../hooks/useForm.hook";
import { useFetchDetalleIncidente } from "../../../services/Incidentes.services";
import { FormGroupContainer } from "../../../styles/containers/FormGroup.style";
import { ButtonsContainer, HeaderContainer, ListViewContainer, PrimaryTitle } from "../../../styles/containers/View.style";

const DetalleIncidente = () => {

  const history = useHistory();

  const { id } = useParams();

  const [changePunto, setChangePunto] = useState(false);

  const { loadingIncidente, incidente } = useFetchDetalleIncidente(id);

  const { values, setValues, errors, handleInputChange } = useForm({
    proyecto: {
      id: 0,
      label: "Selecciona un proyecto",
      responsable_propio: "",
      responsable_externo: "",
      puntos: []
    },
    punto: {
      id: 0,
      label: "Selecciona un punto de monitoreo",
      utmx: null,
      utmy: null
    },
    tipoIncidente: {
      id: 0,
      label: "Selecciona un tipo de incidente"
    },
    detalle_evento: '',
    fecha_incidente: '',
    hora_incidente: '',
    localidad: '',
    zona_sector: '',
    distrito: '',
    provincia: '',
    departamento: '',
    coordenada_norte: '',
    coordenada_este: '',
    detalle_ubicacion: '',
    causas: [],
    acciones_inmediatas: []
  });
  
  const [ formExpand, setFormExpand ] = useState({
    general: true,
    evento: true,
    ubicacion: true,
    causas: true,
    acciones: true,
    evidencias: true
  });

  const handleExpand = ( name ) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const handleGoBack = () => {
    history.push('/incidentes');
  }
  
  const handleEdit = () => {
    history.push('/incidentes/' + id + '/edit');
  }

  useEffect(() => {
    if(!loadingIncidente) {
      setValues(incidente);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingIncidente]);

  useEffect(() => {
    if(!loadingIncidente) {
      setValues(s => ({
        ...s,
        punto: incidente.punto
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.proyecto]);

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Detalle Reporte Preliminar</PrimaryTitle>
        </div>
        <ButtonsContainer>
          <EVButton
            label="Cancelar"
            variant="outlined"
            startIcon={<Close style={{ fontSize: 24 }}/>}
            onClick={handleGoBack}
          />
          <EVButton
            label="Editar"
            variant="contained"
            startIcon={<Save style={{ fontSize: 24 }}/>}
            onClick={handleEdit}
          />
        </ButtonsContainer>
      </HeaderContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.general} expand={() => handleExpand("general")} title="Datos Generales"/>
        <Collapse className="inputs-container" in={formExpand.general}>
          <div style={{width: '100%', height: '0'}}></div>
          <ProjectData
            disabled
            changePunto={changePunto}
            setChangePunto={setChangePunto}
            values={values}
            setValues={setValues}
            errors={errors}
            handleInputChange={handleInputChange} />
            
        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.evento} expand={() => handleExpand("evento")} title="Datos del Evento"/>
        <Collapse className="inputs-container" in={formExpand.evento}>
          <div style={{width: '100%', height: '0'}}></div>
          <EventData
            disabled
            values={values}
            setValues={setValues}
            errors={errors}
            handleInputChange={handleInputChange} />
            
        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.ubicacion} expand={() => handleExpand("ubicacion")} title="Ubicación"/>
        <Collapse className="inputs-container" in={formExpand.ubicacion}>
          <div style={{width: '100%', height: '0'}}></div>
          <LocationData
            disabled
            values={values}
            setValues={setValues}
            errors={errors}
            handleInputChange={handleInputChange} />
            
        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.causas} expand={() => handleExpand("causas")} title="Causas inmediatas"/>
        <Collapse className="inputs-container" in={formExpand.causas}>
          <div style={{width: '100%', height: '0'}}></div>
          <Causas
            disabled
            causas={values.causas}
            setValues={setValues} />

        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.acciones} expand={() => handleExpand("acciones")} title="Acciones inmediatas"/>
        <Collapse className="inputs-container" in={formExpand.acciones}>
          <div style={{width: '100%', height: '0'}}></div>
          <AccionesInmediatas
            disabled
            acciones={values.acciones_inmediatas}
            setValues={setValues} />

        </Collapse>
      </FormGroupContainer>
      {/* <FormGroupContainer>
        <FormHeader isExpanded={formExpand.evidencias} expand={() => handleExpand("evidencias")} title="Evidencias"/>
        <Collapse className="inputs-container" in={formExpand.evidencias}>
          <div style={{width: '100%', height: '0'}}></div>

        </Collapse>
      </FormGroupContainer> */}
    </ListViewContainer>
  );
}
 
export default DetalleIncidente;