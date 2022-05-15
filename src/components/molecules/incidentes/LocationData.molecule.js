import React from 'react';
import EVTextField from '../../atoms/EVTextField.atom';

const LocationData = ({ disabled, values, errors, handleInputChange }) => {
  return (
    <React.Fragment>
      <EVTextField
        disabled={disabled}
        type="text"
        label="LOCALIDAD"
        size={1}
        name="localidad"
        value={values.localidad}
        error={errors.localidad ? true : false}
        helperText={errors.localidad}
        onChange={handleInputChange} />
        
      <EVTextField
        disabled={disabled}
        type="text"
        label="ZONA/SECTOR"
        size={1}
        name="zona_sector"
        value={values.zona_sector}
        error={errors.zona_sector ? true : false}
        helperText={errors.zona_sector}
        onChange={handleInputChange} />
        
      <EVTextField
        disabled={disabled}
        type="text"
        label="DISTRITO"
        size={1}
        name="distrito"
        value={values.distrito}
        error={errors.distrito ? true : false}
        helperText={errors.distrito}
        onChange={handleInputChange} />
        
      <EVTextField
        disabled={disabled}
        type="text"
        label="PROVINCIA"
        size={1}
        name="provincia"
        value={values.provincia}
        error={errors.provincia ? true : false}
        helperText={errors.provincia}
        onChange={handleInputChange} />

      <EVTextField
        disabled={disabled}
        type="text"
        label="DEPARTAMENTO"
        size={1}
        name="departamento"
        value={values.departamento}
        error={errors.departamento ? true : false}
        helperText={errors.departamento}
        onChange={handleInputChange} />

      <EVTextField
        disabled={disabled}
        type="text"
        label="COORDENADA UTM ESTE"
        size={1}
        name="coordenada_este"
        value={values.coordenada_este}
        error={errors.coordenada_este ? true : false}
        helperText={errors.coordenada_este}
        onChange={handleInputChange} />

      <EVTextField
        disabled={disabled}
        type="text"
        label="COORDENADA UTM NORTE"
        size={1}
        name="coordenada_norte"
        value={values.coordenada_norte}
        error={errors.coordenada_norte ? true : false}
        helperText={errors.coordenada_norte}
        onChange={handleInputChange} />

      <EVTextField
        disabled={disabled}
        type="text"
        multiline
        rows={4}
        label="DETALLE"
        size={4}
        name="detalle_ubicacion"
        value={values.detalle_ubicacion}
        error={errors.detalle_ubicacion ? true : false}
        helperText={errors.detalle_ubicacion}
        onChange={handleInputChange} />
    </React.Fragment>
  );
}
 
export default LocationData;