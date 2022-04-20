import { Modal } from "@mui/material";
import useForm from "../../../hooks/useForm.hook";
import { useSimpleListParametros } from "../../../services/Parametros.service";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { validateCreateParametroAsociado } from "../../../utils/formValidations";
import EVAutocomplete from "../../atoms/EVAutocomplete.atom";
import EVButton from "../../atoms/EVButton.atom";

const AddParametroModal = ({open, handleCloseModal, addParametro}) => {

  const { values, setValues, errors, setErrors } = useForm({
    id: '_' + Math.random().toString(36).substr(2, 9),
    parametro: {
      id: 0,
      label: 'Selecciona un parametro'
    },
    creado: true
  });

  const { parametros } = useSimpleListParametros();

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateParametroAsociado(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      addParametro(values);
      handleClose();
    }
  }

  const handleClose = () => {
    setValues({
      id: '_' + Math.random().toString(36).substr(2, 9),
      parametro: {
        id: 0,
        label: 'Selecciona un parametro'
      },
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
          <span>Agregar nuevo parámetro</span>
        </div>
        <form className="fields-container" onSubmit={handleSave}>
          <EVAutocomplete
            label="PARÁMETRO"
            size={4}
            options={parametros}
            name="parametro"
            value={values.parametro}
            setValues={setValues}
            error={errors.parametro ? true : false}
            helperText={errors.parametro}
            />

          <div className="buttons-container">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton label="Agregar" variant="contained" type="submit" />
          </div>
        </form>
      </ModalContainer>
    </Modal>
  );
}
 
export default AddParametroModal;