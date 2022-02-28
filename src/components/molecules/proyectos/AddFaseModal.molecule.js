import { Modal } from "@mui/material";
import useForm from "../../../hooks/useForm.hook";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { validateCreateFase } from "../../../utils/formValidations";
import EVButton from "../../atoms/EVButton.atom";
import EVTextField from "../../atoms/EVTextField.atom";

const AddFaseModal = ({open, handleCloseModal, addFase}) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    id: '_' + Math.random().toString(36).substr(2, 9),
    nombre: '',
    descripcion: '',
    created: true,
    estado: 1,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateFase(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      addFase(values);
      handleClose();
    }
  }

  const handleClose = () => {
    setValues({
      id: '_' + Math.random().toString(36).substr(2, 9),
      nombre: '',
      descripcion: '',
      created: true,
      estado: 1,
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
          <span>Agregar nueva Fase de Proyecto</span>
        </div>
        <form className="fields-container" onSubmit={handleSave}>
          <EVTextField
            type="text"
            label="NOMBRE"
            size={4}
            name="nombre"
            value={values.nombre}
            error={errors.nombre ? true : false}
            helperText={errors.nombre}
            onChange={handleInputChange} />

          <EVTextField
            type="text"
            label="DESCRIPCIÓN"
            size={4}
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
 
export default AddFaseModal;