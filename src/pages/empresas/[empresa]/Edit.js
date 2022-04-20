import { Close, Save } from "@mui/icons-material";
import { useHistory, useParams } from "react-router";
import useForm from "../../../hooks/useForm.hook";
import { HeaderContainer, ListViewContainer, PrimaryTitle, ButtonsContainer } from "../../../styles/containers/View.style";
import EVButton from "../../../components/atoms/EVButton.atom";
import { FormGroupContainer } from "../../../styles/containers/FormGroup.style";
import FormHeader from "../../../components/organisms/FormHeader.organism";
import { useEffect, useState } from "react";
import { Collapse } from "@mui/material";
import EVTextField from "../../../components/atoms/EVTextField.atom";
import { useEditEmpresa, useFetchDetalleEmpresa } from "../../../services/Empresas.service";
import { validateCreateEmpresa } from "../../../utils/formValidations";

const EditEmpresa = () => {

  const history = useHistory();

  const { id } = useParams();

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    ruc: '',
    razon_social: '',
    tipo_contribuyente: '',
    direccion_fiscal: '',
    distrito_ciudad: '',
    departamento: '',
    email: '',
    numero_telefonico: ''
  });

  const { loadingEmpresa, empresa } = useFetchDetalleEmpresa(id);

  const { loadingEdit, editEmpresa } = useEditEmpresa(values)

  const [ formExpand, setFormExpand ] = useState({
    general: true,
    contacto: true
  });

  const handleExpand = ( name ) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const handleGoBack = () => {
    history.push('/empresas');
  }

  const handleEdit = () => {
    setErrors(f => ({}));
    let validation = validateCreateEmpresa(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      editEmpresa();
    }
  }

  useEffect(() => {
    if(!loadingEmpresa) setValues(empresa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingEmpresa]);

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Editar Empresa</PrimaryTitle>
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
            type="number"
            label="RUC"
            size={1}
            name="ruc"
            value={values.ruc}
            error={errors.ruc ? true : false}
            helperText={errors.ruc}
            onChange={handleInputChange} />
            
          <EVTextField
            type="text"
            label="RAZÓN SOCIAL"
            size={1}
            name="razon_social"
            value={values.razon_social}
            error={errors.razon_social ? true : false}
            helperText={errors.razon_social}
            onChange={handleInputChange} />
            
          <EVTextField
            type="text"
            label="TIPO CONTRIBUYENTE"
            size={1}
            name="tipo_contribuyente"
            value={values.tipo_contribuyente}
            error={errors.tipo_contribuyente ? true : false}
            helperText={errors.tipo_contribuyente}
            onChange={handleInputChange} />
            
          <EVTextField
            type="text"
            label="DIRECCIÓN FISCAL"
            size={1}
            name="direccion_fiscal"
            value={values.direccion_fiscal}
            error={errors.direccion_fiscal ? true : false}
            helperText={errors.direccion_fiscal}
            onChange={handleInputChange} />

          <EVTextField
            type="text"
            label="DISTRITO/CIUDAD"
            size={1}
            name="distrito_ciudad"
            value={values.distrito_ciudad}
            error={errors.distrito_ciudad ? true : false}
            helperText={errors.distrito_ciudad}
            onChange={handleInputChange} />

          <EVTextField
            type="text"
            label="DEPARTAMENTO"
            size={1}
            name="departamento"
            value={values.departamento}
            error={errors.departamento ? true : false}
            helperText={errors.departamento}
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
            label="NÚMERO TELEFÓNICO"
            size={1}
            name="numero_telefonico"
            value={values.numero_telefonico}
            error={errors.numero_telefonico ? true : false}
            helperText={errors.numero_telefonico}
            onChange={handleInputChange} />
            
        </Collapse>
      </FormGroupContainer>
    </ListViewContainer>
  );
}
 
export default EditEmpresa;