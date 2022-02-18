import { Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import EVButton from "../../../components/atoms/EVButton.atom";
import EVTextField from "../../../components/atoms/EVTextField.atom";
import ApiRoutes from "../../../constants/ApiRoutes.constants";
import Config from "../../../constants/Config.constants";
import useForm from "../../../hooks/useForm.hook";
import { useFetchDetalleUnidad } from "../../../services/UnidadesMedida.service";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { validateCreateUnidadMedida } from "../../../utils/formValidations";

const EditUnidadMedida = ({ open, handleCloseModal, fetchUnidades, selectedId, setSelectedId }) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    nombre: '',
    nombre_corto: ''
  });

  const {loadingUnidad, unidad, fetchUnidad} = useFetchDetalleUnidad();

  const [ loadingEdit, setLoadingEdit ] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateUnidadMedida(values);
    console.log(validation);
    setErrors(f => validation.errors);
    if(validation.isValid){
      setLoadingEdit(true);
      axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.UNIDADES}editar`, values)
      .then((response) => {
        fetchUnidades();
        handleClose();
        setLoadingEdit(false);
      })
    }
  }

  const handleClose = () => {
    setValues({
      nombre: '',
      nombre_corto: ''
    });
    setSelectedId(null);
    handleCloseModal("edit");
  }

  useEffect(() => {
    if(selectedId) fetchUnidad(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  useEffect(() => {
    if(unidad) setValues(unidad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unidad])

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <div className="title">
          <span>Editar unidad de medida</span>
        </div>
        <form className="fields-container" onSubmit={handleSave}>
          <EVTextField
            disabled={loadingUnidad}
            type="text"
            label="NOMBRE"
            size={4}
            name="nombre"
            value={values.nombre}
            error={errors.nombre ? true : false}
            helperText={errors.nombre}
            onChange={handleInputChange} />

          <EVTextField
            disabled={loadingUnidad}
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
            <EVButton disabled={loadingUnidad || loadingEdit} label="Agregar" variant="contained" type="submit" />
          </div>
        </form>
      </ModalContainer>
    </Modal>
  );
}
 
export default EditUnidadMedida;