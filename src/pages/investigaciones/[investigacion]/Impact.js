import { Close, Save } from "@mui/icons-material";
import { Alert, Collapse, Snackbar } from "@mui/material";
import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import EVButton from "../../../components/atoms/EVButton.atom";
import Impactos from "../../../components/molecules/investigaciones/impactosAmbientales/ImpactosAmbientales.molecule";
import PersonasAfectadas from "../../../components/molecules/investigaciones/personasAfectadas/PersonasAfectadas.molecule";
import FormHeader from "../../../components/organisms/FormHeader.organism";
import { useSaveConsecuencias } from "../../../services/Investigaciones.service";
import { FormGroupContainer } from "../../../styles/containers/FormGroup.style";
import { ButtonsContainer, HeaderContainer, PrimaryTitle } from "../../../styles/containers/View.style";

const Impact = ({ values, setValues, errors, setErrors, handleInputChange, setTab }) => {

  const history = useHistory();

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
      step: 3
    }))
    setTab(2);
  }

  const { loadingEdit, saveConsecuencias } = useSaveConsecuencias({ ...values, nextStep: (values.step === 2) }, handleOpenSnackbar, handleNextStep);

  const [formExpand, setFormExpand] = useState({
    impactos: true,
    personas: true
  });

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
    saveConsecuencias();
  }

  return (
    <Fragment>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Consecuencias ambientales</PrimaryTitle>
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
              label={values.step === 2 ? "Guardar y continuar" : "Guardar"}
              variant="contained"
              startIcon={<Save style={{ fontSize: 24 }} />}
              onClick={handleSave}
            />
            : null
          }
        </ButtonsContainer>
      </HeaderContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.impactos} expand={() => handleExpand("impactos")} title="Impactos y daños ambientales" />
        <Collapse className="inputs-container" in={formExpand.impactos}>
          <div style={{ width: '100%', height: '0' }}></div>
          <Impactos
            disabled={values.estado === 3}
            impactos={values.impactos}
            setValues={setValues} />

        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.personas} expand={() => handleExpand("personas")} title="Afectación a la salud de las personas" />
        <Collapse className="inputs-container" in={formExpand.personas}>
          <div style={{ width: '100%', height: '0' }}></div>
          <PersonasAfectadas
            disabled={values.estado === 3}
            personas={values.personas}
            setValues={setValues} />
        </Collapse>
      </FormGroupContainer>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar.guardado} autoHideDuration={6000} onClose={() => handleCloseSnackbar("guardado")}>
        <Alert onClose={() => handleCloseSnackbar("guardado")} variant="filled" severity="success" sx={{ width: '100%' }}>
          Consecuencias guardadas correctamente
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

export default Impact;