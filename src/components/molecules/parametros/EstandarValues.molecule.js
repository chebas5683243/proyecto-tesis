import { Fragment } from "react";
import { ParamsTextField } from "../../../styles/TextField.style";
import EVCheckbox from "../../atoms/EVCheckbox.atom";
import EVTextField from "../../atoms/EVTextField.atom";

const EstandarValues = ({ values, errors, handleInputChange, handleCheckChange }) => {
  return (
    <Fragment>
      <div className="check-field-container">
        <EVCheckbox
          name="tiene_minimo"
          checked={values.tiene_minimo}
          onChange={handleCheckChange} />

        Valor mínimo adminisible por defecto

        <ParamsTextField
          disabled={!values.tiene_minimo}
          type="number"
          size={4}
          name="valor_minimo"
          value={values.tiene_minimo ? values.valor_minimo : ""}
          error={errors.valor_minimo ? true : false}
          helperText={errors.valor_minimo}
          onChange={handleInputChange} />
      </div>
      <div className="check-field-container">
        <EVCheckbox
          name="tiene_maximo"
          checked={values.tiene_maximo}
          onChange={handleCheckChange} />

        Valor máximo adminisible por defecto

        <ParamsTextField
          disabled={!values.tiene_maximo}
          type="number"
          size={4}
          name="valor_maximo"
          value={values.tiene_maximo ? values.valor_maximo : ""}
          error={errors.valor_maximo ? true : false}
          helperText={errors.valor_maximo}
          onChange={handleInputChange} />
      </div>
    </Fragment>
  );
}
 
export default EstandarValues;