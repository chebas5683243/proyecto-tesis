import { Close, Edit } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import EVTextField from "../../../components/atoms/EVTextField.atom";
import EVButton from "../../../components/atoms/EVButton.atom";
import FormHeader from "../../../components/organisms/FormHeader.organism";
import useForm from "../../../hooks/useForm.hook";
import { useFetchDetalleUsuario } from "../../../services/Usuarios.service";
import { FormGroupContainer } from "../../../styles/containers/FormGroup.style";
import { ButtonsContainer, HeaderContainer, ListViewContainer, PrimaryTitle } from "../../../styles/containers/View.style";
import EVAutocomplete from "../../../components/atoms/EVAutocomplete.atom";
import { useSimpleListEmpresas } from "../../../services/Empresas.service";
import EVCheckbox from "../../../components/atoms/EVCheckbox.atom";

const DetalleUsuario = () => {

  const history = useHistory();

  const { id } = useParams();

  const { loadingUsuario, usuario } = useFetchDetalleUsuario(id);

  const { empresas } = useSimpleListEmpresas();

  const { values, setValues, errors, handleInputChange, handleCheckChange } = useForm({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    dni: '',
    codigo: '',
    email: '',
    numero_celular: '',
    company: {
      id: 0,
      label: 'Selecciona una empresa',
      es_propia: false
    },
    cargo: '',
    es_admin: false
  })

  const [ formExpand, setFormExpand ] = useState({
    general: true,
    contacto: true,
    empresa: true
  });

  const handleExpand = ( name ) => {
    setFormExpand(f => ({
      ...formExpand,
      [name]: !f[name]
    }))
  }

  const handleGoBack = () => {
    history.push('/usuarios');
  }

  const handleEdit = () => {
    history.push('/usuarios/' + id + '/edit');
  }

  useEffect(() => {
    if(!loadingUsuario) setValues(usuario);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUsuario]);

  useEffect(() => {
    if (!values.company.es_propia) {
      setValues(s => ({
        ...s,
        es_admin: false
      }));
    }
  }, [values.company.es_propia])

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Detalle de Usuario</PrimaryTitle>
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
            startIcon={<Edit style={{ fontSize: 24 }}/>}
            onClick={handleEdit}
          />
        </ButtonsContainer>
      </HeaderContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.general} expand={() => handleExpand("general")} title="Datos Generales"/>
        <Collapse className="inputs-container" in={formExpand.general}>
          <div style={{width: '100%', height: '0'}}></div>
          <EVTextField
            disabled
            type="text"
            label="PRIMER NOMBRE"
            size={1}
            name="primer_nombre"
            value={values.primer_nombre}
            error={errors.primer_nombre ? true : false}
            helperText={errors.primer_nombre}
            onChange={handleInputChange} />

          <EVTextField
            disabled
            type="text"
            label="SEGUNDO NOMBRE"
            size={1}
            name="segundo_nombre"
            value={values.segundo_nombre}
            error={errors.segundo_nombre ? true : false}
            helperText={errors.segundo_nombre}
            onChange={handleInputChange} />
            
          <EVTextField
            disabled
            type="text"
            label="PRIMER APELLIDO"
            size={1}
            name="primer_apellido"
            value={values.primer_apellido}
            error={errors.primer_apellido ? true : false}
            helperText={errors.primer_apellido}
            onChange={handleInputChange} />

          <EVTextField
            disabled
            type="text"
            label="SEGUNDO APELLIDO"
            size={1}
            name="segundo_apellido"
            value={values.segundo_apellido}
            error={errors.segundo_apellido ? true : false}
            helperText={errors.segundo_apellido}
            onChange={handleInputChange} />

          <EVTextField
            disabled
            type="text"
            label="DNI"
            size={1}
            name="dni"
            value={values.dni}
            error={errors.dni ? true : false}
            helperText={errors.dni}
            onChange={handleInputChange} />

          <EVTextField
            disabled
            type="text"
            label="CÓDIGO"
            size={1}
            name="codigo"
            value={values.codigo}
            error={errors.codigo ? true : false}
            helperText={errors.codigo}
            onChange={handleInputChange} />

        </Collapse>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormHeader isExpanded={formExpand.contacto} expand={() => handleExpand("contacto")} title="Información de contacto"/>
        <Collapse className="inputs-container" in={formExpand.contacto}>
          <div style={{width: '100%', height: '0'}}></div>
          <EVTextField
            disabled
            type="email"
            label="CORREO ELECTRÓNICO"
            size={1}
            name="email"
            value={values.email}
            error={errors.email ? true : false}
            helperText={errors.email}
            onChange={handleInputChange} />

          <EVTextField
            disabled
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
            disabled
            label="EMPRESA"
            size={1}
            options={empresas}
            name="company"
            value={values.company}
            setValues={setValues}
            />
          
          <EVTextField
            disabled
            type="text"
            label="CARGO"
            size={1}
            name="cargo"
            value={values.cargo}
            error={errors.cargo ? true : false}
            helperText={errors.cargo}
            onChange={handleInputChange} />

          <div style={{display: (values.company.es_propia ? "flex" : "none"), alignItems: 'center'}}>
            <EVCheckbox
              disabled
              name="es_admin"
              checked={values.es_admin}
              onChange={handleCheckChange} />

            <div className="etiqueta-estandar estado-uno">
              Es administrador
            </div>
          </div>
        </Collapse>
      </FormGroupContainer>
    </ListViewContainer>
  );
}
 
export default DetalleUsuario;