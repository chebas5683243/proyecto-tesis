import { Close, Save } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import EVAutocomplete from "../../components/atoms/EVAutocomplete.atom";
import EVButton from "../../components/atoms/EVButton.atom";
import EVTextField from "../../components/atoms/EVTextField.atom";
import FormHeader from "../../components/organisms/FormHeader.organism";
import ApiRoutes from "../../constants/ApiRoutes.constants";
import Config from "../../constants/Config.constants";
import useForm from "../../hooks/useForm.hook";
import { useSimpleListEmpresas } from "../../services/Empresas.service";
import { FormGroupContainer } from "../../styles/containers/FormGroup.style";
import { ButtonsContainer, HeaderContainer, ListViewContainer, PrimaryTitle } from "../../styles/containers/View.style";
import { validateCreateUsuario } from "../../utils/formValidations";

const CreateUsuario = () => {

  const history = useHistory();

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    dni: '',
    email: '',
    numero_celular: '',
    company: {
      id: 0,
      label: 'Selecciona una empresa'
    },
    cargo: '',
  });

  const { empresas } = useSimpleListEmpresas();

  const [ formExpand, setFormExpand ] = useState({
    general: true,
    contacto: true,
    empresa: true
  });

  const [ disableSave, setDisableSave ] = useState(false);

  const handleExpand = ( name ) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const handleGoBack = () => {
    history.push('/usuarios');
  }

  const handleSave = () => {
    setErrors(f => ({}));
    let validation = validateCreateUsuario(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      setDisableSave(true);
      axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.USUARIOS}crear`, values)
      .then((response) => {
        history.push("/usuarios/" + response.data.data.usuario.id);
      })
    }
  }

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Nuevo Usuario</PrimaryTitle>
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
            label="PRIMER NOMBRE"
            size={1}
            name="primer_nombre"
            value={values.primer_nombre}
            error={errors.primer_nombre ? true : false}
            helperText={errors.primer_nombre}
            onChange={handleInputChange} />

          <EVTextField
            type="text"
            label="SEGUNDO NOMBRE"
            size={1}
            name="segundo_nombre"
            value={values.segundo_nombre}
            error={errors.segundo_nombre ? true : false}
            helperText={errors.segundo_nombre}
            onChange={handleInputChange} />
            
          <EVTextField
            type="text"
            label="PRIMER APELLIDO"
            size={1}
            name="primer_apellido"
            value={values.primer_apellido}
            error={errors.primer_apellido ? true : false}
            helperText={errors.primer_apellido}
            onChange={handleInputChange} />

          <EVTextField
            type="text"
            label="SEGUNDO APELLIDO"
            size={1}
            name="segundo_apellido"
            value={values.segundo_apellido}
            error={errors.segundo_apellido ? true : false}
            helperText={errors.segundo_apellido}
            onChange={handleInputChange} />

          <EVTextField
            type="number"
            label="DNI"
            size={1}
            name="dni"
            value={values.dni}
            error={errors.dni ? true : false}
            helperText={errors.dni}
            onChange={handleInputChange} />
            
        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.contacto} expand={() => handleExpand("contacto")} title="Información de contacto"/>
        <Collapse className="inputs-container" in={formExpand.contacto}>
          <div style={{width: '100%', height: '0'}}></div>
          <EVTextField
            type="email"
            label="CORREO ELECTRÓNICO"
            size={1}
            name="email"
            value={values.email}
            error={errors.email ? true : false}
            helperText={errors.email}
            onChange={handleInputChange} />

          <EVTextField
            type="text"
            label="NÚMERO CELULAR"
            size={1}
            name="numero_celular"
            value={values.numero_celular}
            error={errors.numero_celular ? true : false}
            helperText={errors.numero_celular}
            onChange={handleInputChange} />
            
        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.empresa} expand={() => handleExpand("empresa")} title="Información de empresa"/>
        <Collapse className="inputs-container" in={formExpand.empresa}>
          <div style={{width: '100%', height: '0'}}></div>
          <EVAutocomplete
            label="EMPRESA"
            size={1}
            options={empresas}
            name="company"
            value={values.company}
            setValues={setValues}
            error={errors.company ? true : false}
            helperText={errors.company}
            />
          
          <EVTextField
            type="text"
            label="CARGO"
            size={1}
            name="cargo"
            value={values.cargo}
            error={errors.cargo ? true : false}
            helperText={errors.cargo}
            onChange={handleInputChange} />
        </Collapse>
      </FormGroupContainer>
    </ListViewContainer>
  );
}
 
export default CreateUsuario;