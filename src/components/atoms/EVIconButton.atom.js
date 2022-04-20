import React from "react";
import { IconButtonStyled } from "../../styles/IconButton.style";

const EVIconButton = (props) => {
  return (
      <IconButtonStyled {...props}>{props.label}</IconButtonStyled>
  );
};


export default EVIconButton;