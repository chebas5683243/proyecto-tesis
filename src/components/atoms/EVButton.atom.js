import React from "react";
import Button from '@mui/material/Button';

const EVButton = (props) => {
  return (
      <Button {...props}>{props.label}</Button>
  );
};


export default EVButton;