import { Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import EVAutocomplete from "../../../components/atoms/EVAutocomplete.atom";
import EVButton from "../../../components/atoms/EVButton.atom";
import EVCheckbox from "../../../components/atoms/EVCheckbox.atom";
import EVTextField from "../../../components/atoms/EVTextField.atom";
import ApiRoutes from "../../../constants/ApiRoutes.constants";
import Config from "../../../constants/Config.constants";
import useForm from "../../../hooks/useForm.hook";
import { useFetchDetalleParametro } from "../../../services/Parametros.service";
import { useSimpleListunidades } from "../../../services/UnidadesMedida.service";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { validateCreateParametro } from "../../../utils/formValidations";

const EditParametros = ({ open, handleCloseModal, fetchParametros, selectedId, setSelectedId }) => {

  const { values, setValues, errors, setErrors, handleInputChange, handleCheckChange } = useForm({
    nombre: '',
    nombre_corto: '',
    unidad: {
      id: 0,
      label: 'Selecciona una unidad'
    },
    tiene_maximo: false,
    valor_maximo: '',
    tiene_minimo: false,
    valor_minimo: ''
  });

  const {loadingParametro, parametro, fetchParametro} = useFetchDetalleParametro();

  const [ loadingEdit, setLoadingEdit ] = useState(false);

  const { unidades } = useSimpleListunidades();

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateParametro(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      setLoadingEdit(true);
      axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PARAMETROS}editar`, values)
      .then((response) => {
        fetchParametros();
        handleClose();
        setLoadingEdit(false);
      })
    }
  }

  const handleClose = () => {
    setValues({
      nombre: '',
      nombre_corto: '',
      unidad: {
        id: 0,
        label: 'Selecciona una unidad'
      },
      tiene_maximo: false,
      valor_maximo: '',
      tiene_minimo: false,
      valor_minimo: ''
    });
    setErrors({});
    setSelectedId(null);
    handleCloseModal("edit");
  }

  useEffect(() => {
    if(selectedId) fetchParametro(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  useEffect(() => {
    if(parametro) setValues(parametro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parametro])

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <div className="title">
          <span>Editar parámetro</span>
        </div>
        <form className="fields-container" onSubmit={handleSave}>
          <EVTextField
            disabled={loadingParametro}
            type="text"
            label="NOMBRE"
            size={4}
            name="nombre"
            value={values.nombre}
            error={errors.nombre ? true : false}
            helperText={errors.nombre}
            onChange={handleInputChange} />

          <EVTextField
            disabled={loadingParametro}
            type="text"
            label="NOMBRE CORTO"
            size={4}
            name="nombre_corto"
            value={values.nombre_corto}
            error={errors.nombre_corto ? true : false}
            helperText={errors.nombre_corto}
            onChange={handleInputChange} />

          <EVAutocomplete
            disabled={loadingParametro}
            label="UNIDAD DE MEDIDA"
            size={4}
            options={unidades}
            name="unidad"
            value={values.unidad}
            setValues={setValues}
            error={errors.unidad ? true : false}
            helperText={errors.unidad}
            />

          <div className="check-field-container">
            <EVCheckbox
              disabled={loadingParametro}
              name="tiene_maximo"
              checked={values.tiene_maximo}
              onChange={handleCheckChange}/>
              
            <EVTextField
              disabled={!values.tiene_maximo}
              type="number"
              label="VALOR MÁXIMO ADMISIBLE POR DEFECTO"
              size={4}
              name="valor_maximo"
              value={values.tiene_maximo ? values.valor_maximo : ""}
              error={errors.valor_maximo ? true : false}
              helperText={errors.valor_maximo}
              onChange={handleInputChange} />
          </div>

          <div className="check-field-container">
            <EVCheckbox
              disabled={loadingParametro}
              name="tiene_minimo"
              checked={values.tiene_minimo}
              onChange={handleCheckChange}/>
              
            <EVTextField
              disabled={!values.tiene_minimo}
              type="number"
              label="VALOR MÍNIMO ADMISIBLE POR DEFECTO"
              size={4}
              name="valor_minimo"
              value={values.tiene_minimo ? values.valor_minimo : ""}
              error={errors.valor_minimo ? true : false}
              helperText={errors.valor_minimo}
              onChange={handleInputChange} />
          </div>

          <div className="buttons-container">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton disabled={loadingParametro || loadingEdit} label="Guardar" variant="contained" type="submit" />
          </div>
        </form>
      </ModalContainer>
    </Modal>
  );
}
 
export default EditParametros;