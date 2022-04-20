import { Close, Save } from "@mui/icons-material";
import { useHistory } from "react-router";
import useForm from "../../hooks/useForm.hook";
import { HeaderContainer, ListViewContainer, PrimaryTitle, ButtonsContainer } from "../../styles/containers/View.style";
import EVButton from "../../components/atoms/EVButton.atom";
import { FormGroupContainer } from "../../styles/containers/FormGroup.style";
import FormHeader from "../../components/organisms/FormHeader.organism";
import { useEffect, useState } from "react";
import { Alert, Collapse, Snackbar } from "@mui/material";
import { validateCreateProyecto } from "../../utils/formValidations";
import axios from "axios";
import Config from "../../constants/Config.constants";
import ApiRoutes from "../../constants/ApiRoutes.constants";
import { useSimpleListEmpresas } from "../../services/Empresas.service";
import EVAutocomplete from "../../components/atoms/EVAutocomplete.atom";
import { useSimpleListPropioUsuarios, useSimpleListUsuarios } from "../../services/Usuarios.service";
import CreateFases from "../../components/molecules/proyectos/CreateFases.molecule";
import GeneralData from "../../components/molecules/proyectos/GeneralData.molecule";
import ResponsableCompany from "../../components/molecules/proyectos/ResponsableCompany.molecule";

const CreateProyecto = () => {

  const history = useHistory();

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    nombre: '',
    descripcion: '',
    codigo: '',
    fecha_inicio: '',
    fecha_fin_tentativa: '',
    fecha_fin: '',
    ubicacion: '',
    responsable_propio: {
      id: 0,
      label: 'Selecciona una persona'
    },
    empresa_ejecutora: {
      id: 0,
      label: 'Selecciona una empresa'
    },
    responsable_externo: {
      id: 0,
      label: 'Selecciona una persona'
    },
    fases: []
  });

  const { empresas } = useSimpleListEmpresas();
  const { usuarios: usuariosPropios } = useSimpleListPropioUsuarios();
  const { usuarios: usuariosExternos, simpleListUsuarios } = useSimpleListUsuarios();

  const [ openSnackbar, setOpenSnackbar] = useState({
    fases: false,
  })

  const handleCloseSnackbar = () => {
    setOpenSnackbar(p => ({
      ...p,
      fases: false
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
    responsable: true,
    empresa_ejecutora: true,
    fases: true,
  });

  const [ disableSave, setDisableSave ] = useState(false);

  const handleExpand = ( name ) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const handleGoBack = () => {
    history.push('/proyectos');
  }

  const handleSave = () => {
    setErrors(f => ({}));
    let validation = validateCreateProyecto(values, handleOpenSnackbar);
    setErrors(f => validation.errors);
    if(validation.isValid){
      setDisableSave(true);
      axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PROYECTOS}crear`, values)
      .then((response) => {
        history.push("/proyectos/" + response.data.data.proyecto.id);
      })
    }
  }

  useEffect(() => {
    setValues(p => ({
      ...p,
      responsable_externo: {
        id: 0,
        label: 'Selecciona una persona'
      }
    }));
    if(values.empresa_ejecutora?.id) simpleListUsuarios(values.empresa_ejecutora?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.empresa_ejecutora]);

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Nuevo Proyecto</PrimaryTitle>
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
          <GeneralData
            values={values}
            errors={errors}
            handleInputChange={handleInputChange} />
            
        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.responsable} expand={() => handleExpand("responsable")} title="Responsable"/>
        <Collapse className="inputs-container" in={formExpand.responsable}>
          <div style={{width: '100%', height: '0'}}></div>
          <EVAutocomplete
            label="USUARIO RESPONSABLE"
            size={1}
            options={usuariosPropios}
            name="responsable_propio"
            value={values.responsable_propio}
            setValues={setValues}
            error={errors.responsable_propio ? true : false}
            helperText={errors.responsable_propio}
            />
            
        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.empresa_ejecutora} expand={() => handleExpand("empresa_ejecutora")} title="Empresa Ejecutora"/>
        <Collapse className="inputs-container" in={formExpand.empresa_ejecutora}>
          <div style={{width: '100%', height: '0'}}></div>
          <ResponsableCompany
            values={values}
            setValues={setValues}
            errors={errors}
            empresas={empresas}
            usuariosExternos={usuariosExternos} />

        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.fases} expand={() => handleExpand("fases")} title="Fases del Proyecto"/>
        <Collapse className="inputs-container" in={formExpand.fases}>
          <div style={{width: '100%', height: '0'}}></div>
          <CreateFases
            fases={values.fases}
            setValues={setValues}/>
        </Collapse>
      </FormGroupContainer>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar.fases} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} variant="filled" severity="error" sx={{ width: '100%' }}>
          {errors.fases}
        </Alert>
      </Snackbar>
    </ListViewContainer>
  );
}
 
export default CreateProyecto;