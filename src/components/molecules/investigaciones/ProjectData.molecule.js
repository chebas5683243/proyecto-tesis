import React, { useEffect } from 'react';
import EVAutocomplete from '../../atoms/EVAutocomplete.atom';
import EVTextField from '../../atoms/EVTextField.atom';
import { useSimpleListProyectos } from '../../../services/Proyectos.service';

const ProjectData = ({ disabled, values, setValues, errors, changePunto, setChangePunto, handleInputChange }) => {
  
  const { proyectos } = useSimpleListProyectos();

  useEffect(() => {
    if (changePunto) {
      setValues(s => ({
        ...s,
        punto: {
          id: 0,
          label: "Selecciona un punto de monitoreo",
          utmx: null,
          utmy: null
        }
      }))
    }
    else {
      if (values.proyecto.id !== 0) setChangePunto(true);
    }
  }, [values.proyecto])

  return (
    <React.Fragment>
      <EVTextField
        disabled
        type="text"
        label="CÓDIGO DEL REPORTE FINAL"
        size={2}
        name="codigo"
        value={values.codigo}
        error={errors.codigo ? true : false}
        helperText={errors.codigo}
        onChange={handleInputChange} />

      <EVTextField
        disabled
        type="text"
        label="FECHA DE INICIO DE INVESTIGACION"
        size={1}
        name="fecha_inicio_investigacion"
        value={values.fecha_inicio_investigacion}
        error={errors.fecha_inicio_investigacion ? true : false}
        helperText={errors.fecha_inicio_investigacion}
        onChange={handleInputChange} />

      <EVTextField
        disabled
        type="text"
        label="FECHA DE FIN DE INVESTIGACION"
        size={1}
        name="fecha_fin_investigacion"
        value={values.fecha_fin_investigacion}
        error={errors.fecha_fin_investigacion ? true : false}
        helperText={errors.fecha_fin_investigacion}
        onChange={handleInputChange} />

      <EVAutocomplete
        disabled={disabled}
        label="PROYECTO"
        size={4}
        options={proyectos}
        name="proyecto"
        value={values.proyecto}
        setValues={setValues}
        error={errors.proyecto ? true : false}
        helperText={errors.proyecto} />
        
      <EVTextField
        disabled
        type="text"
        label="RESPONSABLE PROPIO"
        size={2}
        value={values.proyecto?.responsable_propio} />

      <EVTextField
        disabled
        type="text"
        label="RESPONSABLE EXTERNO"
        size={2}
        value={values.proyecto?.responsable_externo} />

      <EVAutocomplete
        disabled={disabled}
        label="PUNTO DE MONITOREO"
        size={2}
        options={values.proyecto ? values.proyecto.puntos : []}
        name="punto"
        value={values.punto}
        setValues={setValues}
        error={errors.punto ? true : false}
        helperText={errors.punto} />

    </React.Fragment>
  );
}
 
export default ProjectData;