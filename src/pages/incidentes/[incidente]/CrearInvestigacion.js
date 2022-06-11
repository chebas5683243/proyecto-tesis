import { Close, Save } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import EVButton from "../../../components/atoms/EVButton.atom";
import EventData from "../../../components/molecules/investigaciones/EventData.molecule";
import LocationData from "../../../components/molecules/investigaciones/LocationData.molecule";
import ProjectData from "../../../components/molecules/investigaciones/ProjectData.molecule";
import FormHeader from "../../../components/organisms/FormHeader.organism";
import ApiRoutes from "../../../constants/ApiRoutes.constants";
import Config from "../../../constants/Config.constants";
import useForm from "../../../hooks/useForm.hook";
import { useFetchDetalleIncidente, useFetchInfoCreacionInvestigacion } from "../../../services/Incidentes.services";
import { FormGroupContainer } from "../../../styles/containers/FormGroup.style";
import { ButtonsContainer, HeaderContainer, ListViewContainer, PrimaryTitle } from "../../../styles/containers/View.style";
import { validateCreateInvestigacion } from "../../../utils/formValidations";

const CrearInvestigacion = () => {

  const history = useHistory();

  const { id } = useParams();

  const [changePunto, setChangePunto] = useState(false);

  const { loadingInvestigacion, investigacion } = useFetchInfoCreacionInvestigacion(id);

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
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
    codigo: '',
    fecha_inicio_investigacion: '',
    fecha_fin_investigacion: '',
    detalle_evento: '',
    detalle_pre_evento: '',
    detalle_post_evento: '',
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
  });
  
  const [ formExpand, setFormExpand ] = useState({
    general: true,
    evento: true,
    ubicacion: true,
    causas: true,
    acciones: true,
    evidencias: true
  });

  const [ disableSave, setDisableSave ] = useState(false);

  const handleExpand = ( name ) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const handleGoBack = () => {
    history.push('/incidentes');
  }

  const handleSave = () => {
    setErrors(f => ({}));
    let validation = validateCreateInvestigacion(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      setDisableSave(true);
      axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INVESTIGACIONES}crear`, values)
      .then((response) => {
        history.push("/investigaciones/" + response.data.data.investigacion.id);
      })
    }
  }

  useEffect(() => {
    if(!loadingInvestigacion) {
      setValues(investigacion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingInvestigacion]);
  
  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Crear Reporte Final de Investigación</PrimaryTitle>
        </div>
        <ButtonsContainer>
          <EVButton
            label="Cancelar"
            variant="outlined"
            startIcon={<Close style={{ fontSize: 24 }}/>}
            onClick={handleGoBack}
          />
          <EVButton
            disabled={disableSave}
            label="Guardar"
            variant="contained"
            startIcon={<Save style={{ fontSize: 24 }}/>}
            onClick={handleSave}
          />
        </ButtonsContainer>
      </HeaderContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.general} expand={() => handleExpand("general")} title="Datos Generales"/>
        <Collapse className="inputs-container" in={formExpand.general}>
          <div style={{width: '100%', height: '0'}}></div>
          <ProjectData
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
            values={values}
            setValues={setValues}
            errors={errors}
            handleInputChange={handleInputChange} />
            
        </Collapse>
      </FormGroupContainer>
    </ListViewContainer>
  );
}
 
export default CrearInvestigacion;