import { FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import EVAutocomplete from "../../../components/atoms/EVAutocomplete.atom";
import EVButton from "../../../components/atoms/EVButton.atom";
import EVTextField from "../../../components/atoms/EVTextField.atom";
import EstandarValues from "../../../components/molecules/parametros/EstandarValues.molecule";
import MatrizAQI from "../../../components/molecules/parametros/MatrizAQI.molecules";
import NoAplica from "../../../components/molecules/parametros/NoAplica.molecule";
import WQIValues from "../../../components/molecules/parametros/WQIValues.molecule";
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
      label: 'Selecciona una unidad',
      nombre_corto: ''
    },
    modo_parametros: "usa_estandar",
    usa_aqi: false,
    aqi_1: '',
    aqi_2: '',
    aqi_3: '',
    aqi_4: '',
    aqi_5: '',
    usa_wqi: false,
    valor_ideal: '',
    valor_estandar_permisible: '',
    usa_estandar: true,
    tiene_maximo: false,
    valor_maximo: '',
    tiene_minimo: false,
    valor_minimo: '',
    no_aplica: false,
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
        label: 'Selecciona una unidad',
        nombre_corto: ''
      },
      modo_parametros: "usa_estandar",
      usa_aqi: false,
      aqi_1: '',
      aqi_2: '',
      aqi_3: '',
      aqi_4: '',
      aqi_5: '',
      usa_wqi: false,
      valor_ideal: '',
      valor_estandar_permisible: '',
      usa_estandar: true,
      tiene_maximo: false,
      valor_maximo: '',
      tiene_minimo: false,
      valor_minimo: '',
      no_aplica: false,
    });
    setErrors({});
    setSelectedId(null);
    handleCloseModal("edit");
  }

  const handleChangeRadio = (e) => {
    setValues(p => ({
      ...p,
      usa_aqi: false,
      usa_wqi: false,
      usa_estandar: false,
      no_aplica: false,
      modo_parametros: e.target.value,
      [e.target.value]: true,
    }));
  }

  useEffect(() => {
    if(selectedId) fetchParametro(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  useEffect(() => {
    if(parametro) setValues(parametro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parametro])

  useEffect(() => {
    if (values.no_aplica) {
      setValues(p => ({
        ...p,
        unidad: {
          id: 1,
          label: 'Adimensional (-)',
          nombre_corto: '-'
        }
      }));
    }
  }, [values.no_aplica])

  useEffect(() => {
    console.log(values);
  }, [values])

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer className="two-sides-modal">
        <div className="title">
          <span>Editar parámetro</span>
        </div>
        <form className="two-sides-form" onSubmit={handleSave}>
          <div className="fields-section">
            <div className="fields-container">
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
                disabled={loadingParametro || !!values.no_aplica}
                label="UNIDAD DE MEDIDA"
                size={4}
                options={unidades}
                name="unidad"
                value={values.unidad}
                setValues={setValues}
                error={errors.unidad ? true : false}
                helperText={errors.unidad}
              />

              <RadioGroup
                  value={values.modo_parametros}
                  onChange={handleChangeRadio}
                >
                <FormControlLabel value="usa_aqi" control={<Radio />} label="AQI" />
                <FormControlLabel value="usa_wqi" control={<Radio />} label="WQI" />
                <FormControlLabel value="usa_estandar" control={<Radio />} label="Estándar" />
                <FormControlLabel value="no_aplica" control={<Radio />} label="No aplica" />
              </RadioGroup>

            </div>
            
            <div className="parameters">
              {values.usa_estandar ?
                <EstandarValues
                  values={values}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  handleCheckChange={handleCheckChange}
                />
                : null
              }
              {values.usa_aqi ?
                <MatrizAQI
                  values={values}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
                : null
              }
              {values.usa_wqi ?
                <WQIValues
                  values={values}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
                : null
              }
              {values.no_aplica ?
                <NoAplica />
                : null
              }
            </div>
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