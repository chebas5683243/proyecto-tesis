import React from "react";
import EVAutocomplete from "../../atoms/EVAutocomplete.atom";

const ResponsableCompany = ({disabled, values, setValues, errors, empresas, usuariosExternos}) => {
  return (
    <React.Fragment>
      <EVAutocomplete
        disabled={disabled}
        label="EMPRESA RESPONSABLE"
        size={1}
        options={empresas}
        name="empresa_ejecutora"
        value={values.empresa_ejecutora}
        setValues={setValues}
        error={errors.empresa_ejecutora ? true : false}
        helperText={errors.empresa_ejecutora}
        />
        
      <EVAutocomplete
        disabled={disabled}
        label="RESPONSABLE EXTERNO"
        size={1}
        options={usuariosExternos}
        name="responsable_externo"
        value={values.responsable_externo}
        setValues={setValues}
        error={errors.responsable_externo ? true : false}
        helperText={errors.responsable_externo}
        />
    </React.Fragment>
  );
}
 
export default ResponsableCompany;