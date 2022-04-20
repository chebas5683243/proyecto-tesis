import { FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../../context/ProjectContext";
import useForm from "../../../hooks/useForm.hook";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { validateCreateParametro } from "../../../utils/formValidations";
import EVButton from "../../atoms/EVButton.atom";
import EVTextField from "../../atoms/EVTextField.atom";
import EstandarValues from "../../molecules/parametros/EstandarValues.molecule";
import NoAplica from "../../molecules/parametros/NoAplica.molecule";
import MatrizAQI from "../../molecules/parametros/MatrizAQI.molecules";
import WQIValues from "../../molecules/parametros/WQIValues.molecule";
import { useAddParametroPunto } from "../../../services/Puntos.service";

const AgregarParametro = ({ fetchParametros, disabled }) => {

  const { puntoId, selectedParametroPunto, setSelectedParametroPunto, openModalParametro, setOpenModalParametro } = useContext(ProjectContext);

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
    usa_estandar: true,
    tiene_maximo: false,
    valor_maximo: '',
    tiene_minimo: false,
    valor_minimo: '',
    no_aplica: false,
  });

  const { loadingParametroPunto, modifyParametroPunto } = useAddParametroPunto(values, puntoId);

  const handleClose = () => {
    setSelectedParametroPunto(null);
    setOpenModalParametro(false);
  }

  const handleSave = (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = validateCreateParametro(values);
    setErrors(f => validation.errors);
    if(validation.isValid){
      modifyParametroPunto(handleClose, fetchParametros);
    }
  }

  useEffect(() => {
    if(selectedParametroPunto) setValues(selectedParametroPunto);
  }, [selectedParametroPunto]);

  return (
    <Modal
      open={openModalParametro}
      onClose={handleClose}
    >
      <ModalContainer className="two-sides-modal">
        <div className="title">
          <span>Configuración del parámetro</span>
        </div>
        <form className="two-sides-form" onSubmit={handleSave}>
          <div className="fields-section">
            <div className="fields-container">
              <EVTextField
                disabled
                type="text"
                label="NOMBRE"
                size={4}
                name="nombre"
                value={values.nombre}
                error={errors.nombre ? true : false}
                helperText={errors.nombre}
                onChange={handleInputChange} />

              <EVTextField
                disabled
                type="text"
                label="NOMBRE CORTO"
                size={4}
                name="nombre_corto"
                value={values.nombre_corto}
                error={errors.nombre_corto ? true : false}
                helperText={errors.nombre_corto}
                onChange={handleInputChange} />

              <EVTextField
                disabled
                type="text"
                label="UNIDAD DE MEDIDA"
                size={4}
                name="unidad"
                value={values.nombre_unidad}
                error={errors.nombre_unidad ? true : false}
                helperText={errors.nombre_unidad}
                onChange={handleInputChange} />

              <RadioGroup
                  value={values.modo_parametros}
                >
                <FormControlLabel disabled value="usa_aqi" control={<Radio />} label="AQI" />
                <FormControlLabel disabled value="usa_wqi" control={<Radio />} label="WQI" />
                <FormControlLabel disabled value="usa_estandar" control={<Radio />} label="Estándar" />
                <FormControlLabel disabled value="no_aplica" control={<Radio />} label="No aplica" />
              </RadioGroup>

            </div>
            
            <div className="parameters">
              {values.usa_estandar ?
                <EstandarValues
                  disabled={disabled}
                  values={values}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  handleCheckChange={handleCheckChange}
                />
                : null
              }
              {values.usa_aqi ?
                <MatrizAQI
                  disabled={disabled}
                  values={values}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
                : null
              }
              {values.usa_wqi ?
                <WQIValues
                  disabled={disabled}
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
            {disabled ? null : <EVButton disabled={loadingParametroPunto} label="Guardar" variant="contained" type="submit" />}
          </div>
        </form>
      </ModalContainer>
    </Modal>
  );
}
 
export default AgregarParametro;