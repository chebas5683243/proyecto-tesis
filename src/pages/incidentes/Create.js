import { Close, Save } from "@mui/icons-material";
import { useHistory } from "react-router";
import useForm from "../../hooks/useForm.hook";
import { HeaderContainer, ListViewContainer, PrimaryTitle, ButtonsContainer } from "../../styles/containers/View.style";
import EVButton from "../../components/atoms/EVButton.atom";
import { FormGroupContainer } from "../../styles/containers/FormGroup.style";
import FormHeader from "../../components/organisms/FormHeader.organism";
import { useState } from "react";
import { Alert, Collapse, Snackbar } from "@mui/material";
import { validateCreateIncidente } from "../../utils/formValidations";
import axios from "axios";
import Config from "../../constants/Config.constants";
import ApiRoutes from "../../constants/ApiRoutes.constants";
import EventData from "../../components/molecules/incidentes/EventData.molecule";
import LocationData from "../../components/molecules/incidentes/LocationData.molecule";
import Causas from "../../components/molecules/incidentes/causas/Causas.molecule";
import ProjectData from "../../components/molecules/incidentes/ProjectData.molecule";
import AccionesInmediatas from "../../components/molecules/incidentes/accionesInmediatas/AccionesInmediatas.molecule";

const CreateIncidente = () => {

  const history = useHistory();

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

  const [ openSnackbar, setOpenSnackbar] = useState({
    causas: false,
    acciones: false
  })

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
    let validation = validateCreateIncidente(values, handleOpenSnackbar);
    setErrors(f => validation.errors);
    if(validation.isValid){
      setDisableSave(true);
      axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INCIDENTES}crear`, values)
      .then((response) => {
        history.push("/incidentes/" + response.data.data.incidente.id);
      })
    }
  }

  const handleCloseSnackbar = (snackbar) => {
    setOpenSnackbar(p => ({
      ...p,
      [snackbar]: false
    }));
  }

  const handleOpenSnackbar = (snackbar) => {
    setOpenSnackbar(p => ({
      ...p,
      [snackbar]: true
    }));
  }

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Nuevo Reporte Preliminar</PrimaryTitle>
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
            changePunto={true}
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
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.causas} expand={() => handleExpand("causas")} title="Causas inmediatas"/>
        <Collapse className="inputs-container" in={formExpand.causas}>
          <div style={{width: '100%', height: '0'}}></div>
          <Causas
            causas={values.causas}
            setValues={setValues} />

        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.acciones} expand={() => handleExpand("acciones")} title="Acciones inmediatas"/>
        <Collapse className="inputs-container" in={formExpand.acciones}>
          <div style={{width: '100%', height: '0'}}></div>
          <AccionesInmediatas
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
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar.causas} autoHideDuration={6000} onClose={() => handleCloseSnackbar("causas")}>
        <Alert onClose={() => handleCloseSnackbar("causas")} variant="filled" severity="error" sx={{ width: '100%' }}>
          {errors.causas}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar.acciones} autoHideDuration={6000} onClose={() => handleCloseSnackbar("acciones")}>
        <Alert onClose={() => handleCloseSnackbar("acciones")} variant="filled" severity="error" sx={{ width: '100%' }}>
          {errors.acciones_inmediatas}
        </Alert>
      </Snackbar>
    </ListViewContainer>
  );
}
 
export default CreateIncidente;