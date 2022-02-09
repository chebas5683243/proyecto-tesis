import { StyledCustomTextField } from "../../styles/TextField.style";
import { getSizeToPercentage } from "../../utils/utils";

const EVTextField = ({ size, ...props }) => {

  return (
    <StyledCustomTextField
      variant="outlined"
      color="secondary"
      autoComplete="off"
      wsize={getSizeToPercentage(size)}
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
}

export default EVTextField;