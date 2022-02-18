import { Modal } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import EVButton from "../../../components/atoms/EVButton.atom";
import EVTextField from "../../../components/atoms/EVTextField.atom";
import ApiRoutes from "../../../constants/ApiRoutes.constants";
import Config from "../../../constants/Config.constants";
import useForm from "../../../hooks/useForm.hook";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { validateCreateUnidadMedida } from "../../../utils/formValidations";

const CreateUnidadMedida = ({ open, handleCloseModal, fetchUnidades }) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    nombre: '',
    nombre_corto: ''
  });

  const [ loadingCreate, setLoadingCreate ] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateUnidadMedida(values);
    console.log(validation);
    setErrors(f => validation.errors);
    if(validation.isValid){
      setLoadingCreate(true);
      axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.UNIDADES}crear`, values)
      .then((response) => {
        fetchUnidades();
        handleClose();
        setLoadingCreate(false);
      })
    }
  }

  const handleClose = () => {
    setValues({
      nombre: '',
      nombre_corto: ''
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
          <span>Crear nueva unidad de medida</span>
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
            label="NOMBRE CORTO"
            size={4}
            name="nombre_corto"
            value={values.nombre_corto}
            error={errors.nombre_corto ? true : false}
            helperText={errors.nombre_corto}
            onChange={handleInputChange} />

          <div className="buttons-container">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton disabled={loadingCreate} label="Agregar" variant="contained" type="submit" />
          </div>
        </form>
      </ModalContainer>
    </Modal>
  );
}
 
export default CreateUnidadMedida;