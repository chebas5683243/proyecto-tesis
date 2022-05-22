import { Modal } from "@mui/material";
import useForm from "../../../../hooks/useForm.hook";
import { ModalContainer } from "../../../../styles/containers/Modal.style";
import { validateCreateAccionInmediata } from "../../../../utils/formValidations";
import EVButton from "../../../atoms/EVButton.atom";
import EVTextField from "../../../atoms/EVTextField.atom";

const AddAccionInmediataModal = ({open, handleCloseModal, addAccion}) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    id: '_' + Math.random().toString(36).substr(2, 9),
    responsable: '',
    descripcion: '',
    created: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateAccionInmediata(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      addAccion(values);
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
          <span>Agregar nueva Accion Inmediata</span>
        </div>
        <form className="fields-container" onSubmit={handleSave}>
          <EVTextField
            type="text"
            label="RESPONSABLE"
            size={4}
            name="responsable"
            value={values.responsable}
            error={errors.responsable ? true : false}
            helperText={errors.responsable}
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
 
export default AddAccionInmediataModal;