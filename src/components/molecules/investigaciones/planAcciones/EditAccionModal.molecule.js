import { Modal } from "@mui/material";
import { useEffect } from "react";
import useForm from "../../../../hooks/useForm.hook";
import { ModalContainer } from "../../../../styles/containers/Modal.style";
import { validateCreateAccion } from "../../../../utils/formValidations";
import EVAutocomplete from "../../../atoms/EVAutocomplete.atom";
import EVButton from "../../../atoms/EVButton.atom";
import EVTextField from "../../../atoms/EVTextField.atom";

const EditAccionModal = ({ open, handleCloseModal, tiposAccion, accion, setSelectedAccion, editAccion }) => {

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    id: -1,
    tipo: {
      id: 0,
      label: 'Selecciona un tipo de accion',
    },
    responsable: '',
    fecha_planeada: '',
    descripcion: '',
    estado: 0,
  });

  const handleEdit = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateAccion(values);
    setErrors(f => validation.errors);
    if (validation.isValid) {
      editAccion(values);
      handleClose();
    }
  }

  const handleClose = () => {
    setValues({
      id: -1,
      tipo: {
        id: 0,
        label: 'Selecciona un tipo de accion',
      },
      responsable: '',
      fecha_planeada: '',
      descripcion: '',
      estado: 0,
    });
    setErrors(f => ({}));
    handleCloseModal("edit");
    setSelectedAccion(null);
  }

  useEffect(() => {
    if (accion !== null) setValues({ ...accion, edited: true });
  }, [accion])

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <div className="title">
          <span>Editar Accion Inmediata</span>
        </div>
        <form className="fields-container" onSubmit={handleEdit}>
          <EVAutocomplete
            label="TIPO DE ACCIÓN"
            size={4}
            options={tiposAccion}
            name="tipo"
            value={values.tipo}
            setValues={setValues}
            error={errors.tipo ? true : false}
            helperText={errors.tipo} />

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
            type="date"
            label="FECHA PLANEADA"
            size={4}
            name="fecha_planeada"
            value={values.fecha_planeada}
            error={errors.fecha_planeada ? true : false}
            helperText={errors.fecha_planeada}
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

export default EditAccionModal;