import React from 'react';
import { useSimpleListTiposIncidente } from '../../../services/TipoIncidente.service';
import EVAutocomplete from '../../atoms/EVAutocomplete.atom';
import EVTextField from '../../atoms/EVTextField.atom';

const EventData = ({ disabled, values, setValues, errors, handleInputChange }) => {

  const { tiposIncidente } = useSimpleListTiposIncidente();

  return (
    <React.Fragment>
      <EVAutocomplete
        disabled={disabled}
        label="TIPO DE INCIDENTE"
        size={4}
        options={tiposIncidente}
        name="tipoIncidente"
        value={values.tipoIncidente}
        setValues={setValues}
        error={errors.tipoIncidente ? true : false}
        helperText={errors.tipoIncidente} />
        
      <EVTextField
        disabled={disabled}
        type="text"
        multiline
        rows={4}
        label="DETALLE DEL PRE-EVENTO"
        size={4}
        name="detalle_pre_evento"
        value={values.detalle_pre_evento}
        error={errors.detalle_pre_evento ? true : false}
        helperText={errors.detalle_pre_evento}
        onChange={handleInputChange} />

      <EVTextField
        disabled={disabled}
        type="text"
        multiline
        rows={4}
        label="DETALLE DEL EVENTO"
        size={4}
        name="detalle_evento"
        value={values.detalle_evento}
        error={errors.detalle_evento ? true : false}
        helperText={errors.detalle_evento}
        onChange={handleInputChange} />

      <EVTextField
        disabled={disabled}
        type="text"
        multiline
        rows={4}
        label="DETALLE DEL POST-EVENTO"
        size={4}
        name="detalle_post_evento"
        value={values.detalle_post_evento}
        error={errors.detalle_post_evento ? true : false}
        helperText={errors.detalle_post_evento}
        onChange={handleInputChange} />

      <EVTextField
        disabled={disabled}
        type="date"
        label="FECHA DEL INCIDENTE"
        size={1}
        name="fecha_incidente"
        value={values.fecha_incidente}
        error={errors.fecha_incidente ? true : false}
        helperText={errors.fecha_incidente}
        onChange={handleInputChange} />

      <EVTextField
        disabled={disabled}
        type="time"
        label="HORA DEL INCIDENTE"
        size={1}
        name="hora_incidente"
        value={values.hora_incidente}
        error={errors.hora_incidente ? true : false}
        helperText={errors.hora_incidente}
        onChange={handleInputChange} />
    </React.Fragment>
  );
}
 
export default EventData;