import { Modal } from "@mui/material";
import useForm from "../../../../hooks/useForm.hook";
import { ModalContainer } from "../../../../styles/containers/Modal.style";
import { validateCreateCausa } from "../../../../utils/formValidations";
import EVButton from "../../../atoms/EVButton.atom";
import EVTextField from "../../../atoms/EVTextField.atom";

const AddCausaModal = ({open, handleCloseModal, addCausa}) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    id: '_' + Math.random().toString(36).substr(2, 9),
    tipo: '',
    descripcion: '',
    created: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateCausa(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      addCausa(values);
      handleClose();
    }
  }

  const handleClose = () => {
    setValues({
      id: '_' + Math.random().toString(36).substr(2, 9),
      tipo: '',
      descripcion: '',
      created: true,
      estado: 1,
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
          <span>Agregar nueva Causa Inmediata</span>
        </div>
        <form className="fields-container" onSubmit={handleSave}>
          <EVTextField
            type="text"
            label="TIPO DE CAUSA"
            size={4}
            name="tipo"
            value={values.tipo}
            error={errors.tipo ? true : false}
            helperText={errors.tipo}
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
 
export default AddCausaModal;