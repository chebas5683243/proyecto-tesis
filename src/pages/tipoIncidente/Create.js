import { Close, Save } from "@mui/icons-material";
import { useHistory } from "react-router";
import useForm from "../../hooks/useForm.hook";
import { HeaderContainer, ListViewContainer, PrimaryTitle, ButtonsContainer } from "../../styles/containers/View.style";
import EVButton from "../../components/atoms/EVButton.atom";
import { FormGroupContainer } from "../../styles/containers/FormGroup.style";
import FormHeader from "../../components/organisms/FormHeader.organism";
import { useState } from "react";
import { Alert, Collapse, Snackbar } from "@mui/material";
import { validateCreateTipoIncidente } from "../../utils/formValidations";
import axios from "axios";
import Config from "../../constants/Config.constants";
import ApiRoutes from "../../constants/ApiRoutes.constants";
import EVTextField from "../../components/atoms/EVTextField.atom";
import CreateParametros from "../../components/molecules/tiposIncidentes/CreateParametros.molecule";
import CreatePersonas from "../../components/molecules/tiposIncidentes/CreatePersonas.molecule";

const CreateTipoIncidente = () => {

  const history = useHistory();

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    nombre: '',
    parametros: [],
    personas_alertas: []
  });

  const [ openSnackbar, setOpenSnackbar] = useState({
    parametros: false,
    personas_alertas: false,
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

  const [ formExpand, setFormExpand ] = useState({
    general: true,
    parametros: true,
    personas_alertas: true,
  });

  const [ disableSave, setDisableSave ] = useState(false);

  const handleExpand = ( name ) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const handleGoBack = () => {
    history.push('/tipoIncidentes');
  }

  const handleSave = () => {
    setErrors(f => ({}));
    let validation = validateCreateTipoIncidente(values, handleOpenSnackbar);
    setErrors(f => validation.errors);
    if(validation.isValid){
      setDisableSave(true);
      axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.TIPOS_INCIDENTES}crear`, values)
      .then((response) => {
        history.push("/tipoIncidentes/" + response.data.data.tipo_incidente.id);
      })
    }
  }

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Nuevo Tipo de Incidente</PrimaryTitle>
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
          <EVTextField
            type="text"
            label="NOMBRE DEL TIPO DE INCIDENTE"
            size={4}
            name="nombre"
            value={values.nombre}
            error={errors.nombre ? true : false}
            helperText={errors.nombre}
            onChange={handleInputChange} />
            
        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.parametros} expand={() => handleExpand("parametros")} title="Parámetros relacionados"/>
        <Collapse className="inputs-container" in={formExpand.parametros}>
          <div style={{width: '100%', height: '0'}}></div>
          <CreateParametros
            parametros={values.parametros}
            setValues={setValues}/>
        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.personas_alertas} expand={() => handleExpand("personas_alertas")} title="Personas a alertar"/>
        <Collapse className="inputs-container" in={formExpand.personas_alertas}>
          <div style={{width: '100%', height: '0'}}></div>
          <CreatePersonas
            personas_alertas={values.personas_alertas}
            setValues={setValues}/>
        </Collapse>
      </FormGroupContainer>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar.parametros} autoHideDuration={6000} onClose={() => handleCloseSnackbar("parametros")}>
        <Alert onClose={() => handleCloseSnackbar("parametros")} variant="filled" severity="error" sx={{ width: '100%' }}>
          {errors.parametros}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar.personas_alertas} autoHideDuration={6000} onClose={() => handleCloseSnackbar("personas_alertas")}>
        <Alert onClose={() => handleCloseSnackbar("personas_alertas")} variant="filled" severity="error" sx={{ width: '100%' }}>
          {errors.personas_alertas}
        </Alert>
      </Snackbar>
    </ListViewContainer>
  );
}
 
export default CreateTipoIncidente;