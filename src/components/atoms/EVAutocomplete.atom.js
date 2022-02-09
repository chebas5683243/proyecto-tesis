import { useState } from "react";
import { StyledAutoComplete, StyledCustomTextField } from "../../styles/TextField.style";
import { getSizeToPercentage } from "../../utils/utils";

const EVAutocomplete = ({ size, value, setValues, ...props }) => {

  const [inputValue, setInputValue] = useState('');

  const handleChange = (newValue) => {
    setValues(p => ({
      ...p,
      [props.name] : newValue
    }));
  }

  const handleInputChange = (newInputValue) => {
    setInputValue(newInputValue);
  }

  return (
    <StyledAutoComplete
      style={{width: `${getSizeToPercentage(size)}%`}}
      getOptionLabel={(option) => option.label}
      value={value}
      onChange={(event, newValue) => handleChange(newValue)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => handleInputChange(newInputValue)}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      options={props.options}
      name={props.name}
      disabled={props.disabled}
      renderInput={(params) => {
        return <StyledCustomTextField
          {...params}
          {...props}
          type="text"
          variant="outlined"
          color="secondary"
          wsize={100}
          InputLabelProps={{ shrink: true }} />
      }}
    />
  );
}
 
export default EVAutocomplete;