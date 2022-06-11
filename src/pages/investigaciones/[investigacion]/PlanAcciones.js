import { Close, Save } from "@mui/icons-material";
import { Alert, Collapse, Snackbar } from "@mui/material";
import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import EVButton from "../../../components/atoms/EVButton.atom";
import Acciones from "../../../components/molecules/investigaciones/planAcciones/Acciones.molecule";
import FormHeader from "../../../components/organisms/FormHeader.organism";
import { useSavePlanAcciones } from "../../../services/Investigaciones.service";
import { FormGroupContainer } from "../../../styles/containers/FormGroup.style";
import { ButtonsContainer, HeaderContainer, PrimaryTitle } from "../../../styles/containers/View.style";
import { validateGuardarPlanAccionesInvestigacion } from "../../../utils/formValidations";

const PlanAcciones = ({ values, setValues, errors, setErrors, handleInputChange, setTab }) => {

  const history = useHistory();

  const [formExpand, setFormExpand] = useState({
    acciones: true
  });

  const handleExpand = (name) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const [openSnackbar, setOpenSnackbar] = useState({
    acciones: false,
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

  const { loadingEdit, savePlanAcciones } = useSavePlanAcciones({ ...values, nextStep: (values.step === 4) }, handleOpenSnackbar);

  const handleGoBack = () => {
    history.push('/investigaciones');
  }

  const handleSave = () => {
    setErrors(f => ({}));
    let validation = validateGuardarPlanAccionesInvestigacion(values, handleOpenSnackbar);
    setErrors(f => validation.errors);
    if (validation.isValid) {
      savePlanAcciones();
    }
  }

  return (
    <Fragment>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Plan de acciones</PrimaryTitle>
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
              label="Guardar"
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
        <FormHeader isExpanded={formExpand.acciones} expand={() => handleExpand("acciones")} title="Plan de acciones" />
        <Collapse className="inputs-container" in={formExpand.acciones}>
          <div style={{ width: '100%', height: '0' }}></div>
          <Acciones
            disabled={values.estado === 3}
            acciones={values.acciones}
            setValues={setValues} />

        </Collapse>
      </FormGroupContainer>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar.acciones} autoHideDuration={6000} onClose={() => handleCloseSnackbar("acciones")}>
        <Alert onClose={() => handleCloseSnackbar("acciones")} variant="filled" severity="error" sx={{ width: '100%' }}>
          {errors.acciones}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar.guardado} autoHideDuration={6000} onClose={() => handleCloseSnackbar("guardado")}>
        <Alert onClose={() => handleCloseSnackbar("guardado")} variant="filled" severity="success" sx={{ width: '100%' }}>
          Plan de acciones guardado correctamente
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

export default PlanAcciones;