import { Modal } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import EVButton from "../../../../../components/atoms/EVButton.atom";
import EVTextField from "../../../../../components/atoms/EVTextField.atom";
import ApiRoutes from "../../../../../constants/ApiRoutes.constants";
import Config from "../../../../../constants/Config.constants";
import { ProjectContext } from "../../../../../context/ProjectContext";
import useForm from "../../../../../hooks/useForm.hook";
import { ModalContainer } from "../../../../../styles/containers/Modal.style";
import { validateCreatePuntoMonitoreo } from "../../../../../utils/formValidations";

const CreatePuntos = ({ open, handleCloseModal, fetchPuntos }) => {

  const { proyectoId } = useContext(ProjectContext);

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    nombre: '',
    longitud: '',
    latitud: '',
    altitud: '',
    project_id: proyectoId,
  });

  const [loadingCreate, setLoadingCreate] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreatePuntoMonitoreo(values);
    setErrors(f => validation.errors);
    if (validation.isValid) {
      setLoadingCreate(true);
      axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PUNTOS}crear`, values)
        .then((response) => {
          fetchPuntos();
          handleClose();
          setLoadingCreate(false);
        })
    }
  }

  const handleClose = () => {
    setValues({
      nombre: '',
      longitud: '',
      latitud: '',
      altitud: '',
      project_id: proyectoId,
    });
    setErrors({});
    handleCloseModal("create");
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <div className="title">
          <span>Crear nuevo punto de monitoreo</span>
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
            type="number"
            label="LONGITUD"
            size={4}
            name="longitud"
            value={values.longitud}
            error={errors.longitud ? true : false}
            helperText={errors.longitud}
            onChange={handleInputChange} />

          <EVTextField
            type="number"
            label="LATITUD"
            size={4}
            name="latitud"
            value={values.latitud}
            error={errors.latitud ? true : false}
            helperText={errors.latitud}
            onChange={handleInputChange} />

          <EVTextField
            type="number"
            label="ALTITUD"
            size={4}
            name="altitud"
            value={values.altitud}
            error={errors.altitud ? true : false}
            helperText={errors.altitud}
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

export default CreatePuntos;