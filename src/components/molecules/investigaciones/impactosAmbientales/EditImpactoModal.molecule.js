import { Modal } from "@mui/material";
import { useEffect } from "react";
import useForm from "../../../../hooks/useForm.hook";
import { ModalContainer } from "../../../../styles/containers/Modal.style";
import { validateCreateImpacto } from "../../../../utils/formValidations";
import EVAutocomplete from "../../../atoms/EVAutocomplete.atom";
import EVButton from "../../../atoms/EVButton.atom";
import EVTextField from "../../../atoms/EVTextField.atom";

const EditImpactoModal = ({open, handleCloseModal, tiposImpacto, impacto, setSelectedImpacto, editImpacto}) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    id: -1,
    tipo: {
      id: 0,
      label: 'Selecciona un tipo de impacto inmediata',
    },
    descripcion: ''
  });

  const handleEdit = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateImpacto(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      editImpacto(values);
      handleClose();
    }
  }

  const handleClose = () => {
    setValues({
      id: -1,
      tipo: {
        id: 0,
        label: 'Selecciona un tipo de impacto inmediata',
      },
      descripcion: ''
    });
    setErrors(f => ({}));
    handleCloseModal("edit");
    setSelectedImpacto(null);
  }

  useEffect(() => {
    if (impacto !== null) setValues({...impacto, edited: true});
  }, [impacto])

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <div className="title">
          <span>Editar Impacto Inmediata</span>
        </div>
        <form className="fields-container" onSubmit={handleEdit}>
          <EVAutocomplete
            label="TIPO DE CAUSA"
            size={4}
            options={tiposImpacto}
            name="tipo"
            value={values.tipo}
            setValues={setValues}
            error={errors.tipo ? true : false}
            helperText={errors.tipo} />

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
 
export default EditImpactoModal;