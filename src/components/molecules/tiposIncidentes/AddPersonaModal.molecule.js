import { Modal } from "@mui/material";
import useForm from "../../../hooks/useForm.hook";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { validateCreatePersona } from "../../../utils/formValidations";
import EVButton from "../../atoms/EVButton.atom";
import EVTextField from "../../atoms/EVTextField.atom";

const AddPersonaModal = ({open, handleCloseModal, addPersona}) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    id: '_' + Math.random().toString(36).substr(2, 9),
    nombre_completo: '',
    email: '',
    creado: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreatePersona(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      addPersona(values);
      handleClose();
    }
  }

  const handleClose = () => {
    setValues({
      id: '_' + Math.random().toString(36).substr(2, 9),
      nombre_completo: '',
      email: '',
      creado: true
    });
    handleCloseModal("create");
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <div className="title">
          <span>Agregar nueva persona</span>
        </div>
        <form className="fields-container" onSubmit={handleSave}>
          <EVTextField
            type="text"
            label="NOMBRE COMPLETO"
            size={4}
            name="nombre_completo"
            value={values.nombre_completo}
            error={errors.nombre_completo ? true : false}
            helperText={errors.nombre_completo}
            onChange={handleInputChange} />

          <EVTextField
            type="email"
            label="EMAIL"
            size={4}
            name="email"
            value={values.email}
            error={errors.email ? true : false}
            helperText={errors.email}
            onChange={handleInputChange} />

          <div className="buttons-container">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton label="Agregar" variant="contained" type="submit" />
          </div>
        </form>
      </ModalContainer>
    </Modal>
  );
}
 
export default AddPersonaModal;