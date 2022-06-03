import { Close, Save } from "@mui/icons-material";
import { Alert, Collapse, Snackbar } from "@mui/material";
import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import EVButton from "../../../components/atoms/EVButton.atom";
import EventData from "../../../components/molecules/investigaciones/EventData.molecule";
import LocationData from "../../../components/molecules/investigaciones/LocationData.molecule";
import ProjectData from "../../../components/molecules/investigaciones/ProjectData.molecule";
import FormHeader from "../../../components/organisms/FormHeader.organism";
import { useSaveDatosGenerales } from "../../../services/Investigaciones.service";
import { FormGroupContainer } from "../../../styles/containers/FormGroup.style";
import { ButtonsContainer, HeaderContainer, PrimaryTitle } from "../../../styles/containers/View.style";
import { validateGuardarDatosGeneralesInvestigacion } from "../../../utils/formValidations";

const GeneralData = ({ values, setValues, errors, setErrors, handleInputChange, setTab }) => {

  const history = useHistory();

  const [changePunto, setChangePunto] = useState(false);

  const [formExpand, setFormExpand] = useState({
    general: true,
    evento: true,
    ubicacion: true
  });

  const [openSnackbar, setOpenSnackbar] = useState({
    guardado: false,
    error: false
  })

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

  const handleNextStep = () => {
    setValues(s => ({
      ...s,
      step: 2
    }))
    setTab(1);
  }

  const { loadingEdit, saveDatosGenerales } = useSaveDatosGenerales({ ...values, nextStep: (values.step === 1) }, handleOpenSnackbar, handleNextStep);

  const handleExpand = (name) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const handleGoBack = () => {
    history.push('/investigaciones');
  }

  const handleSave = () => {
    setErrors(f => ({}));
    let validation = validateGuardarDatosGeneralesInvestigacion(values);
    setErrors(f => validation.errors);
    if (validation.isValid) {
      saveDatosGenerales();
    }
  }

  return (
    <Fragment>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Reporte Final de Investigación</PrimaryTitle>
        </div>
        <ButtonsContainer>
          <EVButton
            label="Cancelar"
            variant="outlined"
            startIcon={<Close style={{ fontSize: 24 }} />}
            onClick={handleGoBack}
          />
          {values.estado !== 3 ?
            <EVButton
              disabled={loadingEdit}
              label={values.step === 1 ? "Guardar y continuar" : "Guardar"}
              variant="contained"
              startIcon={<Save style={{ fontSize: 24 }} />}
              onClick={handleSave}
            />
            :
            null
          }
        </ButtonsContainer>
      </HeaderContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.general} expand={() => handleExpand("general")} title="Datos Generales" />
        <Collapse className="inputs-container" in={formExpand.general}>
          <div style={{ width: '100%', height: '0' }}></div>
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
        <FormHeader isExpanded={formExpand.evento} expand={() => handleExpand("evento")} title="Datos del Evento" />
        <Collapse className="inputs-container" in={formExpand.evento}>
          <div style={{ width: '100%', height: '0' }}></div>
          <EventData
            disabled={values.estado === 3}
            values={values}
            setValues={setValues}
            errors={errors}
            handleInputChange={handleInputChange} />

        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.ubicacion} expand={() => handleExpand("ubicacion")} title="Ubicación" />
        <Collapse className="inputs-container" in={formExpand.ubicacion}>
          <div style={{ width: '100%', height: '0' }}></div>
          <LocationData
            disabled={values.estado === 3}
            values={values}
            setValues={setValues}
            errors={errors}
            handleInputChange={handleInputChange} />

        </Collapse>
      </FormGroupContainer>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar.guardado} autoHideDuration={6000} onClose={() => handleCloseSnackbar("guardado")}>
        <Alert onClose={() => handleCloseSnackbar("guardado")} variant="filled" severity="success" sx={{ width: '100%' }}>
          Datos Generales guardados correctamente
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar.error} autoHideDuration={6000} onClose={() => handleCloseSnackbar("error")}>
        <Alert onClose={() => handleCloseSnackbar("error")} variant="filled" severity="error" sx={{ width: '100%' }}>
          Error interno
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default GeneralData;