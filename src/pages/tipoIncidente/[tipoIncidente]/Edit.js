import { Close, Save } from "@mui/icons-material";
import { Alert, Collapse, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import EVButton from "../../../components/atoms/EVButton.atom";
import EVTextField from "../../../components/atoms/EVTextField.atom";
import CreateParametros from "../../../components/molecules/tiposIncidentes/CreateParametros.molecule";
import CreatePersonas from "../../../components/molecules/tiposIncidentes/CreatePersonas.molecule";
import FormHeader from "../../../components/organisms/FormHeader.organism";
import useForm from "../../../hooks/useForm.hook";
import { useEditTipoIncidente, useFetchDetalleTipoIncidente } from "../../../services/TipoIncidente.service";
import { FormGroupContainer } from "../../../styles/containers/FormGroup.style";
import { ButtonsContainer, HeaderContainer, ListViewContainer, PrimaryTitle } from "../../../styles/containers/View.style";
import { validateCreateTipoIncidente } from "../../../utils/formValidations";

const EditTipoIncidente = () => {

  const history = useHistory();

  const { id } = useParams();

  const { loadingTipoIncidente, tipoIncidente } = useFetchDetalleTipoIncidente(id);

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    nombre: '',
    parametros: [],
    personas_alertas: []
  });

  const { loadingEdit, editTipoIncidente } = useEditTipoIncidente(values);

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

  const handleExpand = ( name ) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const handleGoBack = () => {
    history.push('/tipoIncidentes');
  }

  const handleEdit = () => {
    setErrors(f => ({}));
    let validation = validateCreateTipoIncidente(values, handleOpenSnackbar);
    setErrors(f => validation.errors);
    if(validation.isValid){
      editTipoIncidente();
    }
  }
  
  useEffect(() => {
    if(!loadingTipoIncidente) setValues(tipoIncidente);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingTipoIncidente]);

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Editar Tipo de Incidente</PrimaryTitle>
        </div>
        <ButtonsContainer>
          <EVButton
            label="Cancelar"
            variant="outlined"
            startIcon={<Close style={{ fontSize: 24 }}/>}
            onClick={handleGoBack}
          />
          <EVButton
            disabled={loadingEdit}
            label="Guardar"
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
 
export default EditTipoIncidente;