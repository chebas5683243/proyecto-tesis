import { Modal } from "@mui/material";
import useForm from "../../../../hooks/useForm.hook";
import { ModalContainer } from "../../../../styles/containers/Modal.style";
import { validateCreateImpacto } from "../../../../utils/formValidations";
import EVAutocomplete from "../../../atoms/EVAutocomplete.atom";
import EVButton from "../../../atoms/EVButton.atom";
import EVTextField from "../../../atoms/EVTextField.atom";

const AddImpactoModal = ({open, handleCloseModal, addImpacto, tiposImpacto}) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    id: '_' + Math.random().toString(36).substr(2, 9),
    tipo: {
      id: 0,
      label: 'Selecciona un tipo de impacto inmediata',
    },
    descripcion: '',
    created: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateImpacto(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      addImpacto(values);
      handleClose();
    }
  }

  const handleClose = () => {
    setValues({
      id: '_' + Math.random().toString(36).substr(2, 9),
      tipo: {
        id: 0,
        label: 'Selecciona un tipo de impacto inmediata',
      },
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
          <span>Agregar nueva Impacto</span>
        </div>
        <form className="fields-container" onSubmit={handleSave}>
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
            <EVButton label="Agregar" variant="contained" type="submit" />
          </div>
        </form>
      </ModalContainer>
    </Modal>
  );
}
 
export default AddImpactoModal;