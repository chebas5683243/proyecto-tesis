import { Modal } from "@mui/material";
import useForm from "../../../../hooks/useForm.hook";
import { ModalContainer } from "../../../../styles/containers/Modal.style";
import { validateCreatePersonaAfectada } from "../../../../utils/formValidations";
import EVButton from "../../../atoms/EVButton.atom";
import EVTextField from "../../../atoms/EVTextField.atom";

const AddPersonaModal = ({ open, handleCloseModal, addPersona }) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    id: '_' + Math.random().toString(36).substr(2, 9),
    nombre_completo: '',
    dni: '',
    descripcion: '',
    created: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreatePersonaAfectada(values);
    setErrors(f => validation.errors);
    if (validation.isValid) {
      addPersona(values);
      handleClose();
    }
  }

  const handleClose = () => {
    setValues({
      id: '_' + Math.random().toString(36).substr(2, 9),
      responsable: '',
      descripcion: '',
      created: true
    });
    setErrors(f => ({}));
    handleCloseModal("create");
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <div className="title">
          <span>Agregar nueva Persona</span>
        </div>
        <form className="fields-container" onSubmit={handleSave}>
          <EVTextField
            type="text"
            label="PERSONA"
            size={4}
            name="nombre_completo"
            value={values.nombre_completo}
            error={errors.nombre_completo ? true : false}
            helperText={errors.nombre_completo}
            onChange={handleInputChange} />

          <EVTextField
            type="number"
            label="DNI"
            size={4}
            name="dni"
            value={values.dni}
            error={errors.dni ? true : false}
            helperText={errors.dni}
            onChange={handleInputChange} />

          <EVTextField
            type="text"
            label="DESCRIPCIÓN"
            size={4}
            multiline
            rows={4}
            name="descripcion"
            value={values.descripcion}
            error={errors.descripcion ? true : false}
            helperText={errors.descripcion}
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