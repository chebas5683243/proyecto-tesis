import React from 'react';
import EVTextField from '../../atoms/EVTextField.atom';

const EventData = ({ disabled, values, errors, handleInputChange }) => {
  return (
    <React.Fragment>
      <EVTextField
        disabled={disabled}
        type="text"
        label="TIPO DE INCIDENTE"
        size={4}
        name="tipo_incidente"
        value={values.tipo_incidente}
        error={errors.tipo_incidente ? true : false}
        helperText={errors.tipo_incidente}
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