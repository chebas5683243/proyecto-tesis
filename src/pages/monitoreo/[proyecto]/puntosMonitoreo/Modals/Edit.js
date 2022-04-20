import { Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import EVButton from "../../../../../components/atoms/EVButton.atom";
import EVTextField from "../../../../../components/atoms/EVTextField.atom";
import ApiRoutes from "../../../../../constants/ApiRoutes.constants";
import Config from "../../../../../constants/Config.constants";
import useForm from "../../../../../hooks/useForm.hook";
import { useFetchDetallePunto } from "../../../../../services/Puntos.service";
import { ModalContainer } from "../../../../../styles/containers/Modal.style";
import { validateCreatePuntoMonitoreo } from "../../../../../utils/formValidations";

const EditPunto = ({ open, handleCloseModal, fetchPuntos, selectedId, setSelectedId }) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    codigo: '',
    nombre: '',
    longitud: '',
    latitud: '',
    altitud: '',
  });

  const { loadingPunto, punto, fetchPunto } = useFetchDetallePunto();

  const [ loadingEdit, setLoadingEdit ] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreatePuntoMonitoreo(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      setLoadingEdit(true);
      axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PUNTOS}editar`, values)
      .then((response) => {
        fetchPuntos();
        handleClose();
        setLoadingEdit(false);
      })
    }
  }

  const handleClose = () => {
    setValues({
      codigo: '',
      nombre: '',
      longitud: '',
      latitud: '',
      altitud: '',
    });
    setSelectedId(null);
    handleCloseModal("edit");
  }

  useEffect(() => {
    if(selectedId) fetchPunto(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  useEffect(() => {
    if(punto) setValues(punto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [punto])

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <div className="title">
          <span>Editar punto de monitoreo</span>
        </div>
        <form className="fields-container" onSubmit={handleSave}>
          <EVTextField
            disabled
            type="text"
            label="CÓDIGO"
            size={4}
            name="codigo"
            value={values.codigo}
            error={errors.codigo ? true : false}
            helperText={errors.codigo}
            onChange={handleInputChange} />

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
            <EVButton disabled={loadingPunto || loadingEdit} label="Guardar" variant="contained" type="submit" />
          </div>
        </form>
      </ModalContainer>
    </Modal>
  );
}
 
export default EditPunto;