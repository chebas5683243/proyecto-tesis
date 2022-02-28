import { Close, Save } from "@mui/icons-material";
import { Alert, Collapse, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import EVAutocomplete from "../../../components/atoms/EVAutocomplete.atom";
import EVButton from "../../../components/atoms/EVButton.atom";
import CreateFases from "../../../components/molecules/proyectos/CreateFases.molecule";
import GeneralData from "../../../components/molecules/proyectos/GeneralData.molecule";
import ResponsableCompany from "../../../components/molecules/proyectos/ResponsableCompany.molecule";
import FormHeader from "../../../components/organisms/FormHeader.organism";
import useForm from "../../../hooks/useForm.hook";
import { useSimpleListEmpresas } from "../../../services/Empresas.service";
import { useFetchDetalleProyecto } from "../../../services/Proyectos.service";
import { useSimpleListPropioUsuarios, useSimpleListUsuarios } from "../../../services/Usuarios.service";
import { FormGroupContainer } from "../../../styles/containers/FormGroup.style";
import { ButtonsContainer, HeaderContainer, ListViewContainer, PrimaryTitle } from "../../../styles/containers/View.style";

const DetalleProyecto = () => {

  const history = useHistory();

  const { id } = useParams();

  const { loadingProyecto, proyecto } = useFetchDetalleProyecto(id);

  const { values, setValues, errors, handleInputChange } = useForm({
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

  const [ updateResponsableExterno, setUpdateResponsableExterno ] = useState(false);

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

  const [ formExpand, setFormExpand ] = useState({
    general: true,
    responsable: true,
    empresa_ejecutora: true,
    fases: true,
  });

  const handleExpand = ( name ) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const handleGoBack = () => {
    history.push('/proyectos');
  }
  
  const handleEdit = () => {
    history.push('/proyectos/' + id + '/edit');
  }

  useEffect(() => {
    if(!loadingProyecto) setValues(proyecto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProyecto]);

  useEffect(() => {
    if(updateResponsableExterno) {
      setValues(p => ({
        ...p,
        responsable_externo: {
          id: 0,
          label: 'Selecciona una persona'
        }
      }));
    }
    else {
      if(values.empresa_ejecutora && values.empresa_ejecutora.id) setUpdateResponsableExterno(true);
    }
    if(values.empresa_ejecutora?.id) simpleListUsuarios(values.empresa_ejecutora?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.empresa_ejecutora]);

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Detalle Proyecto</PrimaryTitle>
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
          <GeneralData
            disabled={true}
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
            disabled
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
            disabled={true}
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
            disabled={true}
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
 
export default DetalleProyecto;