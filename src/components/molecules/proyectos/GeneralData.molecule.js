import React from "react";
import EVTextField from "../../atoms/EVTextField.atom";

const GeneralData = ({disabled, values, errors, handleInputChange}) => {
  return (
    <React.Fragment>
      <EVTextField
        disabled={disabled}
        type="text"
        label="NOMBRE DEL PROYECTO"
        size={4}
        name="nombre"
        value={values.nombre}
        error={errors.nombre ? true : false}
        helperText={errors.nombre}
        onChange={handleInputChange} />
        
      <EVTextField
        disabled={disabled}
        type="text"
        multiline
        rows={4}
        label="DESCRIPCIÓN DEL PROYECTO"
        size={4}
        name="descripcion"
        value={values.descripcion}
        error={errors.descripcion ? true : false}
        helperText={errors.descripcion}
        onChange={handleInputChange} />

      <EVTextField
        disabled
        type="text"
        label="CÓDIGO DEL PROYECTO"
        size={1}
        name="codigo"
        value={values.codigo}
        error={errors.codigo ? true : false}
        helperText={errors.codigo}
        onChange={handleInputChange} />
        
      <EVTextField
        disabled={disabled}
        type="date"
        label="FECHA INICIO DEL PROYECTO"
        size={1}
        name="fecha_inicio"
        value={values.fecha_inicio}
        error={errors.fecha_inicio ? true : false}
        helperText={errors.fecha_inicio}
        onChange={handleInputChange} />
        
      <EVTextField
        disabled={disabled}
        type="date"
        label="FECHA FIN TENTATIVA DEL PROYECTO"
        size={1}
        name="fecha_fin_tentativa"
        value={values.fecha_fin_tentativa}
        error={errors.fecha_fin_tentativa ? true : false}
        helperText={errors.fecha_fin_tentativa}
        onChange={handleInputChange} />

      <EVTextField
        disabled
        type="date"
        label="FECHA FIN DEL PROYECTO"
        size={1}
        name="fecha_fin"
        value={values.fecha_fin}
        error={errors.fecha_fin ? true : false}
        helperText={errors.fecha_fin}
        onChange={handleInputChange} />

      <EVTextField
        disabled={disabled}
        type="text"
        label="UBICACIÓN"
        size={1}
        name="ubicacion"
        value={values.ubicacion}
        error={errors.ubicacion ? true : false}
        helperText={errors.ubicacion}
        onChange={handleInputChange} />
    </React.Fragment>
  );
}
 
export default GeneralData;