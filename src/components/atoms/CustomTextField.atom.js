import { StyledCustomTextField } from "../../styles/TextField.style";

const CustomTextField = ({ size, ...props }) => {

  const getSizeToPercentage = (size) => {
    return ( 102 * size - 8 ) / 4;
  }

  return (
    <StyledCustomTextField
      autoComplete="new-password"
      variant="outlined"
      color="secondary"
      wsize={getSizeToPercentage(size)}
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
}

export default CustomTextField;