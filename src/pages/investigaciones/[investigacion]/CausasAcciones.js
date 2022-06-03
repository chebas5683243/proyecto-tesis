import { Close, Save } from "@mui/icons-material";
import { Alert, Collapse, Snackbar } from "@mui/material";
import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import EVButton from "../../../components/atoms/EVButton.atom";
import Causas from "../../../components/molecules/incidentes/causas/Causas.molecule";
import FormHeader from "../../../components/organisms/FormHeader.organism";
import { useSaveCausasAcciones } from "../../../services/Investigaciones.service";
import { FormGroupContainer } from "../../../styles/containers/FormGroup.style";
import { ButtonsContainer, HeaderContainer, PrimaryTitle } from "../../../styles/containers/View.style";
import { validateGuardarCausasAccionesInvestigacion } from "../../../utils/formValidations";

const CausasAcciones = ({ values, setValues, errors, setErrors, handleInputChange, setTab }) => {

  const history = useHistory();

  const [formExpand, setFormExpand] = useState({
    causas: true
  });

  const handleExpand = (name) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const [openSnackbar, setOpenSnackbar] = useState({
    causas: false,
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
    console.log("a")
    setValues(s => ({
      ...s,
      step: 4
    }))
    setTab(3);
  }

  const { loadingEdit, saveCausasAcciones } = useSaveCausasAcciones({ ...values, nextStep: (values.step === 3) }, handleOpenSnackbar, handleNextStep);

  const handleGoBack = () => {
    history.push('/investigaciones');
  }

  const handleSave = () => {
    setErrors(f => ({}));
    let validation = validateGuardarCausasAccionesInvestigacion(values, handleOpenSnackbar);
    setErrors(f => validation.errors);
    if (validation.isValid) {
      saveCausasAcciones();
    }
  }

  return (
    <Fragment>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Causas Inmediatas</PrimaryTitle>
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
              label={values.step === 3 ? "Guardar y continuar" : "Guardar"}
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
        <FormHeader isExpanded={formExpand.causas} expand={() => handleExpand("causas")} title="Causas Inmediatas" />
        <Collapse className="inputs-container" in={formExpand.causas}>
          <div style={{ width: '100%', height: '0' }}></div>
          <Causas
            disabled={values.estado === 3}
            causas={values.causas}
            setValues={setValues} />

        </Collapse>
      </FormGroupContainer>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar.causas} autoHideDuration={6000} onClose={() => handleCloseSnackbar("causas")}>
        <Alert onClose={() => handleCloseSnackbar("causas")} variant="filled" severity="error" sx={{ width: '100%' }}>
          {errors.causas}
        </Alert>
      </Snackbar>
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

export default CausasAcciones;