import { Modal } from "@mui/material";
import { useEffect } from "react";
import useForm from "../../../../hooks/useForm.hook";
import { ModalContainer } from "../../../../styles/containers/Modal.style";
import { validateCreateCausa } from "../../../../utils/formValidations";
import EVButton from "../../../atoms/EVButton.atom";
import EVTextField from "../../../atoms/EVTextField.atom";

const EditCausaModal = ({open, handleCloseModal, causa, setSelectedCausa, editCausa}) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    id: -1,
    tipo: '',
    descripcion: ''
  });

  const handleEdit = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateCausa(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      editCausa(values);
      handleClose();
    }
  }

  const handleClose = () => {
    setValues({
      id: -1,
      tipo: '',
      descripcion: ''
    });
    setErrors(f => ({}));
    handleCloseModal("edit");
    setSelectedCausa(null);
  }

  useEffect(() => {
    if (causa !== null) setValues({...causa});
  }, [causa])

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <div className="title">
          <span>Editar Causa Inmediata</span>
        </div>
        <form className="fields-container" onSubmit={handleEdit}>
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
            <EVButton label="Editar" variant="contained" type="submit" />
          </div>
        </form>
      </ModalContainer>
    </Modal>
  );
}
 
export default EditCausaModal;